class StartMenu implements Scene {
  private backgroundImage: p5.Image;
  private arrowImage: p5.Image;

  constructor() {
    this.backgroundImage = loadImage("./assets/music/background.jpg");
    this.arrowImage = loadImage("./assets/music/arrowkeys.png");
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
  
    this.drawInstructions();
  }

  private drawInstructions() {
    const backgroundX = width / 2 - 300;
    const backgroundY = height / 2 + 30;
    const backgroundWidth = 600;
    const backgroundHeight = 250;
    const cornerRadius = 150;
  
    fill(255, 255, 255, 127); 
    noStroke();
    rect(
      backgroundX,
      backgroundY,
      backgroundWidth,
      backgroundHeight,
      cornerRadius
    );
  
    textFont("Alfa Slab One");
  
    this.drawTextWithLetterSpacing(
      "Instruction",
      width / 2 - 120,
      backgroundY + 40,
      34,
      3,
      "#000"
    );
  
    const imageWidth = 120;
    const imageHeight = 50;
    const imageX = width / 2 - imageWidth / 2;
    const imageY = backgroundY + 80;
    image(this.arrowImage, imageX, imageY, imageWidth, imageHeight);
  
    this.drawTextWithLetterSpacing(
      "Go left",
      imageX - 150,
      imageY + 90,
      16,
      2,
      "#000"
    );
  
    this.drawTextWithLetterSpacing(
      "Go right",
      imageX + imageWidth + 60,
      imageY + 90,
      16,
      2,
      "#000"
    );
  }
  


    }

}