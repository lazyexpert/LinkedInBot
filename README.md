# Description
Micro bot, linkedIn manager. This bot can loop throught accounts of "People you might now" page and according to settings will dismiss person, or add to your account.

# Install

1. Open linkedIn. Goto "People you might know" page

2. Make right button Click in any place, pick "Inspect Element" (in mozilla)

3. Click the tab console

4. Copy all code from file bot.js

5. Set cursor to console, paste all the code


# Check
If all done correctly, when you type in console "bot", you have to see something like this:
``` javascript
Object{ ... }
```


If you see something like this, than you have to redo all from start:
``` javascript
ReferenceError: bot is not defined
```

# Usage
I see this bot very usefull to create thematical groups (Java devs, Js devs, C++ devs .... etc) by recruiters. Sure 1 account for each. 
Or developer can parse contacts for recruiters. As far as this totally depends on your current  contacts you have to get some before you start.
The script is safe, you may ask any to review the code.

You start the bot:
``` javascript
bot.start( {} )
```

If you want to stop:
``` javascript
bot.stop()
```

You pass in options object, all fields are optional, except keywords:
``` javascript
bot.start({
  "keywords" : [ "recruiter", "рекрутер", "рекрутинг", "recruitment", "looking for", "searching for" ],
  "count" : 100,
  "minus" : ["position", "job", "opportunity", "opportunities"],
  "interval" : 2000
})
```

keywords - the only required field keywords, that bot is looking for. Not case sensitive. Need at least one for positive match.

count - the bot will stop after adding this amount

minus - anti-keywords. If found at least one - the person doesn't fit.

interval - interval between bot clicks. Play with this param on your own risk. I've tested 2000 (ms). That was ok.

# Note
- You have to insert the script each time you reload the page.
- If your computer falls asleep, I believe, the script wont work ;)

# Example
Recruiter searches for javascript developers:
``` javascript
bot.start({
  "keywords"  : ["javascript", "node", "meteor", "angular", "backbone"],
  "count" : 200,
  "minus" : ["trainee", "junior"]
})
```


