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
    <footer className="border-t border-line mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold">Digital Health Platform</p>
          <p className="text-sm text-ink/60 mt-1">Healthcare. Technology. Innovation.</p>
          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-3 mt-4 text-sm text-teal">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-sm">
          <p className="font-medium mb-2">Navigate</p>
          <ul className="space-y-1 text-ink/70">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/consulting">Consulting</Link></li>
            <li><Link to="/digital-health">Digital Health</Link></li>
            <li><Link to="/ai-in-healthcare">AI in Healthcare</Link></li>
            <li><Link to="/tools">Tools</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-medium mb-2">Legal</p>
          <ul className="space-y-1 text-ink/70">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Medical Disclaimer</li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-sm mb-2">Subscribe to the Digital Health Brief</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 border border-line rounded-full px-3 py-2 text-sm bg-white"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-teal text-white text-sm px-4 py-2 rounded-full disabled:opacity-50"
            >
              {status === 'loading' ? '...' : 'Join'}
            </button>
          </form>
          {status === 'done' && <p className="text-xs text-teal mt-2">Subscribed - thank you.</p>}
          {status === 'error' && <p className="text-xs text-red-600 mt-2">Something went wrong. Try again.</p>}
        </div>
      </div>
      <p className="text-center text-xs text-ink/40 pb-6">
        Educational and informational content only - not a substitute for professional medical advice.
      </p>
    </footer>
  )
}
