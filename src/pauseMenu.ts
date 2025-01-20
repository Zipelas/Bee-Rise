class PauseMenu implements Scene {
    private title: string;
    private image: p5.Image;
    private buttonContinue: Button;
    private buttonExit: Button;

    constructor(title: string, image: p5.Image, buttonContinue: Button, buttonExit: Button) {
        this.title = title;
        this.image = image;
        this.buttonContinue = buttonContinue;
        this.buttonExit = buttonExit;
    }

    public update(): void {

    }

    public draw(): void {
        background(0);
        this.drawPause();
        this.drawButtons();

        
    }

    private drawPause(): void {
        const backgroundWidth = 650;
        const backgroundHeight = 450;
        const cornerRadius = 250;
    
        const backgroundX = width / 2 - backgroundWidth / 2;
        const backgroundY = height / 2 - backgroundHeight / 2;
    
        stroke(0, 0, 0);
        strokeWeight(0.05);
        fill(255, 255, 255, 127);
        rect(
            backgroundX,
            backgroundY,
            backgroundWidth,
            backgroundHeight,
            cornerRadius
        );
        textFont("Alfa Slab One");
  
    this.drawTextWithLetterSpacing(
      "Continue",
      width / 2 - 80,
      backgroundY + 190,
      32,
      3,
      "#000"
    );

    this.drawTextWithLetterSpacing(
        "Exit",
        width / 2 - 80,
        backgroundY + 250,
        32,
        3,
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

    private drawButtons(): void {
        this.buttonContinue.draw();
        this.buttonExit.draw();
    }
}

/*
class Button {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private label: string;

    constructor(x: number, y: number, width: number, height: number, label: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
    }

    public draw(): void {
        fill(100); // Button color
        rect(this.x, this.y, this.width, this.height, 10); // Button rectangle with rounded corners
        fill(255); // Text color
        textAlign(CENTER, CENTER);
        text(this.label, this.x + this.width / 2, this.y + this.height / 2);
    }
}
*/