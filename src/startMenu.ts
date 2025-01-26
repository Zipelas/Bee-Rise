
class StartMenu implements Scene {
  private bgImage: p5.Image;
  private arrowImage: p5.Image;
  private title: string;
  private playButtonHovered: boolean = false;

  constructor() {
    this.bgImage = images.backgroundImage;
    this.arrowImage = images.arrowImage;
    this.title = "BEE RISE";
  }

  private drawTitle() {
    textFont("Bee Rise");
    textAlign(CENTER, CENTER);
    textSize(150);
    fill("#ffca00");
    textFont("Modak");
    stroke(0);
    strokeWeight(8);
    text(this.title, width / 2, height / 4);
  }

  private drawPlayButton() {
    const buttonX = width * 0.5;
    const buttonY = height * 0.5;
    const buttonWidth = 200;
    const buttonHeight = 80;
    const cornerRadius = 20;

    // Detect hover
    const mouseHover =
      mouseX > buttonX - buttonWidth / 2 &&
      mouseX < buttonX + buttonWidth / 2 &&
      mouseY > buttonY - buttonHeight / 2 &&
      mouseY < buttonY + buttonHeight / 2;

    this.playButtonHovered = mouseHover;

    // Draw the button
    fill(mouseHover ? "#f70a0f" : "#d20007"); // Change color on hover
    noStroke();
    rectMode(CENTER);
    rect(buttonX, buttonY, buttonWidth, buttonHeight, cornerRadius);

    // Draw button text
    textSize(32);
    textAlign(CENTER, CENTER);
    fill("#fff");
    text("Play", buttonX, buttonY);
  }

  private drawInstructions() {
    const rectX = width * 0.5;
    const rectY = height * 0.8;
    const rectWidth = 600;
    const rectHeight = 250;
    const cornerRadius = 20;

    // Draw transparent background
    fill(255, 255, 255, 120); // Semi-transparent white
    noStroke();
    rectMode(CENTER);
    rect(rectX, rectY, rectWidth, rectHeight, cornerRadius);

    // Draw "Instruction" text
    textFont("Alfa Slab One");
    textSize(32);
    textAlign(CENTER, CENTER);
    fill("#000");
    text("Instruction", rectX, rectY - 70);

    // Draw arrow keys
    const arrowKeySize = 50;
    const arrowKeyX = rectX;
    const arrowKeyY = rectY + 10;
    image(this.arrowImage, arrowKeyX - arrowKeySize / 2, arrowKeyY - 20, 60, 60);

    textSize(18);
    text("Go left", rectX - 120, rectY + 50);
    text("Go right", rectX + 120, rectY + 50);
  }

  public update(): void {
    if (this.playButtonHovered && mouseIsPressed) {
      console.log("Play button clicked! Starting game...");
      // Logic to transition to the game scene
    }
  }

  public draw(): void {
    // Draw the background
    image(this.bgImage, 0, 0, width, height);

    // Draw the title
    this.drawTitle();

    // Draw the play button with hover effect
    this.drawPlayButton();

    // Draw instructions
    this.drawInstructions();
  }

}