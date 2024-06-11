import { UserRepository } from "./users.repo";

export default async (server) => {
    const uR = UserRepository;

    // Admin routes_________________________________________________________________________________________________________________________________
    const getAllUsers = async (req, reply) => {
        try {
            return await uR.getAllUsers(req.query);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const getUserById = async (req, reply) => {
        try {
            return await uR.getUserById(req.params.userId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const addUser = async (req, reply) => {
        try {
            return await uR.addUser(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const removeUser = async (req, reply) => {
        try {
            return await uR.removeUser(req.params.userId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const updateUser = async (req, reply) => {
        try {
            return await uR.updateUser(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    // User routes_________________________________________________________________________________________________________________________________
    const getUserInfo = async (req, reply) => {
        try {
            return await uR.getUserInfo(req.user.id);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const selfDeleteUser = async (req, reply) => {
        try {
            return await uR.selfDeleteUser(req.user.id);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const updateUserInfo = async (req, reply) => {
        try {
            return await uR.updateUserInfo(req.user.id, req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const updateProfilePicture = async (req, reply) => {
        try {
            return await uR.updateProfilePicture(req.user.id, req.body.imagePath);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };


    return {
        getAllUsers,
        getUserById,
        addUser,
        removeUser,
        updateUser,
        getUserInfo,
        selfDeleteUser,
        updateUserInfo,
        updateProfilePicture
    };
}