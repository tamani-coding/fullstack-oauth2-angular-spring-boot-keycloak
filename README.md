# fullstack-oauth2-angular-spring-boot-keycloak
An OAuth2 fullstack example with keycloak, angular and spring boot.

## setup keycloak

Go to `keycloak` folder, modify `Dockerfile` or `docker-compose.yml` (e.g. adjust the `postgres_data` volume) and start up postgres and keycloak via `docker compose up --build`.

Make sure that postgres and keycloak start properly, check if the keycloak admin console is reachable (e.g. `http://localhost:8180/`).

Login to admin console and setup clients and users.

## angular webapp

Angular webapp is in `webapp`.

##

Spring boot backend is in `backend` folder.


