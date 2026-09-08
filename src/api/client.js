import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

// ── content items ──────────────────────────────────────
export const fetchContentItems = async ({ type, category, tag, page = 1 } = {}) => {
  const { data } = await api.get('/content-items', {
    params: { type, category, tag, page },
  })
  return data
}

export const fetchContentItem = async (slug) => {
  const { data } = await api.get(`/content-items/${slug}`)
  return data.data
}

export const fetchRelatedItems = async (slug) => {
  const { data } = await api.get(`/content-items/${slug}/related`)
  return data.data
}

// ── categories ─────────────────────────────────────────
export const fetchCategories = async (section) => {
  const { data } = await api.get('/categories', { params: { section } })
  return data
}

// ── search ─────────────────────────────────────────────
export const searchContent = async (q) => {
  const { data } = await api.get('/search', { params: { q } })
  return data
}

// ── site profile (doctor bio, photo, links) ────────────
export const fetchProfile = async () => {
  const { data } = await api.get('/profile')
  return data.data
}

// ── newsletter / contact ───────────────────────────────
export const subscribeNewsletter = async (payload) => {
  const { data } = await api.post('/newsletter/subscribe', payload)
  return data
}

export const submitContact = async (payload) => {
  const { data } = await api.post('/contact', payload)
  return data
}
