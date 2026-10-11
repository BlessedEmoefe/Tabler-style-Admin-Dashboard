# Admin Dashboard

A responsive admin dashboard inspired by the Tabler layout. It includes sign-in, a protected shell, and a dashboard of stats, an activity chart, a commits table, and donut charts.

## Overview

The app is a React single-page dashboard. Visitors sign in with any email and password, then land on a home page that loads its data through Redux Saga. The session is kept in the browser so a refresh stays signed in.

## Features

- Sign-in page with loading and error states
- Session restore from local storage
- Protected routes and a 404 page for unknown addresses
- Responsive layout with a collapsible sidebar on small screens
- Dashboard stats, development activity chart, commits table, and pie/donut charts
- Loading skeleton and an error state with retry

## Tech Stack

- React
- Redux Toolkit
- Redux Saga
- React Router
- Tailwind CSS
- Recharts
- Vite

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Login credentials

Any email and password will sign you in. The app does not call a real authentication API. It waits briefly, then stores a demo user and token.

## Project Structure

```text
src/
  components/
    Dashboard/        Stats, charts, and the commits table
    Layout/           Sidebar, header, and page shell
    ProtectedRoute.jsx
  pages/
    Login.jsx
    Dashboard.jsx
    NotFound.jsx
  store/
    slices/           Auth and dashboard state
    sagas/            Async login and dashboard loading
    authStorage.js    Read and write the saved session
    index.js          Store setup
    rootReducer.js
  App.jsx             Routes
  main.jsx            App entry, wrapped in the Redux Provider
```

## How state management works

Redux Toolkit holds the application state in two slices.

- **Auth** stores the user, token, and whether someone is signed in. On startup it reads a saved session from local storage.
- **Dashboard** stores stats, the activity series, commits, chart data, plus loading and error flags.

Components do not call the API themselves. They dispatch a request action. A Redux Saga listens for that action, waits to simulate a network call, then dispatches success or failure. The matching reducer updates the slice, and the page re-renders from `useSelector`.

Login follows the same pattern: the form dispatches `loginStart`, the auth saga creates a demo session, and `loginSuccess` or `loginFailure` updates the auth slice. Logout clears both Redux and local storage.
