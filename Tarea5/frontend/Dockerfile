# Usar una imagen oficial de Node.js como base
FROM node:18 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /frontend

# Copiar el archivo package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación de React
RUN npm run build

# Usar una imagen ligera para servir la app construida
FROM nginx:alpine

# Copiar la aplicación construida a la imagen de Nginx
COPY --from=build /frontend/dist /usr/share/nginx/html

# Exponer el puerto en el que se servirá la aplicación
EXPOSE 80

# Iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
