# Use official Node image
FROM node:18

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the project files
COPY . .

# Expose the app port
EXPOSE 8080

# Start the server
CMD ["node", "app.js"]
