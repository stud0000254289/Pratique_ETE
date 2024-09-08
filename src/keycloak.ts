import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'myapp-realm',
  clientId: 'securite-client',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;


