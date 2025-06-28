import { 
    populateTechStack,
    populateProjects,
    populateExperience,
    populateEducation,
    populateCerts,
    filterProjects,
    openExperienceModal,
    closeExperienceModal,
    trackSocialClick
} from './ui.js';

import { 
    initTerminal,
    printToTerminal,
    toggleTerminal,
    handleCommand
} from './terminal.js';

import { setupPdfGeneration } from './pdf.js';

// Variables globales
let currentFilter = null;

// Funciones principales
function applyTheme(theme) {
    const terminalIcon = document.getElementById('terminal-icon');
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    
    terminalIcon.classList.add('hidden');
    lightIcon.classList.add('hidden');
    darkIcon.classList.add('hidden');
    
    if (theme === 'cli') {
        toggleTerminal(true);
        terminalIcon.classList.remove('hidden');
    } else {
        toggleTerminal(false);
        if (theme === 'dark') {
            document.documentElement.classList.remove('light-mode');
            lightIcon.classList.remove('hidden');
        } else { // light
            document.documentElement.classList.add('light-mode');
            darkIcon.classList.remove('hidden');
        }
    }
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[key] && translations[key][lang]) {
            el.innerHTML = translations[key][lang];
        }
    });
    
    populateProjects(lang, currentFilter);
    populateExperience(lang);
    populateEducation(lang);
    populateCerts();
    populateTechStack(lang);
    
    localStorage.setItem('language', lang);
    
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');
    if (langEsBtn && langEnBtn) {
        langEsBtn.classList.toggle('active', lang === 'es');
        langEnBtn.classList.toggle('active', lang === 'en');
    }
    
    if(currentTheme === 'cli') {
        initTerminal(lang);
    }
    
    // Configurar observador para animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Event handlers
function handleThemeToggle() {
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'dark') currentTheme = 'light';
    else if (currentTheme === 'light') currentTheme = 'cli';
    else currentTheme = 'dark';
    
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
    
    if (currentTheme === 'cli') {
        const currentLang = localStorage.getItem('language') || 'es';
        initTerminal(currentLang);
    }
}

function handleTerminalInput(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const command = event.target.value.trim().toLowerCase();
        if (command) {
            printToTerminal(`<span class="text-gray-500">> ${command}</span>`);
            handleCommand(command);
        }
        event.target.value = "";
        const terminalContainer = document.getElementById('terminal-container');
        if (terminalContainer) {
            terminalContainer.scrollTop = terminalContainer.scrollHeight;
        }
    }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Configurar listeners
    const themeToggle = document.getElementById('theme-toggle');
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');
    const terminalInput = document.getElementById('terminal-input');
    
    // Configuración inicial
    setupPdfGeneration();
    
    // Aplicar tema y lenguaje guardados
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('language') || 'es';
    
    applyTheme(currentTheme);
    setLanguage(savedLang);
    
    // Si el tema es CLI, inicializar terminal
    if (currentTheme === 'cli') {
        initTerminal(savedLang);
    }
    
    // Event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', handleThemeToggle);
    }
    
    if (langEsBtn && langEnBtn) {
        langEsBtn.addEventListener('click', () => setLanguage('es'));
        langEnBtn.addEventListener('click', () => setLanguage('en'));
    }
    
    if (terminalInput) {
        terminalInput.addEventListener('keydown', handleTerminalInput);
    }
});

// Funciones globales necesarias para HTML
window.filterProjects = filterProjects;
window.openExperienceModal = openExperienceModal;
window.closeExperienceModal = closeExperienceModal;
window.trackSocialClick = trackSocialClick;