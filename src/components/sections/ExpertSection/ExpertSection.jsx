import './ExpertSection.scss'

const ExpertSection = () => {
  return (
    <section className="expert">
      <div className="expert__inner">
        <div className="expert__image-wrap">
          <picture>
            <source srcSet="/images/h-WL-Expert-Section-D-V2.webp" type="image/webp" />
            <img
              src="/images/h-WL-Expert-Section-D-V2.png"
              alt="Dr. Craig Primack"
              className="expert__image"
              loading="lazy"
             decoding="async"/>
          </picture>
        </div>

        <div className="expert__content">
          <h2 className="expert__heading">
            At Healix, we
            <br />
            <span className="expert__heading-highlight">make it personal</span>
          </h2>
          <p className="expert__description">
            Get care developed by in-house experts with decades
            of clinical excellence.
          </p>
          <button className="expert__btn" aria-disabled="true">Meet Dr. Stacy Smith</button>
        </div>
      </div>
    </section>
  )
}

export default ExpertSection
