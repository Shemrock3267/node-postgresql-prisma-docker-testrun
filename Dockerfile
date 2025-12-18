# Using an official nodejs runtime as a parent image
FROM node:22

#RUN apk add --no-cache openssl

# Set the working directory inside container
WORKDIR /app

# Copy the package.json & package-lock.json into the container; From /src into /app which is WORKDIR = .
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code; From /src into /app
COPY . .

# Expose the port that the app runs on
EXPOSE 5858

# Define command to run an app
CMD ["node", "./src/server.js"]
