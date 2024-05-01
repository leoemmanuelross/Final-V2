let audioStarted = false;
var mode = 0;
let bird;
var muteButton, unmuteButton;
let gameMuted = false;
let pipes = [];
let score = 0;
let gameOver = false;
let t1 = 0.1; // attack in secs
let l1 = 0.4; // attack lvl 0-1
let t2 = 0.1; // decay in secs
let l2 = 0; // decay lvl  0-1

let env;
let triOsc, sinOsc, osc;
let music, bg, endSFX;

function preload() {
  music = loadSound("music.mp3");
  endSFX = loadSound("wompwomp.wav");
}

function setup() {
  getAudioContext().suspend();
  env = new p5.Envelope(t1, l1, t2, l2);
  triOsc = new p5.Oscillator("triangle");
  sinOsc = new p5.Oscillator("sine");
  triOsc.amp(0.1);
  sinOsc.amp(0.1);

  createCanvas(windowWidth, windowHeight);

  bg = loadImage("background.png");

  splash = new Splash();
  bird = new Bird();
  music.play();

  muteButton = createButton("Mute");
  muteButton.position(5, height - 30);
  muteButton.mousePressed(mute);
}

function draw() {
  if (mouseIsPressed == true && splash.update() == true) {
    if (!audioStarted) {
      userStartAudio();
      audioStarted = true;
    }
    mode = 1;
  }

  if (mode == 1) {
    splash.hide();
    background(bg);

    if (!gameOver) {
      bird.update();
      bird.show();
      if (music.isPlaying() == false) {
        music.play();
      }

      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].hits(bird)) {
          gameOver = true;
        }

        if (pipes[i].point()) {
          pipes.splice(i, 1);
          score += 1;
        }
      }

      if (frameCount % 100 == 0) {
        pipes.push(new Pipe());
      }

      textSize(32);
      fill(255);
      text(score, 10, 30);
    } else {
      noLoop();
      noStroke();
      textSize(64);
      fill(158, 26, 26);
      textAlign(CENTER);
      text("Game Over", width / 2, height * 0.3);
      fill(0)
      textSize(24)
      text("Refresh your browser to play again!", width / 2, height * 0.4)
      music.stop();
      endSFX.play();
    }
  }
}
function keyPressed() {
  if (key == " " && !gameOver) {
    bird.up();
    if (gameMuted == false) {
      playSound();
    }
  }
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.jump = -15;
    this.velocity = 0;
    this.png = loadImage("bird.png");
  }

  show() {
    image(this.png, this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.jump;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      gameOver = true;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

class Pipe {
  constructor() {
    this.top = random(height / 6, height / 2);
    this.bottom = height - this.top - random(60, 200);
    this.x = width;
    this.w = 20;
    this.speed = 3;
    this.dPipe = loadImage("dPipe.png");
    this.uPipe = loadImage("uPipe.png");
  }

  show() {
    image(this.dPipe, this.x, 0, this.w, this.top);
    image(this.uPipe, this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  point() {
    return this.x < 64;
  }

  hits(bird) {
    if (
      (bird.y < this.top || bird.y > height - this.bottom) &&
      bird.x > this.x &&
      bird.x < this.x + this.w
    ) {
      return true;
    }
    return false;
  }
}
function playSound() {
  triOsc.freq(350);
  triOsc.freq(500, 0.5);
  triOsc.start();
  env.play(triOsc);
  sinOsc.freq(350);
  sinOsc.freq(500, 0.5);
  sinOsc.start();
  env.play(sinOsc);
}

function mute() {
  music.setVolume(0);
  endSFX.setVolume(0);
  gameMuted = true;
  muteButton.remove();
  unmuteButton = createButton("Unmute");
  unmuteButton.position(5, height - 30);
  unmuteButton.mousePressed(unmute);
}

function unmute() {
  music.setVolume(1);
  endSFX.setVolume(1);
  gameMuted = false;
  unmuteButton.remove();
  muteButton = createButton("Mute");
  muteButton.position(5, height - 30);
  muteButton.mousePressed(mute);
}
