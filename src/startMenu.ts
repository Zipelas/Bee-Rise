class StartMenu implements Scene {
  private backgroundImage: p5.Image;
  private arrowImage: p5.Image;

  constructor() {
    this.backgroundImage = loadImage("./assets/music/background.jpg");
    this.arrowImage = loadImage("./assets/arrow-instructions.png");
  }

    public update() {
        // Uppdateringslogik
    }
    public draw() {
      image(this.backgroundImage, 0, 0, width, height);

    textFont("Modak");
    stroke(0);
    strokeWeight(8);
    this.drawTextWithLetterSpacing(
      "Bee Rise",
      width / 2 - 300,
      height / 4,
      150,
      10,
      "#ffca00"
    );
  
    // this.drawPlayButton();
  
    this.drawInstructions();
  }
  
    }
  
}