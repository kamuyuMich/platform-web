import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchContentItems, fetchProfile } from '../api/client'

export default function Home() {
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['content-items', { type: 'article', page: 1 }],
    queryFn: () => fetchContentItems({ type: 'article' }),
  })

  const articles = data?.data ?? []

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <div className="grid lg:grid-cols-[1fr,380px] gap-12 items-start">
        {/* Left: intro + latest writing */}
        <div>
          <p className="text-teal text-sm font-medium tracking-wide uppercase mb-3">
            {profile?.title || 'Physician & Digital Health Consultant'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-4">
            {profile?.name || 'Your Name Here'}
          </h1>
          {profile?.short_bio && (
            <p className="text-ink/70 text-lg max-w-lg mb-6">{profile.short_bio}</p>
          )}
          <div className="flex gap-3 mb-12">
            <Link to="/consulting" className="bg-amber text-white px-5 py-3 rounded-full text-sm font-medium">
              Work With Me
            </Link>
            <Link to="/about" className="border border-ink px-5 py-3 rounded-full text-sm font-medium">
              About Me
            </Link>
          </div>

          <h2 className="font-display text-2xl font-semibold mb-6 border-t border-line pt-8">
            Latest Writing
          </h2>

          {isLoading && <p className="text-ink/50 text-sm">Loading...</p>}
          {isError && <p className="text-sm text-red-600">Couldn't load articles right now.</p>}
          {!isLoading && !isError && articles.length === 0 && (
            <p className="text-ink/50 text-sm">No articles published yet.</p>
          )}

          <div className="divide-y divide-line">
            {articles.slice(0, 5).map((item) => (
              <Link key={item.slug} to={`/read/${item.slug}`} className="block py-5 group">
                <h3 className="font-display text-lg font-medium group-hover:text-teal transition-colors">
                  {item.title}
                </h3>
                {item.excerpt && <p className="text-sm text-ink/65 mt-1 line-clamp-2">{item.excerpt}</p>}
                <span className="text-sm text-amber mt-2 inline-block">Read More &rarr;</span>
              </Link>
            ))}
          </div>

          {articles.length > 0 && (
            <Link to="/insights" className="text-sm text-teal mt-6 inline-block">
              View All Insights &rarr;
            </Link>
          )}
        </div>

        {/* Right: photo */}
        <div className="w-full max-w-[320px] mx-auto lg:mx-0 lg:sticky lg:top-24">
          <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-teal/10 border border-line">
            {profile?.photo_url ? (
              <img src={profile.photo_url} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-teal/40 text-sm">
                Photo
              </div>
            )}
          </div>
          {profile?.specialties?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {profile.specialties.map((s) => (
                <span key={s} className="text-xs bg-teal/10 text-teal px-2.5 py-1 rounded-full">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
