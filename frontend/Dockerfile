# Stage 1: Build React app
FROM node:16-alpine as build

WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY . ./

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built React app from the build stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration if needed
# Uncomment and customize this line if you have a custom nginx.conf file
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
