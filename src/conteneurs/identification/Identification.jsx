import React, { useRef, useState, useEffect } from 'react';
import './identification.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/Axios';

const IDENTIFICATION_URL = '/connexion';

const Identification = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const { login } = useAuth();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(IDENTIFICATION_URL, {
        email: user,
        password: pwd
      });

      const token = response?.data?.token;
      const role = response?.data?.role || 'user';

      if (token) {
        login(token, role);
        navigate('/app/dashboard');
      } else {
        setErrMsg("Aucun token reçu.");
      }

    } catch (err) {
      if (!err?.response) {
        setErrMsg('Aucune réponse du serveur');
      } else if (err.response?.status === 401) {
        setErrMsg('Identifiants invalides');
      } else {
        setErrMsg('Connexion échouée');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="identification">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Adresse courriel :</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />

        <button>Se connecter</button>
      </form>

      <p>
        Pas encore inscrit ?<br />
        <span className="line">
          <Link to="/inscription">Créer un compte</Link>
        </span>
      </p>
    </div>
  );
};

export default Identification;
