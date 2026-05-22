import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Team from './components/Team'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import WhatsApp from './components/WhatsApp'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Team />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <WhatsApp />
    </>
  )
}

export default App
