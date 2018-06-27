var rings = [];
var amt = 10;

function getBuf(w, h) {
  var g = createGraphics(w, h);
  g.clear();
  g.ellipseMode(CENTER);
  g.colorMode(HSB);
  g.noStroke();
  return g;
}

function getGrid(w, h) {
  var grid = [];
  for (let i = 0; i < w; i++) {
    grid.push([]);
    for (let j = 0; j < h; j++) {
      grid[i].push(random() < .5);
    }
  }
  return grid;
}

function Ring() {
  this.size = random(20, 300);
  this.spin = random(.02, .05);
  this.spin2 = random(.01, .02);
  this.angle = random(TAU);
  this.hue = random(360);

  this.w = random(3, 20);
  this.h = random(2, 4);
  this.imgSize = this.size/2;

  this.buf = getBuf(this.imgSize, this.imgSize);
  this.grid = getGrid(this.w, this.h);
  this.speeds = [];
  for (var i = 0; i < this.h; i++) {
    this.speeds.push(random(2, 5));
  }

  // this.pos = [random(width), random(height)];
  this.pos = [width/2, height/2];

  this.renderBuf = function() {
    this.buf.clear();
    this.buf.noStroke();
    var cellW = this.imgSize/this.w;
    var cellH = (this.imgSize/this.h)*.1;
    for (var i = 0; i < this.w; i++) {
      for (var j = 0; j < this.h; j++) {
        if (this.grid[i][j]) {
          var x = (i*cellW + this.speeds[j]*frameCount)%this.size;
          var y = this.imgSize - j*1.5*cellH;

          this.buf.fill(this.hue, 100, 100);
          this.buf.rect(x, y, cellW, cellH);
          if (x > this.imgSize - cellW)
            this.buf.rect(x-this.imgSize, y, cellW, cellH)
          }
        }
      }
    }

    this.render = function() {
      push();
      translate(...this.pos);
      rotate(this.angle + frameCount*this.spin2);
      scale(cos(frameCount*this.spin), 1);

      for (var n = 0; n < TAU; n++) {
        push();
        rotate(n*2*PI/TAU);


        for (var i = 0; i <= this.imgSize; i++) {
          rotate(1/this.imgSize);
          image(this.buf, 0, 0, 1, this.imgSize, i, 0, 1, this.imgSize);
        }
        pop();
      }
      pop();
    }
}

function setup() {
  createCanvas();
  colorMode(HSB);
  // imageMode(CENTER);
  windowResized();
  init();
}

function init() {
  for (var i = 0; i < amt; i++) {
    rings.push(new Ring());
  }
}

function draw() {
  background(0);
  rings.map(i => {
    i.renderBuf();
    i.render();
  }
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}
