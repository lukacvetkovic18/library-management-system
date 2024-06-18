import { AppDataSource } from "../../data-source";
import { User } from "./users.entity";
import * as bcrypt from "bcryptjs";

const _uR = AppDataSource.getRepository(User);

export const UserRepository = AppDataSource.getRepository(User).extend({
    
    // Admin routes_________________________________________________________________________________________________________________________________
    async getAllUsers(query) {
        const take = query.take || 50
        const skip = query.skip || 0
        return await _uR.find({
            take: take,
            skip: skip
        });
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

});