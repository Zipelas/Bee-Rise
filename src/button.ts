class Button {
  private title: string;
  private backgroundColor: string;
  private width: number;
  private height: number;
  private textColor: string;
  private image?: p5.Image;
  private x: number;
  private y: number;

  constructor(
    title: string,
    x: number,
    y: number,
    width: number,
    height: number,
    backgroundColor: string,
    textColor: string,
    image?: p5.Image
  ) {
    this.title = title;
    this.backgroundColor = backgroundColor;
    this.width = width;
    this.height = height;
    this.textColor = textColor;
    this.image = image;
    this.x = x;
    this.y = y;
  }

  public draw() {
    push();

    rectMode(CENTER);
    fill(this.backgroundColor); // hover
    rect(this.x, this.y, this.width, this.height);

    textAlign(CENTER, CENTER)
    fill(this.textColor);
    textFont("Alfa Slab One", 24)
    
    text(this.title, this.x, this.y);
    
    pop();
}

private isMouseOver() {
    const offsetX = this.width * 0.5;
    const offsetY = this.height * 0.5;

    return mouseX > this.x - offsetX &&
        mouseX < this.x + this.width - offsetX &&
        mouseY > this.y - offsetY &&
        mouseY < this.y + this.height - offsetY;
  }

  public isClicked() {
    return this.isMouseOver() && mouseIsPressed
  }
}
