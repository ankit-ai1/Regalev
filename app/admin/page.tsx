'use client';
import { useEffect, useState, useCallback } from 'react';
import { Users, Mail, Phone, MapPin, Zap, Trash2, RefreshCw, TrendingUp, Clock, CheckCircle2, LayoutDashboard, LogOut } from 'lucide-react';
import type { Lead, LeadStatus } from '@/lib/leads';
import Link from 'next/link';

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new:       { label: 'New',       color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  contacted: { label: 'Contacted', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  converted: { label: 'Converted', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  closed:    { label: 'Closed',    color: '#6b7280', bg: 'rgba(107,114,128,0.12)' },
};

const FILTERS: { label: string; value: 'all' | LeadStatus }[] = [
  { label: 'All Leads', value: 'all' },
  { label: 'New',       value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Converted', value: 'converted' },
  { label: 'Closed',    value: 'closed' },
];

function fmt(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | LeadStatus>('all');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      setLeads(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateStatus = async (id: string, status: LeadStatus) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead permanently?')) return;
    setDeletingId(id);
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    setLeads(prev => prev.filter(l => l.id !== id));
    setDeletingId(null);
  };

  const today = new Date().toDateString();
  const stats = {
    total:    leads.length,
    newCount: leads.filter(l => l.status === 'new').length,
    today:    leads.filter(l => new Date(l.createdAt).toDateString() === today).length,
    converted:leads.filter(l => l.status === 'converted').length,
  };

  const visible = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 0 }}>

      {/* ── Top Bar ── */}
      <div style={{
        background: 'rgba(var(--surface-rgb),0.95)',
        borderBottom: '1px solid var(--border)',
        padding: '0 5%',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, background: 'var(--primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutDashboard size={18} color="#000" />
            </div>
            <div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, color: 'var(--text-primary)', fontSize: 15, lineHeight: 1 }}>
                Admin Dashboard
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Regal EV — Lead Management</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={fetchLeads} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 13 }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 10, border: 'none', background: 'var(--primary)', cursor: 'pointer', color: '#000', fontSize: 13, fontWeight: 700 }}>
                <Zap size={14} /> View Site
              </button>
            </Link>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', cursor: 'pointer', color: '#ef4444', fontSize: 13 }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '36px 5% 80px' }}>

        {/* ── Stats Cards ── */}
        <div className="admin-stats-grid">
          {[
            { icon: Users,         label: 'Total Leads',    value: stats.total,     color: '#22c55e' },
            { icon: TrendingUp,    label: 'New Leads',      value: stats.newCount,  color: '#f59e0b' },
            { icon: Clock,         label: "Today's Leads",  value: stats.today,     color: '#3b82f6' },
            { icon: CheckCircle2,  label: 'Converted',      value: stats.converted, color: '#8b5cf6' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(var(--surface-rgb),0.9)',
              borderRadius: 20,
              padding: '22px 24px',
              border: `1px solid ${s.color}22`,
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={22} color={s.color} />
              </div>
              <div>
                <div style={{ fontSize: 30, fontFamily: 'Orbitron, sans-serif', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 5 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filter Pills ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                padding: '8px 18px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                border: `1.5px solid ${filter === f.value ? 'var(--primary)' : 'var(--border)'}`,
                background: filter === f.value ? 'rgba(var(--primary-rgb),0.1)' : 'transparent',
                color: filter === f.value ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer', transition: 'all 200ms',
                fontFamily: 'Orbitron, sans-serif', letterSpacing: 1,
              }}
            >
              {f.label} {f.value !== 'all' && `(${leads.filter(l => l.status === f.value).length})`}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-secondary)', alignSelf: 'center' }}>
            {visible.length} lead{visible.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Leads Table ── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
            <div style={{ width: 40, height: 40, border: '3px solid rgba(var(--primary-rgb),0.2)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'adminSpin 0.8s linear infinite', margin: '0 auto 16px' }} />
            Loading leads...
          </div>
        ) : visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
            <Users size={40} style={{ opacity: 0.3, display: 'block', margin: '0 auto 16px' }} />
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 13, letterSpacing: 2 }}>NO LEADS YET</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {visible.map((lead, i) => (
              <div
                key={lead.id}
                style={{
                  background: 'rgba(var(--surface-rgb),0.92)',
                  borderRadius: 18,
                  border: `1px solid ${lead.status === 'new' ? 'rgba(34,197,94,0.2)' : 'var(--border)'}`,
                  padding: '20px 24px',
                  boxShadow: lead.status === 'new' ? '0 4px 20px rgba(34,197,94,0.06)' : '0 2px 10px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 200ms',
                }}
              >
                <div className="admin-lead-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'start' }}>
                  {/* Left Info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, color: 'var(--text-primary)', fontSize: 16 }}>
                        {lead.name}
                      </span>
                      {/* Status badge */}
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                        fontFamily: 'Orbitron, sans-serif',
                        color: STATUS_CONFIG[lead.status].color,
                        background: STATUS_CONFIG[lead.status].bg,
                        padding: '4px 10px', borderRadius: 999,
                      }}>
                        {STATUS_CONFIG[lead.status].label}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 'auto' }}>
                        #{i + 1} · {fmt(lead.createdAt)}
                      </span>
                    </div>

                    {/* Contact details */}
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 12 }}>
                      {[
                        { icon: Phone, val: lead.phone, href: `tel:${lead.phone}` },
                        { icon: Mail,  val: lead.email, href: `mailto:${lead.email}` },
                        ...(lead.city ? [{ icon: MapPin, val: lead.city, href: undefined }] : []),
                      ].map(({ icon: Icon, val, href }) => (
                        <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                          <Icon size={13} color="var(--primary)" />
                          {href ? (
                            <a href={href} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>{val}</a>
                          ) : (
                            <span>{val}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Product + message */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--primary)', background: 'rgba(var(--primary-rgb),0.08)', padding: '5px 12px', borderRadius: 8, fontWeight: 700 }}>
                        <Zap size={12} /> {lead.product}
                      </div>
                      {lead.message && (
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                          "{lead.message.slice(0, 80)}{lead.message.length > 80 ? '…' : ''}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="admin-actions" style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
                    {/* Status changer */}
                    <select
                      value={lead.status}
                      onChange={e => updateStatus(lead.id, e.target.value as LeadStatus)}
                      style={{
                        padding: '8px 12px', borderRadius: 10,
                        border: `1.5px solid ${STATUS_CONFIG[lead.status].color}44`,
                        background: STATUS_CONFIG[lead.status].bg,
                        color: STATUS_CONFIG[lead.status].color,
                        fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        fontFamily: 'Orbitron, sans-serif', letterSpacing: 1,
                        outline: 'none',
                      }}
                    >
                      {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map(s => (
                        <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                      ))}
                    </select>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={`tel:${lead.phone}`}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer' }}>
                        <Phone size={13} /> Call
                      </a>
                      <a href={`mailto:${lead.email}`}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer' }}>
                        <Mail size={13} /> Mail
                      </a>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        disabled={deletingId === lead.id}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', fontSize: 12, cursor: 'pointer' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes adminSpin { to { transform: rotate(360deg); } }
        @media (max-width: 480px) {
          .admin-lead-grid { grid-template-columns: 1fr !important; }
          .admin-actions { flex-direction: row !important; flex-wrap: wrap !important; align-items: flex-start !important; }
        }
      `}</style>
    </div>
  );
}
