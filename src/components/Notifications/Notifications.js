import { Modal, close_modal } from "../components/Modal/Modal.js";
import NotificationsService from "../../service/notifications_service.js";
import { NotificationsSummary } from "./NotificationsSummary/NotificationsSummary.js";

const notificationsService = new NotificationsService();

export const Notifications = (notifications = {}, options = {}) => {
    let mensajes = notifications.mensaje || [];
    const itemsPerPage = options.itemsPerPage || 8;
    const session_wialon = WialonService.getSession();
    let currentPage = 1;
    let currentFilter = 'all'; // 'all' | 'attended' | 'unattended'

    const getFilteredMessages = () => {
        if (currentFilter === 'attended') return mensajes.filter(n => n.resolution != null);
        if (currentFilter === 'unattended') return mensajes.filter(n => n.resolution == null);
        return mensajes;
    };

    const setFilter = (filter) => {
        currentFilter = filter;
        currentPage = 1;
        // Toggle active class
        $(".notifications-filter-btn").removeClass('active');
        if (filter === 'all') {
            $("#btn-all-notifications").addClass('active');
        } else if (filter === 'attended') {
            $("#btn-attended-notifications").addClass('active');
        } else if (filter === 'unattended') {
            $("#btn-unattended-notifications").addClass('active');
        }
        renderCards(currentPage);
        renderPagination();
    };

    const getTotalPages = () => Math.max(1, Math.ceil(getFilteredMessages().length / itemsPerPage));

    // Montaje: se crea UNA sola vez (mismo patrón que ya corregimos en Notifications)
    if ($("#notifications-root").length === 0) {
        $("body").append(`
            <div id="notifications-root" class="container-fluid px-3 px-md-4 py-2">
                <div id="banner-root" class="notifications-toolbar d-flex flex-wrap align-items-center justify-content-between gap-3 p-3 mb-3">
                    <div class="d-flex flex-wrap align-items-center gap-2">
                        <div class="notifications-badge">
                            <i class="bi bi-bell-fill"></i>
                        </div>
                        <div>
                            <h5 class="mb-0 text-dark fw-semibold">Centro de alertas</h5>
                            <small class="text-muted">Monitoreo en tiempo real de temperatura y estado</small>
                        </div>
                    </div>

                    <div class="btn-group flex-wrap gap-2" role="group" id="notifications-filters" aria-label="Filtros de notificaciones">
                        <button class="btn btn-sm notifications-filter-btn active" data-filter="all" id="btn-all-notifications">
                            <i class="bi bi-grid-fill me-1"></i>Todas
                        </button>
                        <button class="btn btn-sm notifications-filter-btn" data-filter="attended" id="btn-attended-notifications">
                            <i class="bi bi-check2-circle me-1"></i>Atendidas
                        </button>
                        <button class="btn btn-sm notifications-filter-btn" data-filter="unattended" id="btn-unattended-notifications">
                            <i class="bi bi-exclamation-circle me-1"></i>No atendidas
                        </button>
                        <button class="btn btn-sm notifications-filter-btn" data-filter="all" id="btn-summary-notifications">
                            <i class="bi bi-truck me-1"></i>Agrupar por unidad
                        </button>
                    </div>

                    <nav id="notifications-pagination" class="d-flex justify-content-center flex-grow-1 flex-md-grow-0"></nav>
                </div>
            </div>
        `);
    }

    if ($("#notifications-container").length === 0) {
        $("#notifications-root").append(`
            <div id="notifications-container" class="row g-3 notifications-scroll align-items-stretch"></div>
        `);
    }

    const renderEmptyState = () => {
        const $container = $("#notifications-container").empty();

        $container.append(`
            <div class="col-12">
                <div class="card border-0 shadow-sm text-center py-5" style="background: linear-gradient(135deg, #f8fbff 0%, #f5f9ff 100%);">
                    <div class="card-body d-flex flex-column align-items-center justify-content-center gap-3">
                        <div style="width: 110px; height: 110px; border-radius: 50%; background: rgba(37, 99, 235, 0.10); display: flex; align-items: center; justify-content: center;">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 10C21.5 10 13 18.5 13 29V38.5L10 42V45H54V42L51 38.5V29C51 18.5 42.5 10 32 10Z" fill="#60A5FA"/>
                                <path d="M24 47C24 41.5 27.5 37 32 37C36.5 37 40 41.5 40 47H24Z" fill="#2563EB"/>
                                <circle cx="32" cy="24" r="8" fill="#FFFFFF"/>
                            </svg>
                        </div>
                        <div>
                            <h6 class="mb-2 fw-semibold text-dark">No hay notificaciones por el momento</h6>
                            <p class="mb-0 text-muted">Cuando aparezcan alertas térmicas, se mostrarán aquí automáticamente.</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    };

    const renderCards = (page) => {
        const $container = $("#notifications-container").empty();

        const filtered = getFilteredMessages();

        if (filtered.length === 0) {
            renderEmptyState();
            return;
        }

        const start = (page - 1) * itemsPerPage;
        const pageItems = filtered.slice(start, start + itemsPerPage);

        pageItems.forEach((notification) => {
            const isAttended = notification.resolution != null;
            const statusClass = isAttended ? "status-pill status-pill--ok" : "status-pill status-pill--pending";
            const statusIcon = isAttended ? "bi-check-circle-fill" : "bi-exclamation-circle-fill";
            const statusLabel = isAttended ? "Atendida" : "No atendida";
            const renderedNotification = parseNotification(notification?.notification_description || "");
            const tempColor = renderedNotification.temperature != null && renderedNotification.temperature > 30 ? "text-danger" : "text-info";
            const unitTitle = renderedNotification.unit || "Unidad sin identificar";
            const unit = session_wialon.getItem(notification.unit_id);
            const unit_icon = unit?.getIconUrl?.(32) || "";

            $container.append(`
                <div class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex">
                    <div class="card notification-card flex-fill h-100">
                        <div class="card-header d-flex justify-content-between align-items-start gap-2" style="background: ${notification?.color ? `${notification.color}14` : 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 100%)'};">
                            <div class="d-flex align-items-center gap-2 text-truncate">
                                <div class="notifications-badge" style="width: 36px; height: 36px; font-size: 0.95rem; box-shadow: none; background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);">
                                    ${unit_icon ? `<img src="${unit_icon}" alt="${unitTitle}" width="24" height="24" />` : '<i class="bi bi-truck"></i>'}
                                </div>
                                <div class="min-w-0">
                                    <div class="fw-semibold text-dark text-truncate">${unitTitle}</div>
                                    <small class="text-muted">Alerta térmica</small>
                                </div>
                            </div>
                            <span class="${statusClass}">
                                <i class="bi ${statusIcon}"></i>
                                ${statusLabel}
                            </span>
                        </div>

                        <div class="card-body d-flex flex-column">

                            <!-- Temperatura como dato destacado -->
                            ${renderedNotification?.temperature != null ? `
                                <div class="d-flex align-items-center gap-3 p-3 rounded-3 mb-3 bg-body-secondary bg-opacity-50">
                                    <div class="d-flex align-items-center justify-content-center rounded-circle bg-white shadow-sm" style="width:48px;height:48px;">
                                        <i class="bi bi-thermometer-half fs-5 ${tempColor}"></i>
                                    </div>
                                    <div>
                                        <div class="text-muted text-uppercase small mb-0" style="letter-spacing:.04em; font-size:.7rem;">Temperatura</div>
                                        <div class="fs-4 fw-bold lh-1 ${tempColor}">${renderedNotification.temperature}°<small class="fs-6 fw-normal">C</small></div>
                                    </div>
                                </div>
                            ` : ''}

                            <ul class="list-unstyled d-flex flex-column gap-2 flex-grow-1 mb-3">
                                <li class="d-flex align-items-center gap-2">
                                    <i class="bi bi-info-circle-fill text-primary"></i>
                                    <span>Variación de temperatura</span>
                                </li>

                                ${renderedNotification?.ubication != null ? `
                                    <li class="d-flex align-items-start gap-2">
                                        <i class="bi bi-pin-map-fill text-secondary mt-1"></i>
                                        <span>${renderedNotification.ubication}</span>
                                    </li>` : ''}

                                ${renderedNotification?.unit == null && renderedNotification?.temperature == null && renderedNotification?.ubication == null ? `
                                    <li class="d-flex align-items-start gap-2">
                                        <i class="bi bi-chat-left-text-fill text-secondary mt-1"></i>
                                        <span>${notification?.notification_description || 'Descripción de notificación no disponible'}</span>
                                    </li>` : ''}
                            </ul>

                            <!-- Comentario del monitorista, solo si existe -->
                            ${notification?.resolution ? `
                                <div class="border-start border-3 border-success rounded-2 bg-success-subtle bg-opacity-25 p-2 mb-3">
                                    <div class="d-flex align-items-center gap-2 mb-1">
                                        <i class="bi bi-person-check-fill text-warning-emphasis"></i>
                                        <strong class="small">Comentario del monitorista</strong>
                                    </div>
                                    <p class="mb-0 small text-body-secondary">
                                        ${(notification.resolution == 'otra') ? notification.comment : notification.resolution }
                                    </p>
                                </div>
                            ` : ''}

                            <hr class="mt-auto mb-2">
                            <footer class="footer d-flex align-items-center justify-content-between gap-2 mb-0 px-1">
                                <div class="text-muted small">
                                    <i class="bi bi-clock-fill me-1"></i>
                                    <span>${notification?.notification_date || 'Fecha no disponible'}</span>
                                </div>
                                <button class="btn btn-sm btn-${ isAttended ? 'success' : 'danger'} fw-semibold px-3" ${ isAttended && 'disabled'} onClick="attendNotification('${notification.notification_id}', '${renderedNotification.temperature}', '${unitTitle}')">
                                    <i class="bi bi-check2-circle me-1"></i>
                                    ${ isAttended ? 'Atendido' : 'Atender'}
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
            `);
        });
    };

    const getPageNumbers = (current, total, delta = 2) => {
        const range = [];
        const rangeWithDots = [];
        let last = null;

        for (let i = 1; i <= total; i++) {
            // Siempre mostramos: primera, última, y las que estén cerca de la actual (± delta)
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
                range.push(i);
            }
        }

        range.forEach((page) => {
            if (last !== null) {
                if (page - last === 2) {
                    // hueco de un solo número -> mejor mostrarlo en vez de "..."
                    rangeWithDots.push(last + 1);
                } else if (page - last > 2) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(page);
            last = page;
        });

        return rangeWithDots;
    };

    const renderPagination = () => {
        const $pagination = $("#notifications-pagination").empty();
        const totalPages = getTotalPages();
        if (totalPages <= 1) return;

        const $ul = $(`<ul class="pagination"></ul>`);

        $ul.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Anterior</a>
        </li>
    `);

        getPageNumbers(currentPage, totalPages).forEach((page) => {
            if (page === '...') {
                $ul.append(`
                <li class="page-item disabled">
                    <span class="page-link">…</span>
                </li>
            `);
            } else {
                $ul.append(`
                <li class="page-item ${page === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${page}">${page}</a>
                </li>
            `);
            }
        });

        $ul.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Siguiente</a>
        </li>
    `);

        $pagination.append($ul);
    };

    const goToPage = (page) => {
        const totalPages = getTotalPages();
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderCards(currentPage);
        renderPagination();
    };

    const refreshNotifications = async (page = currentPage) => {
        const response = await notificationsService.getNotifications(24, "attendNotifications");
        mensajes = response?.mensaje || [];
        currentPage = Math.min(page, getTotalPages());
        renderCards(currentPage);
        renderPagination();
    };

    const parseNotification = (text = "") => {
        const unitMatch = text.match(/^(.+?):/);
        const tempMatch = text.match(/sensor TEMPERATURA activado con el valor\s+([-+]?\d+\.?\d*)\s*°C/i);
        const dateMatch = text.match(/En\s+(\d{2}\.\d{2}\.\d{4}\s+\d{2}:\d{2}:\d{2})/i);
        const speedMatch = text.match(/velocidad de\s+([-+]?\d+\.?\d*)\s*km\/h/i);
        const ubicationMatch = text.match(/cerca de\s+'([^']+)'/i);

        return {
            unit: unitMatch ? unitMatch[1].trim() : null,
            temperature: tempMatch ? parseFloat(tempMatch[1]) : null,
            date: dateMatch ? dateMatch[1].trim() : null,
            speed: speedMatch ? parseFloat(speedMatch[1]) : null,
            ubication: ubicationMatch ? ubicationMatch[1].trim() : null
        };
    };

    const attendNotification = (notification_id, temperature, unit_name) => {
        const form = `
            <form>
                <div class="mb-3">
                    <label for="unit_name_input" class="form-label">Unidad</label>
                    <input type="text" class="form-control" value="${unit_name}" id="unit_name_input" disabled>
                </div>
                <div class="mb-3">
                    <label for="temperature_input" class="form-label">Temperatura</label>
                    <input type="text" class="form-control" value="${temperature} °C" id="temperature_input" disabled>
                </div>

                <div class="mb-3">
                    <label class="form-label d-block">Acción tomada</label>
                    <div class="btn-group w-100" role="group" aria-label="Acción tomada">

                        <input type="radio" class="btn-check" name="action_type" id="ok_check" value="atendida" autocomplete="off">
                        <label class="btn btn-outline-success" for="ok_check">
                            <i class="bi bi-check-circle-fill me-1"></i>Atendida
                        </label>

                        <input type="radio" class="btn-check" name="action_type" id="support_check" value="soporte" autocomplete="off">
                        <label class="btn btn-outline-primary" for="support_check">
                            <i class="bi bi-headset me-1"></i>Con soporte tecnico
                        </label>

                        <input type="radio" class="btn-check" name="action_type" id="other_check" value="otra" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="other_check">
                            <i class="bi bi-three-dots me-1"></i>Otra acción
                        </label>

                    </div>
                </div>

                <div class="mb-3 d-none" id="comment_wrapper">
                    <label for="comment_input" class="form-label">
                        Comentario <span class="text-danger">*</span>
                    </label>
                    <textarea class="form-control" id="comment_input" rows="3" placeholder="Describe la acción realizada..."></textarea>
                    <div class="invalid-feedback">
                        Por favor describe qué acción se realizó.
                    </div>
                </div>

                <button type="button" class="btn btn-primary" onClick="sendRequest()" id="btn-attend">Atender</button>
                <button class="btn btn-primary visually-hidden" type="button" id="btn-attend-loader" disabled>
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Enviando ...</span>
                </button>

                <div class="card text-bg-success mt-3 visually-hidden" id="card-success-attend">
                    <div class="card-body">
                        Se atendio notificacion.
                    </div>
                </div>
                <div class="card text-bg-danger mt-3 visually-hidden" id="card-failured-attend">
                    <div class="card-body">
                        Fallo en la conexion a base de datos.
                    </div>
                </div>
            </form>
        `

        const sendRequest = async () => {
            const selectedAction = document.querySelector('input[name="action_type"]:checked');

            // Validación PRIMERO, antes de tocar el loader
            if (!selectedAction) {
                alert('Selecciona una acción tomada');
                return;
            }

            const resolution = selectedAction.value; // 'atendida' | 'soporte' | 'otra'
            const comment = commentInput.value.trim();

            if (resolution === 'otra' && !comment) {
                commentInput.classList.add('is-invalid');
                commentInput.focus();
                return;
            }

            // Helpers para no repetir el show/hide en cada rama
            const setLoading = (isLoading) => {
                $("#btn-attend").toggleClass('visually-hidden', isLoading);
                $("#btn-attend-loader").toggleClass('visually-hidden', !isLoading);
            };

            // Reinicia mensajes previos antes de un nuevo intento
            $("#card-success-attend").addClass('visually-hidden');
            $("#card-failured-attend").addClass('visually-hidden');
            setLoading(true);

            const payload = {
                notification_id,
                monitorist: 'monitoreo1', 
                comment: comment || '',
                resolution
            };

            try {
                const response = await notificationsService.attendNotification(payload);
                if (response.status === 'ok') {
                    $("#card-success-attend").removeClass('visually-hidden');
                    setTimeout(async () => {
                        await refreshNotifications(currentPage);
                        close_modal(modal);
                    }, 3000);

                } else {
                    // Respuesta válida pero con error de negocio
                    $("#card-failured-attend").removeClass('visually-hidden');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error al atender la notificación:', error);
                $("#card-failured-attend").removeClass('visually-hidden');
                setLoading(false);
            }
        };
        window.sendRequest = sendRequest;

        const modal = Modal({
            title: `Atender notificacion: ${notification_id}`,
            body: form,
        });

        const otherCheck = document.getElementById('other_check');
        const commentWrapper = document.getElementById('comment_wrapper');
        const commentInput = document.getElementById('comment_input');

        document.querySelectorAll('input[name="action_type"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const showComment = otherCheck.checked;
                commentWrapper.classList.toggle('d-none', !showComment);
                commentInput.required = showComment;

                if (showComment) {
                    commentInput.focus();
                } else {
                    commentInput.value = ''; // limpia el texto si cambian de opción
                    commentInput.classList.remove('is-invalid');
                }
            });
        });
    }
    window.attendNotification = attendNotification;

    // Delegación de eventos: evita listeners duplicados al re-renderizar
    $("#notifications-pagination").off("click").on("click", "a.page-link", function (e) {
        e.preventDefault();
        goToPage(parseInt($(this).data("page")));
    });

    $("#btn-summary-notifications").on("click", async function (e) {
        await NotificationsSummary();
    });

    $("#btn-all-notifications").on("click", async function (e) {
        // Mostrar todas las notificaciones (limpia filtro cliente)
        setFilter('all');
        const notifications = await notificationsService.getNotifications( 24, "attendNotifications" );
        if (notifications?.mensaje?.length > 0) {
            Notifications(notifications);
        }
    });

    $("#btn-attended-notifications").on("click", function (e) {
        e.preventDefault();
        setFilter('attended');
    });

    $("#btn-unattended-notifications").on("click", function (e) {
        e.preventDefault();
        setFilter('unattended');
    });

    goToPage(1);

};