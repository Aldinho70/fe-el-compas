export const Accordion = ( data ) => {
    return `
        <div class="accordion w-100" id="accordionUnitsGroups">
            ${data.map((item, index) => `
                <div class="accordion-item w-100">
                    <h6 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseUnitGroup${index}" aria-expanded="false" aria-controls="flush-collapseUnitGroup${index}" style="max-height: 30px;">
                            ${item.icon ? `<img src="${item.icon}" alt="${item.label}" class="me-2" style="width: 20px; height: 20px;">` : ''}
                            ${item.label}
                        </button>
                    </h6>
                    <div id="flush-collapseUnitGroup${index}" class="accordion-collapse collapse" data-bs-parent="#accordionUnitsGroups">
                        ${item.content ? `<div class="accordion-body" style="padding: 2px;">${item.content}</div>` : '<div class="accordion-body">No content available.</div>'}
                    </div>
                </div>
            `).join('')}
        </div>
    `
}