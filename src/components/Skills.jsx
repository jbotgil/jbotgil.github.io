import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Smartphone, Layout, Code2, Database, Terminal, Code, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Skills = ({ data }) => {
    const { t } = useTranslation();

    const getIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'java': return <Coffee size={26} />;
            case 'python': return <Terminal size={26} />;
            case 'kotlin': return <Smartphone size={26} />;
            case 'html5/css3': return <Layout size={26} />;
            case 'javascript': return <Code size={26} />;
            case 'sql': return <Database size={26} />;
            default: return <Code2 size={26} />;
        }
    };

    const getColor = (name) => {
        switch (name.toLowerCase()) {
            case 'java': return 'from-orange-500/70 to-orange-300/40';
            case 'python': return 'from-yellow-500/70 to-amber-300/40';
            case 'kotlin': return 'from-purple-500/70 to-fuchsia-400/40';
            case 'html5/css3': return 'from-blue-500/70 to-sky-300/40';
            case 'javascript': return 'from-yellow-400/80 to-yellow-200/50';
            case 'sql': return 'from-emerald-500/70 to-teal-300/40';
            default: return 'from-brand-violet to-brand-cyan/60';
        }
    };

    return (
        <section id="skills" className="relative px-6 py-24 lg:py-28">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <span className="pill mb-5"><Wrench size={12} /> {t('skills.title')}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                        <span className="text-gradient">{t('skills.subtitle')}</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        {t('skills.description')}
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-5"
                >
                    {data.skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                            }}
                            className="group glass rounded-3xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-lg"
                        >
                            <div className={`h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-tr ${getColor(skill.name)} grid place-items-center text-white shadow-lg`}>
                                {getIcon(skill.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 dark:text-white truncate">{skill.name}</p>
                                <div className="mt-2 h-1.5 rounded-full bg-slate-500/15 dark:bg-white/10 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan transition-all duration-700"
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                            <span className="text-sm font-mono font-bold text-brand-violet">{skill.level}%</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;