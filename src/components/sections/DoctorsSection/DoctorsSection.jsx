import { useRef, useEffect, useCallback } from 'react'
import DoctorCard from '@/components/common/DoctorCard/DoctorCard'
import { doctors } from '@/data/doctors'
import './DoctorsSection.scss'

const RESISTANCE = 0.5
const ELASTIC_FACTOR = 0.35
const SNAP_DURATION = 700

const DoctorsSection = () => {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const offsetRef = useRef(0)
  const rafRef = useRef(null)
  const snapTimerRef = useRef(null)
  const touchStartRef = useRef(null)
  const mouseStartRef = useRef(null)
  const isDraggingRef = useRef(false)
  const maxOffsetRef = useRef(300)

  const getMaxOffset = useCallback(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return 300
    const trackWidth = track.scrollWidth
    const containerWidth = container.clientWidth
    return Math.max(trackWidth - containerWidth + 40, 300)
  }, [])

  const applyOffset = useCallback((px) => {
    const max = maxOffsetRef.current
    offsetRef.current = px

    // Apply elastic resistance beyond boundaries
    let display = px
    if (Math.abs(px) > max) {
      const over = Math.abs(px) - max
      display = px > 0
        ? max + over * ELASTIC_FACTOR
        : -(max + over * ELASTIC_FACTOR)
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${display}px)`
    }
  }, [])

  const snapBack = useCallback(() => {
    const max = maxOffsetRef.current
    const current = offsetRef.current
    let target = current

    // Snap to nearest boundary if beyond limits
    if (current > 0) target = 0
    else if (current < -max) target = -max
    else if (Math.abs(current) < 30) target = 0

    // If within range, stay put
    if (current <= 0 && current >= -max) {
      // Only snap to edges if very close
      if (current > -30) target = 0
      else if (current < -(max - 30)) target = -max
      else return
    }

    if (trackRef.current) {
      trackRef.current.style.transition = `transform ${SNAP_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
      trackRef.current.style.transform = `translateX(${target}px)`
      offsetRef.current = target
    }
  }, [])

  const clearSnap = useCallback(() => {
    if (snapTimerRef.current) {
      clearTimeout(snapTimerRef.current)
      snapTimerRef.current = null
    }
  }, [])

  const scheduleSnap = useCallback(() => {
    clearSnap()
    snapTimerRef.current = setTimeout(snapBack, 120)
  }, [clearSnap, snapBack])

  const onInput = useCallback((delta) => {
    if (trackRef.current) {
      trackRef.current.style.transition = 'none'
    }
    clearSnap()

    const current = offsetRef.current
    applyOffset(current + delta * RESISTANCE)
    scheduleSnap()
  }, [applyOffset, clearSnap, scheduleSnap])

  useEffect(() => {
    maxOffsetRef.current = getMaxOffset()
    const onResize = () => { maxOffsetRef.current = getMaxOffset() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [getMaxOffset])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Only respond to horizontal trackpad gestures, not vertical mouse wheel
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 0) {
        e.preventDefault()
        onInput(-e.deltaX)
      }
    }

    const onTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientX
      track.style.transition = 'none'
      clearSnap()
    }

    const onTouchMove = (e) => {
      if (touchStartRef.current === null) return
      const dx = e.touches[0].clientX - touchStartRef.current
      touchStartRef.current = e.touches[0].clientX
      e.preventDefault()
      onInput(dx / RESISTANCE)
    }

    const onTouchEnd = () => {
      touchStartRef.current = null
      scheduleSnap()
    }

    // Mouse drag
    const onMouseDown = (e) => {
      e.preventDefault()
      isDraggingRef.current = true
      mouseStartRef.current = e.clientX
      track.style.transition = 'none'
      clearSnap()
    }

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return
      const dx = e.clientX - mouseStartRef.current
      mouseStartRef.current = e.clientX
      onInput(dx / RESISTANCE)
    }

    const onMouseUp = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      mouseStartRef.current = null
      scheduleSnap()
    }

    track.addEventListener('wheel', onWheel, { passive: false })
    track.addEventListener('touchstart', onTouchStart, { passive: true })
    track.addEventListener('touchmove', onTouchMove, { passive: false })
    track.addEventListener('touchend', onTouchEnd, { passive: true })
    track.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      track.removeEventListener('wheel', onWheel)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove', onTouchMove)
      track.removeEventListener('touchend', onTouchEnd)
      track.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      clearSnap()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onInput, clearSnap, scheduleSnap])

  return (
    <section className="doctors">
      <div className="doctors__header">
        <h2 className="doctors__title-line1">Care led by experts</h2>
        <h2 className="doctors__title-line2">focused on better outcomes</h2>
        <p className="doctors__subtitle">
         A team of specialists delivering modern personalized healthcare.
        </p>
      </div>

      <div className="doctors__track-container" ref={containerRef}>
        <div className="doctors__track" ref={trackRef}>
          {doctors.map((doc) => (
            <div key={doc.id} className="doctors__card-wrap">
              <DoctorCard {...doc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DoctorsSection
