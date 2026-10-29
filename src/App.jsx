import { useState } from 'react';
import { portfolioData } from './data/portfolio';
import { ThemeProvider } from './theme';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ThemeProvider>
            <div className="min-h-screen font-sans relative overflow-x-hidden">
                <Nav />
                <main>
                    <Hero data={portfolioData} />
                    <About data={portfolioData} />
                    <Projects data={portfolioData} onModalChange={setIsModalOpen} />
                    <Experience data={portfolioData} />
                    <Education data={portfolioData} />
                    <Skills data={portfolioData} />
                </main>
                <Footer data={portfolioData} />
                {!isModalOpen && <ScrollToTop />}
            </div>
        </ThemeProvider>
    );
}

export default App;