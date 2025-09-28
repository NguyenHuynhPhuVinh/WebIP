# Stage 1: Builder
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Runner
FROM node:20-slim AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy the standalone output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]