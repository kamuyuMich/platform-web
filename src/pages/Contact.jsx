import { useState } from 'react'
import { submitContact } from '../api/client'

const REASONS = [
  ['collaboration', 'Collaboration'],
  ['consulting', 'Consulting'],
  ['speaking', 'Speaking'],
  ['research', 'Research'],
  ['partnership', 'Partnership'],
  ['media', 'Media'],
  ['general', 'General inquiry'],
]

const EMPTY = { name: '', email: '', organization: '', reason: 'general', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await submitContact(form)
      setStatus('done')
      setForm(EMPTY)
    } catch (err) {
      setStatus('error')
      setError(err?.response?.data?.message || 'Something went wrong - please try again.')
    }
  }

  if (status === 'done') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold mb-3">Message sent</h1>
        <p className="text-ink/65">Thanks for reaching out - we'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl font-semibold mb-3">Let's Build the Future of Healthcare</h1>
      <p className="text-ink/65 mb-10">
        Whether you're interested in collaboration, research, speaking, consulting, technology
        or simply want to connect, I'd love to hear from you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium block mb-1">Full name</label>
          <input required value={form.name} onChange={update('name')} className="w-full border border-line rounded-lg px-3 py-2.5 bg-white" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Email</label>
          <input type="email" required value={form.email} onChange={update('email')} className="w-full border border-line rounded-lg px-3 py-2.5 bg-white" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Organization (optional)</label>
          <input value={form.organization} onChange={update('organization')} className="w-full border border-line rounded-lg px-3 py-2.5 bg-white" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Reason for contacting</label>
          <select value={form.reason} onChange={update('reason')} className="w-full border border-line rounded-lg px-3 py-2.5 bg-white">
            {REASONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Message</label>
          <textarea required rows={5} value={form.message} onChange={update('message')} className="w-full border border-line rounded-lg px-3 py-2.5 bg-white" />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-ink text-white px-6 py-3 rounded-full text-sm font-medium disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
