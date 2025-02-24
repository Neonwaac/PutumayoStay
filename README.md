# PutumayoStay 🏨🌿

### Plataforma de Gestión Hotelera

**PutumayoStay** es una aplicación diseñada para la administración eficiente de reservas y gestión hotelera en la región de Putumayo. La plataforma permite a los usuarios encontrar, reservar y administrar hospedajes de manera sencilla, mientras que los administradores pueden gestionar sus propiedades de forma intuitiva y optimizada.

---

## 🚀 Características Principales

- 📅 **Reservas en tiempo real** – Gestión eficiente de disponibilidad y reservas.
- 🏡 **Administración de hospedajes** – Permite a los hoteles y alojamientos manejar sus habitaciones y servicios.
- 📍 **Exploración de hospedajes** – Encuentra opciones de alojamiento en diferentes zonas del Putumayo.
- 🔐 **Autenticación segura** – Registro y gestión de usuarios con credenciales protegidas.
- 📷 **Subida de imágenes** – Los usuarios pueden actualizar fotos de perfil y los alojamientos pueden mostrar sus habitaciones.
- 📊 **Dashboard intuitivo** – Monitorea métricas clave y estadísticas de reservas.

---

## 🛠️ Tecnologías Utilizadas

### Backend 🖥️
- **Node.js & Express.js** – Framework y entorno de desarrollo backend.
- **Sequelize & MySQL** – ORM y base de datos relacional.
- **Multer** – Manejo de archivos para la subida de imágenes.
- **JWT** – Autenticación segura basada en tokens.

### Frontend 🎨
- **React Native** – Aplicación móvil para Android e iOS.
- **React.js** – Versión web de la plataforma.
- **Tailwind CSS** – Estilos modernos y responsivos.

---

## 📂 Estructura del Proyecto

```
PutumayoStay/
│── backend/
│   ├── archives/ (📁 Almacenamiento de imágenes)
│   ├── controllers/ (📂 Controladores de API)
│   ├── db/ (📂 Configuración de base de datos)
│   ├── models/ (📂 Modelos de datos)
│   ├── routes/ (📂 Definición de rutas)
│   ├── app.js (⚙️ Configuración del servidor)
│
│── frontend/
│   ├── src/
│   │   ├── components/ (🖥️ Componentes de la UI)
│   │   ├── pages/ (📄 Páginas principales)
│   │   ├── assets/ (🎨 Imágenes y recursos)
│
│── mobile/ (📱 Aplicación móvil con React Native)
```

---

## 🔧 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/PutumayoStay.git
```

### 2️⃣ Backend: Instalación de dependencias
```bash
cd backend
npm install
```

### 3️⃣ Configurar variables de entorno
Crear un archivo **.env** en la carpeta **backend/** con lo siguiente:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña
DB_NAME=putumayostay
JWT_SECRET=tu_secreto
PORT=8077
```

### 4️⃣ Iniciar el servidor backend
```bash
npm start
```

### 5️⃣ Frontend: Instalación de dependencias
```bash
cd frontend
npm install
```

### 6️⃣ Iniciar la aplicación web
```bash
npm start
```

---

## 📸 Subida de Imágenes

Para la subida de imágenes de perfil o alojamientos, las fotos serán almacenadas en `backend/archives/photos/`. La API permite subir imágenes a través de **Multer**, asegurando un proceso seguro y eficiente.

### 📤 Endpoint de subida de imágenes
```http
POST /usuarios/:id/foto
```
#### 📌 Parámetros esperados:
- `image` (file) – Archivo de imagen a subir.

Ejemplo en **cURL**:
```bash
curl -X POST -F "image=@/ruta/a/tu/imagen.jpg" http://localhost:8077/usuarios/1/foto
```

---

## 📅 Roadmap
- ✅ Desarrollo de autenticación segura.
- ✅ Implementación de la API de reservas.
- 🚧 Integración con pasarelas de pago.
- 🔜 Aplicación móvil con funcionalidades avanzadas.

---

## 👨‍💻 Contribuir
Si quieres aportar al desarrollo de **PutumayoStay**, puedes hacer un **fork** del repositorio y enviar un **pull request** con tus mejoras. Toda ayuda es bienvenida. 😊

---

## 📩 Contacto
Si tienes alguna duda o sugerencia, contáctanos en: **neonwaacbusiness@gmail.com**

---

📌 **PutumayoStay** – Facilitando la gestión hotelera en la región. 🏕️✨

