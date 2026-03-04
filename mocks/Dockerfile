FROM node:20-alpine

WORKDIR /mock

RUN npm install -g json-server@1.0.0-beta.3

CMD ["json-server", "--host", "0.0.0.0", "--watch", "/mock/db.json", "--port", "4000"]
