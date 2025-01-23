class GameWorld implements Scene {
  private gameEntities: Entity[];

  constructor() {
    this.gameEntities = [new Player(), this.createRandomEnemy()];
    this.addFlowers();
  }

  private addFlowers() {
    const numberOfFlowers = floor(random(5, 7));
    for (let i = 0; i < numberOfFlowers; i++) {
      this.gameEntities.push(new Flower());
    }
  }

  private createRandomEnemy(): Enemy {
    const types: ("bird" | "ufo" | "plane")[] = ["bird", "ufo", "plane"];
    const randomType = random(types); // Slumpa en typ
    return new Enemy(randomType);
}
  
  update() {
    for (const gameEntitie of this.gameEntities) {
      gameEntitie.update();
    }
  }
  
  draw() {
    background("#2a9ec7");
    for (const gameEntitie of this.gameEntities) {
      gameEntitie.draw();
    }
  }

}