class Flower extends Entity {
    private jumpCooldown: number;
    private lastJumpTime: number;
  
    constructor(x: number, y: number, width: number, height: number, image: p5.Image) {
      super(x, y, width, height, image);
      this.jumpCooldown = 2000; // Time in milliseconds between jumps
      this.lastJumpTime = millis(); // Track the time of the last jump
    }
  
    public update() {
      // Check if enough time has passed to allow a jump
      if (millis() - this.lastJumpTime > this.jumpCooldown) {
        this.jumpToRandomPosition();
        this.lastJumpTime = millis();
      }
    }
  
    public draw() {
      image(this.image, this.x, this.y, this.width, this.height);
    }
  
    private jumpToRandomPosition() {
      // Assign a new random position within the canvas
      this.x = random(width - this.width);
      this.y = random(height - this.height);
    }
  }