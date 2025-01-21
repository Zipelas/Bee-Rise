class GameWorld implements Scene {
  protected gameEntities: Entity[];

  constructor() {
    this.gameEntities = [new Moln()];
  }

  public update(): void {
    for (const gameEntitie of this.gameEntities) {
      gameEntitie.update();
    }
  }

  public draw(): void {
    for (const gameEntitie of this.gameEntities) {
      gameEntitie.draw();
    }
  }
  
    // Add clouds to the GameWorld
//     for (let i = 0; i < 5; i++) {
//       const x = random(-200, 800);
//       const y = random(50, 150);
//       const width = random(50, 150);
//       const height = random(30, 80);
//       const velocityX = random(1, 3);
//       const cloud = new Moln(x, y, width, height, velocityX, cloudImage);
//       gameWorld.addEntity(cloud);
//     }
// } 
}
