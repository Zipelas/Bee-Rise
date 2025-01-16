import { Score } from "p5";


class Game {
  //aktivera de olika scenerna när du ska börja bygga//
 /* 
private gameOverMenu: GameOverMenu;
private pauseMenu: PauseMenu;
private startMenu: StartMenu;
private gameWorld: GameWorld;
private activeScene: Scene;
private startScene: Scene;
*/


 private position: p5.Vector;


  constructor() {
  }

  public update() {
  }

  public draw() {
    background("blue");

  
}
}

class GameWorld {
  private gameEntities: Entity[];
  private endOfGame: boolean;
  private score: Score;
  private pauseButton: Button;
  private background: String;
}


class Entity {
  private with: Number;
  private height: Number;
  private x: Number;
  private y: Number;
  private image: URl;

  constructor() {
  }

  public update() {
  }

  public draw() {
  }
}

class Player extends Entity{}


class Flower extends Entity{}

class Honey extends Entity{}

class Enemy extends Entity{}