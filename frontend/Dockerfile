# Build Angular app
FROM node:18 as build-stage
WORKDIR /app
COPY angular-app/ .
RUN npm install
RUN npm run build --configuration production

# Serve with nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist/angular-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
