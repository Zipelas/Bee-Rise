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

  private clouds: Moln[];

  private honeySpawnInterval: number; // Tid mellan honungar (millisekunder)
  private lastHoneySpawnTime: number; 

  constructor() {
    this.gameEntities = [new Player(), this.createRandomEnemy()];
    this.cloudImage = images.cloud;
    const scorePosition = createVector(-100, -100);
    this.score = new Score("black", 0, 0, scorePosition, images.score);
    this.cameraOffset = createVector(0, 0);
    this.highestYReached = Infinity;
    this.spawnInterval = 400;
    this.nextFlowerSpawnY = height - 400;
    this.lastFlowerPosition = createVector(width * 0.5, height * 0.95);
    this.floatingTexts = [];
    this.clouds = [];
    this.honeySpawnInterval = 5000; // 5 sekunder mellan honungar
    this.lastHoneySpawnTime = millis();
    this.initializeClouds();
    this.initializeFlowers();
    this.generateBottomPlatform();

    this.skyColors = [color("#2a9ec7"), color("#1f6b91"), color("#2d2f3b")];
    this.transitionDuration = 30000;
    this.startTime = millis();
  }

  private createRandomEnemy(): Enemy {
    const types: ("bird" | "ufo" | "plane")[] = ["bird", "ufo", "plane"];
    const randomType = random(types);
    return new Enemy(randomType);
  }

  private initializeClouds() {
      const cloudCount = 5;
      const minDistance = 400;
      const maxAttempts = 700;
    
      for (let i = 0; i < cloudCount; i++) {
        let attempts = 0;
        let validPosition = false;
        let x: number = 0;
        let y: number = 0;
    
        while (!validPosition && attempts < maxAttempts) {
          x = random(50, width - 50);
          y = random(50, height - 50);
    
          validPosition = this.clouds.every(cloud => {
            const distance = dist(x, y, cloud.position.x, cloud.position.y);
            return distance > minDistance;
          });
    
          attempts++;
        }
    
        if (validPosition) {
          
          const cloudWidth = random(80, 200);
          const cloudHeight = random(50, 100);
          const cloud = new Moln(x, y, cloudWidth, cloudHeight, 0, this.cloudImage);
          this.clouds.push(cloud);
          console.log(`Moln ${i + 1} skapades på (${x}, ${y}).`);
        } else {
          console.warn(`Moln ${i + 1} kunde inte placeras efter ${maxAttempts} försök.`);
        }
      }
    
      console.log(`Totalt ${this.clouds.length} moln skapades.`);
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

  private checkPlayerFall() {
    const player = this.gameEntities.find((e) => e instanceof Player);
    if (player && player.position.y > height) game.changeScene("gameover");
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

  private createRandomHoney() {
    const now = millis();

  if (now - this.lastHoneySpawnTime > this.honeySpawnInterval) {
    // Begränsa antalet honung som kan finnas i spelet
    const honeyCount = this.gameEntities.filter((entity) => entity instanceof Honey).length;
    const maxHoney = 3; // Max 3 honung samtidigt

    if (honeyCount < maxHoney) {
      const honey = new Honey(
        random(width * 0.3, width * 0.7),
        this.highestYReached - random(500, 1000)
      );
      this.gameEntities.push(honey);
      this.lastHoneySpawnTime = now;
    }
  }
}

  public update() {
    for (const entity of this.gameEntities) {
      entity.update();
    }

    for (const cloud of this.clouds) {
      cloud.update(); // Om Moln har någon logik i framtiden
    }

    const player = this.gameEntities.find((e) => e instanceof Player) as Player;
    if (player) {
      this.cameraOffset.x = 0;
      this.cameraOffset.y =
        height * 0.7 - (player.position.y + player.size.y / 2);
      if (player.position.y < this.highestYReached) {
        this.highestYReached = player.position.y;
        this.score.update();
      }
      if (player.position.y < this.nextFlowerSpawnY) {
        this.spawnFlowersAbovePlayer(player.position.y);
        this.nextFlowerSpawnY -= this.spawnInterval;
      }
    }
    this.checkPlayerFall();
    this.checkCollision();
    this.createRandomHoney();

    // Update floating texts
    this.floatingTexts.forEach((text) => text.update());
    this.floatingTexts = this.floatingTexts.filter((text) => !text.isExpired());
  }

  public draw(): void {
        // Hantera bakgrundsfärgövergången
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

        const backgroundBrightness = red(currentColor) * 0.299 + green(currentColor) * 0.587 + blue(currentColor) * 0.114;

  // Hämta max och min ljusstyrka från skyColors
  const maxBrightness = Math.max(
    ...this.skyColors.map(color => {
      return red(color) * 0.299 + green(color) * 0.587 + blue(color) * 0.114;
    })
  );
  const minBrightness = Math.min(
    ...this.skyColors.map(color => {
      return red(color) * 0.299 + green(color) * 0.587 + blue(color) * 0.114;
    })
  );

  // Normalisera ljusstyrkan för molnen
  const cloudDarkness = map(
    backgroundBrightness,
    minBrightness,
    maxBrightness,
    0.3,
    1
  );

  console.log("Background Brightness:", backgroundBrightness, "Cloud Darkness:", cloudDarkness);

  // Uppdatera molnens mörkhetsgrad och rita dem
  for (const cloud of this.clouds) {
    cloud.setDarkness(cloudDarkness);
    cloud.draw();
  }

  push();
  translate(this.cameraOffset.x, this.cameraOffset.y);
      

    // Draw game entities (flowers first, honey, then enemies and clouds)
    for (const entity of this.gameEntities) {
      if (entity instanceof Flower) {
        entity.draw();
      }
    }

    // Draw honey (power-ups) after flowers
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
        // Assuming Moln is the cloud class
        entity.draw();
      }
    }

    // Draw player last to make sure it appears on top of the flowers, honey, enemies, and clouds
    const player = this.gameEntities.find((e) => e instanceof Player);
    if (player) {
      player.draw();
    }

    pop(); // Ensure text is not affected by camera translation

    // Draw floating texts correctly
    this.floatingTexts.forEach((text) => {
      push();
      translate(this.cameraOffset.x, this.cameraOffset.y);
      text.draw();
      pop();
    });

    // Draw the score (outside of camera transform)
    this.score.draw();
  }
}
