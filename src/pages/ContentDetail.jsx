import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { fetchContentItem, fetchRelatedItems } from '../api/client'
import ContentCard from '../components/ContentCard'

export default function ContentDetail() {
  const { slug } = useParams()

  const { data: item, isLoading, isError } = useQuery({
    queryKey: ['content-item', slug],
    queryFn: () => fetchContentItem(slug),
  })

  const { data: related } = useQuery({
    queryKey: ['related', slug],
    queryFn: () => fetchRelatedItems(slug),
    enabled: !!item,
  })

  if (isLoading) return <div className="max-w-3xl mx-auto px-4 py-20 text-ink/50">Loading...</div>
  if (isError || !item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <p className="text-red-600">This page couldn't be found.</p>
        <Link to="/" className="text-teal text-sm">&larr; Back home</Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-14">
      {item.category?.name && (
        <p className="text-teal text-sm font-medium uppercase tracking-wide mb-3">{item.category.name}</p>
      )}
      <h1 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-4">{item.title}</h1>

      <div className="flex items-center gap-3 text-sm text-ink/50 mb-8">
        {item.author?.name && <span>{item.author.name}</span>}
        {item.published_at && <span>&middot; {new Date(item.published_at).toLocaleDateString()}</span>}
        {item.read_time_minutes && <span>&middot; {item.read_time_minutes} min read</span>}
      </div>

      {item.featured_image_url && (
        <img src={item.featured_image_url} alt="" className="w-full rounded-2xl mb-8 aspect-video object-cover" />
      )}

      <div className="prose prose-neutral max-w-none whitespace-pre-line text-ink/85 leading-relaxed">
        {item.body}
      </div>

      {item.extra && Object.keys(item.extra).length > 0 && (
        <dl className="mt-10 border-t border-line pt-6 space-y-4">
          {Object.entries(item.extra).map(([key, value]) => (
            value ? (
              <div key={key}>
                <dt className="text-xs uppercase tracking-wide text-ink/50">{key.replace(/_/g, ' ')}</dt>
                <dd className="text-sm mt-1">{String(value)}</dd>
              </div>
            ) : null
          ))}
        </dl>
      )}

      {item.tags?.length > 0 && (
        <div className="flex gap-2 mt-8">
          {item.tags.map((t) => (
            <span key={t} className="text-xs bg-teal/10 text-teal px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>
      )}

      {related?.length > 0 && (
        <div className="mt-16 pt-10 border-t border-line">
          <h2 className="font-display text-xl font-semibold mb-6">Related</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => <ContentCard key={r.slug} item={r} />)}
          </div>
        </div>
      )}
    </article>
  )
}
