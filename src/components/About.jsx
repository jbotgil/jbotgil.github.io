import React from 'react';
import { motion } from 'framer-motion';
import { Github, Workflow } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AUTOMATIONS = ['n8n', 'Docker', 'Shell', 'Python'];

const About = ({ data }) => {
    const { t } = useTranslation();

    const tiles = [
        {
            href: data.social.github,
            content: (
                <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                    className="group flex h-full flex-col justify-between gap-4">
                    <span className="h-9 w-9 grid place-items-center rounded-xl bg-brand-violet/10 text-brand-violet"><Github size={18} /></span>
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-violet transition-colors">{t('about.cta_github')}</p>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">github.com/jbotgil</p>
                    </div>
                </a>
            ),
        },
        {
            content: (
                <div className="flex h-full flex-col justify-between gap-4">
                    <span className="h-9 w-9 grid place-items-center rounded-xl bg-brand-cyan/10 text-brand-cyan"><Workflow size={18} /></span>
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">{t('about.auto_title')}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {AUTOMATIONS.map((a) => (
                                <span key={a} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                                    {a}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            content: (
                <div className="flex h-full flex-col justify-between gap-4">
                    <span className="h-9 w-9 grid place-items-center rounded-xl bg-emerald-500/10 text-emerald-500">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>
                    </span>
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{t('about.hl_available')}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{t('about.hl_available_value')}</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <section id="about" className="px-6 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                <div className="rule">
                    <span className="kicker">01 · {t('nav.about')}</span>
                    <div className="rule-line" />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl text-xl md:text-2xl leading-relaxed text-slate-700 dark:text-slate-200 mb-12"
                >
                    {t('about.description')}
                </motion.p>

                {/* Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {tiles.map((tile, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="card card-hover p-5"
                        >
                            {tile.content}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;