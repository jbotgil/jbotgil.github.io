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
            <div className="flex bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full p-1 shadow-lg">
                <button
                    onClick={() => changeLanguage('es')}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${i18n.language === 'es'
                            ? 'bg-accent text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    ES
                </button>
                <button
                    onClick={() => changeLanguage('en')}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${i18n.language === 'en'
                            ? 'bg-accent text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    EN
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
