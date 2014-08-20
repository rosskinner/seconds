var app = app || {};

app.SignUpView = Backbone.View.extend({
  el: '.sign-up',
  events: {
    'click' : 'close'
  },
  initialize: function() {
    // this.render();
    console.log("rendering sign up to page");

  },
  render: function () {
    this.$el.html('');
    var signUp = Handlebars.compile(app.templates.signUpTemplate);
    var view = this;
    view.$el.append( signUp );
  },
  close: function() {
    $('.close').on('click', function(){
      $('.sign-up').hide();
    });
  }
});

