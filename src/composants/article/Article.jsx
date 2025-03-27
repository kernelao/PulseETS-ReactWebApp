import React from 'react'
import './article.css'

const Article = ({ imgUrl, date, title }) => {
  return (
    <div className="article">
      <div className="article-conteneur">
        <img src={imgUrl} alt="image d'un article" />
      </div>

      <div className="article-contenu">
        <div>
          <p>{date}</p>
          <h3>{title}</h3>
        </div>

        <p>Lire l'article complet</p>
      </div>
    </div>
  )
}

export default Article
