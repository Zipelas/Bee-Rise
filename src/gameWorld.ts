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
    this.checkCollision();
  }

  private checkCollision() {
    for (const gameEntitie of this.gameEntities) {
      if (gameEntitie instanceof Player) {
        for (const otherEntitie of this.gameEntities) {
         if (otherEntitie instanceof Player) continue;

          if (this.entitiesCollides(gameEntitie, otherEntitie)) {
            if(otherEntitie instanceof Flower) {
              gameEntitie.jump()
            }
          }
        }
      }
    }
  }
  private entitiesCollides(o1: Entity, o2: Entity): boolean {
    return (
      o1.position.x < o2.position.x + o2.size.x &&
    o1.position.x + o1.size.x > o2.position.x &&
    o1.position.y < o2.position.y + o2.size.y &&
    o1.position.y + o1.size.y > o2.position.y
  );
  }

  draw() {
    background("#2a9ec7");
    for (const gameEntitie of this.gameEntities) {
      gameEntitie.draw();
    }
  }

}