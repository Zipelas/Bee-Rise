class Game {
  private startMenu: StartMenu;
  private gameOverMenu: GameOverMenu;
  private gameWorld: GameWorld;
  private activeScene: "start" | "gameover" | "game";


  constructor() {
    this.startMenu = new StartMenu();
    this.gameOverMenu = new GameOverMenu();
    this. gameWorld = new GameWorld();
    this.activeScene = new GameWorld();
  }

  
  public update() {
    if (this.activeScene === "start") {
      this.startMenu.update();
    } else if (this.activeScene === "gameover") {
      this.gameOverMenu.update();
    } else if (this.activeScene === "game") {
      this.gameWorld.update();
    }
    this.activeScene.update();
  }
  
  public draw() {
    if (this.activeScene === "start") {
      this.startMenu.draw();
    } else if (this.activeScene === "gameover") {
      this.gameOverMenu.draw();
    } else if (this.activeScene === "game") {
      this.gameWorld.draw();
    }
    this.activeScene.draw();
  }
  
  public changeScene(nextScene: "start" | "gameover" | "game") {
    this.activeScene = nextScene;
  }
}











