import React from 'react'
import './sectiontop.css'

const SectionTop = ({ backgroundImage, title, text, className = '' }) => {
  return (
    <section
      className={`section-top ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="section-top-content">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  )
}

export default SectionTop
