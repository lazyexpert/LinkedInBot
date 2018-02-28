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

# Manual usage
If you know, what you're doing, feel free to load the bot object to the console manually from here: https://github.com/lazyexpert/LinkedInBot/blob/master/dev/contentScript.js

Since you loaded the bot manually, the sample usage is:
```javascript
 bot.start({
   "keywords" : [ "recruiter", "рекрутер", "рекрутинг", "recruitment", "looking for", "searching for" ],
   "count" : 100,
   "minus" : ["position", "job", "opportunity", "opportunities"],
   "interval" : 2000
 })
```