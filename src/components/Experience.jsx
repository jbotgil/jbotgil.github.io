import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Experience = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section id="experience" className="relative px-6 py-24 lg:py-28">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                    <span className="pill mb-5">{t('experience.work')}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                        <span className="text-gradient">{t('experience.title')}</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Línea base */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-violet via-brand-indigo to-transparent" />

                    <div className="space-y-10">
                        {data.experience.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-16"
                            >
                                <div className="absolute left-[11px] top-7 h-4 w-4 rounded-full border-2 border-white dark:border-white/80 bg-gradient-to-tr from-brand-violet to-brand-cyan shadow-glow-violet" />

                                <div className="group glass rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg">
                                    <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-violet dark:group-hover:text-brand-violet transition-colors">
                                            {t(job.title)}
                                        </h3>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-violet bg-brand-violet/10 border border-brand-violet/20 px-3 py-1 rounded-full">
                                            <Calendar size={13} />
                                            {t(job.period)}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                        <Briefcase size={15} className="text-brand-violet" />
                                        {job.company}
                                    </h4>
                                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                                        {t(job.description)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;