
# ![maskot](/src/assets/icons/favicon.png) Pondr — multiplayer client 

Pondr is a multiplayer word game played in the browser. One screen acts as the
game room and shows the round to everyone, while players join from their own
phones and submit their answers. The server keeps track of rounds, timers and
results in real time over SignalR.

The client is split into two applications — Room and Player — loaded separately
through code splitting. The backend lives in
[gruble-multiplayer-api](https://github.com/oysor/gruble-multiplayer-api).

Built with React 18, Redux Toolkit, TypeScript, Webpack and styled-components,
with react-router for navigation and dnd-kit for drag-and-drop category setup.
Deployed to Azure Static Web Apps.


## Local development

```sh
yarn
yarn start
```

Connects to the API at `https://localhost:5001/gameHub`. See
`wepack.dev.config.ts` for development settings.

## Deployment

Pushes to `development` build and deploy automatically to Azure Static Web Apps
via GitHub Actions. Pull requests get their own preview environment. See
`webpack.prod.config.ts` for production build settings.

## Repository structure

The app is code split in `src/App.tsx` into two separate applications:

- `src/Room` — the shared screen. Sets up the game, runs the round, collects
  and scores the boards.
- `src/Player` — the phone client. Joins a room, plays, submits answers.
- `src/LandingPage` — lets the user pick which of the two to open.
- `src/common` — components, styles and constants shared between them.

Each application owns its SignalR connection and its Redux state:

- `src/Room/hubConnection.ts`, `src/Player/hubConnection.ts`
- `src/Room/reducer.ts`, `src/Player/reducer.ts`

See the [sequence diagram](https://github.com/oysor/gruble-multiplayer-api#readme)
in the API repo for the full flow of a round.
