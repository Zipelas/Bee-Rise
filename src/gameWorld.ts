class GameWorld implements Scene {
  private gameEntities: Entity[];
  // private endOfGame: boolean;
  // private score: Score;
  // private pauseButton: Button;
  // private background: string;

  constructor() {
    this.gameEntities = [new Player()];
    // this.endOfGame = endOfGame;
    // this.score = score;
    // this.pauseButton = pauseButton;
    // this.background = background; 
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