import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    welcomeGreeting: "Namaste",
    goodMorning: "Today's Update",
    todayAction: "WHAT TO DO TODAY",
    activeProcurement: "YOUR CROP",
    paymentStatus: "YOUR MONEY",
    nearbyCentres: "NEARBY MANDIS",
    notifications: "Important Alerts",
    viewToken: "View Your Token",
    viewDetails: "View Full Details",
    checkProcurement: "Check Your Crop",
    howItWorks: "How AgroCure Works",
    mandiBhawan: "Mandi Bhawan",
    estimatedValue: "Money you will receive",
    token: "Token",
    status: "Status",
    bringDocs: "Please carry: Aadhaar Card, Land Record & Digital Token",
    scheduledTomorrow: "Your crop procurement is scheduled for tomorrow.",
    navHome: "Home",
    navToken: "My Token",
    navPayments: "Money",
    navCentres: "Mandis",
    navDocs: "Documents",
    navHelp: "Help",
    navOfficer: "Officer Portal",
    navAdmin: "Admin Portal",
    switchRole: "Demo Role Switcher"
  },
  hi: {
    welcomeGreeting: "Namaste",
    goodMorning: "Aaj ki jankari",
    todayAction: "AAJ KYA KAREIN",
    activeProcurement: "AAPKI FASAL",
    paymentStatus: "AAPKA PAISA",
    nearbyCentres: "PAAS KI MANDI",
    notifications: "Zaroori Suchna",
    viewToken: "Apna Token Dekho",
    viewDetails: "Puri Jankari Dekho",
    checkProcurement: "Fasal Check Karo",
    howItWorks: "AgroCure Kaise Kaam Karta Hai",
    mandiBhawan: "Mandi Bhawan",
    estimatedValue: "Milen waale paise",
    token: "Token",
    status: "Status",
    bringDocs: "Saath layein: Aadhaar Card, Zameen Record aur Token",
    scheduledTomorrow: "Kal aapki fasal jama hogi.",
    navHome: "Ghar",
    navToken: "Mera Token",
    navPayments: "Paisa",
    navCentres: "Mandi",
    navDocs: "Kagaz",
    navHelp: "Madad",
    navOfficer: "Officer Portal",
    navAdmin: "Admin Portal",
    switchRole: "Demo Role Switcher"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
