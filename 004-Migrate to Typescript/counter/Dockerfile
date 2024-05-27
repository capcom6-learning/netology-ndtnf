FROM node:20-alpine

WORKDIR /usr/app
RUN mkdir -p /usr/app/storage \
    && chown -R node:node /usr/app/storage

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --omit=dev

COPY src/ ./src

USER node
EXPOSE 3001
VOLUME [ "/usr/app/storage" ]

CMD ["node", "src/index.js"]
