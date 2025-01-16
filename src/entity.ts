class Entity {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private image: p5.Image;

  constructor(x: number, y: number, width: number, height: number, image: p5.Image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  public update() {
  }

  public draw() {
  }
}