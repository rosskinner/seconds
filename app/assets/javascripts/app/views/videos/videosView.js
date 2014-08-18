var app = app || {};

app.VideosView = Backbone.View.extend({
  el: '.videos',
  initialize: function() {
    var video_list = Handlebars.compile(app.templates.videosTemplate);
    var view = this;
    this.collection.each(function(videos) {
      var copy = video_list(videos.toJSON() )
      view.$el.append( copy );
    })
  }
  // view: function(e) {
  //   var inside = (e.target.id);
  //   app.router.navigate('videos/' + inside, true);
  // }
});