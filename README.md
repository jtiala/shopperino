# 🛒 Shopperino

[![Actions Status][actions-status-badge]][actions-status]
[![Dependencies Status][dependencies-status-badge]][dependencies-status]
[![Dev Dependencies Status][devdependencies-status-badge]][devdependencies-status]
[![License][license-badge]](license)

Shopperino is [Firebase][firebase]-based shopping list web app.

## Pre-requisites

- [Git][git]
- [Node][node]
- [Firebase CLI][firebase-cli]

## Development

Initialize a Firebase project with Firebase and Hosting. Don't overwrite `public/index.html` when prompted.

    firebase login
    firebase init

Duplicate `.env.example` as `.env` and edit in your details. Firebase configs can be found in the [Firebase Console][firebase-console].

    cp .env.example .env

Install dependencies

    npm install

Start the development environment

    npm run start

Start interactive test runner

    npm run test

## Production

Create a Firebase project or use the one you created for development.

Duplicate `.env.example` as `.env` and edit in your details

    cp .env.example .env

Install dependencies

    npm install

Build the production bundle

    npm run build

Deploy to Firebase

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
