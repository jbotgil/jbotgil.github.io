import React from 'react';
import { Github, Linkedin, Mail, Heart, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = ({ data }) => {
    const { t } = useTranslation();

    return (
        <footer className="py-20 relative overflow-hidden">
            {/* Halo superior decorativo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-brand-violet/10 blur-[140px] -z-10" />

            <div className="container mx-auto px-6 text-center">
                <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-brand-sky mb-4">
                    <Mail size={14} /> {t('contact.title')}
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
                    <span className="text-gradient animate-gradient-x">{t('contact.subtitle')}</span>
                </h2>
                <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                    {t('contact.description')}
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-14">
                    <a href={`mailto:${data.email}`} className="btn-gradient !px-8 !py-4 text-lg">
                        <Send size={20} />
                        {data.email}
                    </a>
                </div>

                <div className="flex justify-center gap-5 mb-12">
                    <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                        className="p-3 glass rounded-full text-slate-300 hover:text-white hover:border-brand-sky/60 hover:shadow-glow transition-all duration-300">
                        <Github size={22} />
                    </a>
                    <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                        className="p-3 glass rounded-full text-slate-300 hover:text-white hover:border-brand-violet/60 hover:shadow-glow-violet transition-all duration-300">
                        <Linkedin size={22} />
                    </a>
                    <a href={`mailto:${data.email}`}
                        className="p-3 glass rounded-full text-slate-300 hover:text-white hover:border-brand-pink/60 hover:shadow-glow-pink transition-all duration-300">
                        <Mail size={22} />
                    </a>
                </div>

                <div className="text-slate-500 text-sm">
                    <p className="flex items-center justify-center gap-1">
                        {t('footer.made_with')} <Heart size={14} className="text-brand-pink fill-current" /> {t('footer.by')} {data.name}
                    </p>
                    <p className="mt-2">© {new Date().getFullYear()} {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;