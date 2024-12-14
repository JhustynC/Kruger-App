## Descripción del Esquema

### 1. **Enum UserRol**

Define los posibles roles de usuario.

- `ADMIN`: Rol de administrador.
- `CLIENT`: Rol de cliente.

### 2. **Model User**

Define la entidad de usuario con las siguientes propiedades:

- `id`: Identificador único del usuario (entero, autoincremental).
- `idCard`: Número de identificación único del usuario (cadena).
- `coordinates`: Coordenadas asociadas al usuario (cadena).
- `names`: Nombres del usuario (cadena).
- `surnames`: Apellidos del usuario (cadena).
- `mail`: Correo electrónico único del usuario (cadena).
- `role`: Rol del usuario, que se asocia con el enum `UserRol`.
- `username`: Nombre de usuario (cadena).
- `password`: Contraseña del usuario (cadena).
- `user_id`: ID de usuario, por defecto 0 (entero).
- `created_at`: Fecha de creación del registro (DateTime, valor por defecto: ahora).
- `update_at`: Fecha de actualización del registro (DateTime, valor por defecto: ahora).
- `sectors`: Relación con la entidad `Sector` (un usuario puede estar relacionado con varios sectores).

### 3. **Model Sector**

Define la entidad de sector con las siguientes propiedades:

- `id`: Identificador único del sector (entero, autoincremental).
- `name`: Nombre del sector (cadena, único).
- `polygon`: Polígono representando el sector (cadena).
- `created_at`: Fecha de creación del sector (DateTime, valor por defecto: ahora).
- `update_at`: Fecha de actualización del sector (DateTime, valor por defecto: ahora).
- `user_id`: ID del usuario relacionado con el sector (entero, por defecto 1).
- `user`: Relación con la entidad `User` (un sector está relacionado con un usuario).
- `interruptions`: Relación con la entidad `Interruption` (un sector puede tener múltiples interrupciones).

### 4. **Model Interruption**

Define la entidad de interrupción con las siguientes propiedades:

- `id`: Identificador único de la interrupción (entero, autoincremental).
- `startTime`: Fecha y hora de inicio de la interrupción (DateTime).
- `endTime`: Fecha y hora de fin de la interrupción (DateTime).
- `sectorId`: ID del sector asociado a la interrupción (entero).
- `sector`: Relación con la entidad `Sector` (una interrupción está asociada con un sector).

### 5. **Enum SeverityLevel**

Define los niveles de severidad posibles.

- `LOW`: Severidad baja.
- `MEDIUM`: Severidad media.
- `HIGH`: Severidad alta.

### 6. **Model LogModel**

Define la entidad de log con las siguientes propiedades:

- `id`: Identificador único del log (entero, autoincremental).
- `message`: Mensaje del log (cadena).
- `origin`: Origen del log (cadena).
- `level`: Nivel de severidad del log, que se asocia con el enum `SeverityLevel`.
- `createAt`: Fecha de creación del log (DateTime, valor por defecto: ahora).

---
