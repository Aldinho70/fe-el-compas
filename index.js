import { mapUnits } from "./src/service/compas.js";
import { Main } from "./src/components/Main/Main.js";
import { TOKEN_WIALON } from "./src/config/wialon.config.js";
import { GROUPS_FILTER } from "./src/config/guzman.config.js";
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
            const groupsWithUnits = await WialonService.loadGroupsWithUnits(GROUPS_FILTER);
            
            if( groupsWithUnits[0].units.length ){
                $("body").append(Main());
                
                if($("#root-main-content").length){
                    mapUnits(groupsWithUnits[0].units);
                    console.log(groupsWithUnits[0]);
                }

            }
            

            // const notifications = await notificationsService.getNotifications( hour, 'attendNotifications' );
            // Notifications(notifications);
            hideLoader();

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