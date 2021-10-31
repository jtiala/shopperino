# 🛒✨ Shopperino

[![Actions Status][actions-status-badge]][actions-status]
[![Dependencies Status][dependencies-status-badge]][dependencies-status]
[![Dev Dependencies Status][devdependencies-status-badge]][devdependencies-status]
[![License][license-badge]](license)

[Shopperino][shopperino] is a collaborative shopping list web app.

## Pre-requisites

- [Git][git]
- [Node][node]
- [Firebase account][firebase]
- [Firebase CLI][firebase-cli]

## Installation

1.  Create a new Firebase project and register a new web app by following steps 1 and 2 of [Firebase setup guide][firebase-setup]. Remember to set up Firebase hosting as well. Skip adding Firebase SDK and deploying for now.
2.  Duplicate `.env.example` as `.env` and edit in your details. Config can be found in the _Firebase SDK snippet_ section of [Firebase console][firebase-console]'s project settings. _Firebase token_ can be generated with `firebase login:ci`.
3.  In the Firebase console's project settings, choose a _public-facing name_ and a _support email_.
4.  In the Firebase console's database section, create a new database in production mode.
5.  In the Firebase console's authentication section, set up a sign-in method for Google sign-in.
6.  Login with `firebase-cli` and initialize a new Firebase project:

        firebase login
        firebase init

7.  Select Firestore and Hosting. Use the default options. Don't overwrite `firestore.rules` or `firestore.indexes.json` when prompted. Use `build` as the public directory and configure the app as single-page app. Don't overwrite `public/index.html`.

8.  Install dependencies:

        npm install

9.  When developing locally use `npm run start` to spin up development environment or `npm run test` to start interactive test runner.
10. To deploy the app to Firebase, run:

        npm run build
        firebase deploy

## License

This project is open source software licensed under the MIT license. For more information see [LICENSE][license].

[actions-status]: https://github.com/jtiala/shopperino/actions
[actions-status-badge]: https://github.com/jtiala/shopperino/workflows/CI/CD/badge.svg
[dependencies-status]: https://david-dm.org/jtiala/shopperino
[dependencies-status-badge]: https://img.shields.io/david/jtiala/shopperino.svg
[devdependencies-status]: https://david-dm.org/jtiala/shopperino?type=dev
[devdependencies-status-badge]: https://img.shields.io/david/dev/jtiala/shopperino.svg
[license]: https://github.com/jtiala/shopperino/blob/master/LICENSE
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[git]: https://git-scm.com/
[node]: https://nodejs.org/
[firebase-cli]: https://firebase.google.com/docs/cli
[firebase]: https://firebase.google.com/
[firebase-console]: https://console.firebase.google.com/
[firebase-setup]: https://firebase.google.com/docs/web/setup
[shopperino]: https://shopperino-app.web.app/sign-in
