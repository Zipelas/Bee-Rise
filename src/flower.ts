class Flower extends Entity {
  constructor(x: number, y: number, width: number, height: number, image: p5.Image) {
    super(x, y, width, height, image);
    this.width = width || 200; 
    this.height = height || 50; 
  }

  public update() {
   
  }

  public draw() {
    image(this.image, this.x, this.y, this.width, this.height);
  }


}
