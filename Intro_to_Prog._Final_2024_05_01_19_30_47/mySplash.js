class Splash {
  constructor() {
    this.splashBorder = 100;
    fill(255);
    stroke(255, 0, 0);
    rect(
      this.splashBorder,
      this.splashBorder,
      windowWidth - this.splashBorder * 2,
      windowHeight - this.splashBorder * 2
    );
    // draw a rectangle like this in a 3D enviornment
    // rect(this.splashBorder-(windowWidth/2), this.splashBorder-(windowHeight/2), windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
    fill(0, 0, 222);
    strokeWeight(3);

    line(
      windowWidth - this.splashBorder - 40,
      this.splashBorder + 20,
      windowWidth - this.splashBorder - 20,
      this.splashBorder + 40
    );
    line(
      windowWidth - this.splashBorder - 20,
      this.splashBorder + 20,
      windowWidth - this.splashBorder - 40,
      this.splashBorder + 40
    );

    this.title = createDiv("Flappy Bird");
    this.title.style("color:deeppink");
    this.title.style("font-family: Arial, Helvetica, sans-serif");
    this.title.position(this.splashBorder + 20, this.splashBorder + 20);

    this.name = createDiv("Aidan Eyth & Leo Ross");
    this.name.position(this.splashBorder + 20, this.splashBorder + 60);

     this.info = createDiv(
      "The classic game Flappy Bird recreated by Aidan Eyth & Leo Ross. Press the SPACE BAR to jump through the pipes. Enjoy! <p> Sound FX: Aidan Eyth <p> Music: Leo Ross <p> Code: Aidan Eyth and Leo Ross <p> <a href=https://editor.p5js.org/aidaneyth/sketches/eF6e4BvZf>view code</a>"
    );

    this.info.position(this.splashBorder + 20, this.splashBorder + 100);
    this.info.size(
      windowWidth - this.splashBorder * 2 - 50,
      windowHeight - this.splashBorder * 2 - 50
    );
  }

  update() {
    if (
      mouseX > windowWidth - this.splashBorder - 40 &&
      mouseX < windowWidth - this.splashBorder - 20 &&
      mouseY < this.splashBorder + 40 &&
      mouseY > this.splashBorder + 20
    ) {
      return true;
    }
  }

  hide() {
    this.title.remove();
    this.name.remove();
    this.info.remove();
  }
}
