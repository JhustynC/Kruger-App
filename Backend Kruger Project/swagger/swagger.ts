import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kruger Project API Doc",
      version: "1.0.0",
      description:
        "API para la gestión de un sistema para llevar un registro de los horarios de interrupción del servicio de energía eléctrica",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "API local",
      },
    ],
  },
  apis: ["./swagger/*.yml"],
};

export const swaggerSpec = swaggerJsdoc(options);
