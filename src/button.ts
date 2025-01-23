class Button {
  private title: string;
  private backgroundColor: string;
  private width: number;
  private height: number;
  private textColor: string;
  private x: number;
  private y: number;
  private image: p5.Image;

  constructor(
    title: string,
    x: number,
    y: number,
    width: number,
    height: number,
    backgroundColor: string,
    textColor: string,
    image: p5.Image
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

    // Draw icon to the left of the button
    imageMode(CENTER);
    image(this.image, this.x - 100, this.y, 40, 40); // Adjust position for the icon

    // Draw text next to the icon
    textAlign(LEFT, CENTER);
    fill(this.textColor);
    textFont("Alfa Slab One", 24);
    text(this.title, this.x - 50, this.y); // Adjust text placement to align with the icon

    pop();
  }

  private isMouseOver() {
    const offsetX = this.width * 0.5;
    const offsetY = this.height * 0.5;

    return (
      mouseX > this.x - offsetX &&
      mouseX < this.x + offsetX &&
      mouseY > this.y - offsetY &&
      mouseY < this.y + offsetY
    );
  }

  public isClicked() {
    return this.isMouseOver() && mouseIsPressed;
  }
}