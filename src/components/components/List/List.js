export const List = (data) => {

    initListSelection();

    return `
        <ul class="list-group list-group-flush gap-2">
            ${data.map(item => `
                <li class="selectable-item ${item.checked ? 'active' : ''}">
                    <input 
                        class="form-check-input" 
                        type="radio" 
                        name="listGroupRadio" 
                        value="" 
                        id="${item.id}" 
                        ${item.checked ? 'checked' : ''}
                        ${item.function ? `onclick="${item.function}"` : ''}
                    >
                    <label class="selectable-label" for="${item.id}">
                        ${item.icon ? `
                            <span class="icon-wrapper">
                                <img src="${item.icon}" alt="${item.label}">
                            </span>
                        ` : ''}
                        <span class="text-truncate" style="max-width: 140px;" title="${item.label}">
                            ${item.label}
                        </span>
                    </label>
                </li>
            `).join('')}
        </ul>
    `;
}

export function initListSelection() {
    document.querySelectorAll('input[name="listGroupRadio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('.selectable-item').forEach(li => li.classList.remove('active'));
            radio.closest('.selectable-item').classList.add('active');
        });
    });
}