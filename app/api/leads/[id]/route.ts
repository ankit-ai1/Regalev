import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Lead } from '@/lib/leads';

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function readLeads(): Promise<Lead[]> {
  try { return JSON.parse(await fs.readFile(DATA_FILE, 'utf-8')); }
  catch { return []; }
}
async function writeLeads(leads: Lead[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

/* ── PATCH /api/leads/[id]  — update status ── */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json();
  const leads = await readLeads();
  const i = leads.findIndex(l => l.id === id);
  if (i !== -1) { leads[i].status = status; await writeLeads(leads); }
  return NextResponse.json({ success: true });
}

/* ── DELETE /api/leads/[id]  — remove lead ── */
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const leads = await readLeads();
  await writeLeads(leads.filter(l => l.id !== id));
  return NextResponse.json({ success: true });
}
