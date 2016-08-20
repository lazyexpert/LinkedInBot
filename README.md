# Description
The task of the bot is to filter suggested contacts by the certain criteria.

# App
App is made on the form of the google chrome extension.

# Build
External dependencies:

Node.js. Easy install through [https://github.com/creationix/nvm](nvm):
```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
```

Restart terminal and:
```
nvm install v4.5
nvm use v4.5
```

Install webpack globally:
```
npm install -g webpack
```

Internal dependencies:
```
npm i
```

Start compilation (production version):
```
npm run build
```

Start compilation (development version):
```
npm start
```

# Usage
Enable in your google chrome "developers mode", which allows you to load plugins.
Load plugin pointing chrome to the build folder.
