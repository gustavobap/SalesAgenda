#!/bin/bash

export DOCKER_UID="$(id -u)"
export DOCKER_UNAME="$(whoami)"
export DOCKER_UPASSWORD="$(whoami)"
docker-compose -f "./docker-compose.yml" run --rm --service-ports $1
