import {
    techStackData,
    projectsData,
    experienceData,
    educationData,
    certifications,
    translations
} from './data.js';

// Funciones de UI
function populateTechStack(lang) {
    const container = document.getElementById('tech-stack-container');
    if(!container) return;
    container.innerHTML = '';
    
    for (const category in techStackData) {
        const categoryKey = `stack_${category.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')}`;
        let tagsHTML = techStackData[category].map(tag => 
            `<span class="tag" onclick="filterProjects('${tag}')">${tag}</span>`
        ).join('');
        
        container.innerHTML += `
            <div>
                <h4 class="font-semibold text-sm uppercase tracking-wider text-secondary mb-2" 
                    data-translate="${categoryKey}">
                    ${translations[categoryKey] ? translations[categoryKey][lang] : category}
                </h4>
                <div class="flex flex-wrap gap-2">${tagsHTML}</div>
            </div>`;
    }
}

function populateProjects(lang, filterTag = null) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    const filteredProjects = filterTag ? projectsData.filter(p => p.tags.includes(filterTag)) : projectsData;
    
    if (filteredProjects.length === 0 && filterTag) {
        container.innerHTML = `<p class="text-secondary">No hay proyectos para la tecnología '${filterTag}'. <a href="#" onclick="filterProjects(null); return false;" class="text-sky-400">Mostrar todos</a>.</p>`;
        return;
    }
    
    container.innerHTML = filteredProjects.map(project =>
        `<div class="project-item avoid-break p-4 rounded-lg glass-effect interactive">
            <h4 class="text-lg font-bold">${project.title[lang]}</h4>
            <p class="text-secondary text-sm mb-2">${project.description[lang]}</p>
            <a href="${project.link}" target="_blank" class="text-sm icon-link" style="color: var(--primary-color);" onclick="trackSocialClick(event, 'GitHub Project')">
                <i class="fab fa-github mr-1"></i> <span>${translations.view_repo[lang]}</span>
            </a>
        </div>`
    ).join('');
}

function populateExperience(lang) {
    const container = document.getElementById('experience-timeline');
    if(!container) return;
    container.innerHTML = experienceData.map((job, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        return `<div class="timeline-container ${side} animate-on-scroll">
                    <div class="timeline-item glass-effect" onclick="openExperienceModal(${job.id})">
                        <div class="see-more-indicator">
                            <span data-translate="see_more">${translations.see_more[lang]}</span>
                            <i class="fas fa-external-link-alt fa-xs"></i>
                        </div>
                        <div class="pr-12">
                            <p class="font-semibold text-sm" style="color: var(--primary-color);">${job.date[lang]}</p>
                            <h4 class="text-lg font-bold mt-1">${job.title[lang]}</h4>
                            <p class="font-semibold text-base text-secondary">${job.company}</p>
                        </div>
                    </div>
                </div>`;
    }).join('');
}

function populateEducation(lang) {
    const container = document.getElementById('education-list');
    if(!container) return;
    container.innerHTML = educationData.map(edu => {
        const subtitleHTML = edu.subtitle ? `<p>${edu.subtitle[lang]}</p>` : '';
        return `<li>
                    <p class="font-semibold" style="color: var(--text-color);">${edu.title[lang]}</p>
                    ${subtitleHTML}
                    <p>${edu.school}</p>
                    <p class="text-sm">${edu.date}</p>
                </li>`;
    }).join('');
}

function populateCerts() {
    const container = document.getElementById('cert-list');
    if(!container) return;
    container.innerHTML = certifications.map(cert => `<p>${cert}</p>`).join('');
}

function filterProjects(tag) {
    const lang = localStorage.getItem('language') || 'es';
    const alreadyActive = currentFilter === tag;
    currentFilter = alreadyActive ? null : tag;

    document.querySelectorAll('#tech-stack-container .tag').forEach(t => {
        t.classList.toggle('active', t.textContent === tag && !alreadyActive);
    });

    populateProjects(lang, currentFilter);
}

function openExperienceModal(jobId) {
    const lang = localStorage.getItem('language') || 'es';
    const job = experienceData.find(j => j.id === jobId);
    if (!job) return;
    document.getElementById('modal-date').textContent = job.date[lang];
    document.getElementById('modal-title').textContent = job.title[lang];
    document.getElementById('modal-company').innerHTML = job.company;
    document.getElementById('modal-description').innerHTML = job.description[lang];
    document.getElementById('experience-modal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeExperienceModal() {
    document.getElementById('experience-modal').classList.remove('show');
    document.body.style.overflow = '';
}

function trackSocialClick(event, platform) {
    event.preventDefault();
    const url = event.currentTarget.href;
    try {
        if (typeof gtag === 'function') {
            gtag('event', 'social_click', {
                'social_platform': platform,
                'link_url': url,
                'event_callback': function () {
                    window.open(url, '_blank');
                },
                'event_timeout': 500
            });
            setTimeout(() => window.open(url, '_blank'), 500);
        } else {
            window.open(url, '_blank');
        }
    } catch (err) {
        console.warn('Error en trackSocialClick:', err);
        window.open(url, '_blank');
    }
}

// Exportar funciones necesarias
export {
    populateTechStack,
    populateProjects,
    populateExperience,
    populateEducation,
    populateCerts,
    filterProjects,
    openExperienceModal,
    closeExperienceModal,
    trackSocialClick
};