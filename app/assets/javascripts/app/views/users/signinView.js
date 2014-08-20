var app = app || {};

app.SignInView = Backbone.View.extend({
  el: '.sign-in',
  initialize: function() {
    this.render();
    console.log("rendering signing to page");
  },
  render: function () {
    this.$el.html('');
    var signIn = Handlebars.compile(app.templates.signInTemplate);
    var view = this;
    view.$el.append( signIn );
  }
  // view: function(e) {
  //   var inside = (e.target.id);
  //   app.router.navigate('videos/' + inside, true);
  // }
});