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
        image(this.exitImage, width / 2 - 25, height / 2 + 100, 50, 50);
        image(this.repeatImage, width / 2 - 25, height / 2 + 150, 50, 50);
    }

    private drawGameOverMenu() {
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
            cornerRadius,          
        );

        textFont("Modak");
  
        this.drawTextWithLetterSpacing(
          "Game Over",
          width / 2 - 190,
          backgroundY + 50,
          62,
          3,
          "#EE0600"
        );
    
        
        textFont("Alfa Slab One");
        
        this.drawTextWithLetterSpacing(
            "Repeat",
            width / 2 - 180,
            backgroundY + 150,
            16,
            2,
            "#000"
        );
        
        this.drawTextWithLetterSpacing(
            "Exit",
            width / 2 - -80,
            backgroundY + 150,
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

}