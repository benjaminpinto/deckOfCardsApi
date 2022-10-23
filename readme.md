# Deck Of Cards API Testing Project

![Cypress Tests](https://github.com/benjaminpinto/deckOfCardsApi/actions/workflows/cypress.yml/badge.svg)

This project uses Cypress to automate API tests upon [deckofcardsapi.com application](https://deckofcardsapi.com/).

This project is integrated with GitHub Actions to automate a simple CI workflow, and with GitHub Pages, to publish the last test results report.

## Report Page

The last report is available at [project's GH Page](https://benjaminpinto.github.io/deckOfCardsApi).

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I've used versions `v16.16.0` and `8.11.0` of Node.js and npm, respectively. I recommend you to use the same or later versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

Run `npm test` (or `npm t` for the short version) to run the test in headless mode.

Or, run `npm run cy:open` to open Cypress in interactive mode.

> **Note:** This project doesn't handle sensible data to perform tests (tokens/passwords/etc), so I didn't used a `cypress.env.json` file.

## About the project structure

- Spec files are localized at [`cypress/e2e`](/cypress/e2e/) folder;
- Controllers files are organized at [`support/controllers`](cypress/support/controllers) folder;

---

This project was created by [Benjamin Pinto](https://www.linkedin.com/in/benjamin-pinto/).
