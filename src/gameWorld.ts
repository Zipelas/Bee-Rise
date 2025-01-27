class GameWorld implements Scene {
  protected gameEntities: Entity[]; // Array for game entities
  private cloudImage: p5.Image;
  private score: Score; // Score instance

  constructor() {
    this.gameEntities = [new Player()];
    this.cloudImage = images.cloud; // Load the cloud image

    // Initialize the score system
    const scorePosition = createVector(-100, -100); // Position in the top-left corner
    this.score = new Score("black", 0, 0, scorePosition, images.score); // Adjust the image

    this.initializeClouds();
    this.addFlowers(); 
  }

  private addFlowers() {
    const numberOfFlowers = floor(random(5, 7));
    for (let i = 0; i < numberOfFlowers; i++) {
      this.gameEntities.push(new Flower());
    }
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
  
  
    
  public update() {
    for (const gameEntitie of this.gameEntities) {
      gameEntitie.update();
    }
    this.checkCollision();
  }
   
    public draw(): void {
      background("#2a9ec7"); 
      
      for (const gameEntitie of this.gameEntities) {
        gameEntitie.draw();
        
        this.score.draw();
      }
    }; 
  
  }
  