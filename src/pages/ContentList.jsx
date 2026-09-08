import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { fetchContentItems, fetchCategories } from '../api/client'
import ContentCard from '../components/ContentCard'

export default function ContentList({ type, section, title, description }) {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || ''

  const { data: categories } = useQuery({
    queryKey: ['categories', section],
    queryFn: () => fetchCategories(section),
    enabled: !!section,
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['content-items', { type, category }],
    queryFn: () => fetchContentItems({ type, category: category || undefined }),
  })

  const items = data?.data ?? []

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="font-display text-3xl font-semibold mb-3">{title}</h1>
      {description && <p className="text-ink/65 max-w-2xl mb-8">{description}</p>}

      {categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setParams({})}
            className={`text-sm px-3 py-1.5 rounded-full border ${!category ? 'bg-ink text-white border-ink' : 'border-line text-ink/70'}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setParams({ category: c.slug })}
              className={`text-sm px-3 py-1.5 rounded-full border ${category === c.slug ? 'bg-ink text-white border-ink' : 'border-line text-ink/70'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {isLoading && <p className="text-ink/50 text-sm">Loading...</p>}
      {isError && <p className="text-sm text-red-600">Couldn't load content right now.</p>}
      {!isLoading && !isError && items.length === 0 && (
        <p className="text-ink/50 text-sm">Nothing published here yet - check back soon.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  )
}
