class GameWorld implements Scene {
  private gameEntities: Entity[];
  private endOfGame: boolean;
  // private score: Score;
  // private pauseButton: Button;
  // private background: string;

  constructor(gameEntities: Entity[], endOfGame: boolean, score: Score, pauseButton: Button, background: string) {
    this.gameEntities = gameEntities;
    this.endOfGame = endOfGame;
    // this.score = score;
    // this.pauseButton = pauseButton;
    // this.background = background; 
  }
  update() {

  }
  draw() {
    background("#2a9ec7");
   
  }
}