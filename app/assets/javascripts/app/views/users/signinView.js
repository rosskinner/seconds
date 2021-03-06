var app = app || {};

app.SignInView = Backbone.View.extend({
  el: '.sign-in',
  events: {
    'click' : 'close'
  },
  initialize: function() {
    // this.render();
    console.log("rendering signing to page");

  },
  render: function () {
    this.$el.html('');
    var signIn = Handlebars.compile(app.templates.signInTemplate);
    var view = this;
    view.$el.append( signIn );
  },
  close: function() {
    $('.close').on('click', function(){
      $('.sign-in').hide();
    });
  }
});

