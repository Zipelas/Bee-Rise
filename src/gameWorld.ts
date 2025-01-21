class GameWorld implements Scene {
  private gameEntities: Entity[];
  private background: string = '';
  

  

  constructor() {
    this.gameEntities = [];
    
  }

  

  public update(): void {
    for (const entity of this.gameEntities) {
      entity.update();
    }


   
  }

  public draw(): void {
    background(this.background);

    for (const entity of this.gameEntities) {
      entity.draw();
    }
  }

  
}
