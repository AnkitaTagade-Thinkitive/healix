import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './LabsOffcanvas.scss'

const exploreLinks = [
  'Labs',
  '130+ Health signals tested',
  'Areas of the body tested',
  'Hims Multi-Cancer Test by Galleri\u00ae',
]

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LabsOffcanvas = ({ isOpen, onClose, from }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    onClose()

    // Reopen the main sidebar after the offcanvas finishes closing.
    // The sidebar is mounted globally so it appears on whichever page
    // the user is currently on — no navigation needed.
    const menu = from || 'main'
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('reopen-sidebar', { detail: { menu } }))
    }, 350)
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <>
      <div className={`labs-oc__overlay ${isOpen ? 'labs-oc__overlay--visible' : ''}`} onClick={onClose} />

      <div className={`labs-oc ${isOpen ? 'labs-oc--open' : ''}`}>
        <div className="labs-oc__header">
          <button
            type="button"
            className="labs-oc__icon-btn labs-oc__back-btn"
            onClick={handleBack}
            aria-label={from ? 'Back' : 'Close menu'}
          >
            <BackIcon />
          </button>
          <span className="labs-oc__title">Labs</span>
          <div className="labs-oc__header-right">
            <button className="labs-oc__icon-btn" aria-label="Profile" aria-disabled="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button className="labs-oc__icon-btn" onClick={onClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="labs-oc__body">
          {/* Hero Card */}
          <div className="labs-oc__hero">
            <img src="/images/h-Labs-Nav-D.webp" alt="" className="labs-oc__hero-img"  loading="lazy" decoding="async"/>
            <button type="button" className="labs-oc__hero-text" aria-disabled="true">Start testing today</button>
            <button type="button" className="labs-oc__hero-btn" aria-label="Start testing today" aria-disabled="true">
              <ArrowRight />
            </button>
          </div>

          {/* Explore */}
          <div className="labs-oc__section">
            <span className="labs-oc__label">EXPLORE</span>
            <div className="labs-oc__card">
              {exploreLinks.map((item) => (
                <button
                  key={item}
                  className="labs-oc__item"
                  onClick={() => {
                    if (item === 'Labs') {
                      onClose()
                      navigate('/labs')
                    } else if (
                      item === '130+ Health signals tested' ||
                      item === 'Areas of the body tested'
                    ) {
                      onClose()
                      navigate('/labs/what-we-test')
                    } else if (item === 'Hims Multi-Cancer Test by Galleri\u00ae') {
                      onClose()
                      navigate('/labs/cancer-screening')
                    }
                  }}
                >
                  <span>{item}</span>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LabsOffcanvas
