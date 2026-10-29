import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Experience = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section id="experience" className="px-6 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-4xl">
                <div className="rule">
                    <span className="kicker">03 · {t('nav.experience')}</span>
                    <div className="rule-line" />
                </div>

                <div className="relative border-l border-slate-200 dark:border-white/10 ml-2">
                    {data.experience.map((job, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                            className="relative pb-12 pl-10 last:pb-0"
                        >
                            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-violet" />
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t(job.title)}</h3>
                                <span className="text-sm font-mono text-slate-400 dark:text-slate-500">{t(job.period)}</span>
                            </div>
                            <p className="text-sm font-semibold text-brand-violet mb-3">{job.company}</p>
                            <p className="max-w-2xl text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                                {t(job.description)}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;