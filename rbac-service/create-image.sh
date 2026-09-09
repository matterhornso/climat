#!/usr/bin/env bash

docker rm -f rbac-service

docker rmi rbac-service -f

docker image prune -f

docker volume prune -f

docker build -t rbac-service .
