# ---Build Stage---
FROM node:22-alpine AS build
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

# Install deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build 
COPY . .
RUN pnpm run build

# --- Runtime stage --
FROM nginx:alpine
# Copy an nginx config that supports SPA history fallback
COPY nginx.conf /etc/nginx/conf.d/default.config

# Copy Build assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




