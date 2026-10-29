import React from 'react';
import { Github, Heart, Linkedin, Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = ({ data }) => {
    const { t } = useTranslation();

    return (
        <footer id="contact" className="relative px-6 py-24 lg:py-32">
            <div className="max-w-3xl mx-auto">
                <div className="relative text-center">
                    <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-violet/20 blur-[110px]" />
                    <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-cyan/15 blur-[110px]" />

                    <span className="pill relative mb-5"><Mail size={12} /> {t('contact.title')}</span>
                    <h2 className="relative text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                        <span className="text-gradient">{t('contact.subtitle')}</span>
                    </h2>
                    <p className="relative text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg mb-10">
                        {t('contact.description')}
                    </p>

                    <div className="relative flex flex-wrap justify-center gap-4 mb-14">
                        <a href={`mailto:${data.email}`} className="btn-primary !px-8 !py-4 text-base">
                            <Send size={19} />
                            {data.email}
                        </a>
                    </div>

                    <div className="relative flex justify-center gap-4 mb-12">
                        <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                            className="p-3 glass rounded-2xl text-slate-600 dark:text-slate-300 transition-all duration-300 hover:text-brand-violet hover:-translate-y-1 hover:shadow-glass">
                            <Github size={20} />
                        </a>
                        <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                            className="p-3 glass rounded-2xl text-slate-600 dark:text-slate-300 transition-all duration-300 hover:text-brand-violet hover:-translate-y-1 hover:shadow-glass">
                            <Linkedin size={20} />
                        </a>
                        <a href={`mailto:${data.email}`}
                            className="p-3 glass rounded-2xl text-slate-600 dark:text-slate-300 transition-all duration-300 hover:text-brand-violet hover:-translate-y-1 hover:shadow-glass">
                            <Mail size={20} />
                        </a>
                    </div>

                    <div className="relative text-sm text-slate-500 dark:text-slate-400">
                        <p className="flex items-center justify-center gap-1.5">
                            {t('footer.made_with')} <Heart size={14} className="text-brand-pink fill-current" /> {t('footer.by')} {data.name}
                        </p>
                        <p className="mt-2">© {new Date().getFullYear()} {t('footer.rights')}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;