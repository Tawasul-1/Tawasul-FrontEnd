/**
 * Language utility functions for managing user language preferences
 */

const LANGUAGE_KEY = "userLanguage";

/**
 * Get user language preference
 * @returns {string} Language code ('en' or 'ar')
 */
export const getUserLanguage = () => {
  // Check localStorage for language preference
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
    return savedLanguage;
  }
  
  // Check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang && browserLang.startsWith("ar")) {
    return "ar";
  }
  
  return "en"; // Default to English
};

/**
 * Set user language preference
 * @param {string} language - Language code ('en' or 'ar')
 */
export const setUserLanguage = (language) => {
  if (language === "en" || language === "ar") {
    localStorage.setItem(LANGUAGE_KEY, language);
  }
};

/**
 * Get localized text based on language preference
 * @param {Object} textObject - Object with 'en' and 'ar' properties
 * @param {string} fallback - Fallback text if no localized version is available
 * @returns {string} Localized text
 */
export const getLocalizedText = (textObject, fallback = "") => {
  const language = getUserLanguage();
  
  if (textObject && typeof textObject === "object") {
    // Try to get the text in the preferred language
    if (language === "ar" && textObject.ar) {
      return textObject.ar;
    } else if (language === "en" && textObject.en) {
      return textObject.en;
    }
    
    // Fallback to available text
    if (textObject.ar) return textObject.ar;
    if (textObject.en) return textObject.en;
    if (textObject.name) return textObject.name; // Generic name field
  }
  
  return fallback;
};

/**
 * Get category name based on language preference
 * @param {Object} category - Category object with name fields
 * @returns {string} Localized category name
 */
export const getCategoryName = (category) => {
  if (!category) return "Unknown Category";
  
  return getLocalizedText(
    { en: category.name_en, ar: category.name_ar },
    category.name || `Category ${category.id}`
  );
};

/**
 * Check if the current language is RTL (Arabic)
 * @returns {boolean} True if language is RTL
 */
export const isRTL = () => {
  return getUserLanguage() === "ar";
}; 