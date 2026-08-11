export const Tabs = (  ) => {

        // return `
        // <div class="container-fluid">
        //     <div class="row">
        //         <div class="col-auto p-0">
        //             <div class="nav flex-column nav-pills vh-100 overflow-auto" id="v-pills-tab" role="tablist" aria-orientation="vertical" style="min-width:220px;">
        //                 <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Vista general</button>
        //                 <button class="nav-link" id="v-pills-units-tab" data-bs-toggle="pill" data-bs-target="#v-pills-units" type="button" role="tab" aria-controls="v-pills-units" aria-selected="false">Unidades</button>
        //                 <button class="nav-link" id="v-pills-notifications-tab" data-bs-toggle="pill" data-bs-target="#v-pills-notifications" type="button" role="tab" aria-controls="v-pills-notifications" aria-selected="false">Notificaciones</button>
        //             </div>
        //         </div>
        //         <div class="col p-3">
        //             <div class="tab-content" id="v-pills-tabContent">
        //                 <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
        //                     <h5>Vista General</h5>
        //                     <div id="general-view"></div>
        //                 </div>
        //                 <div class="tab-pane fade" id="v-pills-units" role="tabpanel" aria-labelledby="v-pills-units-tab">
        //                     <h5>Unidades</h5>
        //                     <div id="units-view"></div>
        //                 </div>
        //                 <div class="tab-pane fade" id="v-pills-notifications" role="tabpanel" aria-labelledby="v-pills-notifications-tab">
        //                     <h5>Notificaciones</h5>
        //                     <div id="notifications-view"></div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // `

        return `
            <ul class="nav nav-tabs mb-3 px-2 rounded-4 bg-secondary" id="nav-groups">
                <li class="nav-item">
                    <button class="nav-link active rounded-4" data-bs-toggle="tab" data-bs-target="#tab-todas">Todas</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link rounded-4" data-bs-toggle="tab" data-bs-target="#tab-grupos">Establos</button>
                </li>
                <!--<li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-cedis">CEDIS</button>
                </li>-->
            </ul>

            <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-todas">
                    <div class="d-flex flex-wrap gap-2" id="root-tab-todas"></div>
                </div>

                <div class="tab-pane fade" id="tab-grupos">
                    <div class="d-flex flex-wrap gap-2" id="root-tab-grupos"></div>
                </div>

                <!--<div class="tab-pane fade" id="tab-cedis">
                    <div class="d-flex flex-wrap gap-2" id="root-tab-cedis"></div>
                </div>-->
            </div>
        `
}