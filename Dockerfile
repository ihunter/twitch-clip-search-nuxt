FROM node:14-slim as base

ENV NODE_ENV=production

WORKDIR /app

FROM base as build

COPY --link package.json package-lock.json ./

RUN npm install --production=false

COPY --link . .

RUN npm run build
RUN npm prune

FROM base

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080

EXPOSE 8080

COPY --from=build /app /app

CMD [ "npm", "run", "start" ]
