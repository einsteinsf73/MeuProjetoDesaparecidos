# Estágio 1: Build da aplicação
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Estágio 2: Servir a aplicação com um servidor leve
FROM nginx:stable-alpine

# Copia os arquivos de build do estágio anterior para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx quando o container iniciar
CMD ["nginx", "-g", "daemon off;"]