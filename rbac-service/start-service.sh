# !/usr/bin/env bash

# docker service create --replicas 2 --name rbac-service -l=apiRoute='/rbac' -p 3002:3000 104.154.26.100:5000/rbac-service
# docker run --name rbac-service -p 3000:3000 rbac-service