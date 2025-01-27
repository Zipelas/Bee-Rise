class Flower extends Entity {  
  // private gap: number
  
    constructor() {
      super(random(0, width - 120), random(0, height - 100), 120, 100, 0, 0, images.flower);
      // this.gap = gap
    }
  
    public draw() {
      super.draw()
    }
  
    }