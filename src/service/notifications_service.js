import ApiService from './apiService.js';
import { getRangeLast8Hours } from '../utils/parsed_date_time.js';

export default class NotificationsService {
    constructor() {
        this.notifications = [];
        this.ApiService = new ApiService('http://ws4cjdg.com/JDigitalReportsV2/src/api/routes/');
    }

    async getNotifications(hour = 8, type) {
        const types = {
            allNotifications: {
                table: "notifications",
                field_date: "date",
            },
            attendNotifications: {
                table: "view_notifications",
                field_date: "notification_date",
            }
        };

        const table = types[type].table;
        const date = types[type].field_date;
        if (!table) {
            throw new Error(`Tipo de notificación inválido: ${type}`);
        }

        const range_date = getRangeLast8Hours(hour);
        return await this.ApiService.post('utils/getQuery.php', {
            query: `
                SELECT 
                    * 
                FROM 
                    ${table}
                WHERE 
                    ${ date } BETWEEN '${range_date.from}' AND '${range_date.to}' 
                ORDER BY 
                    ${ date } DESC`
        });
    }

    async getNotificationsSummaryByUnit() {
        const range_date = getRangeLast8Hours(24);
        return await this.ApiService.post('utils/getQuery.php', {
            query: `SELECT unit_id, COUNT(*) AS total_notifications
                    FROM view_notifications
                    WHERE 
                        notification_date BETWEEN '${range_date.from}' AND '${range_date.to}'
                    GROUP BY unit_id
                    ORDER BY total_notifications DESC`
        });
    }

    async getNotificationsByUnit(unit_id) {
        const range_date = getRangeLast8Hours(24);
        return await this.ApiService.post('utils/getQuery.php', {
            query: `SELECT *
                    FROM view_notifications
                    WHERE unit_id = ${unit_id} AND notification_date BETWEEN '${range_date.from}' AND '${range_date.to}'
                    ORDER BY notification_date DESC`
        });
    }

    async attendNotification(payload) {
        return await this.ApiService.post('notifications/attendNotification.php', payload);
    }
}