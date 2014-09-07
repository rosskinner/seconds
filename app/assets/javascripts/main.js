$(document).ready(function (){

  app.templates = {
    videosTemplate: $('#videos-template').html(),
    signInTemplate: $('#signin-template').html(),
    signUpTemplate: $('#signup-template').html(),
    titlesTemplate: $('#title-template').html()
  }
  app.router = new app.Router();
  Backbone.history.start();
  console.log("main.js ready");

  ////////// ABOUT POP-UP ////////////

$('.about').css({
  'left': ($(window).width()/2) - 200,
  'top': $(window).height()/2 - 150
});

$('.about').click(function () {
  $('.about').css({
    'display': 'none'
  });
});

});