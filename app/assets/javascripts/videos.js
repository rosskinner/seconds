var capture;
function setup() {
      createCanvas(100, 100);
      capture = createCapture(VIDEO);
      capture.size(900);
      capture.hide();
    }
// $(document).ready(function (){

  if (window.location.pathname === '/') {


    function draw() {
      background(255);
      image(capture, 0, 0, 1300, 900);
      filter('GRAY');
    }
  }
// });

// new p5();