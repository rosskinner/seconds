var capture;

function setup() {
  createCanvas(1300, 700);
  capture = createCapture(VIDEO);
  capture.size(900);
  capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 1300, 700);
  filter('GRAY');
}

// new p5();