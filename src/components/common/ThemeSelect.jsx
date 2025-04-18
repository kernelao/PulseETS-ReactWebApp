// src/components/common/ThemeSelect.jsx
import React from "react";

const baseThemes = ["Mode zen", "Mode nuit", "Mode jour"];

const ThemeSelect = ({
  themeActif,
  onChange,
  unlockedThemes = [],
  withGroups = true,
  className = ""
}) => {
  const customThemes = unlockedThemes.filter(t => !baseThemes.includes(t));

  return (
    <select
      className={className}
      value={themeActif}
      onChange={(e) => onChange(e.target.value)}
    >
      {withGroups ? (
        <>
          <optgroup label="Thèmes de base">
            {baseThemes.map((theme, i) => (
              <option key={`base-${i}`} value={theme}>
                {theme}
              </option>
            ))}
          </optgroup>
          {customThemes.length > 0 && (
            <optgroup label="Thèmes débloqués">
              {customThemes.map((theme, i) => (
                <option key={`unlocked-${i}`} value={theme}>
                  {theme}
                </option>
              ))}
            </optgroup>
          )}
        </>
      ) : (
        [...baseThemes, ...customThemes].map((theme, i) => (
          <option key={i} value={theme}>
            {theme}
          </option>
        ))
      )}
    </select>
  );
};

export default ThemeSelect;
