# node-security

docker-compose up --force-recreate
docker build --network="node-security_app-network" -t=node-security .
docker run --network="node-security_app-network" -p 8080:8080 node-security
