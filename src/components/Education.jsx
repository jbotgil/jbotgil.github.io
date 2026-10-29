import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Education = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section id="education" className="relative px-6 py-24 lg:py-28">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <span className="pill mb-5">{t('experience.education')}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                        <span className="text-gradient">{t('experience.subtitle')}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Formación */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5 }}
                        className="glass-strong rounded-[2rem] p-8 lg:p-10"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-brand-violet to-brand-indigo grid place-items-center text-white shadow-glow-violet">
                                <GraduationCap size={22} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t('experience.education')}</h3>
                        </div>

                        <div className="space-y-8">
                            {data.education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="relative pl-6 border-l border-slate-900/10 dark:border-white/10 group"
                                >
                                    <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-violet/60 group-hover:bg-brand-violet transition-colors" />
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{t(edu.degree)}</h4>
                                    <p className="text-sm font-semibold text-brand-violet mb-2">{t(edu.school)}</p>
                                    <span className="inline-block text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-500/10 dark:bg-white/5 px-2.5 py-1 rounded-md">
                                        {t(edu.period)}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certificaciones */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="glass-strong rounded-[2rem] p-8 lg:p-10"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-violet grid place-items-center text-white shadow-glow-cyan">
                                <Award size={22} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t('experience.certifications')}</h3>
                        </div>

                        <div className="space-y-4">
                            {data.certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="group flex items-start justify-between gap-4 glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg"
                                >
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-brand-violet transition-colors">
                                            {t(cert.name)}
                                        </h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t(cert.issuer)}</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-1.5">{t(cert.date)}</p>
                                    </div>
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 p-2 rounded-xl glass text-slate-500 dark:text-slate-400 hover:text-brand-violet transition-colors shrink-0"
                                        title={t('experience.viewCredential')}
                                    >
                                        <ExternalLink size={17} />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Education;