export const Accordion = ( data ) => {
    return `
        <div class="accordion w-100" id="accordionUnitsGroups">
            ${data.map((item, index) => `
                <div class="accordion-item w-100">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseUnitGroup${index}" aria-expanded="false" aria-controls="flush-collapseUnitGroup${index}">
                            ${item.label}
                        </button>
                    </h2>
                    <div id="flush-collapseUnitGroup${index}" class="accordion-collapse collapse" data-bs-parent="#accordionUnitsGroups">
                        ${item.content ? `<div class="accordion-body">${item.content}</div>` : '<div class="accordion-body">No content available.</div>'}
                    </div>
                </div>
            `).join('')}
        </div>
    `
}