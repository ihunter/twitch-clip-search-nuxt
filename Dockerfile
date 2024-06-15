FROM node:14-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080

EXPOSE 8080

CMD [ "npm", "run", "start" ]