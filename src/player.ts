
/// sumaya´s code 
/*class Player extends Entity{
    private playerName: string;
    private playerScore: number;
    private keyPressRight: boolean;
    private keyPressLeft: boolean;
   constructor(x: number, y: number, width: number, height: number, image: p5.Image, playerName: string, playerScore: number, keyPressRight: boolean, keyPressLeft: boolean) {
         super(x, y, width, height, image);
         this.playerName = playerName;
         this.playerScore = playerScore;
         this.keyPressRight = keyPressRight;
         this.keyPressLeft = keyPressLeft;
    }
    public update() {
        if (this.keyPressRight) {
            this.x += 5;
        }
        if (this.keyPressLeft) {
            this.x -= 5;
        }
    }
    public draw() {
        image(this.image, this.x, this.y, this.width, this.height);
    }
    public onclick() {
    }
}*

let player: Player; 

function setup() {
    createCanvas(800, 600);
    player = new Player(100, 100, 50, 50, loadImage("assets/bee.png"), "Player 1", 0, false, false);
}*/
/// <reference path="entity.ts" />*


/// <reference path="entity.ts" />


class Player extends Entity {
  private jumpStrength: number = 7;
  private gravity: number = 0.2;
  private groundLevel: number; 

   constructor() {
    super(width * 0.5, height - 120, 100, 120, 0, 0, images.player);
    this.groundLevel = height - 120;
    this.velocity.y = -this.jumpStrength;
   } 

   public update() {
    super.update();
    
    if (keyIsDown(LEFT_ARROW)) {
        this.velocity.x = -5
    } else if (keyIsDown(RIGHT_ARROW)) {
        this.velocity.x = 5
    } else {
        this.velocity.x = 0;
    }

    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;

    if (this.position.y >= this.groundLevel) {
      this.position.y = this.groundLevel;
      this.velocity.y = -this.jumpStrength;
    }

}
}