function setupPdfGeneration() {
    const downloadBtn = document.getElementById('download-btn');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', () => {
        const downloadText = document.getElementById('download-text');
        const downloadIcon = document.getElementById('download-icon');
        downloadText.textContent = 'Generando...';
        downloadIcon.className = 'fas fa-spinner fa-spin w-5 mr-2';
        downloadBtn.disabled = true;
        
        const originalTheme = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
        document.documentElement.classList.add('light-mode');
        
        const element = document.getElementById('page-content');
        const tempExperienceContainer = document.createElement('div');
        
        // Crear HTML temporal para la experiencia
        let experienceHTML = `<h3 class="text-2xl font-semibold mb-8 border-b pb-2" style="border-color: #e5e7eb; color: #0ea5e9; font-family: 'Inter', sans-serif; padding-left: 1.5rem;">Experiencia Profesional</h3>`;
        
        experienceData.forEach(job => {
            experienceHTML += `
                <div class="avoid-break mb-6 px-6">
                    <p class="font-semibold" style="color: #0ea5e9;">${job.date['es']}</p>
                    <h4 class="text-xl font-bold mt-1" style="color: #1f2937;">${job.title['es']}</h4>
                    <p class="font-semibold text-lg" style="color: #4b5563;">${job.company}</p>
                    <ul class="list-disc list-inside space-y-2 text-base mt-2" style="color: #4b5563;">
                        ${job.description['es']}
                    </ul>
                </div>`;
        });
        
        tempExperienceContainer.innerHTML = experienceHTML;
        
        // Reemplazar temporalmente la sección de experiencia
        const experienceSection = document.getElementById('experience-timeline').parentElement;
        const rightColumn = experienceSection.parentElement;
        experienceSection.style.display = 'none';
        rightColumn.appendChild(tempExperienceContainer);
        
        setTimeout(() => {
            html2canvas(element, { 
                useCORS: true,
                scale: 1, 
                backgroundColor: '#f9fafb', 
                windowWidth: element.scrollWidth, 
                windowHeight: element.scrollHeight 
            })
            .then(canvas => {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const ratio = canvas.width / canvas.height;
                let imgHeight = pdfWidth / ratio;
                let heightLeft = imgHeight;
                let position = 0;
                
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
                
                while (heightLeft > 0) {
                    position -= pdfHeight;
                    pdf.addPage();
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, pdfWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }
                
                pdf.save('CV-PabloCarrazana.pdf');
            })
            .finally(() => {
                // Revertir cambios
                rightColumn.removeChild(tempExperienceContainer);
                experienceSection.style.display = 'block';
                
                downloadText.textContent = 'Descargar CV';
                downloadIcon.className = 'fas fa-download w-5 mr-2';
                downloadBtn.disabled = false;
                
                if (originalTheme === 'dark') {
                    document.documentElement.classList.remove('light-mode');
                }
            });
        }, 500);
    });
}

export { setupPdfGeneration };