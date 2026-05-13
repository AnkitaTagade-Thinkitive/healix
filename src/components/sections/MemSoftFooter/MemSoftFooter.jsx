import './MemSoftFooter.scss'

const MemSoftFooter = () => {
  return (
    <section className="mem-sf">
      <div className="mem-sf__wrapper">
        <img
          src="/images/h-WL-Memberships-SoftFooter-D.webp"
          alt=""
          className="mem-sf__bg-img"
         loading="lazy" decoding="async"/>
        <div className="mem-sf__content">
          <div className="mem-sf__top-text">
            <h2 className="mem-sf__heading-top">This time</h2>
            <h2 className="mem-sf__heading-bottom">you have Healix</h2>
          </div>
          <button className="mem-sf__btn" aria-disabled="true">Start your weight loss journey</button>
        </div>
      </div>
    </section>
  )
}

export default MemSoftFooter
