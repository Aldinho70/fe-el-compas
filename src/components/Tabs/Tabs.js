export const Tabs = () => {
    return `
        <div class="units-sidebar bg-white shadow-sm rounded-4 p-3 h-100 d-flex flex-column" >
            <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="mb-0 text-secondary">Unidades</h6>
                <!--<button class="btn btn-sm btn-outline-secondary">Filtros</button>-->
            </div>

            <!--<div class="mb-3">
                <input id="units-search" class="form-control form-control-sm" placeholder="Buscar unidad..." aria-label="Buscar unidad">
            </div>-->

            <ul class="nav nav-pills flex-row gap-2 mb-3" id="nav-groups" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="  btn btn-sm btn-warning rounded-3  active " data-bs-toggle="tab" data-bs-target="#tab-todas" type="button" role="tab">Todas <!--<span class="badge bg-secondary ms-2">—</span>--></button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class=" btn btn-sm btn-warning rounded-3" data-bs-toggle="tab" data-bs-target="#tab-grupos" type="button" role="tab">Establos <!--<span class="badge bg-secondary ms-2">—</span>--></button>
                </li>
            </ul>

            <div class="tab-content overflow-auto" style="min-height:0;">
                <div class="tab-pane fade show active" id="tab-todas">
                    <div class="d-flex flex-wrap gap-2" id="root-tab-todas"></div>
                </div>

                <div class="tab-pane fade " id="tab-grupos">
                    <div class="d-flex flex-wrap gap-2" id="root-tab-grupos"></div>
                </div>
            </div>
        </div>
    `;
}