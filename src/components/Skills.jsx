import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Smartphone, Layout, Code2, Database, Terminal, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Skills = ({ data }) => {
    const { t } = useTranslation();

    // Map icons manually to ensure we have good ones
    const getIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'java': return <Coffee className="w-10 h-10 mb-4 text-orange-400" />;
            case 'python': return <Terminal className="w-10 h-10 mb-4 text-yellow-400" />;
            case 'kotlin': return <Smartphone className="w-10 h-10 mb-4 text-purple-400" />;
            case 'html5/css3': return <Layout className="w-10 h-10 mb-4 text-blue-400" />;
            case 'javascript': return <Code className="w-10 h-10 mb-4 text-yellow-300" />;
            case 'sql': return <Database className="w-10 h-10 mb-4 text-emerald-400" />;
            default: return <Code2 className="w-10 h-10 mb-4 text-accent" />;
        }
    };

    const getHoverColor = (name) => {
        switch (name.toLowerCase()) {
            case 'java': return { bg: "rgba(251, 146, 60, 0.1)", border: "rgba(251, 146, 60, 0.5)" };
            case 'python': return { bg: "rgba(250, 204, 21, 0.1)", border: "rgba(250, 204, 21, 0.5)" };
            case 'kotlin': return { bg: "rgba(192, 132, 252, 0.1)", border: "rgba(192, 132, 252, 0.5)" };
            case 'html5/css3': return { bg: "rgba(96, 165, 250, 0.1)", border: "rgba(96, 165, 250, 0.5)" };
            case 'javascript': return { bg: "rgba(253, 224, 71, 0.1)", border: "rgba(253, 224, 71, 0.5)" };
            case 'sql': return { bg: "rgba(52, 211, 153, 0.1)", border: "rgba(52, 211, 153, 0.5)" };
            default: return { bg: "rgba(56, 189, 248, 0.1)", border: "rgba(56, 189, 248, 0.5)" };
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        {t('skills.title')} <span className="text-accent">{t('skills.subtitle')}</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        {t('skills.description')}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
                >
                    {data.skills.map((skill, index) => {
                        const colors = getHoverColor(skill.name);
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -8,
                                    backgroundColor: colors.bg,
                                    borderColor: colors.border,
                                    boxShadow: `0 10px 30px -10px ${colors.bg}`
                                }}
                                className="flex flex-col items-center justify-center p-8 bg-slate-800/40 border border-slate-700/50 rounded-2xl backdrop-blur-sm cursor-pointer transition-all duration-300 group"
                            >
                                <motion.div
                                    className="transform transition-transform duration-300 group-hover:scale-110"
                                >
                                    {getIcon(skill.name)}
                                </motion.div>
                                <span className="font-semibold text-slate-200 tracking-wide text-center">{skill.name}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;