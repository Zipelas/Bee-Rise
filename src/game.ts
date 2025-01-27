class Game {
  private startMenu: StartMenu;
  private gameOverMenu: GameOverMenu;
  private gameWorld: GameWorld;
  private activeScene: "start" | "gameover" | "game";
  private isPaused: boolean;


  constructor() {
    this.startMenu = new StartMenu(() => this.changeScene("game"));
    this.gameOverMenu = new GameOverMenu();
    this.gameWorld = new GameWorld();
    this.activeScene = "start";
    this.isPaused = false;
  }

  
  public update() {
    if (this.isPaused) return;

    if (this.activeScene === "start") {
      this.startMenu.update();
    } else if (this.activeScene === "gameover") {
      this.gameOverMenu.update();
    } else if (this.activeScene === "game") {
      this.gameWorld.update();
    }
  }
  
  public draw() {
    if (this.activeScene === "start") {
      this.startMenu.draw();
    } else if (this.activeScene === "gameover") {
      this.gameOverMenu.draw();
    } else if (this.activeScene === "game") {
      this.gameWorld.draw();
    }

  }
  
  public changeScene(nextScene: "start" | "gameover" | "game") {
    this.activeScene = nextScene;
    if (nextScene === "gameover") {
      this.isPaused = true; // Pause the game when game over scene is active
    } else {
      this.isPaused = false;
  }
}
}











