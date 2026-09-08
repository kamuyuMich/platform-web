import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchContent } from '../api/client'
import ContentCard from '../components/ContentCard'

const SECTION_LABELS = {
  article: 'Articles',
  research: 'Research',
  project: 'Projects',
  tool: 'Tools',
  resource: 'Resources',
}

export default function Search() {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchContent(query),
    enabled: query.length >= 2,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(input.trim())
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="font-display text-3xl font-semibold mb-6">Search</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search articles, research, projects, tools..."
          className="flex-1 border border-line rounded-full px-4 py-3 text-sm bg-white"
        />
        <button type="submit" className="bg-ink text-white px-5 py-3 rounded-full text-sm font-medium">
          Search
        </button>
      </form>

      {isLoading && <p className="text-ink/50 text-sm">Searching...</p>}
      {isError && <p className="text-sm text-red-600">Search isn't available right now.</p>}
      {query.length >= 2 && !isLoading && data && Object.keys(data).length === 0 && (
        <p className="text-ink/50 text-sm">No results for "{query}".</p>
      )}

      {data && Object.entries(data).map(([type, items]) => (
        <section key={type} className="mb-10">
          <h2 className="font-display text-xl font-medium mb-4">{SECTION_LABELS[type] || type}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => <ContentCard key={item.slug} item={item} />)}
          </div>
        </section>
      ))}
    </div>
  )
}
