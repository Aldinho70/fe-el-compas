import { Main } from "./src/components/Main/Main.js";
import { TOKEN_WIALON } from "./src/config/wialon.config.js";
import { GROUPS_FILTER } from "./src/config/compas.config.js";
import { mapUnits, mapGroups } from "./src/service/compas.js";
import { showLoader, hideLoader } from "./src/components/components/Loader/Loader.js";

// import { Notifications } from "./src/components/Notifications/Notifications.js";
// import NotificationsService from "./src/service/notifications_service.js";

// const notificationsService = new NotificationsService();
// const hour = 24;

$(async () => {
    const initWialon = async () => {
        try {
            showLoader();
            await WialonService.login(TOKEN_WIALON);
            const groupsWithUnits = await WialonService.loadGroupsWithUnits( GROUPS_FILTER );
            const allUnits = groupsWithUnits.flatMap(item => item.units);

            if( allUnits.length ){
                $("body").append(Main());
                if($("#root-main-content").length){
                    mapUnits(allUnits);
                    mapGroups(groupsWithUnits);
                    hideLoader();
                }
            }
            // const notifications = await notificationsService.getNotifications( hour, 'attendNotifications' );
            // Notifications(notifications);
        } catch (err) {
            console.error(err);
        }
    };
    
    const relouder = async () => {
        try {
            console.log('Recargando informacion');
            

        } catch (err) {
            console.error(err);
        }
    };

    await initWialon();

    // // Repetir cada 50 segundos
    // setInterval(relouder, 5 * 60 * 1000);
})