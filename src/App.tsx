import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Team from './components/Team'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import WhatsApp from './components/WhatsApp'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'

function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Team />
      <Experience />
      <Contact />
    </main>
  )
}

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
      <Footer />
      <BackToTop />
      <WhatsApp />
    </HashRouter>
  )
}

export default App
