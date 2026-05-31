import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLead, Lead } from '../context/LeadContext'

const ADMIN_PASSWORD = 'synerax@admin'

type Status = 'all' | 'new' | 'contacted' | 'closed'

function downloadCSV(leads: Lead[]) {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Message', 'Date', 'Status']
  const rows = leads.map(l => [
    l.id, l.name, l.email, l.phone, l.company, l.service, l.budget,
    `"${l.message.replace(/"/g, '""')}"`,
    new Date(l.createdAt).toLocaleString(),
    l.status,
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `synerax-leads-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Admin() {
  const { leads, saveLead } = useLead()

  // ── Auth ─────────────────────────────────────────────────────────────
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('adm') === '1')
  const [pwd, setPwd] = useState('')
  const [pwdErr, setPwdErr] = useState(false)

  const login = () => {
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem('adm', '1')
      setAuthed(true)
    } else {
      setPwdErr(true)
      setTimeout(() => setPwdErr(false), 1500)
    }
  }

  // ── Filters ───────────────────────────────────────────────────────────
  const [filter, setFilter] = useState<Status>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)

  const filtered = useMemo(() => leads.filter(l => {
    const matchStatus = filter === 'all' || l.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || [l.name, l.email, l.company, l.service].some(v => v.toLowerCase().includes(q))
    return matchStatus && matchSearch
  }), [leads, filter, search])

  const counts = useMemo(() => ({
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    closed: leads.filter(l => l.status === 'closed').length,
  }), [leads])

  const updateStatus = (id: string, status: Lead['status']) => {
    const stored: Lead[] = JSON.parse(localStorage.getItem('synerax_leads') || '[]')
    const updated = stored.map(l => l.id === id ? { ...l, status } : l)
    localStorage.setItem('synerax_leads', JSON.stringify(updated))
    // refresh context by calling saveLead (it rewrites the whole array)
    // hack: reload from storage
    window.location.reload()
  }

  // ── Login screen ──────────────────────────────────────────────────────
  if (!authed) return (
    <div className="adm-login">
      <div className="adm-login__box">
        <img src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1780252831/synerax_logo_oc4xfs.png" alt="Synerax" className="adm-login__logo" />
        <h2>Admin Dashboard</h2>
        <p>Enter your password to continue</p>
        <input
          type="password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          placeholder="Password"
          className={pwdErr ? 'shake' : ''}
        />
        {pwdErr && <span className="adm-login__err">Incorrect password</span>}
        <button onClick={login}>Login →</button>
        <Link to="/" className="adm-login__back">← Back to website</Link>
      </div>
    </div>
  )

  // ── Dashboard ─────────────────────────────────────────────────────────
  return (
    <div className="adm">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <img src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1780252831/synerax_logo_oc4xfs.png" alt="Synerax" className="adm-sidebar__logo" />
        <nav className="adm-sidebar__nav">
          <span className="adm-sidebar__item adm-sidebar__item--active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            Leads
          </span>
        </nav>
        <div className="adm-sidebar__bottom">
          <Link to="/" className="adm-sidebar__exit">← Exit Admin</Link>
          <button className="adm-sidebar__logout" onClick={() => { sessionStorage.removeItem('adm'); setAuthed(false) }}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="adm-main">
        {/* Header */}
        <div className="adm-topbar">
          <div>
            <h1 className="adm-topbar__title">Lead Management</h1>
            <p className="adm-topbar__sub">All enquiries submitted through the website</p>
          </div>
          <button className="adm-export" onClick={() => downloadCSV(filtered)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>

        {/* Stat cards */}
        <div className="adm-stats">
          {(['all','new','contacted','closed'] as Status[]).map(s => (
            <button key={s} className={`adm-stat${filter === s ? ' adm-stat--active' : ''}`} onClick={() => setFilter(s)}>
              <span className="adm-stat__num">{counts[s]}</span>
              <span className="adm-stat__label">{s === 'all' ? 'Total Leads' : s.charAt(0).toUpperCase() + s.slice(1)}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="adm-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, company…" />
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="adm-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <p>No leads found</p>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Budget</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead.id} onClick={() => setSelected(lead)} className="adm-row">
                    <td className="adm-td--muted">{filtered.length - i}</td>
                    <td><strong>{lead.name}</strong>{lead.company && <span className="adm-sub">{lead.company}</span>}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone || '—'}</td>
                    <td>{lead.service || '—'}</td>
                    <td>{lead.budget || '—'}</td>
                    <td className="adm-td--muted">{new Date(lead.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'2-digit' })}</td>
                    <td>
                      <span className={`adm-badge adm-badge--${lead.status}`}>{lead.status}</span>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value as Lead['status'])}
                        className="adm-status-sel"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Lead detail drawer */}
      {selected && (
        <div className="adm-drawer-overlay" onClick={() => setSelected(null)}>
          <div className="adm-drawer" onClick={e => e.stopPropagation()}>
            <button className="adm-drawer__close" onClick={() => setSelected(null)}>×</button>
            <h3 className="adm-drawer__name">{selected.name}</h3>
            <p className="adm-drawer__company">{selected.company}</p>

            <div className="adm-drawer__grid">
              <div className="adm-drawer__item"><span>Email</span><strong>{selected.email}</strong></div>
              <div className="adm-drawer__item"><span>Phone</span><strong>{selected.phone || '—'}</strong></div>
              <div className="adm-drawer__item"><span>Service</span><strong>{selected.service || '—'}</strong></div>
              <div className="adm-drawer__item"><span>Budget</span><strong>{selected.budget || '—'}</strong></div>
              <div className="adm-drawer__item"><span>Date</span><strong>{new Date(selected.createdAt).toLocaleString('en-IN')}</strong></div>
              <div className="adm-drawer__item"><span>Status</span>
                <span className={`adm-badge adm-badge--${selected.status}`}>{selected.status}</span>
              </div>
            </div>

            {selected.message && (
              <div className="adm-drawer__msg">
                <span>Message</span>
                <p>{selected.message}</p>
              </div>
            )}

            <div className="adm-drawer__actions">
              <a href={`mailto:${selected.email}`} className="adm-drawer__btn adm-drawer__btn--primary">
                Send Email
              </a>
              {selected.phone && (
                <a href={`tel:${selected.phone}`} className="adm-drawer__btn">
                  Call
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
