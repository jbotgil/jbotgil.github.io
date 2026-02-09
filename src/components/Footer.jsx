import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = ({ data }) => {
    return (
        <footer className="bg-slate-900 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl font-bold mb-6">¿Trabajamos juntos?</h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                    Siempre estoy abierto a nuevas oportunidades y proyectos interesantes.
                    No dudes en contactarme.
                </p>

                <div className="flex justify-center gap-6 mb-12">
                    <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                        className="text-slate-400 hover:text-accent transition-colors">
                        <Github size={24} />
                    </a>
                    <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                        className="text-slate-400 hover:text-accent transition-colors">
                        <Linkedin size={24} />
                    </a>
                    <a href={`mailto:${data.email}`}
                        className="text-slate-400 hover:text-accent transition-colors">
                        <Mail size={24} />
                    </a>
                </div>

                <div className="text-slate-500 text-sm">
                    <p className="flex items-center justify-center gap-1">
                        Hecho con <Heart size={14} className="text-red-500 fill-current" /> por {data.name}
                    </p>
                    <p className="mt-2">© {new Date().getFullYear()} Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
