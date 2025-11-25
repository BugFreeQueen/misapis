Nombre del proyecto: Tienda - CRUD de Productos
Instrucciones para instalación y ejecución del backend:
1.-Clonar el repositorio.
2.-Entrar en la carpeta del proyecto.
3.-Ejecutar npm install para instalar dependencias.
4.-Modificar el archivo .env en la raíz con las variables:
  PORT = puerto donde correrá el servidor (ej. 3000)
  MONGO_URI = URI de conexión a MongoDB
5.-Ejecutar npm start para iniciar el servidor.
6.-El backend estará disponible en http://localhost:3000.

Descripción de las rutas de la API:
  GET /api/producto (Obtiene todos los productos)
  GET /api/producto/:id (Obtiene un producto por ID)
  POST /api/producto (Crea un nuevo producto)
  PUT /api/producto/:id (Actualiza un producto por ID)
  DELETE /api/producto/:id (Elimina un producto por ID)
