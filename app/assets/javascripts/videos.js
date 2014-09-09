var app = app || {};
$(document).ready(function (){
//////////////////////////////////////////////
//////////////////////////////////////////////
////// ---- Media Stream Recording ---- //////
//////////////////////////////////////////////
//////////////////////////////////////////////

var mediaConstraints = { audio: !!navigator.mozGetUserMedia, video: true };

//initializing the camera
navigator.getUserMedia(mediaConstraints, onMedia, onMediaError);

var videoWidth = 200;
var videoHeight = 150;
var video
function onMedia(stream) {
  console.log('camera comes up on load');
  video = document.createElement('video');
  $(video).attr('class', 'live-stream');

  video = mergeProps(video, {
      controls: false,
      src: URL.createObjectURL(stream)
  });
  video.play();

  // $(videosContainer).prepend(video);
  $('.grid-video').prepend(video);

  if(location.pathname=="/videos/new") {
    $(video).attr('id', 'full-view');
  }
};

console.log('input of value' + $('#title').val(function (){

}));

var title;

///////// RECORD ON 'ENTER' KEY /////////////

$('#title').keypress(function (e) {
  if (e.which == 13) {
    title = $('#title').val();
    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
  }
});



var mediaRecorder;


function onMediaSuccess(stream) {
  console.log('media success');
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'video/webm'; // this line is mandatory
    mediaRecorder.videoWidth  = videoWidth;
    mediaRecorder.videoHeight = videoHeight;

    /////////////////////////////////////
    ////// ---- RECORD VIDEO ---- ///////
    /////////////////////////////////////

    mediaRecorder.ondataavailable = function(blob) {

      var newVid = document.createElement('video');
      newVid = mergeProps(newVid, {
        autoplay: true,
        loop: true,
        controls: false,
        width: videoWidth,
        height: videoHeight,
        src: URL.createObjectURL(blob)
      });




      ///////////////////////////////////////////////////////////
      ////// ---- formData and ajax to post to server ---- //////
      ///////////////////////////////////////////////////////////

      var formData = new FormData();
      formData.append('video[title]', title);
      formData.append('video[video]', blob);
      formData.append('fname', 'seconds.webm'); // Check this extension?
      formData.append('data', blob);
      $.ajax({
        type: 'POST',
        url: '/videos',
        data: formData,
        processData: false,
        contentType: false
      }).done(function (data) {
        console.log('video blob sent', data);
        app.videos = new app.Videos();
        app.videos.fetch().done(function(){
          var videoNew = new app.VideosView({collection: app.videos});
        });
          window.location.pathname = '/';
      });

    };

    var timeInterval = 3000;
    if(timeInterval) timeInterval = parseInt(timeInterval);
    else timeInterval = 5 * 1000;

    var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
    var count=4;

    mediaRecorder.start(timeInterval);
    timer();

    setTimeout(function () {
      mediaRecorder.stop();
    }, timeInterval);

    ///////// countdown of video /////////////
    function timer(){
      count = count-1;
      if (count <= 0)
      {
        clearInterval(counter);
        $('#title').val('stop');
        return;
      }
      $('#title').val(count);
    }
}

function onMediaError(e) {
    console.error('media error', e);
}

var videosContainer = $('.videos-container');
var index = 1;

// below function via: http://goo.gl/B3ae8c
function bytesToSize(bytes) {
   var k = 1000;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes === 0) return '0 Bytes';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)),10);
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

// below function via: http://goo.gl/6QNDcI
function getTimeLength(milliseconds) {
    var data = new Date(milliseconds);
    return data.getUTCHours()+" hours, "+data.getUTCMinutes()+" minutes and "+data.getUTCSeconds()+" second(s)";
}

// window.onbeforeunload = function() {
//     document.querySelector('#start-recording').disabled = false;
// };

$('.signin-button').on('click', function() {
  $('.sign-in').show();
});

$('.signup-button').on('click', function() {
  $('.sign-up').show();
});
});



