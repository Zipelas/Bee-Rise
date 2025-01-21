class StartMenu implements Scene {
  private backgroundImage: p5.Image;
  private arrowImage: p5.Image;
  private startButton: p5.Element;

  constructor() {
    this.backgroundImage = loadImage("./assets/music/background.jpg");
    this.arrowImage = loadImage("./assets/music/arrowkeys.png");

    // Button
    this.startButton = createButton("Play");
    this.startButton.style("background-color", "#d20007");
    this.startButton.style("color", "white");
    this.startButton.style("font-size", "20px");
    this.startButton.style("font-family", "'Alfa Slab One'");
    this.startButton.style("padding", "10px 50px");
    this.startButton.style("border", "2px solid black");
    this.startButton.style("border-radius", "40px");
    this.startButton.style("cursor", "pointer");
    this.startButton.mousePressed(() => this.startGame());

    // Lägg till pulsanimationen
    this.startButton.style("animation", "pulse 1.5s infinite");

    // Lägg till hover-effekt
    this.startButton.mouseOver(() => {
      this.startButton.style("background-color", "#f70a0f");
    });
    this.startButton.mouseOut(() => {
      this.startButton.style("background-color", "#d20007");
    });

    // Lägg till pulsanimation till dokumentets `<style>`
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }

  public update() {
    // Uppdateringslogik om det behövs
  }

  public draw() {
    image(this.backgroundImage, 0, 0, width, height);

   
    this.startButton.position(windowWidth / 2 - 100, windowHeight / 2 - 90);

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

    // Arrowkeys
    const imageWidth = 180;
    const imageHeight = 175;
    const imageX = width / 2 - 25 - imageWidth / 2;
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
      imageX + imageWidth + 20,
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
    this.startButton.hide(); // Dölj knappen när spelet startar
    // Logik för att byta till spelets huvudsakliga scen
  }

  public windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
}


