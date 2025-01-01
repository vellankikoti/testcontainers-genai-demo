# Stage 1: Build the React application
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the React app with NGINX
FROM nginx:1.23-alpine

# Copy the build output from Stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom NGINX configuration if needed
# Uncomment the line below if you have a custom nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port NGINX is serving on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
