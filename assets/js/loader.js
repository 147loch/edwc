$('#webviewEddb').on('did-start-loading', () => {
  $('#loader').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
  $('#webviewEddb').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '600');
})
$('#webviewEddb').on('did-stop-loading', () => {
  $('#loader').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'slow');
  $('#webviewEddb').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
})
$('#webviewCoriolis').on('did-start-loading', () => {
  $('#loader').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
  $('#webviewEddb').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '600');
})
$('#webviewCoriolis').on('did-stop-loading', () => {
  $('#loader').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'slow');
  $('#webviewEddb').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
})
$('#webviewShipyard').on('did-start-loading', () => {
  $('#loader').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
  $('#webviewEddb').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '600');
})
$('#webviewShipyard').on('did-stop-loading', () => {
  $('#loader').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'slow');
  $('#webviewEddb').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
})
$('#webviewStarmap').on('did-start-loading', () => {
  $('#loader').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
  $('#webviewEddb').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '600');
})
$('#webviewStarmap').on('did-stop-loading', () => {
  $('#loader').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'slow');
  $('#webviewEddb').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
})
$('#webviewInara').on('did-start-loading', () => {
  $('#loader').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
  $('#webviewEddb').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, '600');
})
$('#webviewInara').on('did-stop-loading', () => {
  $('#loader').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'slow');
  $('#webviewEddb').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, '400');
})
