export interface Notification {
    id: number;
    userId: number;
    username: string;
    notificationDate: Date;
    title: string;
    content: string;
    isRead: boolean;
}