/// <reference path="entity.ts" />
class Moln extends Entity {
  

  constructor(){
  
   super(-50, random(height), 50,50,random(5,5), 0, images.cloudImage);

    this.initializeClouds();

    this.width = width;
  }



  private initializeClouds() {
    for (let i = 0; i < 4; i++) {
      let size = createVector(random(50, 150), random(50, 100));
      let width = size.x;
      let height = size.y;
      let position = createVector(random(800), random(200)); // Adjust canvas size here
      let velocity = createVector(random(0.5, 2), 0); // Slow movement
      let color = "#87CEEB";

   
    }
  }
  public update() {
    for (let i = 0; i < 4; i++) {
      let size = createVector(random(50, 150), random(50, 100));
      let width = size.x;
      let height = size.y;
      let position = createVector(random(800), random(200)); // Adjust canvas size here
      let velocity = createVector(random(0.5, 2), 0); // Slow movement
      let color = "#87CEEB";


    
    super.update();
    
    // Move the cloud horizontally
    this.position.add(this.velocity);

    // Reset position if the cloud goes off-screen
    if (this.position.x > width) {
      this.position.x = -this.width;
    }
  }

   
}





}

