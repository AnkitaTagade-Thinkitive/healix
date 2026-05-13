import { useEffect, useState, lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar/AnnouncementBar'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

// =============================================
// Performance: defer offcanvases / assessments
// ---------------------------------------------
// LabsOffcanvas, WLOffcanvas, WegovyAssessment and HairAssessment are all
// invisible at first paint and only mount in response to user-driven events
// (`open-labs-offcanvas`, `open-wl-offcanvas`, `open-wegovy-assessment`,
// `open-hair-assessment`). Eagerly importing them used to inflate every
// route's initial JS bundle by the size of four heavy SCSS-laden trees.
// They are now lazy()-imported and gated behind an "armed" boolean — the
// chunk loads only after the first time the matching event fires.
// =============================================
const LabsOffcanvas = lazy(() => import('@/components/sections/LabsOffcanvas/LabsOffcanvas'))
const WLOffcanvas = lazy(() => import('@/components/sections/WLOffcanvas/WLOffcanvas'))
const WegovyAssessment = lazy(() => import('@/components/sections/WegovyAssessment/WegovyAssessment'))
const HairAssessment = lazy(() => import('@/components/sections/HairAssessment/HairAssessment'))

const Layout = () => {
  // Each offcanvas now has TWO bits of state:
  //   armed — has its trigger event ever fired? (controls whether we mount
  //           the lazy component at all)
  //   open  — is it currently visible? (passed to the component)
  const [labsArmed, setLabsArmed] = useState(false)
  const [labsOpen, setLabsOpen] = useState(false)
  const [labsFrom, setLabsFrom] = useState(null)

  const [wlArmed, setWlArmed] = useState(false)
  const [wlOpen, setWlOpen] = useState(false)
  const [wlFrom, setWlFrom] = useState(null)

  const [wegovyArmed, setWegovyArmed] = useState(false)
  const [wegovyOpen, setWegovyOpen] = useState(false)

  const [hairArmed, setHairArmed] = useState(false)
  const [hairOpen, setHairOpen] = useState(false)

  // NOTE: the auth offcanvas is mounted globally in <AuthGate /> at the
  // router root so it works on every page (including pages that don't use
  // this layout like /labs or /onboarding/*). Do not re-mount it here.
  useEffect(() => {
    const labsHandler = (e) => {
      setLabsFrom((e && e.detail && e.detail.from) || null)
      setLabsArmed(true)
      setLabsOpen(true)
    }
    const wlHandler = (e) => {
      setWlFrom((e && e.detail && e.detail.from) || null)
      setWlArmed(true)
      setWlOpen(true)
    }
    const wegovyHandler = () => {
      setWegovyArmed(true)
      setWegovyOpen(true)
    }
    const hairHandler = () => {
      setHairArmed(true)
      setHairOpen(true)
    }
    window.addEventListener('open-labs-offcanvas', labsHandler)
    window.addEventListener('open-wl-offcanvas', wlHandler)
    window.addEventListener('open-wegovy-assessment', wegovyHandler)
    window.addEventListener('open-hair-assessment', hairHandler)
    return () => {
      window.removeEventListener('open-labs-offcanvas', labsHandler)
      window.removeEventListener('open-wl-offcanvas', wlHandler)
      window.removeEventListener('open-wegovy-assessment', wegovyHandler)
      window.removeEventListener('open-hair-assessment', hairHandler)
    }
  }, [])

  return (
    <div className="app-layout">
      <AnnouncementBar />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />

      {/* Lazy offcanvases — only mounted (and only fetched) once their
          respective event fires for the first time. Suspense fallback is
          null because there is no visible content until the chunk lands. */}
      {labsArmed && (
        <Suspense fallback={null}>
          <LabsOffcanvas
            isOpen={labsOpen}
            onClose={() => setLabsOpen(false)}
            from={labsFrom}
          />
        </Suspense>
      )}
      {wlArmed && (
        <Suspense fallback={null}>
          <WLOffcanvas
            isOpen={wlOpen}
            onClose={() => setWlOpen(false)}
            from={wlFrom}
          />
        </Suspense>
      )}
      {wegovyArmed && (
        <Suspense fallback={null}>
          <WegovyAssessment
            isOpen={wegovyOpen}
            onClose={() => setWegovyOpen(false)}
          />
        </Suspense>
      )}
      {hairArmed && (
        <Suspense fallback={null}>
          <HairAssessment
            isOpen={hairOpen}
            onClose={() => setHairOpen(false)}
          />
        </Suspense>
      )}
    </div>
  )
}

export default Layout
