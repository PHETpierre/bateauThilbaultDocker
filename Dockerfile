#FROM node:16
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY /dist/bateau-thilbault /usr/share/html

### STAGE 1: Build ###
FROM node:16-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.20-alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist/bateau-thilbault /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
