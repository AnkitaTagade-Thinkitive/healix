import { Link } from 'react-router-dom'
import './WegovySpotlight.scss'

const products = [
  {
    id: 1,
    name: 'GLP-1 Pill',
    price: 'Starting at $149/mo*',
    ingredient: 'Semaglutide',
    badge: 'New',
    fdaBadge: true,
    img: '/images/product_wegovy-pill.png',
    href: '/weight-loss/wegovy-pill',
  },
  {
    id: 2,
    name: 'GLP-1 Pen',
    price: 'Starting at $199/mo*',
    ingredient: 'Semaglutide',
    badge: null,
    fdaBadge: true,
    img: '/images/product_wegovy-pen.png',
    href: '/weight-loss/wegovy-pen',
  },
  {
    id: 3,
    name: 'Ozempic®',
    price: 'Starting at $199/mo*',
    ingredient: 'Semaglutide',
    badge: null,
    fdaBadge: false,
    img: '/images/product_ozempic.png',
    href: '/weight-loss/ozempic',
  },
  {
    id: 4,
    name: 'Mounjaro®',
    price: '$1,899/mo',
    ingredient: 'Tirzepatide',
    badge: null,
    fdaBadge: false,
    img: '/images/product_mounjaro.png',
    href: '/weight-loss/mounjaro',
  },
  {
    id: 5,
    name: 'Zepbound®',
    price: '$1,899/mo',
    ingredient: 'Tirzepatide',
    badge: null,
    fdaBadge: true,
    img: '/images/product_zepbound.png',
    href: '/weight-loss/zepbound',
  },
  {
    id: 6,
    name: 'Generic Liraglutide',
    price: 'Starting at $299/mo*',
    ingredient: 'Liraglutide',
    badge: null,
    fdaBadge: false,
    img: '/images/product_liraglutide.png',
    href: '/weight-loss/liraglutide',
  },
]

const WegovySpotlight = () => {
  return (
    <section className="wegovy">
      <div className="wegovy__container">
        {/* Background video */}
        <div className="wegovy__bg">
          <video
            className="wegovy__bg-video"
            autoPlay
            loop
            muted
            playsInline
            poster=""
            preload="metadata"
          >
            {/* WebM only. MP4 fallback disabled — re-enable for older
                browsers if compatibility issues come up:
                <source src="/images/weight-loss-hero-novo.mp4" type="video/mp4" /> */}
            <source src="/images/weight-loss-hero-novo.webm" type="video/webm" />
          </video>
        </div>

        {/* Content overlay */}
        <div className="wegovy__content">
          <h2 className="wegovy__heading">
            <span className="wegovy__heading-line1">Smarter weight loss</span>
            <span className="wegovy__heading-line2">starts today</span>
          </h2>

          <div className="wegovy__bottom">
            <p className="wegovy__description">
              Introducing a new GLP-1 pill designed to support
              <br />
              <span className="wegovy__highlight">meaningful weight loss</span>
              <br />
              and long-term results
            </p>

            <button
              type="button"
              className="wegovy__cta"
              onClick={() => window.dispatchEvent(new Event('open-wegovy-assessment'))}
            >
              Get started
            </button>
          </div>
        </div>

        {/* Product cards row */}
        <div className="wegovy__products">
          <h3 className="wegovy__products-heading">
            Explore GLP-1
            <br />
            options
          </h3>

          <div className="wegovy__products-row">
            {products.map((product) => (
              <Link
                key={product.id}
                to={product.href}
                className="wegovy__product-card"
              >
                <div className="wegovy__product-image-area">
                  {(product.badge || product.fdaBadge) && (
                    <div className="wegovy__product-badges">
                      {product.badge && (
                        <span className="wegovy__product-badge">
                          {product.badge}
                        </span>
                      )}
                      {product.fdaBadge && (
                        <img
                          src="https://cloudinary.forhims.com/image/upload/v1773990110/Novo Nordisk Launch/Carousel/FDA_Approved_Badge_Vector.svg"
                          alt="FDA Approved"
                          className="wegovy__product-fda"
                         loading="lazy" decoding="async"/>
                      )}
                    </div>
                  )}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="wegovy__product-img"
                    loading="lazy"
                   decoding="async"/>
                </div>
                <div className="wegovy__product-info">
                  <span className="wegovy__product-name">{product.name}</span>
                  <span className="wegovy__product-price">{product.price}</span>
                  <span className="wegovy__product-ingredient">
                    {product.ingredient}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="wegovy__disclaimer">
            *Required membership fee not included. Billed separately.
            <br />
            Ozempic<sup>&reg;</sup> is FDA approved for the treatment of type 2
            diabetes and is available only to patients who meet clinical
            eligibility criteria determined by a provider.
          </p>
        </div>

        {/* SNAC + Membership section */}
        <div className="wegovy__snac">
          <div className="wegovy__snac-container">
            <div className="wegovy__snac-card wegovy__snac-card--left">
              <div className="wegovy__snac-content">
                <h3 className="wegovy__snac-heading">
                  Time for
                  <br />
                  <span className="wegovy__snac-heading--gold">a SNAC</span>
                </h3>
                <Link to="/science" className="wegovy__snac-btn">
                  See the science
                </Link>
              </div>
              <video
                className="wegovy__snac-video"
                autoPlay
                loop
                muted
                playsInline
               preload="metadata">
                <source
                  src="/images/comprehensive-pill.mp4"
                  type="video/mp4"
                />
              </video>
              <img
                src="/images/h-hp-science.png"
                alt=""
                className="wegovy__snac-overlay"
               loading="lazy" decoding="async"/>
            </div>
            <div className="wegovy__snac-card wegovy__snac-card--right">
              <div className="wegovy__member-content">
                <h3 className="wegovy__member-heading">
                  Healix members
                  <br />
                  <span className="wegovy__member-heading--gold">
                    get all the benefits
                  </span>
                </h3>
                <Link
                  to="/membership"
                  className="wegovy__member-btn"
                >
                  Explore membership
                </Link>
              </div>
              <div className="wegovy__member-glow" />
              <img
                src="/images/h-hp-membership.png"
                alt="Hims membership benefits"
                className="wegovy__member-img"
                loading="lazy"
               decoding="async"/>
            </div>
          </div>

          <div className="wegovy__snac-disclaimer">
            <p>
              GLP-1 medications referenced are subject to availability and
              eligibility.
            </p>
            <p>
              *Along with a reduced-calorie diet and increased physical
              activity. Individual results may vary.
            </p>
            <Link to="/weight-loss/disclaimer" className="wegovy__snac-readmore">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WegovySpotlight
