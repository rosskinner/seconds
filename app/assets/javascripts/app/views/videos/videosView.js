var app = app || {};

app.VideosView = Backbone.View.extend({
  el: '.grid-video',
  initialize: function() {
    this.render();
    console.log("rendering to page");
  },
  render: function () {
    this.$el.html('');
    var video_list = Handlebars.compile(app.templates.videosTemplate);
    var title_list = Handlebars.compile(app.templates.titlesTemplate);
    var view = this;
    this.collection.each(function(videos) {
      var copy = video_list(videos.toJSON() )
      view.$el.append( copy );
    })
    var stretch = $("<span class='stretch' />");
    stretch.appndTo(this.$el);
    var title = $("<div class='title' />");
    title.appendTo(this.$el);
    this.collection.each(function(videos) {
      var copy2 = title_list(videos.toJSON() )
      $(".title").append( copy2 );

    });
    var length = this.collection.length
    console.log('length of collection' + length);
    var width = $('.title').width();
    console.log('width of titles is: ' + width);

    var scrollAcross =  function() {$('.title').velocity(
      {
        left: -width
      },
      {
        duration: length * 5000,
        easing: "linear",
        complete: function() {
          $('.title').css('left',$(window).width());
          setTimeout(scrollAcross, 1000);
        }
      }
      );
    };
  scrollAcross();
  }
});