FROM node:14-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

ENV NODE_ENV="production"
ENV NPM_CONFIG_PRODUCTION=false
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080

RUN npm run build

CMD [ "npm", "run", "start" ]
