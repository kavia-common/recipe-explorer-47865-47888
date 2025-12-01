# Angular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

Recipe Explorer UI:
- Routes: `/` (list with search), `/recipe/:id` (detail)
- Service reads NG_APP_API_BASE from environment; falls back to mock data when not set or on API error.
- Theme: Ocean Professional (blue & amber accents), responsive grid, rounded corners, subtle shadows.
- Loading and error states for API calls.

Environment:
- Set NG_APP_API_BASE in your environment or deployment. If unset, the app uses in-memory mock data.
- See `.env.example` for variables.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:3000/` (port set in angular.json serve options). The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

## Tests

```bash
ng test
```
