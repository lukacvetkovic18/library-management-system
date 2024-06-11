import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import process from "process";

export default fp(async (fastify:any, done) => {

    fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECRET
    })

    fastify.decorate("adminACL", async (req, reply) => {
        fastify.aclFactory
        {
            const token = await req.jwtVerify();
            if (token.role === "Admin") { }
            else {
                reply.send("Unauthorized");
            }
        }
    })

    fastify.decorate("userACL", async (req, reply) => {
        fastify.aclFactory
        {
            const token = await req.jwtVerify();
            if (token.role === "User" || token.role === "Admin") { }
            else {
                reply.send("Unauthorized");
            }
        }
    });
    
    // done();
})
