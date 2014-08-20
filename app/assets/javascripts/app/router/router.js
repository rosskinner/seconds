var app = app || {};

app.Router = Backbone.Router.extend({
  routes: {
    ''              : 'index',
    'users/sign_in' : 'signIn',
    'users/sign_up' : 'signUp'
  },
  index: function() {
    app.videos = new app.Videos();
    app.videos.fetch().done(function (){
      var videosView = new app.VideosView({collection: app.videos});
      console.log("videos route");
      videosView.render();
    });
  },
  signIn: function() {
    var signinView = new app.SignInView();
    signinView.render();
  }
});