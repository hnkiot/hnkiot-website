import { lazy, Suspense, useEffect, useRef, useState, useCallback } from 'react'
import Header from './components/Header'
import Preloader from './sections/Preloader'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import Footer from './sections/Footer'

const Works = lazy(() => import('./sections/Works'))
const Capabilities = lazy(() => import('./sections/Capabilities'))
const About = lazy(() => import('./sections/About'))
const Gallery = lazy(() => import('./sections/Gallery'))
const Highlight = lazy(() => import('./sections/Highlight'))
const Contact = lazy(() => import('./sections/Contact')) // three.js shader, heaviest chunk
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))

function LightFallback() {
  return <div style={{ minHeight: '300px', backgroundColor: '#f4f4f5' }} />
}
function DarkFallback() {
  return <div style={{ minHeight: '400px', backgroundColor: '#070b14' }} />
}
function WhiteFallback() {
  return <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }} />
}

export default function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })
  const [presetService, setPresetService] = useState(null)
  const [currentServiceId, setCurrentServiceId] = useState(null)

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

  // Card click on the services grid: open the full detail view (no page reload, no route change).
  const handleSelectService = useCallback((id) => {
    setCurrentServiceId(id)
  }, [])

  const handleBack = useCallback(() => {
    setCurrentServiceId(null)
    setTimeout(() => {
      document.querySelector('#works')?.scrollIntoView({ behavior: 'auto' })
    }, 0)
  }, [])

  // "Enquire About This Service" from the detail view: close it, preset the
  // contact form's service dropdown, and scroll to the enquiry form.
  const handleEnquire = useCallback((title) => {
    setCurrentServiceId(null)
    setPresetService(title)
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }, [])

  const consumePreset = useCallback(() => setPresetService(null), [])

  return (
    <>
      <Preloader />
      <Header scrollRef={scrollRef} />
      {currentServiceId ? (
        <Suspense fallback={<WhiteFallback />}>
          <ServiceDetail serviceId={currentServiceId} onBack={handleBack} onEnquire={handleEnquire} />
        </Suspense>
      ) : (
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
            <About />
          </Suspense>
          <Suspense fallback={<LightFallback />}>
            <Gallery />
          </Suspense>
          <Suspense fallback={<LightFallback />}>
            <Highlight />
          </Suspense>
          <Suspense fallback={<DarkFallback />}>
            <Contact presetService={presetService} onConsumePreset={consumePreset} />
          </Suspense>
        </main>
      )}
      <Footer />
    </>
  )
}
