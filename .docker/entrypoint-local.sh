#!/bin/sh
set -e

yarn install

if [ "$#" -gt 0 ]; then
  exec "$@"
fi