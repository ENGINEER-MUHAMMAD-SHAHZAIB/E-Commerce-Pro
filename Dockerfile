# -----------------------------
# Build Stage
# -----------------------------
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Build the frontend
RUN npm run build   # outputs to /app/dist for Vite

# -----------------------------
# Production Stage (Nginx)
# -----------------------------
FROM nginx:alpine

# Copy Vite build output to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
