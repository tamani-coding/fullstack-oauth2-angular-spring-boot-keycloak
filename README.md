# fullstack-oauth2-angular-spring-boot-keycloak
An OAuth2 fullstack example with keycloak, angular and spring boot.

## setup keycloak

Go to `keycloak` folder, modify `Dockerfile` or `docker-compose.yml` (e.g. adjust the `postgres_data` volume) and start up postgres and keycloak via `docker compose up --build`.

The file `my-test-realm-realm.json` is used to import a complete realm configuration, including clients, users, roles, etc... into keycloak. 

Realm: `my-test-realm`, Username: `testuser-1`, Password: `testuser1`

You may create and configure your own realm by using the keycloak admin console.

Check if the keycloak admin console is reachable (`http://localhost:8180/`).


## angular webapp

Angular webapp is in `webapp`. Made with angular 17.

Using [angular-oauth2-oidc](https://www.npmjs.com/package/angular-oauth2-oidc)!

The `main.ts` file bootstraps the webapp by proving the http client and the oauthservice. Also initializing the oauthservice by providing a configuration, setup of silent token refresh, loading discovery document and login of user, if not already done.

The component `AppComponent` provides a basic demo of logout and calling a protected API with the access token.

## spring-boot backend

Spring boot backend is in `backend` folder. Requires Maven and Java 21.

The class `SecurityConfig` configures the security filter chain, enabling CORS, makes sure that all requests must be authenticated, configures to be an oauth2 resource server (verify access token via JWT issuer) and to use a custom JWT converter to extract all relevant data from the JWT.

The `application.properties` file has the JWT issuer configured, pointing to the locally running keycloak.

The `CustomJwt` is a customized JWT containing all relevant information we need extracted from the JWT bearer token.

The `HelloController` has a basic GET endpoint, CORS is configured to work with a locally running angular webapp. The GET method returns a message, but only for authorized users which have the authority `ROLE_fullstack-developer`.

The granted authorities are extracted by the `CustomJwtConverter`.


