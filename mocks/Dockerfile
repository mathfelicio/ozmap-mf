FROM node:20-alpine

WORKDIR /mock

RUN corepack enable \
  && corepack prepare yarn@1.22.22 --activate

# For isp-mock, we can still use a global install if needed,
# but for ozmap-mock we'll need local dependencies.
# Let's install json-server globally for general use.
RUN yarn global add json-server@0.17.4

# If a package.json exists in the context, install it.
# We'll copy the whole context and install if needed.
COPY . .
RUN if [ -f package.json ]; then yarn install; fi

CMD ["json-server", "--host", "0.0.0.0", "--watch", "db.json", "--port", "4000"]
