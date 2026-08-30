import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    welcomeGreeting: "Namaste",
    goodMorning: "Good morning",
    todayAction: "TODAY'S ACTION",
    activeProcurement: "ACTIVE PROCUREMENT",
    cropJourney: "YOUR CROP JOURNEY",
    paymentStatus: "YOUR PAYMENT STATUS",
    nearbyCentres: "NEARBY PROCUREMENT CENTRES",
    notifications: "NOTIFICATIONS",
    viewToken: "View My Token",
    viewDetails: "View Details",
    checkProcurement: "Check Your Procurement",
    howItWorks: "How AgroCure Works",
    mandiBhawan: "Mandi Bhawan",
    estimatedValue: "Estimated Amount",
    token: "Token",
    status: "Status",
    bringDocs: "Carry: Aadhaar Card, Land Record & Digital Token Pass",
    scheduledTomorrow: "Your wheat procurement is scheduled for tomorrow.",
    navHome: "Home",
    navJourney: "Crop Journey",
    navToken: "Digital Token",
    navPayments: "Payments",
    navCentres: "Centres",
    navDocs: "Documents",
    navHelp: "Grievances",
    navOfficer: "Officer Portal",
    navAdmin: "Admin Portal",
    switchRole: "Demo Role Switcher"
  },
  hi: {
    welcomeGreeting: "नमस्ते",
    goodMorning: "शुभ प्रभात",
    todayAction: "आज का मुख्य कार्य",
    activeProcurement: "आपकी वर्तमान खरीद",
    cropJourney: "आपकी फसल का सफर",
    paymentStatus: "आपकी भुगतान स्थिति",
    nearbyCentres: "निकटतम खरीद केंद्र",
    notifications: "सूचनाएं",
    viewToken: "मेरा टोकन देखें",
    viewDetails: "विवरण देखें",
    checkProcurement: "अपनी खरीद जांचें",
    howItWorks: "एग्रोक्योर कैसे काम करता है",
    mandiBhawan: "मंडी भवन",
    estimatedValue: "अनुमानित राशि",
    token: "टोकन",
    status: "स्थिति",
    bringDocs: "साथ लाएं: आधार कार्ड, भूमि रिकॉर्ड एवं डिजिटल टोकन पास",
    scheduledTomorrow: "आपकी गेहूं की उपज की खरीद कल निर्धारित है।",
    navHome: "मुख्य पृष्ठ",
    navJourney: "फसल का सफर",
    navToken: "डिजिटल टोकन",
    navPayments: "भुगतान स्थिति",
    navCentres: "खरीद केंद्र",
    navDocs: "दस्तावेज़",
    navHelp: "सहायता एवं शिकायत",
    navOfficer: "अधिकारी पोर्टल",
    navAdmin: "प्रशासक पोर्टल",
    switchRole: "डेमो भूमिका बदलें"
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
