#!/bin/bash
set -euxo pipefail

docker build -t sales-agenda-db database
docker start sales-agenda-db || docker run --name sales-agenda-db -p 5432:5432 -d sales-agenda-db

docker build -t sales-agenda-api api \
--build-arg UID="$(id -u)" \
--build-arg UNAME="$(whoami)" \
--build-arg UPASSWORD="$(whoami)"

docker start sales-agenda-api || docker run --name sales-agenda-api -p 3000:3000 \
-v ./api/sales-agenda-api:/home/$(whoami)/sales-agenda-api \
-it -d sales-agenda-api

docker exec -it sales-agenda-api /bin/bash


