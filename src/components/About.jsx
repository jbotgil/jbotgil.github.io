import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = ({ data }) => {
    const { t } = useTranslation();

    const highlights = [
        { icon: Sparkles, label: t('about.hl_role'), value: `${t('hero.role1')}` },
        { icon: MapPin, label: t('about.hl_location'), value: data.location },
        { icon: Wrench, label: t('about.hl_available'), value: t('about.hl_available_value') },
    ];

    return (
        <section id="about" className="px-6 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                <div className="rule">
                    <span className="kicker">01 · {t('nav.about')}</span>
                    <div className="rule-line" />
                </div>

                <div className="grid gap-10 md:grid-cols-[0.32fr_0.68fr]">
                    {/* Columna de contexto */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="md:sticky md:top-24 h-fit"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Sobre Javier</h3>
                            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                {t('about.card_bio')}
                            </p>
                        </div>
                        <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-violet hover:text-brand-indigo transition-colors">
                            {t('about.cta_github')}
                            <ArrowUpRight size={16} />
                        </a>
                    </motion.div>

                    {/* Columna principal */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5 }}
                            className="text-xl md:text-2xl leading-relaxed text-slate-700 dark:text-slate-200 mb-10"
                        >
                            {t('about.description')}
                        </motion.p>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {highlights.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                        className="card card-hover p-5"
                                    >
                                        <Icon size={18} className="mb-3 text-brand-violet" />
                                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">{item.value}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;