import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchSections, fetchContentItems } from '../api/client'
import ContentCard from '../components/ContentCard'

export default function SectionPage() {
  const { slug } = useParams()

  const { data: sections } = useQuery({ queryKey: ['sections'], queryFn: fetchSections })
  const section = sections?.find((s) => s.slug === slug)

  const { data, isLoading } = useQuery({
    queryKey: ['content-items', { section: slug }],
    queryFn: () => fetchContentItems({ section: slug }),
    enabled: !!slug,
  })

  const items = data?.data ?? []

  return (
    <div>
      <div
        className="py-14 mb-10"
        style={{ backgroundColor: section?.color || '#1B4B4B' }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-display text-3xl font-semibold text-white">
            {section?.name || 'Section'}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-14">
        {isLoading && <p className="text-ink/50 text-sm">Loading...</p>}
        {!isLoading && items.length === 0 && (
          <p className="text-ink/50 text-sm">Nothing published here yet.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => <ContentCard key={item.slug} item={item} />)}
        </div>
      </div>
    </div>
  )
}