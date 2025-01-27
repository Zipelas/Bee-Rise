class GameWorld implements Scene {
  protected gameEntities: Entity[] = []; // Array for all game entities
  private cloudImage: p5.Image; // Image for clouds
  private score: Score; // Score instance

  constructor() {
    this.cloudImage = images.cloud; // Load the cloud image

    // Initialize the score system
    const scorePosition = createVector(-100, -100); // Position for the score
    this.score = new Score("black", 0, 0, scorePosition, images.score); // Create score instance

    this.initializeClouds(); // Initialize clouds
    this.initializeEntities(); // Initialize player and flowers
  }

  // Initialize clouds with non-overlapping positions
  private initializeClouds() {
    const cloudPositions: { x: number; y: number }[] = []; // Track cloud positions

    for (let i = 0; i < 5; i++) {
      let width = random(50, 150); // Random cloud width
      let height = random(30, 80); // Random cloud height
      let x: number, y: number;
      let validPosition = false;

      while (!validPosition) {
        x = random(0, width + 1200); // Random horizontal position
        y = random(0, height + 1000); // Random vertical position

        validPosition = cloudPositions.every(pos => {
          const distance = dist(pos.x, pos.y, x, y);
          return distance > Math.max(width, height); // Ensure spacing
        });

        if (validPosition) {
          cloudPositions.push({ x, y }); // Store valid position
        }
      }

      const cloud = new Moln(x, y, width, height, 0, this.cloudImage);
      this.gameEntities.push(cloud); // Add cloud to game entities
    }
  }

  // Initialize player and flowers
  private initializeEntities() {
    // Add the player to the game
    const player = new Player();
    this.gameEntities.push(player);

    // Add flowers to the game
    const numberOfFlowers = floor(random(5, 7)); // Random number of flowers
    for (let i = 0; i < numberOfFlowers; i++) {
      const flower = new Flower(i); // Pass index for flower placement
      this.gameEntities.push(flower);
    }
  }

  // Check collisions between the player and other entities
  private checkCollision() {
    for (const gameEntity of this.gameEntities) {
      if (gameEntity instanceof Player) {
        for (const otherEntity of this.gameEntities) {
          if (otherEntity instanceof Player) continue; // Skip self

          if (this.entitiesCollide(gameEntity, otherEntity)) {
            if (otherEntity instanceof Flower) {
              gameEntity.jump(); // Player jumps on collision with a flower
            }
          }
        }
      }
    }
  }

  // Check if two entities collide
  private entitiesCollide(o1: Entity, o2: Entity): boolean {
    return (
      o1.position.x < o2.position.x + o2.size.x &&
      o1.position.x + o1.size.x > o2.position.x &&
      o1.position.y < o2.position.y + o2.size.y &&
      o1.position.y + o1.size.y > o2.position.y
    );
  }

  // Update all game entities and check collisions
  public update(): void {
    for (const entity of this.gameEntities) {
      entity.update();
    }
    this.checkCollision();
  }

  // Draw all game entities and the score
  public draw(): void {
    background("#2a9ec7"); // Set the background color

    for (const entity of this.gameEntities) {
      entity.draw();
    }

    this.score.draw(); // Draw the score
  }
}