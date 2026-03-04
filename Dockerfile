FROM node:22-alpine AS build

RUN apk add --no-cache tzdata bash \
  && cp /usr/share/zoneinfo/America/Campo_Grande /etc/localtime \
  && corepack enable \
  && corepack prepare yarn@stable --activate

WORKDIR /api
COPY . .

ENTRYPOINT [".docker/entrypoint-local.sh"]
