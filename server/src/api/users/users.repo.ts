import { AppDataSource } from "../../data-source";
import { User } from "./users.entity";
import * as bcrypt from "bcryptjs";

const _uR = AppDataSource.getRepository(User);

export const UserRepository = AppDataSource.getRepository(User).extend({
    
    // Admin routes_________________________________________________________________________________________________________________________________
    async getAllUsers(query: {
        take: number | null,
        skip: number | null,
        firstNamePart: string | null,
        lastNamePart: string | null,
        usernamePart: string | null,
    }) {
        const take = query.take || 50
        const skip = query.skip || 0
        let users = await _uR.find();
        
        if(query.firstNamePart) {
            const firstNamePartLower = query.firstNamePart.toLowerCase();
            users = users.filter(l => l.firstName.toLowerCase().includes(firstNamePartLower));
        }
        if(query.lastNamePart) {
            const lastNamePartLower = query.lastNamePart.toLowerCase();
            users = users.filter(l => l.lastName.toLowerCase().includes(lastNamePartLower));
        }
        if(query.usernamePart) {
            const usernamePartLower = query.usernamePart.toLowerCase();
            users = users.filter(l => l.username.toLowerCase().includes(usernamePartLower));
        }
        return users.slice(skip, skip + take);
    },

    async getUserById(userId: number) {
        return await _uR.findOne({
            where: {
                id: userId
            }
        });
    },

    async addUser(userData: {
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string,
        phone: string | null,
        address: string | null,
        imagePath: string | null
    }) {
        return await _uR.save(_uR.create(userData));
    },
    
    async removeUser(userId: number) {
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id: userId })
            .execute()
        return { message: "User successfuly removed."};
    },

    async updateUser(userData) {
        return await _uR.save(userData);
    },

    async updateUserPassword(userData) {
        let user = await _uR.findOne({
            where: {
                id: userData.id
            }
        });
        user.password = userData.password
        return await _uR.save(user);
    },

    // User routes_________________________________________________________________________________________________________________________________
    async getUserInfo(userId: number) {
        return await _uR.findOne({ where: { id: userId }});
    },
    
    async selfDeleteUser(userId: number) {
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id: userId })
            .execute()
        return { message: "User successfuly removed."};
    },

    async updateUserInfo(userId: number, data) {
        data.id = userId;
        if(data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        return await _uR.save(data);
    },

    async updateProfilePicture(userId: number, imagePath: string) {
        let user = await _uR.findOne({ where: { id: userId }});
        user.imagePath = imagePath;
        return await _uR.save(user);
    },

    async contactAdmin(userId: number, subject: string, text: string) {
        let user = await _uR.findOne({ where: { id: userId }});
        const data = {
            receiver: "luka.cvetkovic456@gmail.com",
            subject: subject,
            text: `Username: ${user.username} User Email Address: ${user.email} ${text}`,
            html: `<b>Username: ${user.username}</b><br><br><b>User Email Address: ${user.email}</b><br><br>${text}`,
        }
        return data;
    },

});