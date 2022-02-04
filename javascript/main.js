class SceneStart extends Phaser.Scene {

  constructor() {
    super({key: 'sceneStart'})
  }

  //Chargement des images
  preload() {
    this.load.plugin('rexquestplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquestplugin.min.js', true);

    this.load.image("player", "javascript/assets/player.png");
    this.load.image("run1", "javascript/assets/run1.png");
    this.load.image("run2", "javascript/assets/run2.png");
    this.load.image("playerLeftRun1", "javascript/assets/playerLeftRun1.png");
    this.load.image("playerLeftRun2", "javascript/assets/playerLeftRun2.png");
    this.load.image("door", "javascript/assets/doors.png");
    this.load.image("wall", "javascript/assets/walls.png");
    /** 
    this.load.image("fireStart1", "javascript/assets/fireStart1.png");
    this.load.image("fireStart2", "javascript/assets/fireStart2.png");
    this.load.image("fireStart3", "javascript/assets/fireStart3.png");
    */
  }

  create() {
    cursor = this.input.keyboard.createCursorKeys(); //touches des fleches
    platforms = this.physics.add.staticGroup();

    //Les animations 
    this.anims.create({
      key : "playerWalkUp",
      frames : [
        {key : "run1"},
        {key : "run2"}],
      frameRate : 7,
      repeat : 0
    })

    this.anims.create({
      key : "playerWalkLeft",
      frames : [
        {key : "playerLeftRun1"},
        {key : "playerLeftRun2"}],
      frameRate : 7,
      repeat : 0
    })

    /**
     * this.anims.create({
     * key : "fireMouvement",
     * frames : [
     * {key : "fireStart1"},
     * {key : "fireStart2"},
     * {key : "fireStart3"}],
     * framerate : 7,
     * repeat : -1
     * })
     */

    player = this.physics.add.sprite((w / 2) + 34, h, "player"); //joueur
    player.setScale(1, 1);
    player.body.setSize(30, 35);
    
    wall1 = this.add.sprite(200, 150, "wall");
    wall1.setScale(0.3);

    wall2 = this.add.sprite(200, 600, "wall");
    wall2.setScale(0.3);

    wall3 = this.add.sprite((w - 200), 150, "wall");
    wall3.setScale(0.3);

    wall4 = this.add.sprite((w - 200), 600, "wall");
    wall4.setScale(0.3);

    doorStart = this.physics.add.staticSprite((w / 2) - 20, 28, "door"); //Porte principale
    doorStart.setScale(0.3);
    doorStart.body.setSize(300, 55);
    doorStart.body.setOffset(-56, 472);
    doorStart.rotation += -20.42;

    platforms.add(wall1);
    platforms.add(wall2);
    this.physics.add.collider(platforms, player); //collision
    player.setCollideWorldBounds(true); //collision avec la bordure
    
    //Fonction de collision qui éxecute le code dedans quand la fonctions est appelé
    function collision() {
      this.scene.start("labyrintheStart");
    }
    
    this.physics.add.collider(player, doorStart, collision, undefined, this);
  }

  update() {

    // Tous les mouvement sont controler par ce code
  
      if (cursor.left.isDown){
        player.setVelocityX(-200); //vitesse de deplacements
        player.anims.play("playerWalkLeft", true); //animations du personnage
        player.setFlip(false, false); //oriantation de l'image
      } else if (cursor.right.isDown){
        player.setVelocityX(200);
        player.anims.play("playerWalkLeft", true);
        player.setFlip(true, false);
      } else if (cursor.up.isDown){
        player.setVelocityY(-200);
        player.anims.play("playerWalkUp", true);
        player.setFlip(false, false);
      } else if (cursor.down.isDown){
        player.setVelocityY(200);
        player.anims.play("playerWalkUp", true);
        player.setFlip(false, true);
      } else {
        player.setVelocity(0);
        player.setTexture("player");
      }
  
      if ((cursor.left.isDown && cursor.up.isDown) || (cursor.left.isDown && cursor.right.isDown) || (cursor.left.isDown && cursor.down.isDown) || (cursor.right.isDown && cursor.up.isDown) || (cursor.right.isDown && cursor.down.isDown)){
        player.setVelocity(0);
        player.setTexture("player");
      }
  
    //--------
  }
}

class LabyrintheStart extends Phaser.Scene {

  constructor() {
   super({key: 'labyrintheStart'});
  }
  preload() {
    this.load.plugin('rexquestplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquestplugin.min.js', true);

    this.load.image("player", "javascript/assets/player.png");
    this.load.image("run1", "javascript/assets/run1.png");
    this.load.image("run2", "javascript/assets/run2.png");
    this.load.image("playerLeftRun1", "javascript/assets/playerLeftRun1.png");
    this.load.image("playerLeftRun2", "javascript/assets/playerLeftRun2.png");
    this.load.image("wall", "javascript/assets/walls.png"); 
    this.load.image("door", "javascript/assets/doors.png");
  }

  create() {
    cursor = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup();


    this.anims.create({
      key : "playerWalkUp",
      frames : [
        {key : "run1"},
        {key : "run2"}],
      frameRate : 7,
      repeat : 0
    })
    
    this.anims.create({
      key : "playerWalkLeft",
      frames : [
        {key : "playerLeftRun1"},
        {key : "playerLeftRun2"}],
      frameRate : 7,
      repeat : 0
    })

    player = this.physics.add.sprite(34, h, "player");
    player.setScale(1, 1);
    player.body.setSize(30, 35);
        
    wall1 = this.add.sprite(9, h - 126, "wall");
    wall1.setScale(0.05);

    doorDroite = this.physics.add.staticSprite(w - 35, (h / 2) - 20, "door"); 
    doorDroite.setSize(18, 80);
    doorDroite.setScale(0.08);

    platforms.add(wall1);
    this.physics.add.collider(platforms, player);
    player.setCollideWorldBounds(true);

    function collisionDroite() {
      this.scene.start("labyrintheDeux");
    }
    
    this.physics.add.collider(player, doorDroite, collisionDroite, undefined, this);
  }

