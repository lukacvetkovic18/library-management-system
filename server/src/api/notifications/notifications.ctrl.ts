import { NotificationRepository } from "./notifications.repo";

export default async (server) => {
    const nR = NotificationRepository;

    // Admin routes_________________________________________________________________________________________________________________________________
    const getAllNotifications = async (req, reply) => {
        try {
            return await nR.getAllNotifications(req.query);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const getNotificationById = async (req, reply) => {
        try {
            return await nR.getNotificationById(req.params.notificationId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const addNotification = async (req, reply) => {
        try {
            return await nR.addNotification(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const removeNotification = async (req, reply) => {
        try {
            return await nR.removeNotification(req.params.notificationId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const updateNotification = async (req, reply) => {
        try {
            return await nR.updateNotification(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    // User routes_________________________________________________________________________________________________________________________________
    const getUsersNotifications = async (req, reply) => {
        try {
            return await nR.getUsersNotifications(req.user.id);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const getUsersNotificationById = async (req, reply) => {
        try {
            return await nR.getUsersNotificationById(req.user.id, req.params.notificationId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const readNotification = async (req, reply) => {
        try {
            console.log(req);
            return await nR.readNotification(req.user.id, req.body.notificationId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    return {
        getAllNotifications,
        getNotificationById,
        addNotification,
        removeNotification,
        updateNotification,
        getUsersNotifications,
        getUsersNotificationById,
        readNotification
    };
}