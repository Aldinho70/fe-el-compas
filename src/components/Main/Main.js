import { Tabs } from "../Tabs/Tabs.js";

// export const Main = () => {
//     return `
//         <div class="container-fluid">
//             <div class="row" id="root-main-content">
//                 <div class="col-2 p-0" id="root-tabs-content">    
//                     ${Tabs()}
//                 </div>
//                 <div class="col-10 bg-light p-2 rounded-4 " id="root-right-main-content">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
//                 </div>
//             </div>
//         </div>
//     `;
// }

// components/UnitsMenu.js

// components/Main.js
export const Main = () => {
    return `
        <div class="container-fluid h-100">
            <div class="row main-content-row " id="root-main-content">
                <div class="col-12 col-md-4 col-lg-3 col-xl-4 mb-2 mb-md-0 ">
                    ${UnitsMenu()}
                </div>
                <div class="col-12 col-md-8 col-lg-9 col-xl-8 " style="min-height: 100%;">
                    ${MainPanel()}
                </div>
            </div>
        </div>
    `;
}

const UnitsMenu = () => {
    return `
        <div class="units-menu h-100" id="root-tabs-content">
            ${Tabs()}
        </div>
    `;
}

// components/MainPanel.js
export const MainPanel = () => {
    return `
        <div class="main-panel bg-light p-3 rounded-4 h-100 w-100" id="root-right-main-content">
            <div id="main-panel-content">
                <!-- Contenido por defecto -->
                <p class="text-muted">Selecciona una unidad para ver el detalle.</p>
            </div>
        </div>
    `;
}