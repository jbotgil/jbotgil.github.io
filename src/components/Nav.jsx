import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Languages, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme';

const Nav = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
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

    return (
        <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#f9fafc]/80 dark:bg-[#09090f]/80 backdrop-blur-md border-b border-slate-200/70 dark:border-white/10' : 'bg-transparent border-b border-transparent'}`}
        >
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
                <a href="#top" className="font-mono text-base font-bold text-slate-900 dark:text-white">
                    jbg<span className="text-brand-violet">.</span>
                </a>

                {/* Enlaces escritorio */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            {l.label}
                        </a>
                    ))}
                </div>

                {/* Controles */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={toggleTheme}
                        aria-label="Cambiar tema"
                        className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-brand-violet transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                    </button>
                    <button
                        onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
                        aria-label="Cambiar idioma"
                        className="flex items-center gap-1.5 p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-brand-violet transition-colors"
                    >
                        <Languages size={17} />
                        <span className="text-xs font-bold tracking-wider">{i18n.language.toUpperCase()}</span>
                    </button>
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                        className="md:hidden p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-brand-violet transition-colors"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            {/* Menú móvil */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-b border-slate-200/70 dark:border-white/10 bg-[#f9fafc]/95 dark:bg-[#09090f]/95 backdrop-blur-md px-6 py-4 flex flex-col gap-1"
                    >
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            >
                                {l.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Nav;