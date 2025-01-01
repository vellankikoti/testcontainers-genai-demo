FROM node:18 as build

WORKDIR /app

# Copy dependencies and install them
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build the application
COPY . ./
RUN npm run build

# Use NGINX to serve the application
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
