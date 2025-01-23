/// <reference path="scene.ts" />
class GameOverMenu implements Scene {
    private repeatButton: Button;
    private exitButton: Button;
  
    constructor() {
        this.repeatButton = new Button("Repeat", width * 0.5, height * 0.5, 140, 60, "red", "white");
        this.exitButton = new Button("Exit", width * 0.2, height * 0.8, 140, 60, "#a0a", "white");
    }
    
    public update() {
        if (this.repeatButton.isClicked()) {
            // byt scene A
            // game.changeScene()
        }
        if (this.exitButton.isClicked()) {
            // byt scene B
        }
    }

    public draw() {
        background("#2a9ec7")
        this.drawGameOverMenu()
        this.drawButtons()
    }

    private drawGameOverMenu() {
    
    }

    private drawButtons() {
        this.repeatButton.draw();
        this.exitButton.draw();
    }
}