# Usa una imagen oficial de Node.js
FROM node:18

# Configura el directorio de trabajo
WORKDIR /backend

# Copia los archivos del backend
COPY package*.json ./

# Instala las dependencias del backend
RUN npm install

# Copia el resto de los archivos del backend
COPY . .

# Expone el puerto en el que el backend escuchará
EXPOSE 5000

# Ejecuta el backend
CMD ["node", "server.js"]
