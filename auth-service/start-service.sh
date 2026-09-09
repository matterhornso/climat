#!/usr/bin/env bash

# docker service create --replicas 1 --name auth-service -l=apiRoute='/auth' -p 3002:3000 --env MONGODB_URL=mongodb://$(docker-machine ip manager1):27017/shine 104.154.26.100:5000/auth-service
# docker run --name auth-service -p 3000:3000 auth-service
