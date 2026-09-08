import { Link } from 'react-router-dom'

export default function ContentCard({ item }) {
  const data = item

  return (
    <Link
      to={`/read/${data.slug}`}
      className="group block border border-line rounded-2xl overflow-hidden bg-white/60 hover:bg-white transition-colors"
    >
      <div className="aspect-[16/10] bg-ink/5 overflow-hidden">
        {data.featured_image_url ? (
          <img
            src={data.featured_image_url}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink/30 text-sm">
            {data.type}
          </div>
        )}
      </div>
      <div className="p-5">
        {data.category?.name && (
          <p className="text-xs uppercase tracking-wide text-teal font-medium mb-2">
            {data.category.name}
          </p>
        )}
        <h3 className="font-display text-lg font-medium leading-snug mb-2">{data.title}</h3>
        {data.excerpt && <p className="text-sm text-ink/70 line-clamp-2">{data.excerpt}</p>}
        <div className="mt-3 flex items-center gap-2 text-xs text-ink/50">
          {data.published_at && <span>{new Date(data.published_at).toLocaleDateString()}</span>}
          {data.read_time_minutes && <span>&middot; {data.read_time_minutes} min read</span>}
        </div>
      </div>
    </Link>
  )
}
