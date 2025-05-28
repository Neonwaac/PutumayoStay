# Etapa 1: build de React
FROM node:18.16.0-alpine3.18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: usar Nginx para servir archivos estáticos
FROM nginx:stable-alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar certificados SSL
COPY cert.pem /etc/ssl/certs/cert.pem
COPY key.pem /etc/ssl/private/key.pem

# Copiar los archivos build al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]