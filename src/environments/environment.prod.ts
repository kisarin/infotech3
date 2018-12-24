export const environment = {
  production: true,
  restdb: {
    xApikey: 'e7955371df2a2308c011f6cf91c5edfc9b816',
    databaseUrl: 'https://infotechtest-1f7b.restdb.io/rest',
    corsApikey: '5c137c5ee908ae6c73f622b6'

  },
  auth: {
    clientId: '5frYYfsLYzK4nPxWhYyNvkPdF7N4rXKO',
    clientDomain: 'kisarin.auth0.com', // e.g., you.auth0.com
    //audience: 'http://localhost:1337/', // e.g., http://localhost:1337/
    callbackURL: 'http://localhost:4200/callback',
    scope: 'openid profile'
  }
};
