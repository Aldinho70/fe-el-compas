export const Tabs = () => {
    return `
        <div class="units-sidebar bg-white shadow-sm rounded-4 p-3 h-100 d-flex flex-column">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="mb-0 text-secondary">Unidades</h6>
            </div>

            <div class="segmented-control mb-3" id="nav-groups" role="tablist">
                <button class="segmented-btn active" data-bs-toggle="tab" data-bs-target="#tab-todas" type="button" role="tab">
                    <i class="bi bi-grid-fill me-1"></i> Todas
                </button>
                <button class="segmented-btn" data-bs-toggle="tab" data-bs-target="#tab-grupos" type="button" role="tab">
                    <i class="bi bi-house-door-fill me-1"></i> Establos
                </button>
                <span class="segmented-indicator"></span>
            </div>

            <div class="tab-content overflow-auto" style="min-height:0;">
                <div class="tab-pane fade show active" id="tab-todas">
                    <div class="d-flex flex-wrap gap-2" id="root-tab-todas"></div>
                </div>

                <div class="tab-pane fade" id="tab-grupos">
                    <div class="d-flex flex-wrap gap-2" id="root-tab-grupos"></div>
                </div>
            </div>
        </div>
    `;
}