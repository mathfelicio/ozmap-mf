#!/bin/bash

set -e

case "${1:-run}" in
  run) docker compose up --build app ;;
  dev)
    docker compose up -d mysql mongodb isp-mock ozmap-mock
    docker compose build --no-cache app
    docker compose run --rm --service-ports app yarn dev
    ;;
  stop) docker compose down ;;
  logs) docker compose logs -f app ;;
  reset-mocks) docker compose up -d --force-recreate isp-mock ozmap-mock ;;
  *)
    docker compose up -d mysql mongodb isp-mock ozmap-mock
    if [ "$1" = "yarn" ] && [ "${2:-}" = "typeorm" ]; then
      cmd="yarn build && yarn typeorm -d dist/database/config/mysql-orm.config.js"
      for arg in "${@:3}"; do
        cmd+=" $(printf '%q' "$arg")"
      done
      docker compose run --rm app sh -lc "$cmd"
    else
      docker compose run --rm app "$@"
    fi
    ;;
esac
