import { About } from './components/About'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Lessons } from './components/Lessons'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Planner } from './components/Planner'
import { Reviews } from './components/Reviews'
import { Steps } from './components/Steps'
import { LangProvider } from './lib/i18n'

export default function App() {
  return (
    <LangProvider>
      <div className="paper-margin relative">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Planner />
          <About />
          <Lessons />
          <Steps />
          <Reviews />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  )
}
