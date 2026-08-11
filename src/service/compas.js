import { List } from "../components/components/List/List.js";

export const mapUnits = (units) => {

    const array_units = units.map(unit => {
        return {
            id: unit.id,
            label: unit.name,
            icon: unit.icon,
            function: `showUnitDetails(${unit.id})`
        }
    });

    $("#root-tab-todas").html( `
        <div class="w-100 rounded-4" style=" max-height: 500px; overflow-y:auto;">
            ${List(array_units)}
        </div>
    `)
}

const showUnitDetails = (unitId) => {
    alert(`Mostrar detalles de la unidad con ID: ${unitId}`);
}
window.showUnitDetails = showUnitDetails;