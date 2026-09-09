#!/usr/bin/env bash

docker rm -f auth-service

docker rmi -f auth-service

docker image prune -f 

docker volume prune -f

docker build -t auth-service .
