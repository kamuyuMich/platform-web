import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { subscribeNewsletter, fetchProfile } from '../api/client'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await subscribeNewsletter({ email })
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  const socials = [
    profile?.linkedin_url && { label: 'LinkedIn', href: profile.linkedin_url },
    profile?.twitter_url && { label: 'X / Twitter', href: profile.twitter_url },
    profile?.youtube_url && { label: 'YouTube', href: profile.youtube_url },
    profile?.email && { label: 'Email', href: `mailto:${profile.email}` },
  ].filter(Boolean)

  return (
    <footer className="bg-teal mt-20 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold">{profile?.site_name || 'Your Practice'}</p>
          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-3 mt-4 text-sm text-white/80">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">{s.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-sm">
          <p className="font-medium mb-2">Navigate</p>
          <ul className="space-y-1 text-white/75">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/consulting" className="hover:text-white">Consulting</Link></li>
            <li><Link to="/tools" className="hover:text-white">Tools</Link></li>
            <li><Link to="/insights" className="hover:text-white">Insights</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-medium mb-2">Legal</p>
          <ul className="space-y-1 text-white/75">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-sm mb-2">Subscribe to Updates</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-full px-3 py-2 text-sm text-ink"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-amber text-white text-sm px-4 py-2 rounded-full disabled:opacity-50"
            >
              {status === 'loading' ? '...' : 'Join'}
            </button>
          </form>
          {status === 'done' && <p className="text-xs text-white/90 mt-2">Subscribed - thank you.</p>}
          {status === 'error' && <p className="text-xs text-red-200 mt-2">Something went wrong. Try again.</p>}
        </div>
      </div>
    </footer>
  )
}