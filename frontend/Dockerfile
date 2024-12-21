# Use the official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /client

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the default command to run the application
CMD ["npm", "start"]
