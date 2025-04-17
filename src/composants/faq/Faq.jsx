import React, { useState } from 'react'
import './faq.css'

const faqs = [
  {
    question: "Comment fonctionne la méthode Pomodoro dans Pulse ?",
    answer:
      "Pulse vous propose un minuteur de 25 minutes de concentration suivies de 5 minutes de pause. Après 4 sessions, une pause longue est suggérée.",
  },
  {
    question: "Puis-je synchroniser mes tâches entre le web et le mobile ?",
    answer:
      "Oui ! Pulse synchronise automatiquement vos données entre vos appareils via votre compte.",
  },
  {
    question: "Comment gagner des points et des badges ?",
    answer:
      "Chaque tâche complétée, chaque session Pomodoro terminée et chaque jour d'assiduité vous fait gagner des points. Ces points débloquent des badges visibles sur votre profil.",
  },
  {
    question: "Y a-t-il un mode hors-ligne ?",
    answer:
      "Non désolé !",
  },
  {
    question: "Comment puis-je contacter l'équipe Pulse ?",
    answer:
      "Via la page Contact ou directement depuis l'application via le module d'aide intégré.",
  },
]

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <section className="faq-section">
      <h2 className="faq-title">Foire aux Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            <button className="faq-question" onClick={() => toggle(index)}>
              {faq.question}
              <span>{activeIndex === index ? '−' : '+'}</span>
            </button>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FaqSection
