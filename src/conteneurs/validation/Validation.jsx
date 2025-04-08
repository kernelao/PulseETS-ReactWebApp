import React from 'react'
import './validation.css'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../api/Axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INSCRIPTION_URL = '/inscription'
//const INSCRIPTION_URL = 'http://localhost:5173/inscription'
//const INSCRIPTION_URL = 'http://localhost:5175/connexion'; // URL complète de ton API Symfony


const Validation = () => {
  const { login } = useAuth() // ✅ Import du login
  const navigate = useNavigate()
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => userRef.current.focus(), [])

  useEffect(() => setValidName(USER_REGEX.test(user)), [user])
  useEffect(() => setValidEmail(EMAIL_REGEX.test(email)), [email])
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])
  useEffect(() => setErrMsg(''), [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
      setErrMsg('Entrée invalide')
      return
    }

    try {
      const response = await axios.post(INSCRIPTION_URL, {
        username: user,
        email,
        password: pwd,
      })

      const token = response?.data?.token
      const role = response?.data?.role || 'user' // <- récupère le rôle renvoyé par Symfony

      if (token) {
        login(token, role)

        // Redirection selon le rôle
        if (
          role === 'ROLE_ADMIN' ||
          role === 'admin' ||
          (Array.isArray(role) && role.includes('ROLE_ADMIN'))
        ) {
          navigate('/admin/dashboard')
        } else {
          navigate('/app/dashboard')
        }
      } else {
        setErrMsg('Aucun token reçu.')
      }

      setUser('')
      setEmail('')
      setPwd('')
      setMatchPwd('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Aucune réponse du serveur')
      } else if (err.response?.status === 409) {
        const message = err.response.data?.message
        if (message === 'Email déjà utilisé') {
          setErrMsg('Ce courriel est déjà utilisé.')
        } else if (message === "Nom d'utilisateur déjà pris") {
          setErrMsg("Ce nom d'utilisateur est déjà pris.")
        } else {
          setErrMsg('Conflit de données (409)')
        }
      } else {
        setErrMsg('Inscription échouée')
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Succès !</h1>
          <p>
            <a href="#">Se connecter</a>
          </p>
        </section>
      ) : (
        <div className="validation">
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Inscription</h1>
          <form onSubmit={handleSubmit}>
            {/* username */}
            <label htmlFor="username">
              Nom d'utilisateur :
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />4 à 24 caractères. Doit
              commencer par une lettre. Lettres, chiffres, tirets (-) et
              underscores (_) autorisés.
            </p>

            {/* email */}
            <label htmlFor="email">
              Courriel :
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? 'instructions'
                  : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Doit être un courriel
              valide.
            </p>

            {/* password */}
            <label htmlFor="password">
              Mot de passe :
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} /> 8 à 24 caractères. Doit
              inclure une majuscule, une minuscule, un chiffre et un caractère
              spécial.
            </p>

            {/* confirm password */}
            <label htmlFor="confirm_pwd">
              Confirmer le mot de passe :
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Doit correspondre au mot
              de passe ci-dessus.
            </p>

            <button
              disabled={!validName || !validEmail || !validPwd || !validMatch}
            >
              S'inscrire
            </button>
          </form>

          <p>
            Déjà inscrit ? <Link to="/connexion">Connectez-vous</Link>
          </p>
        </div>
      )}
    </>
  )
}

export default Validation
