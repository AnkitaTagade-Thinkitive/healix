import { useState } from 'react'
import './FaqContent.scss'

const membershipFaqs = [
  {
    id: 'm1',
    question: 'What is the weight loss membership?',
    answer: 'The membership provides access to GLP-1 treatment options along with continuous support from a dedicated care team. It also includes tools to track your progress, guidance for managing side effects, and adjustments to your plan as your needs change.',
  },
  {
    id: 'm2',
    question: 'How much does the membership cost?',
    answer: 'The membership starts with a lower introductory fee for the first month, followed by a monthly renewal. Medication is billed separately and pricing depends on your prescribed treatment. You can cancel at any time, but doing so may affect access to active care and treatment plans.',
  },
  {
    id: 'm3',
    question: 'Is insurance required?',
    answer: 'No. You can access the program without insurance, making the process simple and straightforward.',
  },
  {
    id: 'm4',
    question: 'Can I use FSA or HSA?',
    answer: 'You can pay using a standard card and submit for reimbursement if eligible. Coverage and eligibility may vary depending on your plan provider.',
  },
]

const medicationFaqs = [
  {
    id: 'med1',
    question: 'What weight loss treatment options are available?',
    answer: 'You may have access to a range of clinically supported GLP-1 treatments designed to help with weight management when combined with lifestyle changes. Options are selected based on your individual needs and eligibility.',
  },
  {
    id: 'med2',
    question: 'What if I\u2019m already using a GLP-1 treatment?',
    answer: 'You\u2019ll complete a quick health review so a licensed provider can evaluate your current plan. In many cases, your treatment can continue with minimal disruption, along with ongoing support during the transition.',
  },
  {
    id: 'med3',
    question: 'Are doctor visits required?',
    answer: 'In some cases, treatment can be prescribed without a live visit, depending on your location. If needed, scheduling a virtual consultation is simple and convenient.',
  },
  {
    id: 'med4',
    question: 'Who is eligible for treatment?',
    answer: 'A licensed provider will review your health history, goals, and overall profile to determine if treatment is appropriate for you.',
  },
  {
    id: 'med5',
    question: 'Are these medications available everywhere?',
    answer: 'Availability may vary by location, and access is expanding over time.',
  },
  {
    id: 'med6',
    question: 'How long should I stay on treatment?',
    answer: 'Weight management treatment is typically long-term. Stopping treatment may lead to changes in results, so it\u2019s important to consult a provider before making changes.',
  },
  {
    id: 'med7',
    question: 'When can I expect to see results?',
    answer: 'Results vary from person to person. Progress depends on multiple factors including consistency, lifestyle, and individual response to treatment.',
  },
  {
    id: 'med8',
    question: 'Can my dosage be adjusted?',
    answer: 'Yes. Providers may adjust your dosage based on your progress and needs. Updates can be requested through the app, and any changes will be guided by a healthcare professional.',
  },
]

const FaqGroup = ({ title, items, openId, onToggle }) => (
  <div className="faq-content__group">
    <div className="faq-content__group-inner">
      <div className="faq-content__left">
        <h2 className="faq-content__title">{title}</h2>
      </div>
      <div className="faq-content__right">
        {items.map((faq) => (
          <div key={faq.id} className={`faq-content__item ${openId === faq.id ? 'faq-content__item--open' : ''}`}>
            <button className="faq-content__question" onClick={() => onToggle(faq.id)} aria-expanded={openId === faq.id}>
              <span className="faq-content__question-text">{faq.question}</span>
              <svg className="faq-content__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="faq-content__answer-wrap">
              <div className="faq-content__answer">
                {faq.answer.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const FaqContent = () => {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="faq-content">
      <FaqGroup title="Membership" items={membershipFaqs} openId={openId} onToggle={toggle} />
      <FaqGroup title="Medication" items={medicationFaqs} openId={openId} onToggle={toggle} />
    </section>
  )
}

export default FaqContent
