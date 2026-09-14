import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchSections, fetchProfile } from '../api/client'

const STATIC_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/tools', label: 'Tools' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { data: sections } = useQuery({ queryKey: ['sections'], queryFn: fetchSections })
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile })
  
  const LINKS = [
    { to: '/about', label: 'About' },
    ...(sections || []).map((s) => ({ to: `/section/${s.slug}`, label: s.name, color: s.color })),
    { to: '/tools', label: 'Tools' },
    { to: '/insights', label: 'Insights' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="border-b border-line bg-paper/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          {profile?.site_name || 'Your Practice'}
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `hover:text-teal transition-colors ${isActive ? 'text-teal font-medium' : 'text-ink/80'}`
              }
            >
              {l.color && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: l.color }} />}
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/search" aria-label="Search" className="text-ink/70 hover:text-teal">
            Search
          </Link>
          <Link
            to="/consulting"
            className="bg-amber text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Work With Me
          </Link>
        </div>

        <button
          className="lg:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line px-4 py-4 flex flex-col gap-3 text-sm">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-ink/80">
              {l.color && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: l.color }} />}
              {l.label}
            </Link>
          ))}
          <Link to="/consulting" onClick={() => setOpen(false)} className="text-amber font-medium">
            Work With Me
          </Link>
        </nav>
      )}
    </header>
  )
}
