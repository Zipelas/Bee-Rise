interface Scene {
  // activeScene: "startmenu" | "gameovermenu" | "gameworld";
  update(): void;
  draw(): void;
}