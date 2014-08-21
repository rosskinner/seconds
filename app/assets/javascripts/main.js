$(document).ready(function (){

  app.templates = {
    videosTemplate: $('#videos-template').html(),
    signInTemplate: $('#signin-template').html(),
    signUpTemplate: $('#signup-template').html(),
    titlesTemplate: $('#title-template').html()
  }
  app.router = new app.Router();
  Backbone.history.start();
  console.log("main.js ready")
});