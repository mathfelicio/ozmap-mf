#!/bin/bash

set -e

case "${1:-run}" in
  run) docker compose up --build app ;;
  dev)
    docker compose up -d mongodb isp-mock ozmap-mock
    docker compose build --no-cache app
    docker compose run --rm --service-ports app yarn dev
    ;;
  stop) docker compose down ;;
  logs) docker compose logs -f app ;;
  *) echo "uso: ./app [run|dev|stop|logs]" ;;
esac
