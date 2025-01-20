/// <reference path="gameWorld.ts" />

class Entity {

 protected x: number;
 protected y: number;
 protected width: number;
 protected height: number;
 protected image: p5.Image;

  protected position: p5.Vector;
  private size: p5.Vector;
  protected velocity: p5.Vector;


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
       
  }
}