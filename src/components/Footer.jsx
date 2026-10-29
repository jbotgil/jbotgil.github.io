import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = ({ data }) => {
    const { t } = useTranslation();

    return (
        <footer id="contact" className="px-6 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                <div className="rule">
                    <span className="kicker">06 · {t('nav.contact')}</span>
                    <div className="rule-line" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white text-balance mb-6" style={{ letterSpacing: '-0.03em' }}>
                        {t('contact.title')} <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#6d5cf6,#5b5bd6)' }}>{t('contact.subtitle')}</span>
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 mb-10">
                        {t('contact.description')}
                    </p>

                    <a href={`mailto:${data.email}`} className="btn-primary !px-8 !py-4 text-base mb-12">
                        <Send size={19} />
                        {data.email}
                    </a>

                    <div className="flex items-center justify-center gap-2 mb-14">
                        <a href={data.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                            className="p-2.5 rounded-full text-slate-500 hover:text-brand-violet hover:bg-brand-violet/10 transition-all">
                            <Github size={20} />
                        </a>
                        <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                            className="p-2.5 rounded-full text-slate-500 hover:text-brand-violet hover:bg-brand-violet/10 transition-all">
                            <Linkedin size={20} />
                        </a>
                        <a href={`mailto:${data.email}`} aria-label="Correo"
                            className="p-2.5 rounded-full text-slate-500 hover:text-brand-violet hover:bg-brand-violet/10 transition-all">
                            <Mail size={20} />
                        </a>
                    </div>
                </motion.div>

                <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400 dark:text-slate-500">
                    <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
                    <p>{data.name}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;