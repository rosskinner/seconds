var app = app || {};

app.Video = Backbone.Model.extend({
  urlRoot: 'videos',
  defaults: {
    title: 'seconds',
    video: 'some_url'
  }
});

console.log('video model success');