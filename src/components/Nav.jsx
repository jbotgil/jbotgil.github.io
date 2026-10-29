import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Languages, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme';
import { portfolioData } from '../data/portfolio';

const Nav = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { href: '#about', label: t('nav.about') },
        { href: '#projects', label: t('nav.projects') },
        { href: '#experience', label: t('nav.experience') },
        { href: '#skills', label: t('nav.skills') },
        { href: '#contact', label: t('nav.contact') },
    ];

    const LinkItem = ({ href, label, onNavigate }) => (
        <a
            href={href}
            onClick={onNavigate}
            className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-full transition-colors hover:text-brand-violet dark:hover:text-white"
        >
            {label}
        </a>
    );

    return (
        <motion.nav
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-glass-lg' : 'bg-transparent border-transparent backdrop-blur-none'}`}
            style={{ borderRadius: '9999px', padding: '10px' }}
        >
            <div className="flex items-center gap-2 px-1">
                {/* Wordmark */}
                <a href="#top" className="hidden md:flex items-center gap-2 mr-3 pl-2 text-sm font-bold text-slate-800 dark:text-white">
                    <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-violet to-brand-cyan grid place-items-center text-white text-xs font-extrabold shadow-lg">
                        {(portfolioData.name || 'J').charAt(0)}
                    </span>
                    <span className="max-w-[120px] truncate">{portfolioData.name}</span>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center">
                    {links.map((l) => <LinkItem key={l.href} {...l} />)}
                </div>

                <div className="flex items-center gap-1 ml-1 md:ml-2 border-l border-slate-900/10 dark:border-white/10 pl-2">
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Cambiar tema"
                        className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-brand-violet dark:hover:text-white transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                    </button>
                    {/* Language toggle */}
                    <button
                        onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
                        aria-label="Cambiar idioma"
                        className="flex items-center gap-1.5 p-1.5 pr-3 rounded-full text-slate-600 dark:text-slate-300 hover:text-brand-violet dark:hover:text-white transition-colors"
                    >
                        <Languages size={17} />
                        <span className="text-xs font-bold tracking-wider">{i18n.language.toUpperCase()}</span>
                    </button>
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label="Menú"
                        className="md:hidden p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-brand-violet dark:hover:text-white transition-colors"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-3 glass rounded-3xl shadow-glass-lg p-3 w-56 flex flex-col gap-1"
                >
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 rounded-2xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-brand-violet/10 hover:text-brand-violet dark:hover:text-white transition-colors"
                        >
                            {l.label}
                        </a>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Nav;