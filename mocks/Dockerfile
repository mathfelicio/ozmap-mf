FROM node:20-alpine

WORKDIR /mock

RUN corepack enable \
  && corepack prepare yarn@1.22.22 --activate \
  && yarn global add json-server@1.0.0-beta.3

CMD ["json-server", "--host", "0.0.0.0", "--watch", "/mock/db.json", "--port", "4000"]
