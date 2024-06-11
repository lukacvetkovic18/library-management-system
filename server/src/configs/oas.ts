export const oas = {
    routePrefix: '/documentation',
    openapi: {
        info: {
            title: 'Library Management System API',
            description: 'Library Management System API Documentation',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: "http://0.0.0.0:3100",
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        security: [{ BearerAuth: [], BasicAuth: [],  }],

        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'apiKey',
                in: 'header'
              }
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
                BasicAuth: {
                    type: 'http',
                    scheme: 'basic',
                },
            },
        },
    },

    exposeRoute: true
}