FROM node:20-alpine3.20 AS builder
ENV NODE_ENV=production

USER node
WORKDIR /home/node

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --include=dev
RUN npx prisma generate

COPY --chown=node:node . ./
RUN npm run build



FROM node:20-alpine3.20


#### SERVER
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3002

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/tsconfig.json ./
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/prisma/ ./prisma/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["npm","run", "start:migrate:prod"]