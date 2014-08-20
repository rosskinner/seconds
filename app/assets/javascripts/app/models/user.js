var app = app || {};

app.User = Backbone.Model.extend({
  urlRoot: 'users',
  defaults: {
    email: 'seconds',
    password: 'test@test.com'
  }
});

console.log('user model success');