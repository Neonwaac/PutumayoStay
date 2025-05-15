FROM node:18.16.0-alpine3.18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json primero para aprovechar el cache de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto
EXPOSE 8077

# Comando para iniciar el backend
CMD ["npm", "run", "dev"]