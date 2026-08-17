export const InfoUnit = ( unit ) => {
    // const unit = {
    //     name: "TRACTO-042",
    //     lastConnection: "Hace 2 mins",

    //     speed: 85,
    //     odometer: "124,500",
    //     location: "Carr. Querétaro - San Luis Potosí, KM 42",

    //     fuel: {
    //         percentage: 65,
    //         remaining: 420,
    //         average: 2.4
    //     },

    //     engineHours: "4,250",

    //     route: "N/D"
    // };

    return `
         <div class="telemetry-container">

            <!-- Última conexión 
            <div class="last-connection">
                <i class="bi bi-clock-history me-1"></i>
                Última conexión: ${unit.lastConnection}
            </div>-->


            <!-- ========================= -->
            <!-- TELEMETRÍA GPS -->
            <!-- ========================= -->

            <div class="telemetry-section-title">
                TELEMETRÍA GPS
            </div>

            <div class="row g-3 mb-3">

                <!-- Velocidad -->
                <div class="col-12 col-md-4">
                    <div class="telemetry-card">

                        <div class="d-flex justify-content-between align-items-center">
                            <span class="telemetry-label">
                                Velocidad actual
                            </span>

                            <i class="bi bi-speedometer2 telemetry-icon"></i>
                        </div>

                        <div class="mt-4">
                            <span class="telemetry-value">
                                ${unit.speed}
                            </span>

                            <span class="telemetry-unit">
                                km/h
                            </span>
                        </div>

                    </div>
                </div>


                <!-- Odómetro -->
                <div class="col-12 col-md-4">
                    <div class="telemetry-card">

                        <div class="d-flex justify-content-between align-items-center">
                            <span class="telemetry-label">
                                Odómetro total
                            </span>

                            <i class="bi bi-bezier telemetry-icon"></i>
                        </div>

                        <div class="mt-4">
                            <span class="telemetry-value">
                                ${unit?.odometer || 'No data'}
                            </span>

                            <span class="telemetry-unit">
                                km
                            </span>
                        </div>

                    </div>
                </div>


                <!-- Ubicación -->
                <div class="col-12 col-md-4">
                    <div class="telemetry-card">

                        <div class="d-flex justify-content-between align-items-center">
                            <span class="telemetry-label">
                                Ubicación actual
                            </span>

                            <i class="bi bi-geo-alt telemetry-icon"></i>
                        </div>

                        <div class="mt-4">
                            <div class="location-value">
                                ${unit.location}
                            </div>
                        </div>

                    </div>
                </div>

            </div>


            <!-- ========================= -->
            <!-- KPIS DE RENDIMIENTO -->
            <!-- ========================= -->

            <div class="telemetry-section-title">
                KPIS DE RENDIMIENTO
            </div>

            <div class="row g-3 mb-3">

                <!-- Combustible -->
                <div class="col-12 col-md-6">

                    <div class="telemetry-card">

                        <div class="d-flex justify-content-between align-items-center">

                            <div>
                                <i class="bi bi-fuel-pump telemetry-icon me-2"></i>

                                <span class="fw-semibold"
                                      style="font-family: Georgia, serif; font-size: 12px;">
                                    Nivel de Combustible
                                </span>
                            </div>

                            <small style="font-family: Georgia, serif;">
                                Promedio: ${unit?.fuel?.average || 'No data'} km/L
                            </small>

                        </div>

                        <div class="telemetry-divider"></div>

                        <div class="d-flex justify-content-between align-items-end">

                            <span class="telemetry-value">
                                ${unit?.fuel?.percentage || 'No data'}%
                            </span>

                            <span class="text-muted" style="font-size: 10px;">
                                ${unit?.fuel?.remaining || 'No data'}L restantes
                            </span>

                        </div>

                        <div class="progress fuel-progress mt-3">
                            <div
                                class="progress-bar"
                                role="progressbar"
                                style="width: ${unit?.fuel?.percentage || 0}%"
                                aria-valuenow="${unit?.fuel?.percentage || 0}"
                                aria-valuemin="0"
                                aria-valuemax="100">
                            </div>
                        </div>

                    </div>

                </div>


                <!-- Horas de motor -->
                <div class="col-12 col-md-6">

                    <div class="telemetry-card overflow-hidden">

                        <div class="d-flex align-items-center">

                            <i class="bi bi-person-gear telemetry-icon me-2"></i>

                            <span class="fw-semibold"
                                  style="font-family: Georgia, serif; font-size: 12px;">
                                Horas de Motor
                            </span>

                        </div>

                        <div class="telemetry-divider"></div>

                        <div class="telemetry-value mb-2">
                            ${unit?.engineHours || 'No data'}
                            <span class="telemetry-unit">
                                hrs
                            </span>
                        </div>

                        <!-- Decoración tipo gráfica -->
                        <div class="engine-chart">
                            <svg viewBox="0 0 500 80"
                                 preserveAspectRatio="none">

                                <path
                                    d="
                                        M0,55
                                        C60,45 80,50 120,45
                                        C160,40 170,30 220,35
                                        C270,40 290,55 330,48
                                        C380,40 400,55 430,45
                                        C460,35 480,30 500,25
                                        L500,80
                                        L0,80
                                        Z
                                    "
                                    fill="#e5dfcc">
                                </path>

                            </svg>
                        </div>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- MAPA -->
            <!-- ========================= -->

            <div class="d-flex justify-content-between align-items-center mb-2">

                <div class="telemetry-section-title mb-0">
                    MAPA DE POSICIÓN
                </div>

                <a href="#"
                   class="google-maps-link">

                    Ver en Google Maps
                    <i class="bi bi-box-arrow-up-right ms-1"></i>

                </a>

            </div>


            <div class="map-container">

                <iframe
                    width="100%"
                    height="300"
                    style="border:0"
                    loading="lazy"
                    allowfullscreen
                    src="https://www.google.com/maps?q=${unit.Latitud},${unit.Longitud}&t=k&z=15&output=embed">
                </iframe>
                <div
                    id="unit-map"
                    class="map-background">
                </div>


                <!-- Información de la unidad -->
                <div class="unit-map-marker">

                    <div class="d-flex align-items-center gap-2">

                        <i class="bi bi-truck"></i>

                        <div>

                            <div class="unit-map-name">
                                ${unit.name}
                            </div>

                            <div class="unit-map-route">
                                Ruta: ${unit.route}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    `;
}