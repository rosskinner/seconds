$(document).ready(function (){

  app.templates = {
    videosTemplate: $('#videos-template').html()
  }
  app.router = new app.Router();
  Backbone.history.start();
  console.log("main.js ready")
});