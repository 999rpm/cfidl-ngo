import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// This is the one route in the whole site that needs a live server instead
// of static HTML, because it has to keep the Zoho SMTP password secret and
// actually send mail. See https://docs.astro.build/en/guides/on-demand-rendering/
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = import.meta.env.ZOHO_SMTP_HOST || 'smtp.zoho.com';
  const port = Number(import.meta.env.ZOHO_SMTP_PORT || 465);
  const secure = (import.meta.env.ZOHO_SMTP_SECURE ?? 'true') !== 'false';
  const user = import.meta.env.ZOHO_SMTP_USER;
  const pass = import.meta.env.ZOHO_SMTP_PASSWORD;

  if (!user || !pass) return null;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
  return cachedTransporter;
}

export const POST: APIRoute = async ({ request }) => {
  let payload: { email?: string; company?: string; startedAt?: string };
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  const email = (payload.email || '').trim();
  const honeypot = payload.company || '';
  const startedAt = Number(payload.startedAt || 0);

  // Bot trap: a real visitor can't fill a hidden field or submit in <1.2s.
  if (honeypot) return json({ ok: true }); // pretend success, do nothing
  if (startedAt && Date.now() - startedAt < 1200) {
    return json({ ok: true });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  const transporter = getTransporter();
  if (!transporter) {
    console.warn(
      '[newsletter] Zoho SMTP is not configured — set ZOHO_SMTP_USER / ZOHO_SMTP_PASSWORD.',
    );
    return json(
      { ok: false, error: 'Newsletter sign-up is not configured yet. Please try again later.' },
      503,
    );
  }

  const fromName = import.meta.env.NEWSLETTER_FROM_NAME || 'CFIDL';
  const fromAddress = import.meta.env.ZOHO_SMTP_USER;
  const notifyTo = import.meta.env.ZOHO_NOTIFY_TO || fromAddress;

  try {
    await Promise.all([
      // Confirmation email to the subscriber
      transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        to: email,
        subject: `You're subscribed to ${fromName} updates`,
        text: `Thanks for subscribing! You'll hear from us about once a month — no spam, and you can unsubscribe any time by replying to one of our emails.`,
        html: `<p>Thanks for subscribing!</p><p>You'll hear from us about once a month — no spam, and you can unsubscribe any time by replying to one of our emails.</p>`,
      }),
      // Internal notification so the team knows someone signed up
      transporter.sendMail({
        from: `"${fromName} Website" <${fromAddress}>`,
        to: notifyTo,
        subject: 'New newsletter subscriber',
        text: `New subscriber: ${email}`,
        html: `<p>New newsletter subscriber: <strong>${email}</strong></p>`,
      }),
    ]);

    return json({ ok: true });
  } catch (error) {
    console.error('[newsletter] Failed to send via Zoho SMTP:', error);
    return json({ ok: false, error: 'Something went wrong sending your confirmation email.' }, 502);
  }
};
