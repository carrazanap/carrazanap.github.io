import { translations, projectsData, experienceData } from './data.js';

function initTerminal(lang) {
    const terminalOutput = document.getElementById('terminal-output');
    if (terminalOutput) {
        terminalOutput.innerHTML = '';
        printToTerminal(translations.terminal.welcome[lang]);
    }
}

function printToTerminal(text) {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.innerHTML = text.replace(/\n/g, '<br>');
    line.classList.add('terminal-line', 'text-green-400');
    terminalOutput.appendChild(line);
}

function toggleTerminal(show) {
    const terminalContainer = document.getElementById('terminal-container');
    const mainContent = document.getElementById('page-content');
    const terminalInput = document.getElementById('terminal-input');
    if (show) {
        terminalContainer.classList.remove('hidden');
        mainContent.classList.add('hidden');
        terminalInput.focus();
    } else {
        terminalContainer.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }
}

function handleCommand(command) {
    const lang = localStorage.getItem('language') || 'es';
    const parts = command.split(' ');
    const baseCommand = parts[0];
    const argument = parts.length > 1 ? parts.slice(1).join(' ') : null;

    switch (baseCommand) {
        case 'help':
            printToTerminal(translations.terminal.help[lang]);
            break;
        case 'about':
            printToTerminal(translations.about_text[lang]);
            break;
        case 'experience':
            let expOutput = `${translations.terminal.experience_header[lang]}\n\n`;
            experienceData.forEach(job => {
                expOutput += `[${job.date[lang]}]\n`;
                expOutput += `${job.title[lang]} @ ${job.company}\n\n`;
            });
            printToTerminal(expOutput);
            break;
        case 'projects':
            let filteredProjects = projectsData;
            if (argument && argument.startsWith('--tag')) {
                const tag = argument.split(' ')[1];
                if(tag){
                    filteredProjects = projectsData.filter(p => p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()));
                    printToTerminal(translations.terminal.projects_with_tag[lang].replace('{tag}', tag));
                } else {
                     printToTerminal(translations.terminal.tag_error[lang]);
                     return;
                }
            } else {
                printToTerminal(translations.terminal.projects_all[lang]);
            }

            if(filteredProjects.length === 0){
                printToTerminal(translations.terminal.projects_not_found[lang]);
            } else {
                let projOutput = `\n`;
                filteredProjects.forEach(proj => {
                    projOutput += `[${proj.tags.join(', ')}]\n`;
                    projOutput += `${proj.title[lang]}\n\n`;
                });
                printToTerminal(projOutput);
            }
            break;
        case 'contact':
            printToTerminal(translations.terminal.contact_details[lang]);
            break;
        case 'clear':
            document.getElementById('terminal-output').innerHTML = '';
            break;
        case 'gui':
            localStorage.setItem('theme', 'dark'); 
            location.reload(); 
            break;
        default:
            printToTerminal(translations.terminal.command_not_found[lang].replace('{command}', command));
            break;
    }
}

export {
    initTerminal,
    printToTerminal,
    toggleTerminal,
    handleCommand
};