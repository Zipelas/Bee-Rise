class GameWorld implements Scene {
  protected gameEntities: Entity[]; // Array for game entities
  private cloudImage: p5.Image;
  private score: Score; // Score instance

  private cameraOffset: p5.Vector; // We track how to shift the view

  constructor() {
    this.gameEntities = [new Player(), this.createRandomEnemy()];
    this.cloudImage = images.cloud; // Load the cloud image

    // Initialize the score system
    const scorePosition = createVector(-100, -100); // Position for the score
    this.score = new Score("black", 0, 0, scorePosition, images.score); // Create score instance

    // Initialize camera offset
    this.cameraOffset = createVector(0, 0);

    this.initializeClouds();
    this.initializeFlowers();
  }

  private createRandomEnemy(): Enemy {
    const types: ("bird" | "ufo" | "plane")[] = ["bird", "ufo", "plane"];
    const randomType = random(types);
    return new Enemy(randomType);
  }

  private initializeClouds() {
    const cloudPositions: { x: number; y: number }[] = [];
    
    for (let i = 0; i < 5; i++) {
      let width = random(50, 150); // Random cloud width
      let height = random(30, 80); // Random cloud height
      let x: number = 0, y: number = 0;
      let validPosition = false;

      while (!validPosition) {
        x = random(0, width + 1200);
        y = random(0, height + 1000);

        // Ensure clouds do not overlap
        while (!validPosition) {
          x = random(0, width + 1200);
          y = random(0, height + 1000);

          validPosition = cloudPositions.every(pos => {
            const distance = dist(pos.x, pos.y, x, y);
            return distance > Math.max(width, height);
          });
          
          if (validPosition) {
            cloudPositions.push({ x, y });
          }
        }

        const cloud = new Moln(x, y, width, height, 0, this.cloudImage);
        this.gameEntities.push(cloud);
      }
    }
  }

  private initializeFlowers() {
    const flowerPositions = [];

    // Generate 5 flowers with horizontal positions between 30% and 70% of the width
    for (let i = 0; i < 5; i++) {
      const x = random(width * 0.3, width * 0.7);
      const y = random(0, height);
      flowerPositions.push(createVector(x, y));
    }
    
    // Create flowers at the defined positions
    for (const pos of flowerPositions) {
      const flower = new Flower();
      flower.position = pos;
      this.gameEntities.push(flower);
    }
  }

  private checkCollision() {
    for (const gameEntity of this.gameEntities) {
      if (gameEntity instanceof Player) {
        for (const otherEntity of this.gameEntities) {
          if (otherEntity instanceof Player) continue;

          if (this.entitiesCollide(gameEntity, otherEntity)) {
            if (otherEntity instanceof Flower) {
              gameEntity.jump(); // example reaction
            }
          }
        }
      }
    }
  }

  private entitiesCollide(o1: Entity, o2: Entity): boolean {
    if (o2 instanceof Flower) {
      // Flower center
      const flowerCenterX = o2.position.x + o2.size.x / 2;
      const flowerCenterY = o2.position.y + o2.size.y / 2;
      const flowerCenterRadius = o2.size.x / 4; 

      // Player center
      const playerCenterX = o1.position.x + o1.size.x / 2;
      const playerCenterY = o1.position.y + o1.size.y / 2;

      const distance = dist(playerCenterX, playerCenterY, flowerCenterX, flowerCenterY);
      return distance <= flowerCenterRadius;
    }
  
    // Default rectangle collision
    return (
      o1.position.x < o2.position.x + o2.size.x &&
      o1.position.x + o1.size.x > o2.position.x &&
      o1.position.y < o2.position.y + o2.size.y &&
      o1.position.y + o1.size.y > o2.position.y
    );
  }

  public update() {
    // Update all entities (including the player)
    for (const gameEntity of this.gameEntities) {
      gameEntity.update();
    }

    // Find the player
    const player = this.gameEntities.find(e => e instanceof Player) as Player;
    if (player) {
      // We do NOT move horizontally, so cameraOffset.x = 0
      this.cameraOffset.x = 0;

      // ONLY follow the player vertically:
      this.cameraOffset.y = height * 0.7 - (player.position.y + player.size.y / 2);

      // (Optional) clamp the offset if your world has boundaries
      // e.g.: if the world is 2000px high
      // let worldHeight = 2000;
      // this.cameraOffset.y = constrain(
      //   this.cameraOffset.y,
      //   -(worldHeight - height), 
      //   0
      // );
    }

    this.checkCollision();
  }
  
   
  public draw(): void {
    background("#2a9ec7");

    // Shift the entire scene according to cameraOffset
    push();
    translate(this.cameraOffset.x, this.cameraOffset.y);

    // Draw non-player entities first
    for (const entity of this.gameEntities) {
      if (!(entity instanceof Player)) {
        entity.draw();
      }
    }
    
    // Draw the player on top
    for (const entity of this.gameEntities) {
      if (entity instanceof Player) {
        entity.draw();
      }
    }

    // Revert to default coordinate system
    pop();
    
    // Draw the score in screen space
    this.score.draw();
  } 
}
