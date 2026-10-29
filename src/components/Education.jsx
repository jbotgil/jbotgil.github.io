import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Education = ({ data }) => {
    const { t } = useTranslation();

    return (
        <section id="education" className="px-6 md:px-8 py-20 md:py-28 bg-white/50 dark:bg-white/[0.015]">
            <div className="mx-auto max-w-6xl">
                <div className="rule">
                    <span className="kicker">04 · {t('experience.education')}</span>
                    <div className="rule-line" />
                </div>

                <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">
                    {/* Formación */}
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">{t('experience.education')}</h3>
                        <div className="space-y-8">
                            {data.education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.4, delay: index * 0.06 }}
                                    className="border-l-2 border-slate-200 dark:border-white/10 pl-6 group"
                                >
                                    <div className="absolute -left-[5px] mt-0.5 h-2 w-2 rounded-full bg-brand-violet opacity-40 group-hover:opacity-100 transition-opacity" />
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{t(edu.degree)}</h4>
                                    <p className="text-sm font-semibold text-brand-violet mb-1.5">{t(edu.school)}</p>
                                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{t(edu.period)}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certificaciones */}
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">{t('experience.certifications')}</h3>
                        <div className="space-y-4">
                            {data.certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.4, delay: index * 0.06 }}
                                    className="card card-hover p-5 flex items-start justify-between gap-4"
                                >
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">{t(cert.name)}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{t(cert.issuer)}</p>
                                        <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mt-1.5">{t(cert.date)}</p>
                                    </div>
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" aria-label={t('experience.viewCredential')}
                                        className="mt-1 p-2 rounded-lg text-slate-400 hover:text-brand-violet hover:bg-brand-violet/10 transition-colors">
                                        <ExternalLink size={16} />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;