import { Tabs } from "../Tabs/Tabs.js";
import { InfoUnit } from "../InfoUnit/InfoUnit.js";

export const Main = () => {
    return `
        <div class="container-fluid h-100">
            <div class="row main-content-row" id="root-main-content">
                <aside class="col-12 col-md-4 col-lg-3 col-xl-3 mb-2 mb-md-0">
                    ${UnitsMenu()}
                </aside>

                <main class="col-12 col-md-8 col-lg-9 col-xl-9">
                    ${InfoUnit()}
                </main>
            </div>
        </div>
    `;
}

const UnitsMenu = () => {
    return `
        <div class="units-menu h-100" id="root-tabs-content" style="min-height: 100%;">
            ${Tabs()}
        </div>
    `;
}

export const MainPanel = () => {
    return `
        <div class="main-panel bg-light p-3 rounded-4 w-100" id="root-right-main-content">
            <div class="panel-header">
                <div>
                    <h5 class="mb-0">Detalle de unidad</h5>
                    <small class="text-muted">Información general y telemetría</small>
                </div>
                <div class="card-toolbar d-flex align-items-center">
                    <!--<button class="btn btn-sm btn-outline-secondary">Acciones</button>
                    <button class="btn btn-sm btn-primary">Refrescar</button>-->
                </div>
            </div>

            <div class="panel-body" id="main-panel-content">
                <p class="text-muted">Selecciona una unidad para ver el detalle.</p>
            </div>
        </div>
    `;
}