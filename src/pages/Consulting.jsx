import { useQuery } from '@tanstack/react-query'
import { fetchProfile, fetchContentItems } from '../api/client'

function ServiceCard({ service, bookingUrl }) {
  const extra = service.extra || {}

  return (
    <div className="border border-line rounded-2xl p-6 bg-white flex flex-col">
      <h3 className="font-display text-xl font-medium mb-2">{service.title}</h3>
      {service.excerpt && <p className="text-sm text-ink/65 mb-4 flex-1">{service.excerpt}</p>}

      <dl className="space-y-1.5 text-sm mb-5">
        {extra.price && (
          <div className="flex justify-between">
            <dt className="text-ink/50">Price</dt>
            <dd className="font-medium">{extra.price}</dd>
          </div>
        )}
        {extra.duration && (
          <div className="flex justify-between">
            <dt className="text-ink/50">Duration</dt>
            <dd className="font-medium">{extra.duration}</dd>
          </div>
        )}
        {extra.whats_included && (
          <p className="text-ink/70 pt-2 border-t border-line mt-2">{extra.whats_included}</p>
        )}
      </dl>

      <a
        href={bookingUrl || '/contact'}
        target={bookingUrl ? '_blank' : undefined}
        rel={bookingUrl ? 'noreferrer' : undefined}
        className="mt-auto bg-amber text-white text-center px-4 py-2.5 rounded-full text-sm font-medium hover:opacity-90"
      >
        Book This
      </a>
    </div>
  )
}

export default function Consulting() {
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile })

  const { data, isLoading } = useQuery({
    queryKey: ['content-items', { type: 'service' }],
    queryFn: () => fetchContentItems({ type: 'service' }),
  })

  const services = data?.data ?? []

  return (
    <div>
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        <p className="text-teal text-sm font-medium uppercase tracking-wide mb-3">Consulting</p>
        <h1 className="font-display text-4xl font-semibold mb-4">
          Digital Health Consulting{profile?.name ? ` with ${profile.name}` : ''}
        </h1>
        <p className="text-ink/65 max-w-xl mx-auto mb-8">
          {profile?.title
            ? `${profile.title} - helping organizations and individuals navigate digital transformation in healthcare.`
            : 'Helping organizations and individuals navigate digital transformation in healthcare.'}
        </p>
        {profile?.booking_url && (
          <a
            href={profile.booking_url}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-amber text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90"
          >
            Book a Consultation
          </a>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        {isLoading && <p className="text-ink/50 text-sm text-center">Loading services...</p>}
        {!isLoading && services.length === 0 && (
          <p className="text-ink/50 text-sm text-center">
            Services are being added - check back soon, or reach out directly via the Contact page.
          </p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} bookingUrl={profile?.booking_url} />
          ))}
        </div>
      </section>
    </div>
  )
}
