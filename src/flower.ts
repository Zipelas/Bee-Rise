class Flower extends Entity {  

  constructor() {
    const flowerWidth = 150;
    const flowerHeight = 80;
    const x = random(width * 0.2, width * 0.8 - flowerWidth);
    const y = random(height - flowerHeight);

    super(x, y, flowerWidth, flowerHeight, 0, 0, images.flower);
  }

  public draw() {
    super.draw();
  }

  }