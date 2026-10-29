import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className="flex glass rounded-full p-1 shadow-glow">
                <button
                    onClick={() => changeLanguage('es')}
                    className={`px-3 py-1 text-sm font-bold rounded-full transition-all duration-300 ${i18n.language === 'es'
                            ? 'bg-gradient-to-r from-brand-sky to-brand-violet text-primary shadow-lg'
                            : 'text-slate-400 hover:text-white'
                        }`}
                >
                    ES
                </button>
                <button
                    onClick={() => changeLanguage('en')}
                    className={`px-3 py-1 text-sm font-bold rounded-full transition-all duration-300 ${i18n.language === 'en'
                            ? 'bg-gradient-to-r from-brand-sky to-brand-violet text-primary shadow-lg'
                            : 'text-slate-400 hover:text-white'
                        }`}
                >
                    EN
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
