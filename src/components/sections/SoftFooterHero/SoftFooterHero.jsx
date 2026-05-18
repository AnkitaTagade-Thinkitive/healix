import './SoftFooterHero.scss'

const SoftFooterHero = () => {
  return (
    <section className="soft-footer">
      <div className="soft-footer__wrapper">
        <picture>
          <source srcSet="/images/h-WL-Category-SoftFooter-D-V2.webp" type="image/webp" />
          <source srcSet="/images/h-WL-Category-SoftFooter-D-V2 (T).png" media="(max-width: 1024px)" />
          <source srcSet="/images/h-WL-Category-SoftFooter-D-V2(LT).png" media="(max-width: 768px)" />
          <img
            src="/images/h-WL-Category-SoftFooter-D-V2 (D).png"
            alt=""
            className="soft-footer__bg-img"
           loading="lazy" decoding="async"/>
        </picture>
        <div className="soft-footer__content">
          <div className="soft-footer__top-text">
            <h2 className="soft-footer__heading-top">This time</h2>
          </div>
          <div className="soft-footer__cta-group">
            <h2 className="soft-footer__heading-bottom">you have Healix</h2>
            <button className="soft-footer__btn" aria-disabled="true">Start your weight loss journey</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SoftFooterHero
