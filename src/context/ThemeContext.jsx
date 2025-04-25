import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/Axios"; 
import { useAuth } from "./AuthContext"; 

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const auth = useAuth(); 
  const token = auth?.token;

  const [theme, setTheme] = useState("Mode zen");

  // Chargement depuis l'API
  useEffect(() => {
    const fetchTheme = async () => {
      if (!token) return;
      try {
        const response = await axios.get("/api/reglages/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.theme) {
          setTheme(response.data.theme);
        }
      } catch (error) {
        console.error("Erreur de chargement du thème :", error);
      }
    };
    fetchTheme();
  }, [token]);

  // Nouvelle fonction : change uniquement le thème
  const changeTheme = async (newTheme) => {
    setTheme(newTheme); // Appliquer immédiatement le changement de thème
    if (!token) return;
    try {
      await axios.put(
        "/api/reglages/me",
        { theme: newTheme },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du thème :", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
