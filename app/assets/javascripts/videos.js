$(document).ready(function (){
//////////////////////////////////////////////
//////////////////////////////////////////////
////// ---- Media Stream Recording ---- //////
//////////////////////////////////////////////
//////////////////////////////////////////////

var mediaConstraints = { audio: !!navigator.mozGetUserMedia, video: true };

//initializing the camera
navigator.getUserMedia(mediaConstraints, onMedia, onMediaError)

var videoWidth = 200;
var videoHeight = 140;
function onMedia(stream) {
  console.log('camera comes up on load');
  var video = document.createElement('video');
  video.setAttribute('id', 'livefeed');
  videoWidth = 200;
  videoHeight = 140;

  video = mergeProps(video, {
      controls: false,
      width: videoWidth,
      height: videoHeight,
      src: URL.createObjectURL(stream)
  });
  video.play();

  videosContainer.appendChild(video);

};

// $('#livefeed').onclick(function() {
//   this.disabled = false;
//     navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
// });

// document.querySelector('#livefeed').onclick = function() {
//     this.disabled = true;
//     navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
// };

document.querySelector('#stop-recording').onclick = function() {
    this.disabled = true;
    mediaRecorder.stop();
};

var mediaRecorder;


function onMediaSuccess(stream) {
  console.log('media success');
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'video/webm'; // this line is mandatory
    mediaRecorder.videoWidth  = videoWidth;
    mediaRecorder.videoHeight = videoHeight;

    var title = document.getElementById('title').value

    mediaRecorder.ondataavailable = function(blob) {
      // var a = document.createElement('a');
      // a.target = '_blank';
      // a.innerHTML = title + ' (Size: ' + bytesToSize(blob.size) + ') Time Length: ' + getTimeLength(timeInterval);

      // a.href = URL.createObjectURL(blob);

      // videosContainer.appendChild(a);

      var newVid = document.createElement('video');
      newVid = mergeProps(newVid, {
        autoplay: true,
        loop: true,
        controls: false,
        width: videoWidth,
        height: videoHeight,
        src: URL.createObjectURL(blob)
      });

      videosContainer.appendChild(newVid);

      var formData = new FormData();
      formData.append('video[title]', $('#title').val());
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

      });

    };

    var timeInterval = 3000;
    if(timeInterval) timeInterval = parseInt(timeInterval);
    else timeInterval = 5 * 1000;

    // get blob after specific time interval
    mediaRecorder.start(timeInterval);


    document.querySelector('#stop-recording').disabled = false;

}

function onMediaError(e) {
    console.error('media error', e);
}

var videosContainer = document.getElementById('videos-container');
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

window.onbeforeunload = function() {
    document.querySelector('#start-recording').disabled = false;
};


});



