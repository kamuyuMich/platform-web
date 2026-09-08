import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchProfile } from '../api/client'

export default function About() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  })

  if (isLoading) return <div className="max-w-3xl mx-auto px-4 py-20 text-ink/50">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-10">
        <div className="w-40 h-40 rounded-full overflow-hidden bg-teal/10 shrink-0 border border-line">
          {profile?.photo_url ? (
            <img src={profile.photo_url} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-teal/40 text-sm">Photo</div>
          )}
        </div>
        <div>
          <h1 className="font-display text-3xl font-semibold">{profile?.name}</h1>
          {profile?.credentials && <p className="text-ink/60 text-sm mt-1">{profile.credentials}</p>}
          {profile?.title && <p className="text-teal font-medium mt-2">{profile.title}</p>}
          {profile?.short_bio && <p className="text-ink/70 mt-3">{profile.short_bio}</p>}

          <div className="flex gap-4 mt-4 text-sm">
            {profile?.linkedin_url && <a href={profile.linkedin_url} className="text-teal">LinkedIn</a>}
            {profile?.twitter_url && <a href={profile.twitter_url} className="text-teal">X / Twitter</a>}
            {profile?.youtube_url && <a href={profile.youtube_url} className="text-teal">YouTube</a>}
          </div>
        </div>
      </div>

      {profile?.specialties?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {profile.specialties.map((s) => (
            <span key={s} className="text-xs bg-teal/10 text-teal px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      )}

      {profile?.bio && (
        <div className="prose prose-neutral max-w-none whitespace-pre-line text-ink/85 leading-relaxed mb-12">
          {profile.bio}
        </div>
      )}

      <div className="border-t border-line pt-8 flex flex-wrap gap-4">
        <Link to="/consulting" className="bg-teal text-white px-5 py-3 rounded-full text-sm font-medium">
          Consulting Services
        </Link>
        <Link to="/contact" className="border border-ink px-5 py-3 rounded-full text-sm font-medium">
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
