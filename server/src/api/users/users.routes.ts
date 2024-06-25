import { AppDataSource } from "../../data-source";
import usersCtrl from "./users.ctrl";
import { User } from "./users.entity";
import { addUserSchema, contactAdminSchema, getAllUsersSchema, getUserByIdSchema, getUserInfoSchema, removeUserSchema, selfDeleteUserSchema, updateProfilePictureSchema, updateUserInfoSchema, updateUserPasswordSchema, updateUserSchema, userLoginSchema, userRegisterSchema } from "./users.schema";

export default async (fastify, opts) => {
    const userController = usersCtrl(fastify);
    const userRepo = AppDataSource.getRepository(User);

    // Admin routes_________________________________________________________________________________________________________________________________
    fastify.route({
        method: "GET",
        url: "/api/admin/users",
        preValidation: fastify.adminACL,
        handler: (await userController).getAllUsers,
        schema: getAllUsersSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/admin/users/:userId",
        preValidation: fastify.adminACL,
        handler: (await userController).getUserById,
        schema: getUserByIdSchema
    });

    fastify.route({
        method: "POST",
        url: "/api/admin/users",
        preValidation: fastify.adminACL,
        handler: (await userController).addUser,
        schema: addUserSchema
    });

    fastify.route({
        method: "DELETE",
        url: "/api/admin/users/:userId",
        preValidation: fastify.adminACL,
        handler: (await userController).removeUser,
        schema: removeUserSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/admin/users",
        preValidation: fastify.adminACL,
        handler: (await userController).updateUser,
        schema: updateUserSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/admin/users/password",
        preValidation: fastify.adminACL,
        handler: (await userController).updateUserPassword,
        schema: updateUserPasswordSchema
    });

    // User routes_________________________________________________________________________________________________________________________________
    fastify.post(
        "/api/users/register",
        { schema: userRegisterSchema },
        async (req, reply) => {
            if(!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password) {
                return reply.code(400).send({ message: "Please fill all the required fields to register!" });
            }
            if(await userRepo.findOne({ where: { email: req.body.email }})) {
                return reply.code(400).send({ message: "User with entered email already exits!" });
            }
            if(await userRepo.findOne({ where: { username: req.body.username }})) {
                return reply.code(400).send({ message: "User with entered username already exits!" });
            }
            else {
                const user: any = await userRepo.save(userRepo.create(req.body));
                let role = "User";
                if(user.isAdmin) {
                    role = "Admin";
                }
                const token = await fastify.jwt.sign({ id: user.id, role: role });
                return reply.send({
                    user: user,
                    token: token })
            }
        }
    );

    fastify.post(
        "/api/users/login",
        { schema: userLoginSchema },
        async (req, reply) => {
            const user = await userRepo.findOne({ where: { email: req.body.email }});
            if(!user) {
                return reply.code(400).send({ message: "User not found!" });
            }
            if(!req.body.password) {
                return reply.code(400).send({ message: "Password wasn't sent!" });
            }
            const checkPassword = await user.comparePassword(req.body.password);
            if(!checkPassword) {
                return reply.code(400).send({ message: "Invalid password!" });
            }
            else {
                let role = "User";
                if(user.isAdmin) {
                    role = "Admin";
                }
                const token = await fastify.jwt.sign({ id: user.id, role: role })
                console.log("Success")
                return reply.send({ token: token, isAdmin: user.isAdmin })
            }
        }
    );

    fastify.route({
        method: "GET",
        url: "/api/users",
        preValidation: fastify.userACL,
        handler: (await userController).getUserInfo,
        schema: getUserInfoSchema
    });

    fastify.route({
        method: "DELETE",
        url: "/api/users",
        preValidation: fastify.userACL,
        handler: (await userController).selfDeleteUser,
        schema: selfDeleteUserSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/users",
        preValidation: fastify.userACL,
        handler: (await userController).updateUserInfo,
        schema: updateUserInfoSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/users/profilePicture",
        preValidation: fastify.userACL,
        handler: (await userController).updateProfilePicture,
        schema: updateProfilePictureSchema
    });

    fastify.route({
        method: "POST",
        url: "/api/users/contact",
        preValidation: fastify.userACL,
        handler: (await userController).contactAdmin,
        schema: contactAdminSchema
    });

}