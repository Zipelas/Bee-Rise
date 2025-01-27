class GameWorld implements Scene {
  protected gameEntities: Entity[]; // Array for game entities
  private cloudImage: p5.Image;
  private score: Score; // Score instance

  constructor() {
    this.gameEntities = [];
    this.cloudImage = images.cloud; // Load the cloud image

    // Initialize the score system
    const scorePosition = createVector(-100, -100); // Position in the top-left corner
    this.score = new Score("black", 0, 0, scorePosition, images.score); // Adjust the image

    this.initializeClouds(); 
  }

  private initializeClouds() {
    const cloudPositions: { x: number; y: number }[] = []; // To track existing cloud positions

    for (let i = 0; i < 5; i++) {
      let width = random(50, 150);  // Random cloud width
      let height = random(30, 80);  // Random cloud height
      let x:any, y:any;
      let validPosition = false;

      // Ensure clouds do not overlap
      while (!validPosition) {
        x = random(0, width + 1200);  // Random horizontal position (canvas size + margin)
        y = random(0, height + 1000); // Random vertical position (canvas size + margin)

        validPosition = cloudPositions.every(pos => {
          const distance = dist(pos.x, pos.y, x, y);
          return distance > Math.max(width, height); // Ensure enough spacing between clouds
        });

        if (validPosition) {
          cloudPositions.push({ x, y }); // Add position to the list
        }
      }

      // Create a static cloud
      const cloud = new Moln(x, y, width, height, 0, this.cloudImage);
      this.gameEntities.push(cloud); // Add cloud to game entities
    }
  }

  public update(): void {
    
    for (const entity of this.gameEntities) {
      entity.update();
    }

  
    //this.score.update();
  }

  public draw(): void {
    background("#2a9ec7"); 

    
    for (const entity of this.gameEntities) {
      entity.draw();
    }

   
    this.score.draw();
  }
}