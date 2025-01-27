
/// <reference path="scene.ts" />
class GameOverMenu implements Scene {
  private repeatImage: p5.Image;
  private exitImage: p5.Image;
  private repeatButton: Button;
  private exitButton: Button;

  constructor() {
        this.repeatImage = images.repeatImage;
        this.exitImage = images.exitImage;

        this.repeatButton = new Button(
          "Repeat",
          width * 0.4 + 50,
          height * 0.54,
          180,
          60,
          "#d20007",
          "black",
          "Alfa Slab One",
          this.repeatImage,
          0,
          0
        );
    
        this.exitButton = new Button(
          "Exit",
          width * 0.6 + 50,
          height * 0.54,
          180,
          60,
          "#d20007",
          "black",
          "Alfa Slab One",
          this.exitImage,
          0,
          40
        );
  }

  public update() {
    if (this.repeatButton.isClicked()) {
      // byt scene A
      // game.changeScene()
    }
    if (this.exitButton.isClicked()) {
      // byt scene B
    }
  }

  public draw() {
    this.drawTransparent(width * 0.5, height * 0.5, 900, 500, 250);

    this.drawGameOverText();

    this.drawButtons();
  }

  private drawTransparent(
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number,
    cornerRadius: number
  ) {
    fill(255, 255, 255, 120);
    noStroke();
    rectMode(CENTER);
    rect(rectX, rectY, rectWidth , rectHeight, cornerRadius);
  }
  private drawGameOverText() {
    textFont("Modak");
    textSize(72);
    fill("#d20007");
    stroke(0);
    strokeWeight(8);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height * 0.35);
  }

  private drawButtons() {
    this.repeatButton.draw();
    this.exitButton.draw();
  }
}