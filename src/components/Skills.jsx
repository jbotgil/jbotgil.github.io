import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Smartphone, Layout, Code2, Database, Terminal, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Skills = ({ data }) => {
    const { t } = useTranslation();

    const getIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'java': return <Coffee size={20} />;
            case 'python': return <Terminal size={20} />;
            case 'kotlin': return <Smartphone size={20} />;
            case 'html5/css3': return <Layout size={20} />;
            case 'javascript': return <Code size={20} />;
            case 'sql': return <Database size={20} />;
            default: return <Code2 size={20} />;
        }
    };

    return (
        <section id="skills" className="px-6 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-4xl">
                <div className="rule">
                    <span className="kicker">05 · {t('nav.skills')}</span>
                    <div className="rule-line" />
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                    className="grid gap-3 sm:grid-cols-2"
                >
                    {data.skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
                            className="card card-hover p-5 flex items-center gap-4"
                        >
                            <span className="h-11 w-11 shrink-0 grid place-items-center rounded-xl bg-brand-violet/10 text-brand-violet">
                                {getIcon(skill.name)}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-semibold text-slate-900 dark:text-white">{skill.name}</p>
                                    <span className="text-xs font-mono text-slate-400">{skill.level}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.1 + index * 0.05 }}
                                        className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;