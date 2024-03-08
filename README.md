
# Our multiplayer-client made with React, Webpack and SignalR.


## Get started with local development

Go to branch *development*

```sh
~/Gruble/pondr/Multiplayer-client$ git branch
*  development
   production
```

```sh
~/Multiplayer-client/
# Install dependencies
> yarn

~/Multiplayer-client/
# Run in development mode
> yarn start
```

Connects to https://localhost:5001/chathub

Check out **wepack.dev.config.ts** for development settings.


## Push code to production

Check out **webpack.prod.config.ts** for production settings.

Make a pull request to merge development into *production* branch.


## Deploy to github pages

```sh
> npm run build
```
