/// <reference path="gameWorld.ts" />

class Entity {
protected position: p5.Vector;
  private size: p5.Vector;
  protected velocity: p5.Vector;
  private image: p5.Image


  constructor(x: number, y: number, width: number, height: number, velocityX: number, velocityY: number, image: p5.Image) {
    this.position = createVector(x, y);
    this.size = createVector(width, height);
    this. velocity = createVector(velocityX, velocityY)
    this.image = image;
   
  }

  public update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  public draw() {
    push()
    image(this.image, this.position.x, this.position.y, this.size.x, this.size.y)
    pop() 
  }
}