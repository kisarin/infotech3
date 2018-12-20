// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const FB_PROJECT_ID = 'infotech-test';

export const environment = {
  production: false,
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
  },
  firebase: {
    apiKey: 'AIzaSyD18OPwKOQ804WXn3bnrDN8IZa7mGPpph4',
    authDomain: `${FB_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${FB_PROJECT_ID}.firebaseio.com`,
    projectId: FB_PROJECT_ID,
    storageBucket: `${FB_PROJECT_ID}.appspot.com`,
    messagingSenderId: '497812356241'
  },
  apiRoot: 'http://localhost:1337/' // e.g., http://localhost:1337/ (DO include trailing slash)
};
