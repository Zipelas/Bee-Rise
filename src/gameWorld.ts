class GameWorld implements Scene {
  private gameEntities: Entity[];
  // private endOfGame: boolean;
  // private score: Score;
  // private pauseButton: Button;
  // private background: string;

  constructor() {
    this.gameEntities = [new Player(), this.createRandomEnemy()];
    // new Enemy("bird"), new Enemy("ufo"), new Enemy("plane")
    // this.endOfGame = endOfGame;
    // this.score = score;
    // this.pauseButton = pauseButton;
    // this.background = background; 
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