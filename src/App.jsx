import { useState } from 'react';
import { portfolioData } from './data/portfolio';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-primary min-h-screen text-slate-200 font-sans selection:bg-brand-sky selection:text-primary overflow-x-hidden">
            {/* Fondo global: retícula + orbes de gradiente */}
            <div className="fixed inset-0 bg-grid -z-30" />
            <div className="fixed inset-0 -z-30 pointer-events-none">
                <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-brand-sky/10 blur-[120px]" />
                <div className="absolute top-1/3 -right-56 w-[700px] h-[700px] rounded-full bg-brand-violet/10 blur-[140px]" />
                <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-pink/10 blur-[120px]" />
            </div>

            <LanguageSwitcher />
            <Hero data={portfolioData} />
            <Projects data={portfolioData} onModalChange={setIsModalOpen} />
            <Experience data={portfolioData} />
            <Education data={portfolioData} />
            <Skills data={portfolioData} />
            <Footer data={portfolioData} />
            {!isModalOpen && <ScrollToTop />}
        </div>
    )
}

export default App;
