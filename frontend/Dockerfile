# Dockerfile for React
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm i -g serve
# Copy project files
COPY . .


RUN npm run build
# Expose port 3000
EXPOSE 3000

# Serve the app
CMD [ "serve", "-s", "dist" ]