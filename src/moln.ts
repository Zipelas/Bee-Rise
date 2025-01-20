class Moln {
    private size: p5.Vector;
    private color: string;
    private img: p5.Image;
    private velocity: p5.Vector;
    private position: p5.Vector;
    private width: number;
    private height: number;
  
    constructor(
      img: p5.Image,
      size: p5.Vector,
      color: string,
      width: number,
      height: number,
      velocity: p5.Vector,
      position: p5.Vector
    ) {
      this.img = img;
      this.size = size;
      this.color = color;
      this.width = width;
      this.height = height;
      this.velocity = velocity;
      this.position = position;
    }
  
    update(): void {
      // Move the cloud horizontally
      this.position.add(this.velocity);
  
      // Reset position if the cloud goes off-screen
      if (this.position.x > width) {
        this.position.x = -this.width;
      }
    }
  
    draw(): void {
      // Draw the cloud
      image(this.img, this.position.x, this.position.y, this.width, this.height);
    }
  }





let clouds: Moln[] = [];
let cloudImage: p5.Image;

function preload() {
  // Load the cloud image
  cloudImage = loadImage("/assets/images/cloud.png");
}


