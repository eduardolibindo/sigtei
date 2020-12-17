// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCFdtVO6yd6jL1Lkh-VoLZZPjA9UxckN30',
    authDomain: 'sigtei.firebaseapp.com',
    databaseURL: 'https://sigtei.firebaseio.com',
    projectId: 'sigtei',
    storageBucket: 'sigtei.appspot.com',
    messagingSenderId: '759474924459',
    appId: '1:759474924459:web:69c4282193a9b8de5f00ee',
    measurementId: 'G-S6FPLQ3HTQ'
  },
  apiUrl: 'http://localhost:5000'
  // apiUrl: 'https://sigtei-api.herokuapp.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
