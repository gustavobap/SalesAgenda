#!/bin/bash
set -euxo pipefail

docker build -t sales-agenda-db database
docker start sales-agenda-db || docker run --name sales-agenda-db -p 5432:5432 -d sales-agenda-db

docker build -t sales-agenda-api api
docker start sales-agenda-api || docker run --name sales-agenda-api -p 3000:3000 \
-v ./api/sales-agenda-api:/home/gustavo/sales-agenda-api:rw \
-it -d sales-agenda-api

docker exec -it sales-agenda-api /bin/bash


