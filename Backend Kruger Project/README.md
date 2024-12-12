Version de Node: 18.20.4

Ejemplo de body para el post de usuarios

```json
{
  "idCard": "0102030405",
  "coordinates": [-2.8974, -79.0045],
  "names": "Jhustyn Alexander",
  "surnames": "Perez Torres",
  "mail": "jhustyn@example.com",
  "role": "ADMIN",
  "username": "jhustyn123",
  "password": "securePassword123"
}
```


# Proyecto Kruger

- Autor: Jhustyn Carvajal
- Fecha: 11/12/2024

Aplicación para llevar un registro de los horarios de interrupción del
servicio de energía eléctrica.

### Configuración para levantar el proyecto

#### 1. Configurar variables de entorno

En el caso de la base de datos
se puede usar Docker localmente
o con el link de una base de datos en la nube (Preferiblemente)

En caso de usar docker y haber colocado la información necesaria en el .env ejercutar:

    docker-compose up -d

En caso de querer usar una base en la nube seguir con los otros pasos

#### 2. Iniciar Prisma:

    npx prisma init --datasource-provider postgres

#### 3. Cambios en el esquema de Prisma

Por cada cambio se ejecuta:

    npx prisma migrate dev --name init

Esto realizara la mirgración a la base de datos asignada y creara un nuevo cliente Prisma
```
