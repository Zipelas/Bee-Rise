class GameWorld implements Scene {
  private gameEntities: Entity[];

  constructor() {
    this.gameEntities = [new Player()];
    this.addFlowers();
  }

  private addFlowers() {
    const numberOfFlowers = floor(random(5, 7));
    for (let i = 0; i < numberOfFlowers; i++) {
      this.gameEntities.push(new Flower());
    }
  }
  
  update() {
    for (const gameEntitie of this.gameEntities) {
      gameEntitie.update();
    }
  }

  private checkCollision() {
    for (const gameEntitie of this.gameEntities) {
      if (gameEntitie instanceof Player) {
        for (const otherEntity of this.gameEntities) {
         if (otherEntity instanceof Player) continue;

          if (this.entitiesCollides(gameEntitie, otherEntity)) {
            if(otherEntity instanceof Flower) {
              //Applicera reaktion
            }
          }
        }
      }
    }
  }
  private entitiesCollides(o1: Entity, o2: Entity) {
    return true;
  }

  draw() {
    background("#2a9ec7");
    for (const gameEntitie of this.gameEntities) {
      gameEntitie.draw();
    }
  }

}