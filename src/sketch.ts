//---- GLOBAL VARIABLES ----//
let game: Game;
let cnv: p5.Renderer; // Global variabel för canvas

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function belows
 */

function setup() {
  cnv = createCanvas(500, windowHeight);
  frameRate(60);

  let x = (windowWidth - width) / 2; // Horisontellt centrerat
  let y = (windowHeight - height) / 2; // Vertikalt centrerat
  cnv.position(x, y);

  game = new Game();
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  game.update();
  game.draw();
}

function windowResized() {
  resizeCanvas(500, windowHeight);

  let x = (windowWidth - width) / 2; // Horisontellt centrerat
  let y = (windowHeight - height) / 2; // Vertikalt centrerat
  cnv.position(x, y);
}


