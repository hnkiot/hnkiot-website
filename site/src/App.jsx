import { lazy, Suspense, useEffect, useRef, useState, useCallback } from 'react'
import Header from './components/Header'
import Preloader from './sections/Preloader'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import Footer from './sections/Footer'

const Works = lazy(() => import('./sections/Works'))
const Capabilities = lazy(() => import('./sections/Capabilities'))
const Highlight = lazy(() => import('./sections/Highlight'))
const Contact = lazy(() => import('./sections/Contact')) // three.js shader, heaviest chunk

function LightFallback() {
  return <div style={{ minHeight: '300px', backgroundColor: '#f4f4f5' }} />
}
function DarkFallback() {
  return <div style={{ minHeight: '400px', backgroundColor: '#070b14' }} />
}

export default function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })
  const [presetService, setPresetService] = useState(null)

  useEffect(() => {
    let rafId
    let prevY = window.scrollY
    const tick = () => {
      const y = window.scrollY
      scrollRef.current.y = y
      scrollRef.current.speed = y - prevY
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const handleSelectService = useCallback((title) => {
    setPresetService(title)
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const consumePreset = useCallback(() => setPresetService(null), [])

  return (
    <>
      <Preloader />
      <Header scrollRef={scrollRef} />
      <main>
        <Hero />
        <Philosophy />
        <Suspense fallback={<LightFallback />}>
          <Works scrollRef={scrollRef} onSelectService={handleSelectService} />
        </Suspense>
        <Suspense fallback={<DarkFallback />}>
          <Capabilities />
        </Suspense>
        <Suspense fallback={<LightFallback />}>
          <Highlight />
        </Suspense>
        <Suspense fallback={<DarkFallback />}>
          <Contact presetService={presetService} onConsumePreset={consumePreset} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
