FROM node:20-alpine
RUN apk add --no-cache dumb-init
WORKDIR /app
COPY package.json ./
COPY server.js ./
USER node
CMD ["dumb-init", "node", "server.js"]
