import { List } from "../components/components/List/List.js";
import { InfoUnit } from "../components/InfoUnit/InfoUnit.js";
import { Accordion } from "../components/components/Accordion/Accordion.js";

export const mapUnits = (units) => {
    const array_units = parseUnits(units);

    $("#root-tab-todas").html( `
        <div class="w-100 rounded-4" style=" max-height: 85vh; overflow-y:auto;">
            ${List(array_units)}
        </div>
    `)
}

export const mapGroups = (groups) => {
    const array_groups = groups.map(group => {
        return {
            id: group.group_id,
            label: group.group_name,
            content: List(parseUnits(group.units)),
        }
    });

    $("#root-tab-grupos").html( `
        <div class="w-100 rounded-4" style=" max-height: 85vh; overflow-y:auto;">
            ${Accordion(array_groups)}
        </div>
    `)
}

const parseUnits = (units) => {
    return units.map(unit => {
        return {
            id: unit.id,
            label: unit.name,
            icon: unit.icon,
            function: `showUnitDetails(${unit.id})`
        }
    });
}

const showUnitDetails = async (unit_id) => {
    const unit = await WialonService.getUnit( unit_id );
    console.log( unit );
    
    if( unit.name ){
        $("#root-right-main-content").html(InfoUnit(unit))
    }
}
window.showUnitDetails = showUnitDetails;