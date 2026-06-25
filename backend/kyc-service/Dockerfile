# Use an official, lightweight Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of your application code into the container
COPY . .

# Expose the port your microservice runs on
EXPOSE 4002

# Define the command to start the application
CMD ["node", "index.js"]