class GameWorld implements Scene {
  protected gameEntities: Entity[];
  private cloudImage: p5.Image;
  private score: Score; // Score instance

  constructor() {
    this.gameEntities = [new Player(), this.createRandomEnemy()];
    this.cloudImage = images.cloud; // Load the cloud image

    // Initialize the score system
    const scorePosition = createVector(-100, -100); // Position for the score
    this.score = new Score("black", 0, 0, scorePosition, images.score); // Create score instance

    this.initializeClouds(); // Initialize clouds
    this.initializeFlowers();
    this.generateBottomPlatform();
    // Initialize player and flowers
  }

  private createRandomEnemy(): Enemy {
    const types: ("bird" | "ufo" | "plane")[] = ["bird", "ufo", "plane"];
    const randomType = random(types); // Slumpa en typ
    return new Enemy(randomType);
  }

  private initializeClouds() {
    const cloudPositions: { x: number; y: number }[] = []; // To track existing cloud positions

    for (let i = 0; i < 5; i++) {
      let width = random(50, 150); // Random cloud width
      let height = random(30, 80); // Random cloud height
      let x: number = 0,
        y: number = 0;
      let validPosition = false;

      while (!validPosition) {
        x = random(0, width + 1200); // Random horizontal position
        y = random(0, height + 1000); // Random vertical position

        // Ensure clouds do not overlap
        while (!validPosition) {
          x = random(0, width + 1200); // Random horizontal position (canvas size + margin)
          y = random(0, height + 1000); // Random vertical position (canvas size + margin)

          validPosition = cloudPositions.every((pos) => {
            const distance = dist(pos.x, pos.y, x, y);
            return distance > Math.max(width, height); // Ensure spacing
          });

          if (validPosition) {
            cloudPositions.push({ x, y }); // Store valid position
          }
        }
        // Create a static cloud

        const cloud = new Moln(x, y, width, height, 0, this.cloudImage);
        this.gameEntities.push(cloud); // Add cloud to game entities
      }
    }
  }

  private initializeFlowers() {
    // Define the positions for the flowers to create a cross pattern
    const flowerPositions = [];

    // Generera 5 blommor med horisontell position mellan 30% och 70%
    for (let i = 0; i < 5; i++) {
      const x = random(width * 0.3, width * 0.7); // Mellan 30% och 70% av bredden
      const y = random(0, height); // Hela höjden av skärmen
      flowerPositions.push(createVector(x, y));
    }

    // Create flowers at the defined positions
    for (const pos of flowerPositions) {
      const flower = new Flower();
      flower.position = pos; // Set flower position to the defined spot
      this.gameEntities.push(flower);
    }
  }

  private generateBottomPlatform() {
    const y = height - 50;
    const x = width / 2;

    const bottomFlower = new Flower();
    bottomFlower.position = createVector(x, y);
    this.gameEntities.push(bottomFlower);
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

  private entitiesCollide(o1: Entity, o2: Entity): boolean {
    if (o2 instanceof Flower) {
      // Define the center (yellow part) of the flower
      const flowerCenterX = o2.position.x + o2.size.x / 2;
      const flowerCenterY = o2.position.y + o2.size.y / 2;
      const flowerCenterRadius = o2.size.x / 4; // Assume the yellow part is a circle with radius size.x / 4

      // Check if the player's center is within the flower's center circle
      const playerCenterX = o1.position.x + o1.size.x / 2;
      const playerCenterY = o1.position.y + o1.size.y / 2;

      const distance = dist(
        playerCenterX,
        playerCenterY,
        flowerCenterX,
        flowerCenterY
      );
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

  private checkPlayerFall() {
    const player = this.gameEntities.find((entity) => entity instanceof Player);
    if (player && player.position.y > height) {
      game.changeScene("gameover"); // Switch to game over scene
    }
  }

  public update() {
    for (const gameEntitie of this.gameEntities) {
      gameEntitie.update();
    }
    this.checkPlayerFall();
    this.checkCollision();
  }

  public draw(): void {
    background("#2a9ec7");

    for (const entity of this.gameEntities) {
      if (!(entity instanceof Player)) {
        entity.draw();
      }
    }

    // Draw the player last to ensure it appears in front
    for (const entity of this.gameEntities) {
      if (entity instanceof Player) {
        entity.draw();
      }
    }

    this.score.draw();
  }
}
