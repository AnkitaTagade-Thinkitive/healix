import { useLocation, useNavigate } from 'react-router-dom'
import './OnboardingResultPage.scss'

// BMI helpers
const computeBmi = (heightCm, weightKg) => {
  const h = Number(heightCm)
  const w = Number(weightKg)
  if (!h || !w) return null
  const m = h / 100
  return +(w / (m * m)).toFixed(1)
}

const bmiCategory = (bmi) => {
  if (bmi == null) return { label: 'N/A', tone: 'neutral' }
  if (bmi < 18.5) return { label: 'Underweight', tone: 'low' }
  if (bmi < 25) return { label: 'Healthy', tone: 'good' }
  if (bmi < 30) return { label: 'Overweight', tone: 'warn' }
  return { label: 'Obese', tone: 'alert' }
}

const recommendationFor = (bmi, answers) => {
  if (bmi == null) return 'Based on your answers, we recommend a tailored lifestyle program with provider support.'
  if (bmi < 25) {
    return 'You\u2019re in a healthy BMI range. A lifestyle plan should help you maintain and feel your best.'
  }
  if (bmi < 30) {
    return 'You may benefit from lifestyle changes alongside clinical support to reach your goal.'
  }
  // Obese
  if (answers?.openToTreatment === 'no') {
    return 'A structured lifestyle plan with close provider guidance is the right place to start.'
  }
  return 'A combined plan with medication and lifestyle support typically produces the best outcomes.'
}

const plans = [
  {
    id: 'lifestyle',
    title: 'Lifestyle Plan',
    blurb: 'Habit coaching, nutrition guidance, and progress tracking.',
    price: 'From $29/mo',
  },
  {
    id: 'medication',
    title: 'Medication Plan',
    blurb: 'Clinically reviewed prescriptions shipped to your door.',
    price: 'From $249/mo',
  },
  {
    id: 'combined',
    title: 'Combined Plan',
    blurb: 'Medication plus lifestyle coaching for the best outcomes.',
    price: 'From $279/mo',
  },
]

const OnboardingResultPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  // Prefer navigated state, fall back to localStorage so refresh still works.
  let answers = state?.answers
  if (!answers) {
    try {
      answers = JSON.parse(localStorage.getItem('healix_assessment') || '{}')
    } catch {
      answers = {}
    }
  }

  const bmi = computeBmi(answers.height, answers.weight)
  const cat = bmiCategory(bmi)
  const recommendation = recommendationFor(bmi, answers)

  // Highlight the plan most relevant to the BMI + preferences.
  const recommendedPlanId = (() => {
    if (bmi == null) return 'lifestyle'
    if (bmi < 25) return 'lifestyle'
    if (answers.openToTreatment === 'no') return 'lifestyle'
    if (bmi >= 30) return 'combined'
    return 'medication'
  })()

  return (
    <div className="onb-result">
      <div className="onb-result__container">
        <header className="onb-result__header">
          <span className="onb-result__eyebrow">Your personalized plan</span>
          <h1 className="onb-result__title">Based on your answers</h1>
        </header>

        <section className="onb-result__summary">
          <div className="onb-result__bmi">
            <span className="onb-result__bmi-label">BMI</span>
            <span className="onb-result__bmi-value">{bmi ?? '—'}</span>
            <span className={`onb-result__bmi-cat onb-result__bmi-cat--${cat.tone}`}>{cat.label}</span>
          </div>
          <p className="onb-result__reco">{recommendation}</p>
        </section>

        <section className="onb-result__plans">
          {plans.map((p) => (
            <article
              key={p.id}
              className={`onb-plan ${recommendedPlanId === p.id ? 'onb-plan--recommended' : ''}`}
            >
              {recommendedPlanId === p.id && <span className="onb-plan__badge">Recommended</span>}
              <h3 className="onb-plan__title">{p.title}</h3>
              <p className="onb-plan__blurb">{p.blurb}</p>
              <span className="onb-plan__price">{p.price}</span>
              <button type="button" className="onb-plan__btn" aria-disabled="true">Choose plan</button>
            </article>
          ))}
        </section>

        <div className="onb-result__cta">
          <button
            type="button"
            className="onb-result__primary"
            onClick={() => navigate('/dashboard')}
          >
            Continue to consultation
          </button>
          <button
            type="button"
            className="onb-result__ghost"
            onClick={() => navigate('/onboarding/assessment')}
          >
            Retake assessment
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingResultPage
