class Flower extends Entity {  
// private gap: number

constructor() {
  super(random(0, width - 120), random(0, height - 100), 120, 100, 0, 0, images.flower); // Skapa blomman
}

  public draw() {
    super.draw()
  }

}

  // const xMin = width * 0.3; // 30% från vänster
  // const xMax = width * 0.7 - 120; // 70% från vänster minus blommans bredd
  // const x = random(xMin, xMax); // Slumpa X inom 30%-70% intervallet
  // const y = random(0, height - 100); // Y är slumpmässig inom skärmens höjd
