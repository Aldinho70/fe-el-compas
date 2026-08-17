export const Accordion = (data) => {
    return `
        <div class="accordion-custom w-100" id="accordionUnitsGroups">
            ${data.map((item, index) => `
                <div class="accordion-item-custom">
                    <h6 class="accordion-header-custom m-0">
                        <button class="accordion-btn-custom collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseUnitGroup${index}" aria-expanded="false" aria-controls="flush-collapseUnitGroup${index}">
                            <span class="d-flex align-items-center gap-2">
                                ${item.icon ? `<span class="accordion-icon-wrapper"><img src="${item.icon}" alt="${item.label}"></span>` : ''}
                                <span class="text-truncate" style="max-width: 160px;" title="${item.label}">${item.label}</span>
                            </span>
                            <i class="bi bi-chevron-down accordion-chevron"></i>
                        </button>
                    </h6>
                    <div id="flush-collapseUnitGroup${index}" class="accordion-collapse collapse" data-bs-parent="#accordionUnitsGroups">
                        <div class="accordion-body-custom">
                            ${item.content ? item.content : '<span class="text-muted small">Sin contenido disponible.</span>'}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `
}