export const List = ( data ) => {
    return `
        <ul class="list-group">
            ${data.map(item => `
                <li class="list-group-item" >
                    <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="${item.id}" checked ${ item.function ? `onclick="${item.function}"` : '' } >
                    ${item.icon ? `<img src="${item.icon}" alt="${item.label}" class="me-2" style="width: 20px; height: 20px;">` : ''}
                    <label class="form-check-label" for="${item.id}">${item.label}</label>
                </li>
            `).join('')}
        </ul>
    `
}