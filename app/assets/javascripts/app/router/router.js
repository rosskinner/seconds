var app = app || {};

app.Router = Backbone.Router.extend({
  routes: {
    ''              : 'index',
    'sign_in' : 'signIn',
    'sign_up' : 'signUp'
  },
  initialize: function() {
    var signinView = new app.SignInView();
    $('.signin-button').on('click', function(){
      signinView.render()
    });
    var signupView = new app.SignUpView();
    $('.signup-button').on('click', function(){
      signupView.render()
    });
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
    // var signinView = new app.SignInView();

    // signinView.render();
  },
  signUp: function() {

  }
});