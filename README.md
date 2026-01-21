
Qubika Sports Club – Playwright E2E Automation Tests

This project contains an end-to-end test suite built with Playwright and TypeScript for the Qubika Club web application.
The goal of the project is to validate the main user flow, starting from authentication and covering basic navigation and category management.

The framework follows a Page Object Model (POM) approach to keep tests readable, maintainable, and easy to scale.

--------------Tech stack----------------------
- Playwright
- TypeScript
- Node.js

------------Browser support--------------------------

The test suite is configured to run against multiple browsers using Playwright projects.
Currently, tests are executed on:
- Chromium
- Firefox
This helps ensure cross-browser coverage and consistent behavior across modern browsers.


 --------------Project structure-----------------

tests/
Contains the test specifications (login flow, categories flow, etc.).

src/pages/
Contains page objects that encapsulate selectors and actions for each page:
- Login
- Dashboard
- Sidebar
- Categories

playwright.config.ts
Global Playwright configuration.

tsconfig.json
TypeScript configuration.

.env
Environment variables (credentials).
Create a .env file at the root of the project with the following values:

USERNAME=franarita1
PASSWORD=SideThings123



---------Installation------------

npm install
npx playwright install

Running tests

npx playwright test
npx playwright test --headed
npx playwright test --ui

What is covered

The current test suite validates:
- Sanity check
- Successful authentication
- Dashboard load validation
- Navigation to “Tipos de Categorías”
- Category creation flow
- Success toast validation

-----------Notes-------------

Selectors prioritize user-facing elements.
Assertions focus on critical behavior rather than implementation details.
The structure is easy to extend with additional flows.
