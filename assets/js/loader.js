$('webview').each((i, e) => {
  function oneStartLoad() {
    $(e).one('did-start-loading', (ev) => {
      ev.preventDefault();
      // Debugging
      // console.log(e, ev, i);
      $(e).css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '400');
      $(e).css("visibility",  "hidden");
      oneStopLoad();
    });
  };
  oneStartLoad();
  function oneStopLoad() {
    $(e).one('did-stop-loading', (ev) => {
      ev.preventDefault();
      // Debugging
      // console.log(e, ev, i);
      $(e).css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
      setTimeout(() => {
        oneStartLoad();
      }, 1000);
    });
  };
})
