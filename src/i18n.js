import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
const resources = {
    es: {
        translation: {
            "nav.about": "Sobre mí",
            "nav.projects": "Proyectos",
            "nav.skills": "Habilidades",
            "nav.experience": "Experiencia",
            "nav.contact": "Contacto",

            "hero.greeting": "Hola, soy",
            "hero.role1": "Desarrollador de Software",
            "hero.role2": "Estudiante de IA y Big Data",
            "hero.description": "Construyendo soluciones eficientes y explorando el mundo de los datos.",
            "hero.downloadCV": "Descargar CV",
            "hero.contactMe": "Contáctame",

            "about.title": "Sobre",
            "about.subtitle": "mí",
            "about.description": "Apasionado por el aprendizaje continuo y el crecimiento personal y profesional. Disfruto compartiendo los beneficios de la tecnología con quienes me rodean, facilitando su comprensión y uso, con el objetivo de aproximar la informática a la comunidad y mostrar cómo puede mejorar nuestras vidas.",
            "about.location": "Alzira, Comunidad Valenciana",

            "projects.title": "Proyectos",
            "projects.subtitle": "Destacados",
            "projects.description": "Una selección de mis trabajos más recientes en desarrollo de software, inteligencia artificial y aplicaciones móviles.",
            "projects.viewProject": "Ver Proyecto",

            "skills.title": "Habilidades",
            "skills.subtitle": "& Tecnologías",
            "skills.description": "Stack tecnológico y herramientas que utilizo para dar vida a mis proyectos, fusionando diseño y rendimiento.",

            "experience.title": "Experiencia",
            "experience.subtitle": "& Formación",
            "experience.description": "Mi trayectoria profesional y académica en el mundo de la tecnología.",
            "experience.work": "Experiencia Laboral",
            "experience.education": "Formación Académica",

            // Experiencia laboral
            "experience.seipasa.title": "Desarrollador de Software Junior",
            "experience.seipasa.desc": "Desarrollo de software para la automatización de procesos en el sector agrícola.",

            "experience.idea.title": "Técnico de asistencia para TI",
            "experience.idea.desc": "Soporte técnico, mantenimiento de sistemas y asistencia a usuarios en Alzira, Comunidad Valenciana.",

            // Experiencia y formación
            // Formacion académica
            "education.ai.degree": "C.E. Intel·ligència Artificial i Big Data",
            "education.ai.school": "I.E.S. Eduardo Primo Marqués",
            "education.ai.period": "oct. 2025 – actualidad",

            "education.dam.degree": "C.F.G.S. Desarrollo de aplicaciones multiplataforma",
            "education.dam.school": "I.E.S. Eduardo Primo Marqués",
            "education.dam.period": "sept. 2023 – jun. 2025",

            "education.smr.degree": "C.F.G.M. Sistemas informáticos y redes",
            "education.smr.school": "I.E.S. Eduardo Primo Marqués",
            "education.smr.period": "sept. 2021 – jun. 2023",

            // Certificaciones
            "experience.certifications": "Certificaciones",

            "cert.aws.name": "AWS Academy Graduate - AWS Academy Cloud Foundations",
            "cert.aws.issuer": "Amazon Web Services (AWS)",
            "cert.aws.date": "jul. 2024",

            "cert.cisco.cyber.name": "Cisco Network Certifications - Cybersecurity",
            "cert.cisco.cyber.issuer": "Cisco",
            "cert.cisco.cyber.date": "may. 2023",

            "cert.cisco.packet.name": "Cisco Network Certifications - Packet Tracer",
            "cert.cisco.packet.issuer": "Cisco",
            "cert.cisco.packet.date": "may. 2022",

            // Footer
            "footer.made_with": "Hecho con",
            "footer.by": "por",

            // Contacto
            "contact.title": "Ponte en",
            "contact.subtitle": "Contacto",
            "contact.description": "¿Tienes un proyecto en mente o simplemente quieres saludar? Estaré encantado de hablar contigo.",
            "contact.name": "Nombre",
            "contact.email": "Correo Electrónico",
            "contact.message": "Mensaje",
            "contact.send": "Enviar Mensaje",

            "footer.rights": "Todos los derechos reservados.",

            // PROJECTS
            "projects.section_title": "Proyectos",

            // Títulos
            "projects.cnn.title": "Clasificador de Residuos con CNN",
            "projects.bedrock.title": "Agente de Estudio con IA (Amazon Bedrock)",
            "projects.vision.title": "Buscador visual por similitud",
            "projects.events.title": "Gestión de eventos en Android",
            "projects.login.title": "LoginWithJava",
            "projects.card.title": "Tarjeta de Presentación",
            "projects.fuel.title": "Análisis de Precios de Combustible - Ribera Alta & La Costera",

            // Tecnologías (Tags)
            "projects.cnn.tags": ["Deep Learning", "TensorFlow", "Python", "Streamlit"],
            "projects.bedrock.tags": ["AI", "AWS Bedrock", "Python"],
            "projects.vision.tags": ["Python", "Computer Vision"],
            "projects.events.tags": ["Kotlin", "Android", "Firebase"],
            "projects.login.tags": ["Java", "JavaFX", "Maven"],
            "projects.card.tags": ["Kotlin", "Android"],
            "projects.fuel.tags": ["Python", "MongoDB", "Docker", "Streamlit", "Big Data"],

            // DESTACADO TAG
            "projects.featured_tag": "Destacado",

            // Descripciones
            "projects.cnn.desc": "Modelo de Deep Learning basado en redes neuronales convolucionales para la identificación de materiales reciclables. Incluye análisis de arquitecturas, técnicas de Data Augmentation y despliegue interactivo mediante Streamlit.",
            "projects.bedrock.desc": "Agente inteligente impulsado por Amazon Bedrock para el análisis de documentos PDF. Facilita la interacción conversacional con el contenido de apuntes y documentos técnicos.",
            "projects.vision.desc": "Sistema de búsqueda de imágenes similares mediante análisis de visión artificial. Localiza archivos dentro de directorios locales basándose en la extracción de características de una foto de entrada.",
            "projects.events.desc": "Aplicación móvil para la organización y administración de eventos. Permite la creación, edición y gestión eficiente de calendarios y asistentes en dispositivos Android.",
            "projects.login.desc": "Sistema de autenticación desarrollado con Java y JavaFX. Proporciona una interfaz intuitiva para el inicio de sesión y la gestión de usuarios mediante una arquitectura basada en Maven.",
            "projects.card.desc": "Desarrollo de una interfaz visual interactiva en Kotlin. Aplicación móvil diseñada para mostrar información de contacto de forma dinámica en el ecosistema Android.",
            "projects.fuel.desc": "Herramienta ETL y dashboard interactivo para monitorizar la evolución de precios de gasolina y diésel mediante la API del Ministerio de Industria.",
            // Botones
            "projects.view_link": "Ver Proyecto"
        }
    },
    en: {
        translation: {
            "nav.about": "About",
            "nav.projects": "Projects",
            "nav.skills": "Skills",
            "nav.experience": "Experience",
            "nav.contact": "Contact",

            "hero.greeting": "Hi, I'm",
            "hero.role1": "Software Developer",
            "hero.role2": "AI & Big Data Student",
            "hero.description": "Building efficient solutions and exploring the world of data.",
            "hero.downloadCV": "Download CV",
            "hero.contactMe": "Contact Me",

            "about.title": "About",
            "about.subtitle": "me",
            "about.description": "Passionate about continuous learning and personal and professional growth. I enjoy sharing the benefits of technology with those around me, facilitating its understanding and use, with the goal of bringing computing closer to the community and showing how it can improve our lives.",
            "about.location": "Alzira, Valencia Area",

            "projects.title": "Featured",
            "projects.subtitle": "Projects",
            "projects.description": "A selection of my most recent works in software development, artificial intelligence, and mobile applications.",
            "projects.viewProject": "View Project",

            "skills.title": "Skills",
            "skills.subtitle": "& Technologies",
            "skills.description": "Tech stack and tools I use to bring my projects to life, merging design and performance.",

            "experience.title": "Experience",
            "experience.subtitle": "& Education",
            "experience.description": "My professional and academic journey in the tech world.",
            "experience.work": "Work Experience",
            "experience.education": "Education",

            // Work Experience
            "experience.seipasa.title": "Junior Software Developer",
            "experience.seipasa.desc": "Software development for process automation in the agricultural sector.",

            "experience.idea.title": "IT Support Technician",
            "experience.idea.desc": "Technical support, system maintenance, and user assistance in Alzira, Valencian Community.",


            // Formación academica
            "education.ai.degree": "Specialization Course in Artificial Intelligence and Big Data",
            "education.ai.school": "I.E.S. Eduardo Primo Marqués",
            "education.ai.period": "Oct 2025 – Present",

            "education.dam.degree": "Associate Degree in Multi-platform Application Development",
            "education.dam.school": "I.E.S. Eduardo Primo Marqués",
            "education.dam.period": "Sept 2023 – June 2025",

            "education.smr.degree": "Vocational Degree in Computer Systems and Networks",
            "education.smr.school": "I.E.S. Eduardo Primo Marqués",
            "education.smr.period": "Sept 2021 – June 2023",

            // Certificaciones
            "experience.certifications": "Certifications",

            "cert.aws.name": "AWS Academy Graduate - AWS Academy Cloud Foundations",
            "cert.aws.issuer": "Amazon Web Services (AWS)",
            "cert.aws.date": "jul. 2024",

            "cert.cisco.cyber.name": "Cisco Network Certifications - Cybersecurity",
            "cert.cisco.cyber.issuer": "Cisco",
            "cert.cisco.cyber.date": "may. 2023",

            "cert.cisco.packet.name": "Cisco Network Certifications - Packet Tracer",
            "cert.cisco.packet.issuer": "Cisco",
            "cert.cisco.packet.date": "may. 2022",

            // Footer
            "footer.made_with": "Made with",
            "footer.by": "by",

            "contact.title": "Get in",
            "contact.subtitle": "Touch",
            "contact.description": "Have a project in mind or just want to say hi? I'd love to chat with you.",
            "contact.name": "Name",
            "contact.email": "Email",
            "contact.message": "Message",
            "contact.send": "Send Message",

            "footer.rights": "All rights reserved.",

            // PROJECTS
            "projects.section_title": "Projects",

            // Titles
            "projects.cnn.title": "Waste Classifier with CNN",
            "projects.bedrock.title": "AI Study Agent (Amazon Bedrock)",
            "projects.vision.title": "Visual Similarity Search Engine",
            "projects.events.title": "Android Event Management",
            "projects.login.title": "LoginWithJava",
            "projects.card.title": "Business Card App",
            "projects.fuel.title": "Fuel Prices Analysis - Ribera Alta & La Costera",

            // Technologies (Tags)
            "projects.cnn.tags": ["Deep Learning", "TensorFlow", "Python", "Streamlit"],
            "projects.bedrock.tags": ["AI", "AWS Bedrock", "Python"],
            "projects.vision.tags": ["Python", "Computer Vision"],
            "projects.events.tags": ["Kotlin", "Android", "Firebase"],
            "projects.login.tags": ["Java", "JavaFX", "Maven"],
            "projects.card.tags": ["Kotlin", "Android"],
            "projects.fuel.tags": ["Python", "MongoDB", "Docker", "Streamlit", "Big Data"],


            // FEATURED TAG
            "projects.featured_tag": "Featured",

            // Descriptions
            "projects.cnn.desc": "Deep Learning model based on convolutional neural networks for identifying recyclable materials. Includes architecture analysis, Data Augmentation techniques, and interactive deployment via Streamlit.",
            "projects.bedrock.desc": "Intelligent agent powered by Amazon Bedrock for PDF document analysis. Enables conversational interaction with technical notes and documents.",
            "projects.vision.desc": "Visual search system for finding similar images through computer vision analysis. Locates files within local directories based on feature extraction from an input photo.",
            "projects.events.desc": "Mobile application for organizing and managing events. Enables efficient creation, editing, and management of calendars and attendees on Android devices.",
            "projects.login.desc": "Authentication system developed with Java and JavaFX. Provides an intuitive interface for login and user management using a Maven-based architecture.",
            "projects.card.desc": "Development of an interactive visual interface in Kotlin. Mobile application designed to dynamically display contact information within the Android ecosystem.",
            "projects.fuel.desc": "ETL tool and interactive dashboard to monitor the evolution of gasoline and diesel prices through the Ministry of Industry API.",

            // Buttons
            "projects.view_link": "View Project"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "es", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
