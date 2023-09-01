# base image
FROM node:18-alpine

# working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest content to the container
COPY . .

# Expose the port that the container will run on
EXPOSE 3000

# command to start
CMD ["node", "server.js"]