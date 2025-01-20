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
      width / 2 - 345,
      height / 4,
      150,
      10,
      "#ffca00"
    );
  
    this.drawInstructions();
  }

  private drawInstructions() {
    const backgroundX = width / 2 - 255;
    const backgroundY = height / 2 + 10;
    const backgroundWidth = 470;
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
      width / 2 - 130,
      backgroundY + 40,
      32,
      3,
      "#000"
    );

    //Arrowkeys
    const imageWidth = 180;
    const imageHeight = 175;
    const imageX = width / 2 -25 - imageWidth / 2;
    const imageY = backgroundY + 60;
    image(this.arrowImage, imageX, imageY, imageWidth, imageHeight);
  
    this.drawTextWithLetterSpacing(
      "Go left",
      imageX - 90,
      imageY + 130,
      16,
      2,
      "#000"
    );
  
    this.drawTextWithLetterSpacing(
      "Go right",
      imageX + imageWidth +20,
      imageY + 130,
      16,
      2,
      "#000"
    );
  }
  
  private drawTextWithLetterSpacing(
    textContent: string,
    x: number,
    y: number,
    fontSize: number,
    letterSpacing: number,
    textColor: string
  ) {
    textSize(fontSize);
    textAlign(LEFT, CENTER);
    fill(textColor);
  
    let currentX = x;
    for (let i = 0; i < textContent.length; i++) {
      const char = textContent[i];
      text(char, currentX, y);
      currentX += textWidth(char) + letterSpacing;
    }
  }

  private startGame() {
    console.log("Game is starting...");
    //logik för att byta till spelets huvudsakliga scen
  }
}


