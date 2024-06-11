import Fastify, { FastifyInstance, FastifyListenOptions } from "fastify";
import { config } from "dotenv";
import { join } from "path";

// configs
import { oas } from "./configs/oas"

// fastify plugins
import autoLoad from '@fastify/autoload'
import fastifySensible from '@fastify/sensible';
import fastifyCors from "@fastify/cors";

// database plugin
import { AppDataSource } from "./data-source";

config();

const PORT = process.env.PORT || "3100"
const HOST = process.env.HOST || "0.0.0.0"

const init = async () => {

    const server: FastifyInstance = Fastify({
        logger: true,
        maxParamLength: 250,
        bodyLimit: 100 * 1024 * 1024  // Allow up to 100 MB payloads
    })

    server.register(fastifySensible);

    server.register(require("@fastify/swagger"), oas);
    server.register(fastifyCors), {
        origin: true
    }

    await server.register(autoLoad, {
        dir: join(__dirname, "./plugins"),
    });

    await server.register(autoLoad, {
        dir: join(__dirname, './api'),
        indexPattern: /.*routes(\.ts|\.js|\.cjs|\.mjs)$/,
        dirNameRoutePrefix: false,
        ignorePattern: /.*(DAL).js/
    });

    await server.ready();
    console.info("Everything loaded!");
    return server;
}

const start = async () => {
    try {
        const server = await init();

        // Must create an interface in fastify v4 due to the change to the .listen property which now needs to accept a fastify listen option
        const serverOpts: FastifyListenOptions = {
            host: HOST,
            port: +PORT,
        }
        server.listen(serverOpts, (err) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });
        AppDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!");
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            })
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }

}

start();