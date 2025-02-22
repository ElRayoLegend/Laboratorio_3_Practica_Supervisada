import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Gestor_de_opiniones API",
            version:"1.0.0",
            description: "API para sistema de gestion de opiniones",
            contact:{
                name: "Adrian Morataya",
                email: "ssoto-2023147@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/gestorOpiniones/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/category/*.js",
        "./src/post/*.js",
        "./src/comment/*.js"

    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUI }