import { Notifications } from "../Notifications.js";
import NotificationsService from "../../../service/notifications_service.js";

const notificationService = new NotificationsService();

export const NotificationsSummary = async () => {
    const session_wialon = WialonService.getSession();
    const notifications_summary = await getSummaryNotifications();
    const $container = $("#notifications-container").empty();

    if (!notifications_summary.length) {
        $container.append(`
            <div class="col-12">
                <div class="notifications-empty">
                    <i class="bi bi-inboxes-fill fs-2 d-block mb-2"></i>
                    <h6 class="fw-semibold mb-2">No hay agrupaciones disponibles</h6>
                    <p class="mb-0">No se encontraron resúmenes de notificaciones para mostrar.</p>
                </div>
            </div>
        `);
        return;
    }

    notifications_summary.forEach((ns, index) => {
        const unit = session_wialon.getItem(ns.unit_id);
        const unit_name = unit?.getName?.() || `Unidad ${ns.unit_id}`;
        const unit_icon = unit?.getIconUrl?.(32) || "";
        const cardClass = index % 2 === 0 ? "notification-summary-card notification-summary-card--medium" : "notification-summary-card notification-summary-card--high";

        $container.append(`
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div class="card h-100 ${cardClass}" role="button" tabindex="0" onClick="showNotificationsByUnit(${ns.unit_id})" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showNotificationsByUnit(${ns.unit_id}); }">
                    <div class="card-body d-flex flex-column justify-content-between p-4">
                        <div class="d-flex align-items-start justify-content-between gap-2 mb-3">
                            <div class="d-flex align-items-center gap-2">
                                <div class="summary-icon">
                                    ${unit_icon ? `<img src="${unit_icon}" alt="${unit_name}" width="24" height="24" />` : '<i class="bi bi-truck"></i>'}
                                </div>
                                <div>
                                    <h6 class="fw-semibold mb-1">${unit_name}</h6>
                                    <span class="summary-pill">Unidad activa</span>
                                </div>
                            </div>
                            <i class="bi bi-arrow-right-circle-fill text-primary"></i>
                        </div>

                        <div class="text-center py-3">
                            <h1 class="display-6 fw-bold text-dark mb-1">${ns.total_notifications}</h1>
                            <span class="text-muted text-uppercase fw-semibold small">Notificaciones totales</span>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-light">
                            <span class="text-muted small">Ver detalle</span>
                            <i class="bi bi-chevron-right text-secondary"></i>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
};

const getSummaryNotifications = async () => {
    try {
        const response = await notificationService.getNotificationsSummaryByUnit();

        if( response.status == "ok" ){
            return response.mensaje
        }else{
            return []
        }    
    } catch (error) {
        console.log( error )
    }
}

const showNotificationsByUnit = async ( unit_id ) => {
    try {
        const response =  await notificationService.getNotificationsByUnit( unit_id );
        if( response.status == "ok" ){
            const notifications = response;
            Notifications( notifications );
        }
    } catch (error) {
        console-log( error )        
    }
}
window.showNotificationsByUnit = showNotificationsByUnit;