/*class GameScene implements Scene {
    private clouds: Moln[] = [];
    private flowers: Flower[] = [];
    
  
    constructor() {
      this.initializeClouds();
      this.initializeFlowers();
     
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
  
    
  
    public update() {
      for (let cloud of this.clouds) {
        cloud.update();
      }
  
      for (let flower of this.flowers) {
        flower.update();
      }
  
      
  
      }
  
    public draw() {
      background("#87CEEB"); // Sky color
  
      for (let cloud of this.clouds) {
        cloud.draw();
      }
  
      for (let flower of this.flowers) {
        flower.draw();
      }
  
    }
  }
  
  let gameScene: GameScene;
  let flowerImage: p5.Image;
  let playerImage: p5.Image;
  
  function preload() {
    cloudImage = loadImage("assets/images/cloud.png");
    flowerImage = loadImage("assets/images/flower1.png");
   
  }
  
  function setup() {
    createCanvas(1500, 1000);
  
   
    gameScene = new GameScene();
  }
  
  function draw() {
    
    gameScene.update();
    gameScene.draw();
  }*/