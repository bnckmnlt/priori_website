const auth0Config = {
  domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_APP_AUTH0_CLIENTID,
  redirectUri: window.location.origin,
};

export default auth0Config;
