# ---- Build Stage ----
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Run Stage ----
FROM node:18-alpine
WORKDIR /app

# install 'serve' globally to serve React build
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
