/// <reference path="game.ts" />
class GameOverMenu implements Scene {
    private pauseImage: p5.Image;
    private repeatImage: p5.Image;
    private exitImage: p5.Image;
  
    constructor() {
        this.pauseImage = loadImage("./assets/music/pause.png");
        this.repeatImage = loadImage("./assets/music/repeat.png");
        this.exitImage = loadImage("./assets/music/exit.png");
    }
    
    public update() {    
    }

    public draw() {
        background("#2a9ec7")
        const pauseImageWidth = 50; // Bredden på bilden (justera efter dina behov)
        const pauseImageHeight = 50; // Höjden på bilden (justera efter dina behov)
        const margin = 10;
        image(this.pauseImage, width - pauseImageWidth - margin, margin, pauseImageWidth, pauseImageHeight);
        this.drawGameOverMenu()
        image(this.exitImage, width / 2 - -40, height / 2 + 20, 30, 30);
        image(this.repeatImage, width / 2 - 220, height / 2 + 20, 30, 30);
    }

    private drawGameOverMenu() {
        const backgroundX = width / 2 - 255;
        const backgroundY = height / 2 + -110;
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
          width / 2 - 210,
          backgroundY + 70,
          72,
          3,
          "#EE0600"
        );
    
        
        textFont("Alfa Slab One");
        
        this.drawTextWithLetterSpacing(
            "Repeat",
            width / 2 - 180,
            backgroundY + 150,
            24,
            2,
            "#000"
        );
        
        this.drawTextWithLetterSpacing(
            "Exit",
            width / 2 - -80,
            backgroundY + 150,
            24,
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