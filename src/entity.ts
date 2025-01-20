/// <reference path="gameWorld.ts" />


//entity
class Entity {
  protected x: number;
   protected y: number;
  protected width: number;
  protected height: number;
  protected image: p5.Image;
 
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