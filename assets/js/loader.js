/**
 * Main function for the loader to work automatically
 * Begins by going through each webview.
 *
 * BTW this probably not the best way to do it, but i've been getting errors due to page finishing loading 5 times (somehow) and
 * this is the best way I've found to get over it.
 */
$('webview').each((i, e) => {
  /**
   * function that detects only once a loading start
   */
  function oneStartLoad() {
    // Listen only one time to the did-start-loading event
    $(e).one('did-start-loading', (ev) => {
      // prevent default that i think is useless but looks professional so I kept it
      ev.preventDefault();
      // Debugging
      // console.log(e, ev, i);

      // set the webview css to hidden with a fade out so the loader which is in front appears.
      $(e).css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '400');
      $(e).css("visibility",  "hidden");
      // fires the other function
      oneStopLoad();
    });
  };
  // fires automatically on first load the oneStartLoad() so the loop begins
  oneStartLoad();
  /**
   * function that detects only once when a page stops loading
   * fired when a page started loading
   */
  function oneStopLoad() {
    // listen only one time when the page stopped loading
    $(e).one('did-stop-loading', (ev) => {
      // another fine professional touch
      ev.preventDefault();
      // Debugging
      // console.log(e, ev, i);

      // when triggered set the webivew back to a visible state
      $(e).css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
      // wait 1sec for the other stop and starts loading events to go through it without having to wait for the load to appear and disappear infinitly.
      // This is the only way i found out to fix the error (i was getting 10 events when loading a page duh)
      setTimeout(() => {
        oneStartLoad();
      }, 1000);
    });
  };
})
