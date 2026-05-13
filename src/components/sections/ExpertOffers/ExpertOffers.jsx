import './ExpertOffers.scss'

const cards = [
  {
    title: 'Nutrition & fitness guidance',
    text: 'Build healthier habits with simple, practical tips for food and movement.',
    image: '/images/h-Exclusive-Offers-01.png',
  },
  {
    title: 'Meal support offers',
    text: 'Save on convenient nutrition options to support your routine.',
    image: '/images/h-Exclusive-Offers-02.png',
  },
  {
    title: 'Member-only perks',
    text: 'Unlock exclusive benefits and partner offers as a member.',
    image: '/images/h-Exclusive-Offers-05.png',
  },
]

const ExpertOffers = () => {
  return (
    <section className="exp-offers">
      <div className="exp-offers__inner">
        <div className="exp-offers__header">
          <div className="exp-offers__header-left">
            <span className="exp-offers__badge">Healix extras</span>
            <h2 className="exp-offers__heading">
              Added benefits to support your journey
            </h2>
          </div>
          <button className="exp-offers__cta exp-offers__cta--desktop" aria-disabled="true">Get access</button>
        </div>

        <div className="exp-offers__cards">
          {cards.map((card) => (
            <div key={card.title} className="exp-offers__card">
              <div className="exp-offers__card-top">
                <h3 className="exp-offers__card-title">{card.title}</h3>
                <p className="exp-offers__card-text">{card.text}</p>
              </div>
              <div className="exp-offers__card-img-wrap">
                <img src={card.image} alt={card.title} className="exp-offers__card-img" loading="lazy"  decoding="async"/>
              </div>
              <button className="exp-offers__card-btn" aria-disabled="true">Learn more</button>
            </div>
          ))}
        </div>

        <button className="exp-offers__cta exp-offers__cta--mobile" aria-disabled="true">Get access</button>

        <div className="exp-offers__disclaimer">
          <p>One-time 10% off Meal Replacement Kit subscription plans (Flavor Favorites, Bar Bundle, Shake Selects) for active Healix Weight Loss Membership members.... <a href="#" className="exp-offers__disclaimer-link" aria-disabled="true">See more</a></p>
          <p>Partner promotion discounts are available for active Healix subscribers. Terms &amp; exclusions apply.</p>
        </div>
      </div>
    </section>
  )
}

export default ExpertOffers
