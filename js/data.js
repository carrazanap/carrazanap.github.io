// Datos completos
const techStackData = {
    "Backend & Datos": ["Python", "SQL", "MySQL", "MariaDB", "PostgreSQL", "MongoDB", "Firebase", "SQLite", "Django", "Flask", "FastAPI"],
    "Cloud": ["Google Cloud", "AWS"],
    "Business Intelligence": ["Looker", "Looker Studio", "Power BI", "Tableau", "DataFlow", "DataMesh", "Pandas", "Numpy", "Matplotlib", "Seaborn", "Plotly", "Geopandas", "Shiny", "Dplyr", "Ggplot2", "Amplitude", "Analytics", "Canvas"],
    "Productividad": ["Jira", "Notion", "Monday", "Trello", "Google Suite", "Microsoft Office"]
};

const projectsData = [
    { 
        id: 1, 
        tags: ['Python', 'Pandas'], 
        title: { 
            es: "[Python-Pandas] Paquete PyPI Missing-mga", 
            en: "[Python-Pandas] Missing-mga Pandas API extends PyPI package" 
        }, 
        description: { 
            es: "Este paquete extiende la funcionalidad de Pandas DataFrame introduciendo una clase de Métodos de Ausencia, permitiendo un manejo intuitivo de valores faltantes.", 
            en: "This package extends Pandas DataFrame functionality by introducing a Missing Methods class, enabling intuitive handling of missing values." 
        }, 
        link: "https://github.com/Mgobeaalcoba/missing_mga" 
    },
    // ... (todos los demás proyectos)
];

const experienceData = [
    { 
        id: 1, 
        date: { 
            es: "Marzo 2023 - actualidad", 
            en: "March 2023 - Present" 
        }, 
        title: { 
            es: "Data Engineer", 
            en: "Data Engineer" 
        }, 
        company: `Mercado Libre <img src="https://raw.githubusercontent.com/carrazanap/pablocarrazana.github.io/main/mercadolibre.png" alt="Logo Mercado Libre" style="width:180px;height:60px;margin-left:4px;vertical-align:middle;">`, 
        description: { 
            es: `<li>Lideré un equipo de +5 analistas y científicos de datos...</li>`, 
            en: `<li>Led a team of +5 analysts and data scientists...</li>` 
        } 
    },
    // ... (toda la experiencia laboral)
];

const educationData = [
    { 
        title: {
            es: "Postgraduate Degree, Ingeniería de Software", 
            en: "Postgraduate Degree, Software Engineering"
        }, 
        school: "UAI - Universidad Abierta Interamericana", 
        date: "2025 - 2026" 
    },
    // ... (toda la educación)
];

const certifications = [
    "Data & AI Tools for Practitioners",
    "BigQuery de Cero a Heroe",
    "Data Driven Decision Making",
    "DIPLOMATURA EN CIENCIA DE DATOS, APRENDIZAJE AUTOMÁTICO Y SUS APLICACIONES"
];

const translations = {
    job_title: { 
        es: "Data Engineer en Mercado Libre", 
        en: "Data Engineer at Mercado Libre" 
    },
    // ... (todas las traducciones)
};

// Exportar para otros módulos
export {
    techStackData,
    projectsData,
    experienceData,
    educationData,
    certifications,
    translations
};