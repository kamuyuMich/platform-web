import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ContentList from './pages/ContentList'
import ContentDetail from './pages/ContentDetail'
import SearchPage from './pages/Search'
import Contact from './pages/Contact'
import Tools from './pages/Tools'
import About from './pages/About'
import Consulting from './pages/Consulting'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/consulting" element={<Consulting />} />

          <Route
            path="/digital-health"
            element={
              <ContentList
                type="article"
                section="digital_health"
                title="Digital Health"
                description="Understanding how technology is reshaping healthcare delivery, health systems and patient experiences."
              />
            }
          />
          <Route
            path="/ai-in-healthcare"
            element={
              <ContentList
                type="article"
                section="ai"
                title="Artificial Intelligence in Healthcare"
                description="How AI can support healthcare professionals, improve decision-making and transform care delivery."
              />
            }
          />
          <Route
            path="/insights"
            element={<ContentList type="article" title="Insights" description="All articles, in one place." />}
          />
          <Route
            path="/research"
            element={<ContentList type="research" title="Research & Evidence" description="Evidence and emerging developments at the intersection of healthcare and technology." />}
          />
          <Route
            path="/projects"
            element={<ContentList type="project" title="Projects & Innovation" description="Building and exploring practical solutions to healthcare challenges." />}
          />
          <Route
            path="/resources"
            element={<ContentList type="resource" title="Digital Health Resources" description="Guides, frameworks and resources for healthcare professionals and innovators." />}
          />

          <Route path="/tools" element={<Tools />} />
          <Route path="/read/:slug" element={<ContentDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
