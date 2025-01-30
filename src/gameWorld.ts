class GameWorld implements Scene {
  protected gameEntities: Entity[];
  private cloudImage: p5.Image;
  private score: Score;
  private cameraOffset: p5.Vector;
  private highestYReached: number;
  private nextFlowerSpawnY: number;
  private spawnInterval: number;
  private floatingTexts: FloatingText[];
  private lastFlowerPosition: p5.Vector;

  private skyColors: p5.Color[];
  private transitionDuration: number;
  private startTime: number;

  // Tracks the time we last spawned an enemy
  private lastEnemySpawnTime: number;

  constructor() {
    this.gameEntities = [new Player(), this.createRandomEnemy()];
    this.cloudImage = images.cloud;
    const scorePosition = createVector(-100, -100);
    this.score = new Score("black", 0, 0, scorePosition, images.score);
    this.cameraOffset = createVector(0, 0);

    // Start at Infinity so the first time we compare player's Y,
    // it sets highestYReached to player's current Y
    this.highestYReached = Infinity;
    this.spawnInterval = 400;
    this.nextFlowerSpawnY = height - 400;
    this.lastFlowerPosition = createVector(width * 0.5, height * 0.95);
    this.floatingTexts = [];

    this.initializeClouds();
    this.initializeFlowers();
    this.generateBottomPlatform();

    this.skyColors = [color("#2a9ec7"), color("#1f6b91"), color("#2d2f3b")];
    this.transitionDuration = 30000; // övergångstid i millisekunder
    this.startTime = millis();      // Starttid för färgövergång

    // Initialize the enemy-spawn timer
    this.lastEnemySpawnTime = millis();
  }

  private createRandomEnemy(): Enemy {
    const types: ("bird" | "ufo" | "plane")[] = ["bird", "ufo", "plane"];
    const randomType = random(types);
    return new Enemy(randomType);
  }

  private initializeClouds() {
    const cloudPositions: { x: number; y: number }[] = [];
    for (let i = 0; i < 5; i++) {
      let x: number, y: number;
      let validPosition = false;
      while (!validPosition) {
        x = random(0, width + 1200);
        y = random(0, height + 1000);
        validPosition = cloudPositions.every((pos) => {
          return dist(pos.x, pos.y, x, y) > 100;
        });
        if (validPosition) cloudPositions.push({ x, y });
      }
      this.gameEntities.push(
        new Moln(x, y, random(50, 150), random(30, 80), 0, this.cloudImage)
      );
    }
  }

  private initializeFlowers() {
    for (let i = 0; i < 5; i++) {
      const flower = new Flower();
      flower.position = createVector(
        random(width * 0.3, width * 0.6),
        this.lastFlowerPosition.y - random(200, 500)
      );
      this.lastFlowerPosition = flower.position;
      this.gameEntities.push(flower);
    }
  }

  private generateBottomPlatform() {
    const bottomFlower = new Flower();
    bottomFlower.position = createVector(width / 2, height - 50);
    this.gameEntities.push(bottomFlower);
  }

  private checkCollision() {
    for (const gameEntity of this.gameEntities) {
      if (gameEntity instanceof Player) {
        for (const otherEntity of this.gameEntities) {
          if (otherEntity instanceof Player) continue;
          if (this.entitiesCollide(gameEntity, otherEntity)) {
            if (otherEntity instanceof Flower) {
              gameEntity.jump();
            } else if (otherEntity instanceof Honey) {
              otherEntity.applyEffect(this.score);
              this.gameEntities = this.gameEntities.filter(
                (e) => e !== otherEntity
              );

              // Create a floating text effect
              const textPosition = createVector(
                otherEntity.position.x,
                otherEntity.position.y - 30
              );
              this.floatingTexts.push(new FloatingText("+20", textPosition));
            } else if (otherEntity instanceof Enemy) {
              game.changeScene("gameover");
            }
          }
        }
      }
    }
  }

  private entitiesCollide(o1: Entity, o2: Entity): boolean {
    return (
      dist(o1.hitBoxPos.x, o1.hitBoxPos.y, o2.hitBoxPos.x, o2.hitBoxPos.y) <=
      o1.hitBoxRadius + o2.hitBoxRadius
    );
  }

  // Checks if player has fallen 1000px below their highest point
  private checkPlayerFall() {
    const player = this.gameEntities.find((e) => e instanceof Player);
    if (!player) return;

    // If player's y > height (off bottom of screen), game over
    if (player.position.y > height) {
      game.changeScene("gameover");
      return;
    }

    // If the player has fallen 1000 px below highest reached point, game over
    if (player.position.y - this.highestYReached >= 1000) {
      game.changeScene("gameover");
    }
  }

  private spawnFlowersAbovePlayer(playerY: number) {
    for (let i = 0; i < 2; i++) {
      const flower = new Flower();
      flower.position = createVector(
        random(width * 0.3, width * 0.7),
        this.lastFlowerPosition.y - random(200, 500)
      );
      this.lastFlowerPosition = flower.position;
      this.gameEntities.push(flower);
    }
  }

  private createRandomHoney(): Honey {
    return new Honey(
      random(width * 0.3, width * 0.7),
      this.highestYReached - random(500, 1200)
    );
  }

  public update() {
    // 1) Update each entity
    for (const entity of this.gameEntities) {
      entity.update();
    }

    // Find the player for camera updates
    const player = this.gameEntities.find((e) => e instanceof Player) as Player;
    if (player) {
      // Camera follows player
      this.cameraOffset.x = 0;
      this.cameraOffset.y = height * 0.7 - (player.position.y + player.size.y / 2);

      // Update highestYReached if player goes higher (smaller y)
      if (player.position.y < this.highestYReached) {
        this.highestYReached = player.position.y;
        this.score.update();
      }

      // Spawn new flowers when passing nextFlowerSpawnY
      if (player.position.y < this.nextFlowerSpawnY) {
        this.spawnFlowersAbovePlayer(player.position.y);
        this.nextFlowerSpawnY -= this.spawnInterval;
      }

      const now = millis();
      if (now - this.lastEnemySpawnTime >= 5000) {
        const newEnemy = this.createRandomEnemy();

        // Position it offscreen left
        newEnemy.position.x = -300;
        // 2000 px above player's Y
        newEnemy.position.y = player.position.y - 2000;

        this.gameEntities.push(newEnemy);

        // Reset the spawn timer
        this.lastEnemySpawnTime = now;
      }
    }

    // Check falling and collisions
    this.checkPlayerFall();
    this.checkCollision();

    // Occasionally spawn honey
    if (random(1) < 0.005) {
      this.gameEntities.push(this.createRandomHoney());
    }

    // Update floating texts
    this.floatingTexts.forEach((text) => text.update());
    this.floatingTexts = this.floatingTexts.filter((text) => !text.isExpired());
  }

  public draw(): void {
    // Handle background color transition
    const elapsedTime = millis() - this.startTime;
    const phase = floor(elapsedTime / this.transitionDuration);
    const t = (elapsedTime % this.transitionDuration) / this.transitionDuration;

    let currentColor: p5.Color;
    if (phase < this.skyColors.length - 1) {
      currentColor = lerpColor(this.skyColors[phase], this.skyColors[phase + 1], t);
    } else {
      currentColor = this.skyColors[this.skyColors.length - 1];
    }
    background(currentColor);

    push();
    translate(this.cameraOffset.x, this.cameraOffset.y);

    // Draw flowers first
    for (const entity of this.gameEntities) {
      if (entity instanceof Flower) {
        entity.draw();
      }
    }

    // Draw honey
    for (const entity of this.gameEntities) {
      if (entity instanceof Honey) {
        entity.draw();
      }
    }

    // Draw enemies and clouds
    for (const entity of this.gameEntities) {
      if (entity instanceof Enemy) {
        entity.draw();
      }
      if (entity instanceof Moln) {
        entity.draw();
      }
    }

    // Draw player last
    const player = this.gameEntities.find((e) => e instanceof Player);
    if (player) {
      player.draw();
    }

    pop(); // end camera transform

    // Draw floating texts (translate inside so they move with camera)
    this.floatingTexts.forEach((text) => {
      push();
      translate(this.cameraOffset.x, this.cameraOffset.y);
      text.draw();
      pop();
    });

    // Draw the score above everything else
    this.score.draw();
  }
}