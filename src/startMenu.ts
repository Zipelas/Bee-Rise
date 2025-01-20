/// *<reference path="to-file-with-class" />

class StartMenu implements Scene {
  private clouds: Moln[] = [];
  private flowers: Flower[] = [];
  private player: Player;

  constructor() {
    this.initializeClouds();
    this.initializeFlowers();
    this.initializePlayer();
  }

  private initializeClouds() {
    for (let i = 0; i < 7; i++) {
      let size = createVector(random(50, 150), random(50, 100));
      let width = size.x;
      let height = size.y;
      let position = createVector(random(800), random(200)); // Adjust canvas size here
      let velocity = createVector(random(0.2, 2), 0); // Slow movement
      let color = "#87CEEB";

      let cloud = new Moln(cloudImage, size, color, width, height, velocity, position);
      this.clouds.push(cloud);
    }
  }

  private initializeFlowers() {
    for (let i = 0; i < 1; i++) {
      let x = random(width);
      let y = random(height);
      let flower = new Flower(x, y, 100, 50, flowerImage); // Fixed size for flowers
      this.flowers.push(flower);
    }
  }

  private initializePlayer() {
    // Initialize the player using the preloaded image
    this.player = new Player(200, 200, 150, 150, playerImage, "Player 1", 0, false, false);
  }

  public update() {
    for (let cloud of this.clouds) {
      cloud.update();
    }

    for (let flower of this.flowers) {
      flower.update();
    }

    // Update the player's position based on key presses
    if (keyIsDown(RIGHT_ARROW)) {
      this.player["keyPressRight"] = true;
      this.player["keyPressLeft"] = false;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.player["keyPressRight"] = false;
      this.player["keyPressLeft"] = true;
    } else {
      this.player["keyPressRight"] = false;
      this.player["keyPressLeft"] = false;
    }

    this.player.update();
  }

  public draw() {
    background("#87CEEB"); // Sky color

    for (let cloud of this.clouds) {
      cloud.draw();
    }

    for (let flower of this.flowers) {
      flower.draw();
    }

    // Draw the player
    this.player.draw();
  }
}

let startMenu: StartMenu;
let flowerImage: p5.Image;
let playerImage: p5.Image;

function preload() {
  cloudImage = loadImage("assets/images/cloud.png");
  flowerImage = loadImage("assets/images/flower1.png");
  playerImage = loadImage("assets/images/bee.png"); // Preload the player image
}

function setup() {
  createCanvas(800, 600);

  // Initialize the StartMenu scene
  startMenu = new StartMenu();
}

function draw() {
  // Update and render the StartMenu
  startMenu.update();
  startMenu.draw();
}