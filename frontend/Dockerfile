FROM node:16-alpine

WORKDIR /app

# Copy only package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY . ./

# Expose the development server port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
