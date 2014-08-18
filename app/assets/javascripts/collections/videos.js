var app = app || {};

app.Videos = Backbone.Collection.extend({
  model: app.Video,
  url: '/videos'
});