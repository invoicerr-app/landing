FROM node:22-alpine3.21 AS frontend-builder

WORKDIR /app

COPY ./package.json ./package.json
RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine3.22

COPY --from=frontend-builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
