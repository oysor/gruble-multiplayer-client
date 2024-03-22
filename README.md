
# ![maskot](/src/assets/icons/favicon.png) Multiplayer-client 

...made with React, Redux Toolkit, Webpack, styled-components and SignalR.


## Get started with local development

Go to branch *development*

```sh
~/Gruble/pondr/Multiplayer-client$ git branch
*  development
   production
```


```sh
# Install dependencies
~/Multiplayer-client/
> yarn

# Run in development mode
~/Multiplayer-client/
> yarn start
```

Connects to https://localhost:5001/chathub

Check out **wepack.dev.config.ts** for development settings.


## Push code to production

Check out **webpack.prod.config.ts** for production settings.

Make a pull request to merge development into *production* branch.


## Deploy to github pages

```sh
> npm run deploy
```
Go to: https://grublings.github.io/Multiplayer-client/



## Repo explanation

The repository consists mainly of two parts which are split into thunks by code splitting.

```
// code split here
~/Multiplayer-client/App.tsx
```


These are run as two separate applications.
```
~/Multiplayer-client/src/Players
~/Multiplayer-client/src/Room
```

The connection with API is found in:
```
~/Multiplayer-client/src/Player/hubConnecton.ts
~/Multiplayer-client/src/Room/hubConnecton.ts
```

The state handling is found in:
```
~/Multiplayer-client/src/Player/reducer.ts
~/Multiplayer-client/src/Room/reducer.ts
```

React components shared between them are put in
```
~/Multiplayer-client/src/common/
```

We also have a landing page where the user can choose wich 'application' to run:
```
~/Multiplayer-client/LandingPage.tsx
```
