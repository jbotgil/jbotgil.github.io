import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const listVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const About = ({ data }) => {
    const { t } = useTranslation();

    const highlights = [
        {
            title: t('about.hl_role'),
            description: `${t('hero.role1')} · ${t('hero.role2')}`,
        },
        {
            title: t('about.hl_location'),
            description: data.location,
        },
        {
            title: t('about.hl_available'),
            description: t('about.hl_available_value'),
        },
    ];

    const socialLinks = [
        { label: 'GitHub', handle: data.social.github.replace('https://', ''), href: data.social.github, icon: Github },
        { label: 'LinkedIn', handle: data.social.linkedin.replace('https://', ''), href: data.social.linkedin, icon: Linkedin },
        { label: 'Email', handle: data.email, href: `mailto:${data.email}`, icon: Mail },
    ];

    return (
        <section id="about" className="relative px-6 py-24 lg:py-32">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative overflow-hidden rounded-[2.5rem] glass-strong p-8 md:p-14"
                >
                    {/* Fondo decorativo */}
                    <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-brand-violet/20 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-cyan/15 blur-[100px]" />

                    <div className="relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
                        {/* Columna izquierda */}
                        <div className="space-y-9">
                            <span className="pill">
                                {t('about.spotlight')}
                            </span>

                            <div className="space-y-4">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                                >
                                    {data.name}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-lg font-semibold text-gradient"
                                >
                                    {t('hero.role1')} · {t('hero.role2')}
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400"
                                >
                                    {t('about.description')}
                                </motion.p>
                            </div>

                            {/* Highlights */}
                            <div className="grid gap-4 sm:grid-cols-3">
                                {highlights.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.1 * index }}
                                        whileHover={{ y: -4 }}
                                        className="group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:shadow-glass-lg"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        {item.title === t('about.hl_location') && (
                                            <MapPin size={18} className="mb-3 text-brand-violet" />
                                        )}
                                        <div className="relative space-y-2">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                                                {item.title}
                                            </p>
                                            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <a href={`mailto:${data.email}`} className="btn-primary">
                                    {t('hero.contactMe')}
                                    <ArrowUpRight size={18} />
                                </a>
                                <a
                                    href={data.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 glass text-slate-700 dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg"
                                >
                                    <Github size={18} />
                                    {t('about.cta_github')}
                                </a>
                            </motion.div>
                        </div>

                        {/* Columna derecha: tarjeta de perfil */}
                        <div className="relative">
                            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-brand-violet/20 via-transparent to-transparent blur-3xl" />
                            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] glass-strong p-8">
                                <div className="flex flex-col items-center text-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="relative mb-6"
                                    >
                                        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/30 blur-2xl animate-pulse-soft" />
                                        <img
                                            src="/assets/images/profile.png"
                                            alt={data.name}
                                            className="relative h-32 w-32 rounded-full border border-slate-900/10 dark:border-white/20 object-cover shadow-[0_25px_60px_rgba(139,92,246,0.25)]"
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="space-y-1"
                                    >
                                        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            {data.name}
                                        </h3>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                                            {t('hero.role1')}
                                        </p>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                                    >
                                        {t('about.card_bio')}
                                    </motion.p>
                                </div>

                                {/* Redes sociales */}
                                <motion.div
                                    variants={listVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-80px' }}
                                    className="mt-8 flex flex-col gap-3"
                                >
                                    {socialLinks.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <motion.a
                                                key={social.label}
                                                variants={itemVariants}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-between rounded-2xl glass px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg"
                                                whileTap={{ scale: 0.985 }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full glass text-brand-violet shadow-glass">
                                                        <Icon className="h-4 w-4" />
                                                    </span>
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                                            {social.label}
                                                        </p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                                                            {social.handle}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="h-4 w-4 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-violet" />
                                            </motion.a>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;