  update() {

      if (cursor.left.isDown){
        player.setVelocityX(-200);
        player.anims.play("playerWalkLeft", true);
        player.setFlip(false, false);
      } else if (cursor.right.isDown){
        player.setVelocityX(200);
        player.anims.play("playerWalkLeft", true);
        player.setFlip(true, false);
      } else if (cursor.up.isDown){
        player.setVelocityY(-200);
        player.anims.play("playerWalkUp", true);
        player.setFlip(false, false);
      } else if (cursor.down.isDown){
        player.setVelocityY(200);
        player.anims.play("playerWalkUp", true);
        player.setFlip(false, true);
      } else {
        player.setVelocity(0);
        player.setTexture("player");
      }
  
      if ((cursor.left.isDown && cursor.up.isDown) || (cursor.left.isDown && cursor.right.isDown) || (cursor.left.isDown && cursor.down.isDown) || (cursor.right.isDown && cursor.up.isDown) || (cursor.right.isDown && cursor.down.isDown)){
        player.setVelocity(0);
        player.setTexture("player");
      }
  }
}
/**
class LabyrintheDeux extends Phaser.Scene {

  constructor() {
    super({key: "labyrintheDeux"});
  }

  preload() {
    this.load.plugin('rexquestplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquestplugin.min.js', true);

    this.load.image("player", "javascript/assets/player.png");
    this.load.image("run1", "javascript/assets/run1.png");
    this.load.image("run2", "javascript/assets/run2.png");
    this.load.image("playerLeftRun1", "javascript/assets/playerLeftRun1.png");
    this.load.image("playerLeftRun2", "javascript/assets/playerLeftRun2.png");
    this.load.image("wall", "javascript/assets/wall.png"); 
    this.load.image("doorStart", "javascript/assets/door.png");
  }

  create() {
    cursor = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup();

    this.anims.create({
      key : "playerWalkUp",
      frames : [
        {key : "run1"},
        {key : "run2"}],
      frameRate : 7,
      repeat : 0
    })

    this.anims.create({
      key : "playerWalkLeft",
      frames : [
        {key : "playerLeftRun1"},
        {key : "playerLeftRun2"}],
      frameRate : 7,
      repeat : 0
    })

    player = this.physics.add.sprite((w - w) + 70, h, "player");
    player.setScale(1, 1);
    player.body.setSize(30, 35);
    
    wall = this.add.sprite((w - w) + 6, h - 126, "wall");

    door = this.physics.add.staticSprite((w / 2) - 20, 30, "door");
    door.rotation += 20.42;
    door.setSize(50, 10);

    platforms.add(wall);
    this.physics.add.collider(platforms, player);
    player.setCollideWorldBounds(true);
    
    function collision() {
      this.scene.start("");
    }
    
    this.physics.add.collider(player, door, collision, undefined, this);
  }

  update() {
  
      if (cursor.left.isDown){
        player.setVelocityX(-200);
        player.anims.play("playerWalkLeft", true);
        player.setFlip(false, false);
      } else if (cursor.right.isDown){
        player.setVelocityX(200);
        player.anims.play("playerWalkLeft", true);
        player.setFlip(true, false);
      } else if (cursor.up.isDown){
        player.setVelocityY(-200);
        player.anims.play("playerWalkUp", true);
        player.setFlip(false, false);
      } else if (cursor.down.isDown){
        player.setVelocityY(200);
        player.anims.play("playerWalkUp", true);
        player.setFlip(false, true);
      } else {
        player.setVelocity(0);
        player.setTexture("player");
      }
  
      if ((cursor.left.isDown && cursor.up.isDown) || (cursor.left.isDown && cursor.right.isDown) || (cursor.left.isDown && cursor.down.isDown) || (cursor.right.isDown && cursor.up.isDown) || (cursor.right.isDown && cursor.down.isDown)){
        player.setVelocity(0);
        player.setTexture("player");
      }
  }

}
*/

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth - 20,
  height: window.innerHeight - 100,
  backgroundColor: "#FFFFFF", //#FFFFFF
  physics: {
    default : "arcade",
    arcade : {
      debug : true,
    }
  },
  scene: [SceneStart, LabyrintheStart /**, LabyrintheDeux*/]
};

let game = new Phaser.Game(config);

var h = window.innerHeight;
var w = window.innerWidth;

var platforms;
var cursor;
var player;

var doorGauche;
var doorDroite;
var doorUp;
var doorStart;

var wall1;
var wall2;
var wall3;
var wall4;


// A rajouter plus tard
/**
 * 
    function collisionUp() {
      this.scene.start("labyrintheTrois");
    }
 * 
 * this.physics.add.collider(player, doorGauche, collisionUp, undefined, this); 
 * 
 * doorUp = this.physics.add.staticSprite((w / 2) - 20, 8, "door");
 * doorUp.setScale(0.08);
 * doorUp.setSize(80, 18);
 * doorUp.setOffset(55, 491);
 * doorUp.rotation += -20.42;
*/
