class GameOverMenu implements Scene {
    private reuseImage: p5.Im
    private crossImage: p5.Image;
  
    constructor() {
        this.reuseImage = loadImage("./assets/images/resuse.png");
        this.crossImage = loadImage("./assets/images/cross.png");
    }
    
    public update() {    
    }

    public draw() {
        background("#2a9ec7")
        this.drawGameOverMenu()
        this.crossImage()
    }

    private drawGameOverMenu() {
        const backgroundX = width / 2 - 255;
        const backgroundY = height / 2 + 10;
        const backgroundWidth = 470;
        const backgroundHeight = 250;
        const cornerRadius = 150;
        
        fill("#FF9999"); 
        noStroke();
        rect(
            backgroundX,
            backgroundY,
            backgroundWidth,
            backgroundHeight,
            cornerRadius,
          
        );
    }
}