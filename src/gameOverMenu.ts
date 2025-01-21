/// <reference path="game.ts" />
class GameOverMenu implements Scene {
    private repeatImage: p5.Image;
    private exitImage: p5.Image;
  
    constructor() {
        this.repeatImage = loadImage("./assets/music/repeat.png");
        this.exitImage = loadImage("./assets/music/exit.png");
    }
    
    public update() {    
    }

    public draw() {
        background("#2a9ec7")
        this.drawGameOverMenu()
        image(this.exitImage, width / 2 - -35, height / 2 + 45, 40 , 40);
        image(this.repeatImage, width / 2 - 220, height / 2 + 45, 40, 40);
    }

    private drawGameOverMenu() {
      const backgroundWidth = 650;
      const backgroundHeight = 450;
      const cornerRadius = 250;
        const backgroundX = width / 2 - backgroundWidth / 2;
        const backgroundY = height / 2 - backgroundHeight / 2;
        
        fill(255, 255, 255, 127); 
        noStroke();
        rect(
            backgroundX,
            backgroundY,
            backgroundWidth,
            backgroundHeight,
            cornerRadius,          
        );

        textFont("Modak");
        stroke(0);
        strokeWeight(8);
        this.drawTextWithLetterSpacing(
          "Game Over",
          width / 2 - 210,
          backgroundY + 170,
          72,
          3,
          "#EE0600"
        );
    
        
        textFont("Alfa Slab One");
        stroke(0);
        strokeWeight(0);
        this.drawTextWithLetterSpacing(
            "Repeat",
            width / 2 - 170,
            backgroundY + 300,
            32,
            2,
            "#000"
        );
        
        this.drawTextWithLetterSpacing(
            "Exit",
            width / 2 - -90,
            backgroundY + 300,
            32,
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

}