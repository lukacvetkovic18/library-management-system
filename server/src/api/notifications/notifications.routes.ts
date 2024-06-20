import notificationsCtrl from "./notifications.ctrl";
import { addNotificationSchema, getAllNotificationsSchema, getNotificationByIdSchema, getUsersNotificationByIdSchema, getUsersNotificationsSchema, readNotificationSchema, removeNotificationSchema, updateNotificationSchema } from "./notifications.schema";

export default async (fastify, opts) => {
    const notificationController = notificationsCtrl(fastify);

    // Admin routes_________________________________________________________________________________________________________________________________
    fastify.route({
        method: "GET",
        url: "/api/admin/notifications",
        preValidation: fastify.adminACL,
        handler: (await notificationController).getAllNotifications,
        schema: getAllNotificationsSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/admin/notifications/:notificationId",
        preValidation: fastify.adminACL,
        handler: (await notificationController).getNotificationById,
        schema: getNotificationByIdSchema
    });

    fastify.route({
        method: "POST",
        url: "/api/admin/notifications",
        preValidation: fastify.adminACL,
        handler: (await notificationController).addNotification,
        schema: addNotificationSchema
    });

    fastify.route({
        method: "DELETE",
        url: "/api/admin/notifications/:notificationId",
        preValidation: fastify.adminACL,
        handler: (await notificationController).removeNotification,
        schema: removeNotificationSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/admin/notifications",
        preValidation: fastify.adminACL,
        handler: (await notificationController).updateNotification,
        schema: updateNotificationSchema
    });

    // User routes_________________________________________________________________________________________________________________________________
    fastify.route({
        method: "GET",
        url: "/api/notifications",
        preValidation: fastify.userACL,
        handler: (await notificationController).getUsersNotifications,
        schema: getUsersNotificationsSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/notifications/:notificationId",
        preValidation: fastify.userACL,
        handler: (await notificationController).getUsersNotificationById,
        schema: getUsersNotificationByIdSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/notifications/read",
        preValidation: fastify.userACL,
        handler: (await notificationController).readNotification,
        schema: readNotificationSchema
    });

}