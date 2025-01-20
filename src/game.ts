class Game {
  private activeScene: Scene;

  constructor() {
    this.activeScene = new PauseMenu ();
  }

  public changeScene(nextScene: Scene) {
    this.activeScene = nextScene;
  }

  public update() {
    this.activeScene.update();
  }
  
  public draw() {
    this.activeScene.draw();
  }
  
}











