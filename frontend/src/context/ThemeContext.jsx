import { createContext, useContext, useEffect, useState, useCallback } from "react";
import ThemeTransitionOverlay from "../components/common/ThemeTransitionOverlay";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionType, setTransitionType] = useState(null); // 'opening-dark' | 'closing-dark'
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback((e) => {
    if (isAnimating) return;

    // Calculate click / button position origin
    let clickX = window.innerWidth / 2;
    let clickY = window.innerHeight / 2;

    if (e && typeof e.clientX === "number" && typeof e.clientY === "number" && (e.clientX !== 0 || e.clientY !== 0)) {
      clickX = e.clientX;
      clickY = e.clientY;
    } else if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      clickX = rect.left + rect.width / 2;
      clickY = rect.top + rect.height / 2;
    }

    const nextTheme = theme === "light" ? "dark" : "light";
    const type = nextTheme === "dark" ? "opening-dark" : "closing-dark";

    setOrigin({ x: clickX, y: clickY });
    setTransitionType(type);
    setIsAnimating(true);

    // Switch actual DOM theme & state midway through the smooth cinematic overlay
    setTimeout(() => {
      setTheme(nextTheme);
    }, 600);

    // End transition state after animation finishes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1450);
  }, [theme, isAnimating]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isAnimating,
        transitionType,
      }}
    >
      {children}
      <ThemeTransitionOverlay
        isAnimating={isAnimating}
        transitionType={transitionType}
        origin={origin}
        onAnimationComplete={() => setIsAnimating(false)}
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};