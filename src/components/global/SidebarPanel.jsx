import { useCallback, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

/**
 * Global main-navigation sidebar.
 *
 * Mounted once at the router root so the main-menu offcanvas (and the
 * weight-loss rich variant) is available on every route — including
 * standalone pages like /labs that don't render the Navbar layout.
 *
 * Open it from anywhere by dispatching either event:
 *   window.dispatchEvent(new Event('open-sidebar'))
 *   window.dispatchEvent(new CustomEvent('reopen-sidebar', { detail: { menu: 'main' | 'wl-rich' } }))
 *
 * The original markup here lived inside Navbar — moving it here lets the
 * sidebar render over any page without duplicating listeners.
 */

const sidebarLinks = [
  { label: 'Weight Loss', href: '#' },
  { label: 'Labs', href: '#' },
  { label: 'Sexual Health', href: '#' },
  { label: 'Testosterone', href: '#' },
  { label: 'Hair Regrowth', href: '#' },
  { label: 'Mental Health', href: '#' },
  { label: 'Skin', href: '#' },
  { label: 'Everyday Health', href: '#' },
]

const topTreatments = [
  { name: 'GLP-1 Pill', sub: '(Oral Semaglutide)', img: '/images/product_wegovy-pill.png', rx: true, highlight: true },
  { name: 'GLP-1 Pen', sub: '(Injectable Semaglutide)', img: '/images/product_wegovy-pen.png', rx: true, highlight: true },
  { name: 'Ozempic®', sub: '(Injectable Semaglutide)', img: '/images/product_ozempic.png', rx: true },
  { name: 'Mounjaro®', sub: '(Injectable Tirzepatide)', img: '/images/product_mounjaro.png', rx: true },
  { name: 'Zepbound®', sub: '(Injectable Tirzepatide)', img: '/images/product_zepbound.png', rx: true },
  { name: 'Generic Liraglutide', sub: '(Injectable)', img: '/images/product_liraglutide.png', rx: true },
]

const wlLearnLinks = [
  { label: 'About Healix', href: '#' },
  { label: 'Clinical Excellence', href: '#' },
  { label: 'The Science', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Healix Benefits', href: '#' },
]

// --- Sexual Health sub-menu data ---
const sexualExplore = ['Erectile Dysfunction', 'Early Climax', 'Hard Mints']
const sexualSupport = ['Getting Hard And Staying Hard', 'Boost In The Bedroom']
const sexualTreatments = [
  { label: 'Hard Mints', pills: [{ text: 'Rx', type: 'rx' }, { text: 'New', type: 'new' }] },
  { label: 'Generic For Viagra\u00ae', sub: 'Sildenafil', pills: [{ text: 'Rx', type: 'rx' }, { text: 'Popular', type: 'pop' }] },
  { label: 'Generic For Cialis\u00ae', sub: 'Tadalafil', pills: [{ text: 'Rx', type: 'rx' }, { text: 'Popular', type: 'pop' }] },
  { label: 'Viagra\u00ae', pills: [{ text: 'Rx', type: 'rx' }] },
  { label: 'Cialis\u00ae', pills: [{ text: 'Rx', type: 'rx' }] },
  { label: 'Valacyclovir', sub: 'Genital Herpes Treatment' },
  { label: 'Compare All Treatments' },
]
const sexualOtc = ['Climax Daily Wipes']
const sexualAccessories = [
  'Thrill Ride Prostate Massager',
  'Standing O Penis Rings',
  'OMG Ring Vibrator',
  'Roller Coaster Bullet Vibrator',
  'Glide Water-Based Lube',
  'Climax Delay Condoms',
  'Ultra Thin Condoms',
]
const sexualTopTreatments = [
  { name: 'Hard Mints\u2122 by Hims', img: '/images/product_wegovy-pill.png', rx: true },
  { name: 'Viagra\u00ae', sub: '(Sildenafil Citrate)', img: '/images/product_wegovy-pill.png', rx: true },
]
const sexualPopularReads = [
  { title: 'Losing an Erection During Sex: Top Reasons', readTime: '10 min read', img: '/images/product_wegovy-pen.png' },
  { title: 'How to Get Hard: The Complete Guide', readTime: '11 min read', img: '/images/product_wegovy-pen.png' },
]

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * SidebarPanel
 * ---------------------------------------------
 * The full sidebar UI. Loaded lazily by `GlobalSidebar.jsx` only after the
 * user triggers `open-sidebar` / `reopen-sidebar` for the first time, so its
 * 500+ lines of JSX/CSS/data never ship to visitors who don't open the menu.
 *
 * `seedMenu` is the menu that should be opened on initial mount — passed by
 * the wrapper because the FIRST event was caught before this chunk had loaded.
 * Subsequent events are picked up by the listeners below as before.
 */
const SidebarPanel = ({ seedMenu = 'main' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true) // armed by parent
  const [activeMenu, setActiveMenu] = useState(seedMenu)
  const location = useLocation()
  const navigate = useNavigate()

  const isWeightLoss =
    location.pathname === '/weight-loss' ||
    location.pathname === '/membership' ||
    location.pathname === '/faqs' ||
    location.pathname === '/science'

  // Default the rich sidebar for the WL pages; any explicit `open-sidebar`
  // dispatch with a menu in the detail wins over this.
  useEffect(() => {
    const openHandler = (e) => {
      const menu = (e && e.detail && e.detail.menu) || (isWeightLoss ? 'wl-rich' : 'main')
      setActiveMenu(menu)
      setSidebarOpen(true)
    }
    const reopenHandler = (e) => {
      const menu = (e && e.detail && e.detail.menu) || 'main'
      setActiveMenu(menu)
      setSidebarOpen(true)
    }
    window.addEventListener('open-sidebar', openHandler)
    window.addEventListener('reopen-sidebar', reopenHandler)
    return () => {
      window.removeEventListener('open-sidebar', openHandler)
      window.removeEventListener('reopen-sidebar', reopenHandler)
    }
  }, [isWeightLoss])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setSidebarOpen(false)
  }, [])

  useEffect(() => {
    if (!sidebarOpen) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen, handleKeyDown])

  const closeSidebar = () => {
    setSidebarOpen(false)
    setActiveMenu('main')
  }

  return (
    <>
      <div
        className={`navbar__overlay ${sidebarOpen ? 'navbar__overlay--visible' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        id="sidebar-menu"
        className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}
        aria-label="Main navigation"
      >
        {(activeMenu === 'main' || activeMenu === 'weight-sub' || activeMenu === 'sexual-sub') && (
          <>
            <div className="sidebar__header">
              <span className="sidebar__title">Menu</span>
              <button className="sidebar__close" onClick={closeSidebar} aria-label="Close menu">
                <CloseIcon />
              </button>
            </div>
            <div className="sidebar__section">
              <span className="sidebar__section-label">EXPLORE</span>
              <nav>
                <ul className="sidebar__links">
                  {sidebarLinks.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        to={link.href}
                        className="sidebar__link"
                        onClick={(e) => {
                          if (link.label === 'Weight Loss') {
                            e.preventDefault()
                            setActiveMenu('weight-sub')
                          } else if (link.label === 'Sexual Health') {
                            e.preventDefault()
                            setActiveMenu('sexual-sub')
                          } else if (link.label === 'Labs') {
                            e.preventDefault()
                            closeSidebar()
                            setTimeout(() => window.dispatchEvent(new CustomEvent('open-labs-offcanvas', { detail: { from: 'main' } })), 400)
                          } else {
                            closeSidebar()
                          }
                        }}
                      >
                        <span>{link.label}</span>
                        <ChevronRight />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div
              className="sidebar__panel"
              style={{
                transform: activeMenu === 'weight-sub' ? 'translateX(0)' : 'translateX(100%)',
              }}
            >
              <div className="sidebar__header sidebar__header--panel">
                <button className="sidebar__close" onClick={() => setActiveMenu('main')} aria-label="Back">
                  <BackIcon />
                </button>
                <span className="sidebar__title">Weight Loss</span>
                <button className="sidebar__close" onClick={closeSidebar} aria-label="Close menu">
                  <CloseIcon />
                </button>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">EXPLORE</span>
                <ul className="sidebar__links">
                  <li>
                    <button className="sidebar__link" onClick={() => { closeSidebar(); navigate('/weight-loss') }}>
                      <span>Weight loss treatments</span>
                      <ChevronRight />
                    </button>
                  </li>
                  <li><button className="sidebar__link" onClick={() => { closeSidebar(); navigate('/membership') }}><span>Membership</span><ChevronRight /></button></li>
                  <li><button className="sidebar__link" onClick={() => { closeSidebar(); navigate('/science') }}><span>The Science</span><ChevronRight /></button></li>
                </ul>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">TREATMENTS</span>
                <ul className="sidebar__links">
                  <li><button className="sidebar__link" aria-disabled="true"><span>GLP-1 Pill</span></button></li>
                  <li><button className="sidebar__link" aria-disabled="true"><span>GLP-1 Pen</span></button></li>
                  <li><button className="sidebar__link" aria-disabled="true"><span>Ozempic®</span></button></li>
                  <li><button className="sidebar__link" aria-disabled="true"><span>Generic Liraglutide</span></button></li>
                  <li><button className="sidebar__link" aria-disabled="true"><span>Zepbound®</span></button></li>
                  <li><button className="sidebar__link" aria-disabled="true"><span>Mounjaro®</span></button></li>
                  <li><button className="sidebar__link" aria-disabled="true"><span>Meal replacement kits</span></button></li>
                </ul>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">LEARN</span>
                <ul className="sidebar__links">
                  <li><button className="sidebar__link" aria-disabled="true"><span>Pricing</span></button></li>
                  <li><button className="sidebar__link" aria-disabled="true"><span>FSA/HSA Reimbursements</span></button></li>
                  <li><button className="sidebar__link" aria-disabled="true"><span>Healix Benefits</span></button></li>
                </ul>
              </div>
            </div>

            {/* Sexual Health sub-menu panel (slides over the main list) */}
            <div
              className="sidebar__panel sexual-sub"
              style={{
                transform: activeMenu === 'sexual-sub' ? 'translateX(0)' : 'translateX(100%)',
              }}
            >
              <div className="sidebar__header sidebar__header--panel">
                <button className="sidebar__close" onClick={() => setActiveMenu('main')} aria-label="Back">
                  <BackIcon />
                </button>
                <span className="sidebar__title">Sexual Health</span>
                <div className="sexual-sub__header-icons">
                  <button className="sidebar__close" aria-label="Profile" aria-disabled="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button className="sidebar__close" onClick={closeSidebar} aria-label="Close menu">
                    <CloseIcon />
                  </button>
                </div>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">EXPLORE</span>
                <ul className="sidebar__links">
                  {sexualExplore.map((item) => (
                    <li key={item}>
                      <button
                        className="sidebar__link"
                        onClick={() => {
                          if (item === 'Erectile Dysfunction') {
                            closeSidebar()
                            navigate('/sexual-health/erectile-dysfunction')
                          } else if (item === 'Early Climax') {
                            closeSidebar()
                            navigate('/sexual-health/early-climax')
                          } else if (item === 'Hard Mints') {
                            closeSidebar()
                            navigate('/sexual-health/hard-mints')
                          }
                        }}
                      >
                        <span>{item}</span>
                        <ChevronRight />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">GET SUPPORT FOR</span>
                <ul className="sidebar__links">
                  {sexualSupport.map((item) => (
                    <li key={item}>
                      <button className="sidebar__link" aria-disabled="true"><span>{item}</span></button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">TREATMENTS</span>
                <ul className="sidebar__links">
                  {sexualTreatments.map((item) => (
                    <li key={item.label}>
                      <button className="sidebar__link sexual-sub__row" aria-disabled="true">
                        <span className="sexual-sub__row-main">
                          <span className="sexual-sub__row-title">
                            {item.label}
                            {item.pills && item.pills.map((p) => (
                              <span key={p.text} className={`sexual-sub__pill sexual-sub__pill--${p.type}`}>{p.text}</span>
                            ))}
                          </span>
                          {item.sub && <span className="sexual-sub__row-sub">{item.sub}</span>}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">OVER-THE-COUNTER</span>
                <ul className="sidebar__links">
                  {sexualOtc.map((item) => (
                    <li key={item}>
                      <button className="sidebar__link" aria-disabled="true"><span>{item}</span></button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">SEX TOYS &amp; ACCESSORIES</span>
                <ul className="sidebar__links">
                  {sexualAccessories.map((item) => (
                    <li key={item}>
                      <button className="sidebar__link" aria-disabled="true"><span>{item}</span></button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">LEARN MORE</span>
                <ul className="sidebar__links">
                  <li>
                    <button className="sidebar__link" aria-disabled="true"><span>About Sexual Health</span><ChevronRight /></button>
                  </li>
                </ul>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">TOP TREATMENTS</span>
                <div className="sexual-sub__cards">
                  {sexualTopTreatments.map((item) => (
                    <div key={item.name} className="sexual-sub__card">
                      {item.rx && <span className="sexual-sub__pill sexual-sub__pill--rx sexual-sub__card-rx">Rx</span>}
                      <div className="sexual-sub__card-img">
                        <img src={item.img} alt={item.name} loading="lazy"  decoding="async"/>
                      </div>
                      <span className="sexual-sub__card-name">{item.name}</span>
                      {item.sub && <span className="sexual-sub__card-sub">{item.sub}</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar__section">
                <span className="sidebar__section-label">POPULAR READS</span>
                <div className="sexual-sub__reads">
                  {sexualPopularReads.map((item) => (
                    <div key={item.title} className="sexual-sub__read">
                      <div className="sexual-sub__read-img">
                        <img src={item.img} alt="" loading="lazy"  decoding="async"/>
                      </div>
                      <span className="sexual-sub__read-title">{item.title}</span>
                      <span className="sexual-sub__read-time">{item.readTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeMenu === 'wl-rich' && (
          <div className="sidebar-wl">
            <div className="sidebar-wl__header">
              <span className="sidebar-wl__title">Menu</span>
              <div className="sidebar-wl__header-icons">
                <button className="sidebar__close" aria-label="Profile" aria-disabled="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button className="sidebar__close" onClick={closeSidebar} aria-label="Close menu">
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="sidebar-wl__section">
              <span className="sidebar-wl__section-label">EXPLORE</span>
              <ul className="sidebar__links">
                {sidebarLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      className="sidebar__link"
                      onClick={() => {
                        if (link.label === 'Weight Loss') {
                          closeSidebar()
                          setTimeout(() => window.dispatchEvent(new CustomEvent('open-wl-offcanvas', { detail: { from: 'wl-rich' } })), 400)
                        } else if (link.label === 'Labs') {
                          closeSidebar()
                          setTimeout(() => window.dispatchEvent(new CustomEvent('open-labs-offcanvas', { detail: { from: 'wl-rich' } })), 400)
                        } else if (link.label === 'Sexual Health') {
                          // Mount the main-menu tree first (panel starts at
                          // translateX(100%)) then flip to sexual-sub on the
                          // next frame so the slide-in animation plays.
                          setActiveMenu('main')
                          requestAnimationFrame(() => setActiveMenu('sexual-sub'))
                        } else {
                          closeSidebar()
                        }
                      }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-wl__treatments">
              <span className="sidebar-wl__section-label">TOP TREATMENTS</span>
              <div className="sidebar-wl__cards-track">
                {topTreatments.map((item) => (
                  <div key={item.name} className="sidebar-wl__card">
                    <div className="sidebar-wl__card-badges">
                      {item.rx && <span className="sidebar-wl__badge-rx">Rx</span>}
                      {item.highlight && <span className="sidebar-wl__badge-tag">Now at Healix</span>}
                    </div>
                    <div className="sidebar-wl__card-img">
                      <img src={item.img} alt={item.name} loading="lazy"  decoding="async"/>
                    </div>
                    <span className="sidebar-wl__card-name">{item.name}</span>
                    {item.sub && <span className="sidebar-wl__card-sub">{item.sub}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-wl__section">
              <span className="sidebar-wl__section-label">LEARN</span>
              <ul className="sidebar__links">
                {wlLearnLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      className="sidebar__link"
                      onClick={() => {
                        closeSidebar()
                        if (link.label === 'The Science') navigate('/science')
                      }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-wl__section">
              <span className="sidebar-wl__section-label">OUR BRANDS</span>
              <div className="sidebar-wl__brand-card">
                <img src="/images/Footer-Hers.png" alt="hers" className="sidebar-wl__brand-avatar"  loading="lazy" decoding="async"/>
                <div className="sidebar-wl__brand-info">
                  <span className="sidebar-wl__brand-name">hers</span>
                  <span className="sidebar-wl__brand-link">visit forhers.com</span>
                </div>
                <svg className="sidebar-wl__brand-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

export default SidebarPanel
