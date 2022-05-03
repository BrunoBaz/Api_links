# API PARA COMPARTIR ENLACES

API para compartir enlaces.

## Entidades

### -Users:
- id-----------*(se genera automáticamente)*
- nombre---------*(obligatorio, se pone el nick_name si el usuario no aporta uno)*
- imagen-------*(obligatorio, se pone uno por defecto si el usuario no aporta uno, si se aporta se encripta con nano)*
- userName-----*(obligatorio y único)*
- email--------*(obligatorio y único)*
- password-----*(obligatorio y encryptado con bcrypt)*
- created_at---*(se genera automáticamente)*

### -Links:
- id-----------*(se genera automáticamente)*
- user_id------*(obligatorio)*
- titulo-------*(obligatorio, maximo 30 caracteres)*
- url----------*(obligatorio)*
- description--*(obligatorio, maximo 280 caracteres)*
- created_at---*(se genera automáticamente)*

### -Votes:
- id-------------*(se genera automaticamente)*
- post_id--------*(obligatorio)*
- post_user_id---*(obligatorio)*


## Endpoints

### -**POST /user** Registro de usuario✔
#### -VALIDACIÓN✔
- **Name:** *opcional*
- **userName:**
  -*Debe de ser único*
- **Email:**
  -*Debe ser un email valido*
  -*Debe de ser único*
- **Password:**
  -*Minimo 3 y maximo 8 caracteres*

### -**POST /login** Login de usuario (devuelve token)✔
#### -VALIDACIÓN✔
- **Email:**
  -*Tiene qe existir en la base de datos*
- **Password:**
  -*tiene que ser el correcto para el userName*
### -**PUT /user/:id** Editar el perfil de usuario✔
#### -VALIDACIÓN✔
- **User_id:**
  -*Necesario token*
  
- **Name:** *opcional*
- **userName:**
  -*Debe de ser único*
- **Image:** *opcional*
- **Telefono:** *opcional*
- **Biografia:** *opcional*
- **Email:**
  -*Debe ser un email valido*
  -*Debe de ser único*

### -**GET /user/:id** Devuelve información de usuario✔
#### -VALIDACIÓN✔
- **User_id:**
  -*Necesario token*

### -**POST /link** Permite crear un link✔
#### -VALIDACIÓN✔
- **User_id:**
  -*Necesario token*
- **Titulo:**
  -*Debe debe tener 30 caracteres como máximo*
- **Url:**
  -*Debe ser una url valida*
- **Descripcion:**
  -*Debe debe tener 280 caracteres como máximo*

### -**GET /link** Lista todos los Links✔
#### -VALIDACIÓN✔
  -*No necesita ninguna validación*

### -**GET /link/:id** Deveuelve un link✔
#### -VALIDACIÓN✔
- **id:**
### -**POST /link/:id/votes** Vota a un link✔
#### -VALIDACIÓN✔
- **id:**
- **user_id:**
- *Necesario token*
### -**GET /link/votes** Deveuelve todos los links con la cantidad de votos✔
#### -VALIDACIÓN✔
- **id:**
- 
### -**DELETE /tweet/:id** Borra un link sólo si eres quien lo creó✔
#### -VALIDACIÓN✔
- **id:**
- **User_id:**
  -*Necesario token*
