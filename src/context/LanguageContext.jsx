import { createContext, useContext, useState, useEffect } from "react";
import { getUserLanguage, setUserLanguage } from "../utils/languageUtils";

const LanguageContext = createContext();

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Initialize language from localStorage or browser
    const savedLanguage = getUserLanguage();
    setCurrentLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
    
    // Set document direction
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLanguage;
  }, []);

  const changeLanguage = (language) => {
    if (language === "en" || language === "ar") {
      setUserLanguage(language);
      setCurrentLanguage(language);
      setIsRTL(language === "ar");
      
      // Update document attributes
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
      
      // Trigger a re-render by dispatching a custom event
      window.dispatchEvent(new CustomEvent("languageChanged", { detail: language }));
    }
  };

  const value = {
    currentLanguage,
    isRTL,
    changeLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}; 