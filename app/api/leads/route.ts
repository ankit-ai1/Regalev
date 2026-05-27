import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Lead } from '@/lib/leads';

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function readLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

/* ── GET  /api/leads  — admin dashboard ── */
export async function GET() {
  const leads = await readLeads();
  return NextResponse.json(leads);
}

/* ── POST /api/leads  — new enquiry ── */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const lead: Lead = {
    id: `lead_${Date.now()}`,
    name: String(body.name || '').trim(),
    phone: String(body.phone || '').trim(),
    email: String(body.email || '').trim(),
    city: String(body.city || '').trim(),
    product: String(body.product || '').trim(),
    productId: String(body.productId || '').trim(),
    message: String(body.message || '').trim(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const leads = await readLeads();
  leads.unshift(lead);
  await writeLeads(leads);

  /* ── Optional email notification ── */
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL || gmailUser;

  if (gmailUser && gmailPass) {
    try {
      const nodemailer = (await import('nodemailer')).default;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      });
      await transporter.sendMail({
        from: `"Regal EV Leads" <${gmailUser}>`,
        to: adminEmail,
        subject: `🔔 New Lead: ${lead.name} — ${lead.product}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
            <div style="background:#22c55e;padding:24px 28px">
              <h2 style="color:#000;margin:0;font-size:20px">New Enquiry — Regal EV</h2>
            </div>
            <div style="padding:28px">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                ${[
                  ['Name', lead.name],
                  ['Phone', lead.phone],
                  ['Email', lead.email],
                  ['City', lead.city || '—'],
                  ['Product', lead.product],
                  ['Message', lead.message || '—'],
                  ['Received', new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
                ].map(([k, v]) => `
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;width:120px;font-weight:600">${k}</td>
                    <td style="padding:10px 0;color:#111827">${v}</td>
                  </tr>`).join('')}
              </table>
            </div>
            <div style="background:#f9fafb;padding:16px 28px;font-size:12px;color:#9ca3af">
              Regal EV Lead Management — visit /admin to manage leads
            </div>
          </div>
        `,
      });
    } catch (err) {
      console.error('[Lead Email] Failed:', err);
    }
  }

  return NextResponse.json({ success: true, id: lead.id });
}
