// var capture;
// function setup() {
//       createCanvas(15, 15);
//       capture = createCapture(VIDEO);
//       capture.size(900);
//       capture.hide();
//     }
// // $(document).ready(function (){

//   // if (window.location.pathname === '/') {


//     function draw() {
//       background(255);
//       image(capture, 0, 0, 1300, 1100);
//       filter('GRAY');
//     }
  // }
// });

// new p5();

//////////////////////////////////////////////
//////////////////////////////////////////////
////// ---- Media Stream Recording ---- //////
//////////////////////////////////////////////
//////////////////////////////////////////////


var mediaConstraints = { audio: !!navigator.mozGetUserMedia, video: true };

document.querySelector('#start-recording').onclick = function() {
    this.disabled = true;
    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
};

document.querySelector('#stop-recording').onclick = function() {
    this.disabled = true;
    mediaRecorder.stop();
};

var mediaRecorder;

function onMediaSuccess(stream) {
    var video = document.createElement('video');

    var videoWidth = document.getElementById('video-width').value || 320;
    var videoHeight = document.getElementById('video-height').value || 240;

    video = mergeProps(video, {
        controls: true,
        width: videoWidth,
        height: videoHeight,
        src: URL.createObjectURL(stream)
    });
    video.play();

    videosContainer.appendChild(video);
    videosContainer.appendChild(document.createElement('hr'));

    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'video/webm'; // this line is mandatory
    mediaRecorder.videoWidth  = videoWidth;
    mediaRecorder.videoHeight = videoHeight;
    mediaRecorder.ondataavailable = function(blob) {
        var a = document.createElement('a');
        a.target = '_blank';
        a.innerHTML = 'Open Recorded Video No. ' + (index++) + ' (Size: ' + bytesToSize(blob.size) + ') Time Length: ' + getTimeLength(timeInterval);

        a.href = URL.createObjectURL(blob);

        videosContainer.appendChild(a);
        videosContainer.appendChild(document.createElement('hr'));
    };

    var timeInterval = document.querySelector('#time-interval').value;
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
