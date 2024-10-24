#!/usr/bin/env bash

if ! [ -x "$(command -v sqlx)" ]; then
    echo 'Error: sqlx is not installed.' >&2
    exit 1
fi

if ! [ -x "$(command -v psql)" ]; then
    echo 'Error: psql is not installed.' >&2
    exit 1
fi

set -x
set -eo pipefail

docker run \
    -e POSTGRES_USER=${POSTGRES_USER} \
    -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
    -p "${POSTGRES_PORT}":5432 \
    -d postgres

export PGPASSWORD=${POSTGRES_PASSWORD}
until psql -h "${POSTGRES_HOST}" -U "${POSTGRES_USER}" -p "${POSTGRES_PORT}" -d "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up and running on port ${POSTGRES_PORT}"

bash configure_db.sh
