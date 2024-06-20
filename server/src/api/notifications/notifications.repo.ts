import { AppDataSource } from "../../data-source";
import { User } from "../users/users.entity";
import { Notification } from "./notifications.entity";

const _nR = AppDataSource.getRepository(Notification);
const _uR = AppDataSource.getRepository(User);

export const NotificationRepository = AppDataSource.getRepository(Notification).extend({
    
    // Admin routes_________________________________________________________________________________________________________________________________
    async getAllNotifications(query) {
        const take = query.take || 50
        const skip = query.skip || 0
        return await _nR.find({
            relations: {
                user: true
            },
            take: take,
            skip: skip
        });
    },

    async getNotificationById(notificationId: number) {
        return await _nR.findOne({
            relations: {
                user: true
            },
            where: {
                id: notificationId
            }
        });
    },

    async addNotification(notificationData: {
        userId: number,
        notificationDate: number,
        title: string,
        content: string
    }) {
        const user = await _uR.findOne({ where: { id: notificationData.userId }});

        return await _nR.save(_nR.create({
            user: user,
            notificationDate: notificationData.notificationDate,
            title: notificationData.title,
            content: notificationData.content
        }));
    },
    
    async removeNotification(notificationId: number) {
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Notification)
            .where("id = :id", { id: notificationId })
            .execute()
        return { message: "Notification successfuly removed."};
    },

    async updateNotification(notificationData) {
        if (notificationData.userId) {
            notificationData.user = await _uR.findOne({ where: { id: notificationData.userId }});
        }
        return await _nR.save(notificationData);
    },

    // User routes_________________________________________________________________________________________________________________________________
    async getUsersNotifications(userId: number) {
        return await _nR.find({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: userId
                } 
            }
        });
    },

    async getUsersNotificationById(userId: number, notificationId: number) {
        return await _nR.findOne({
            relations: {
                user: true
            },
            where: {
                id: notificationId,
                user: {
                    id: userId
                } 
            }
        });
    },

    async readNotification(userId: number, notificationId: number) {
        let notification =  await _nR.findOne({
            relations: {
                user: true
            },
            where: {
                id: notificationId,
                user: {
                    id: userId
                } 
            }
        });
        notification.isRead = true;
        return await _nR.save(notification);
    },

});