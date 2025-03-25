import React from "react";
import { Link } from "react-router-dom";
import "./bouton.css";

const Bouton = ({ to, text, variant }) => {
  return (
    <Link to={to} className={`bouton ${variant}`}>
      {text}
    </Link>
  );
};


export default Bouton;