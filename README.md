# Frontend Mentor | Contact form

This is my solution to the [Contact form challenge](https://www.frontendmentor.io/challenges/contact-form--G-hYlqKJj) from [Frontend Mentor](https://www.frontendmentor.io/).

[![project status](https://img.shields.io/badge/status-solution%20published-success?style=for-the-badge)](https://fem-contact-form-jgerard.vercel.app/)

## Links

- [Live website](https://fem-contact-form-jgerard.vercel.app/)
<!-- - [Solution](placeholder) -->
- [Challenge](https://www.frontendmentor.io/challenges/contact-form--G-hYlqKJj)
- [Lighthouse report](https://googlechrome.github.io/lighthouse/viewer/?gist=e67a1fec6493f4389e2a7dd30756c976)

## Tech Stack

### Frontend

- [Angular 18](https://blog.angular.dev/angular-v18-is-now-available-e79d5ac0affe)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend

- Angular and static assets served from [Vercel](https://vercel.com/)'s CDN infrastructure ([Edge Network](https://vercel.com/docs/edge-network/overview))
- [Express](https://expressjs.com/) REST API [Node.js](https://nodejs.org/en) server deployed on [Heroku](https://www.heroku.com/)

Note: The Heroku web dyno (container) sleeps after 30 minutes of inactivity (see [Dyno Sleeping](https://devcenter.heroku.com/articles/eco-dyno-hours#dyno-sleeping)).

## Key Features

- Mail service with [Nodemailer](https://nodemailer.com/) and [Ethereal](https://ethereal.email/)
- CORS-enabled REST API
- JSON schema validation with [Ajv](https://ajv.js.org/)
- [Angular prerendering (SSG)](https://angular.dev/guide/prerendering)
- Responsive design
- CSS transitions and [Angular animations](https://angular.dev/guide/animations)
- End-to-end testing with [Cypress](https://www.cypress.io/)

## Automated Tasks

- Vercel deployments:
  - [Preview](.github/workflows/vercel-preview.yaml)
  - [Production](.github/workflows/vercel-production.yaml)
- [CodeQL analysis](https://codeql.github.com/) (see [workflow](.github/workflows/codeql.yaml))

## Environment & Tools

- System: [Ubuntu](https://ubuntu.com/) (GNU/Linux)
- IDE: [WebStorm](https://www.jetbrains.com/webstorm/)
- Design: [Figma](https://www.figma.com/)
- Version Control: [Git](https://git-scm.com/)
- Formatter: [Prettier](https://prettier.io/)
- Linter: [ESLint](https://eslint.org/)
- AI assistant: [GitHub Copilot](https://github.com/features/copilot)

## Screenshots

### Mobile

![mobile screenshot](screenshots/mobile.avif)

### Desktop

![desktop screenshot](screenshots/desktop.avif)

## About Frontend Mentor

[Frontend Mentor](https://www.frontendmentor.io/) challenges help you improve your coding skills by building realistic projects.

## Copyright

© 2024 Johnny Gérard
