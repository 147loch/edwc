Elite: Dangerous Websites Companion
====================================

Elite: Dangerous Websites Companion or **EDWC** is an app made by 147loch [/wʌn ˈhʌndrəd ˈfɔːti-ˈsɛvn lɔʃ/] (Loïc Herman) which puts every website made by the Elite: Dangerous Community Developers team, thus gives a nice dark-themed and useful app to use when playing Elite: Dangerous.

![EDWC](/src/images/screenshot1.PNG)

Features
--------

* Five fully integrated websites (as of 0.1.5)
  * [EDDB.io](https://eddb.io) - _A site about systems, bodies, stations, commodities, materials and trade routes in Elite: Dangerous_ - Includes a full redesign of the website to fit the dark-theme of the application
  * [Coriolis](https://coriolis.edcd.io) - _A ship builder, outfitting and comparison tool for Elite Dangerous_
  * [ETN](http://etn.io/) - _Trading tool with an exceptional visualization._
  * [Starmap (EDSM)](https://www.edsm.net/) - _The Galactic Positioning System of Elite: Dangerous at your service._
  * [Inara.cz](https://inara.cz/galaxy-components/) - _The companion site for Elite:Dangerous. Market data, CMDR's logs, logbooks, wings, galleries, powerplay, engineers, crafting, galaxy info, news and more..._
* Compatible with both MacOS and Windows 10 thanks to Electron
* Navigation system between pages as well as a home button to reset every websites
* Tab-powered content that is responsive to the frame width to fit any screen
* Frame design made to be compatible with any resolution and also tactile screens
* A beautiful frameless design compatible for MacOS and Windows
* An automated update system to keep your app up to date with the latest websites and enhancements
* Updates at least every second month
* Many hidden secrets and details

Websites creators
-----------------
Since I have **not** created the websites, rights of most of the app goes to where they should go.

Website | Creator | Contact
--------|---------|--------
[EDDB.io](https://eddb.io) | Paul Heisig | [About Page](https://eddb.io/about)
[Coriolis](https://coriolis.edcd.io) | Maintained by [EDCD Community](http://edcd.github.io/) | [Discord Server](https://discord.gg/0uwCh6R62aQ0eeAX)
[ETN.io](http://etn.io/) | Joshua Schnarr | [Contact Page](http://etn.io/)
[Starmap (EDSM)](https://www.edsm.net/) | _Anthor_ | [Discord Server](https://discord.gg/0sFOD6GxFZRc1ad0)
[Inara.cz](https://inara.cz/galaxy-components/) | David Braben & Ian Bell | _Needed_

If any of the above is not correct, please issue a pull request with your changes so it can be fixed as soon as possible.


Installation
------------

You can install this application by directly downloading the [latest release](https://github.com/147loch/edwc/releases). Also, the app has a built-in auto-updater which will automatically tell you when a new version is available and ask you if you want to update to the newest version.

Future Plans
------------
Ideas and fixes to do (might be interesting if you really want to do participate in the project). It's not in a particular order, just how I thought of the things...
- [x] Comment the stuff
- [x] Organize files and clean up (needs a little more)
- [x] Push first release
- [ ] Test the autoupdate
- [ ] Add an about screen
  - [ ] Add a version tag
- [ ] Fix the non-persistent cookie bug
- [ ] Change the app name on Windows
- [ ] ~~Set up the `.nav-tabs` to host many more websites~~ (not enough websites to actually need it)
- [x] Finish up the styling of EDDB.io (some bugs are still out there)
- [x] Grab a coffee

Contributing
------------

Perks of an app being on GitHub includes being able to include people's requests, as long as they fit these genereal guidelines (and when I say genereal, it's **general**, I love seeing pull requests but there is some limitations):
  1. Does your commit or idea make the development of EDWC faster and easier?
  2. Can it help to have a better support on other platforms (like Linux, MacOS, Windows) and/or does it make EDWC work better?
  3. Does it fix a bug or a vulnerability?
  4. Does your pull request make EDWC easier to use or keeps it simple and accessible?
  5. Does your commit/pull request engender bugs/incompabilities/vulnerabilities or breaks anything?
  6. Does it fit the main goal of EDWC (an app that helps Elite: Dangerous players to play and find their way in the game)?
  7. Does the commit requires new dependecies?
  8. Does the commit respects the [License](/LICENSE.md) of EDWC, or other dependencies' licenses?
  9. - Is the pull request fitting the way EDWC is written? (This is not a main one, but try to keep it a two-spaces ident at least) 
     - Does it includes basic ES6 writing styles, i.e. let/const or [other ES6 features](http://es6-features.org).
     - Does it adapts the code to be in ES6 style?
     - Is your code commented and easy to understand to anyone who may do changes on the code later on? 
  10. Could it be necessary to the functioning of EDWC, or important?

Of course, thes guidelines are not to be applied in a very strict way. If I find the pull request interesting, it has a chance of being merged even if it does not comply with the guidelines.

If you're not sure about your pull request idea, make an issue beforehand so I can get in touch with you and tell you whether or not you should do it so you don't loose your time making the commit.

### Development
If you have a great idea to implement in EDWC and you quickly read the guidelines, follow these couple of steps to make your own changes.

##### Clone the repo
Clone the latest version of the repo in your work folder by either [downloading the master.zip](https://github.com/147loch/edwc/archive/master.zip), or using the CLI (command-line interface):
```
git clone https://github.com/147loch/edwc.git
```

##### Go to the directory and install the dependecies
To continue you need to use [Node.JS and npm](https://nodejs.org/en/)
```
npm install
```

##### Run electron in development-mode
When run in dev-mode, electron will load different modules that speeds up the developing process (like [electron-reload](https://www.npmjs.com/package/electron-reload))
```
npm start
```

##### Programming
Now you can do your programming, but don't forget to comment any functions or methods that your are creating so anyone (not only me) can understand what you did and edit the code later on.
This can be one of the decisive factors when I'm looking at your code.
~~As of 0.1.0 - initial commit, code is not commented, yet. It's coming in a later update once I've organized the files in a better way.~~ (This has now been done properly)

##### Posting your pull request
Once you've completed your programming, create the pull request. Make sure that you complete this template as the comment so I can have the most information out of your pull request as fast as possible:
  
```markdown
### Description of the change
### Why should this be in EDWC?
### Benefits acquired by the commit
### Possible drawbacks (if any)
### Answer to guildeline 4
```
  
Feel free to add anything that you think would help me understand your idea in a better way and/or convince me to merge it for the next update.
