import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Smartphone, Layout, Code2, Database, Terminal, Code, Wrench } from 'lucide-react';
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

    const getColors = (name) => {
        switch (name.toLowerCase()) {
            case 'java': return { icon: "text-orange-400", glow: "rgba(251, 146, 60, 0.45)", ring: "rgba(251, 146, 60, 0.35)" };
            case 'python': return { icon: "text-yellow-400", glow: "rgba(250, 204, 21, 0.45)", ring: "rgba(250, 204, 21, 0.35)" };
            case 'kotlin': return { icon: "text-purple-400", glow: "rgba(192, 132, 252, 0.45)", ring: "rgba(192, 132, 252, 0.35)" };
            case 'html5/css3': return { icon: "text-blue-400", glow: "rgba(96, 165, 250, 0.45)", ring: "rgba(96, 165, 250, 0.35)" };
            case 'javascript': return { icon: "text-yellow-300", glow: "rgba(253, 224, 71, 0.45)", ring: "rgba(253, 224, 71, 0.35)" };
            case 'sql': return { icon: "text-emerald-400", glow: "rgba(52, 211, 153, 0.45)", ring: "rgba(52, 211, 153, 0.35)" };
            default: return { icon: "text-brand-sky", glow: "rgba(56, 189, 248, 0.45)", ring: "rgba(56, 189, 248, 0.35)" };
        }
    };

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-brand-sky/5 blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-brand-pink/5 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-brand-sky mb-4">
                        <Wrench size={14} /> {t('skills.title')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-gradient animate-gradient-x">{t('skills.subtitle')}</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        {t('skills.description')}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
                >
                    {data.skills.map((skill, index) => {
                        const c = getColors(skill.name);
                        return (
                            <motion.div
                                key={index}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
                                whileHover={{ y: -10, scale: 1.03 }}
                                className="flex flex-col items-center justify-center p-6 glass rounded-2xl cursor-pointer transition-all duration-300 group"
                                style={{ '--glow': c.glow, '--ring': c.ring }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 20px 40px -12px ${c.glow}`;
                                    e.currentTarget.style.borderColor = c.ring;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '';
                                    e.currentTarget.style.borderColor = '';
                                }}
                            >
                                {/* Nivel superior */}
                                <div className={`transform transition-transform duration-300 group-hover:scale-110 ${c.icon}`}>
                                    {getIcon(skill.name)}
                                </div>
                                <span className="font-semibold text-slate-200 tracking-wide text-center">{skill.name}</span>
                                <div className="w-full mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500 group-hover:w-full"
                                        style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${c.ring}, ${c.glow})` }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;