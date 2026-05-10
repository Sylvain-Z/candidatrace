# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application Angular
RUN npm run build

# Stage 2: Serve the built app with nginx (more reliable for production static files)
FROM nginx:alpine

# Remove default nginx content and copy built files
RUN rm -rf /usr/share/nginx/html/*

# Serve Angular from the browser output directory and use an SPA fallback
COPY --from=builder /app/dist/client/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 4200 to match compose mapping
EXPOSE 4200

# Serve content. nginx listens on 80 inside container; map host 4200->container 80 in compose.
CMD ["nginx", "-g", "daemon off;"]
