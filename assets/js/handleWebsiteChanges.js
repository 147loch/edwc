const regPat =  new RegExp('^.+?[^\/:](?=[?\/]|$)');

$("#webviewEddb").on('load-commit', () => {
  let wv = document.getElementById('webviewEddb');
  // console.log(wv.getURL());
  // console.log(regPat.exec(wv.getURL()));
  let url = regPat.exec(regPat.exec(wv.getURL()))[0];
  // Can't figure out why the negation doesnt want to work...
  if (url == "http://eddb.io" || url == "https://eddb.io") {}
  else {
    wv.loadURL("http://eddb.io");
  }
});

$("#webviewCoriolis").on('load-commit', () => {
  let wv = document.getElementById('webviewCoriolis');
  // console.log(wv.getURL());
  // console.log(regPat.exec(wv.getURL()));
  let url = regPat.exec(regPat.exec(wv.getURL()))[0];
  // Can't figure out why the negation doesnt want to work...
  if (url == "http://coriolis.edcd.io" || url == "http://coriolis.edcd.io") {}
  else {
    wv.loadURL("http://coriolis.edcd.io");
  }
});

$("#webviewShipyard").on('load-commit', () => {
  let wv = document.getElementById('webviewShipyard');
  // console.log(wv.getURL());
  // console.log(regPat.exec(wv.getURL()));
  let url = regPat.exec(regPat.exec(wv.getURL()))[0];
  // Can't figure out why the negation doesnt want to work...
  if (url == "http://www.edshipyard.com" || url == "https://www.edshipyard.com") {}
  else {
    wv.loadURL("http://www.edshipyard.com");
  }
});

$("#webviewStarmap").on('load-commit', () => {
  let wv = document.getElementById('webviewStarmap');
  // console.log(wv.getURL());
  // console.log(regPat.exec(wv.getURL()));
  let url = regPat.exec(regPat.exec(wv.getURL()))[0];
  // Can't figure out why the negation doesnt want to work...
  if (url == "http://www.edsm.net" || url == "https://www.edsm.net") {}
  else {
    wv.loadURL("http://www.edsm.net");
  }
});

$("#webviewInara").on('load-commit', () => {
  let wv = document.getElementById('webviewInara');
  // console.log(wv.getURL());
  console.log(regPat.exec(wv.getURL()));
  let url = regPat.exec(regPat.exec(wv.getURL()))[0];
  // Can't figure out why the negation doesnt want to work...
  if (url == "http://inara.cz" || url == "https://inara.cz") {}
  else {
    wv.loadURL("http://inara.cz");
  }
});
