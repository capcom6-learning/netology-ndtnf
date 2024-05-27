FROM node:20-alpine

WORKDIR /usr/app
RUN mkdir -p /usr/app/public/books \
    && chown -R node:node /usr/app/public

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --omit=dev

COPY views/ ./views
COPY src/ ./src

# USER node
EXPOSE 3000
VOLUME [ "/usr/app/public" ]

CMD ["node", "src/index.js"]
