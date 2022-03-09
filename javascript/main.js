var aText = new Array(
  "| Thorabyrinthe", "Trouverez-vous le bon chemin ?" );
  var iSpeed = 55;
  var iIndex = 0;
  var iArrLength = aText[0].length;
  var iScrollAt = 20;
  
  var iTextPos = 0;
  var sContents = '';
  var iRow;
  
  function typewriter() {
      sContents =  ' ';
      iRow = Math.max(0, iIndex-iScrollAt);
      var destination = document.getElementById("texttitre");
  
      while ( iRow < iIndex ) {
          sContents += aText[iRow++] + '<br />';
      }
      destination.innerHTML = sContents + aText[iIndex].substring(0,
  iTextPos) + " |";
      if ( iTextPos++ == iArrLength ) {
          iTextPos = 0;
          iIndex++;
          if ( iIndex != aText.length ) {
              iArrLength = aText[iIndex].length;
              setTimeout("typewriter()", 500);
          }
      }
      else {
          setTimeout("typewriter()", iSpeed);
      }
  }
  typewriter();


var h = window.innerHeight;
var w = window.innerWidth;

var platforms;
var cursor;

var player;
var Connor;

var doorGauche;
var doorDroite;
var doorStart;

var fire1;
var fire2;

var wall1;
var wall2;
var wall3;
var wall4;

/** 
var questString = [
  ["type", "key", "next", "end"],
  ["q", "Va parler à Connor", "", ""],
  ["","", "Fini", "", ""],
  ["q", "Fini", "", "1"],
].map(x => x.join(",")).join("\n");
*/

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
    this.load.image("fireStart1", "javascript/assets/fireStart1.png");
    this.load.image("fireStart2", "javascript/assets/fireStart2.png");
    this.load.image("fireStart3", "javascript/assets/fireStart3.png");
    
  }

/**  
  handleMeeting(player, Connor){
    if(player._currentQuest){
      console.info(player._currentQuest.currentQuest)
      let options = player._currentQuest.currentQuest.options;
      if (options[0].next == "Va parler à Connor") {
        console.log("test mon reuf");
        player._currentQuest.manager.getNextQuestion(options[0].next);
      } else if (options[0].next == "Fini"){
        this.doorStart.visible = true;
        player._currentQuest.manager.getNextQuestion(options[0].next);
        this.physics.add.collider(player, doorStart, collision, undefined, this);
      }
    }
  }

  checkDoorStatus(player, door){
    return door.visible == false;
}

*/

  create() {
    cursor = this.input.keyboard.createCursorKeys(); //touches des fleches
    platforms = this.physics.add.staticGroup();

    player = this.physics.add.sprite((w / 2), h, "player"); //joueur
    player.setScale(0.2);
    player.setCollideWorldBounds(true); //collision avec la bordure

/** 

    Connor = this.physics.add.sprite(160, 300, "player")
    Connor.setScale(1, 1);
    Connor.body.setSize(30, 35);

    this.print = this.add.text(380, 180, '', { fontSize: '12px', align: 'right' }).setOrigin(1);

    this.plugins.get('rexquestplugin').add({
      questions: questString,
      quest: true
    }).on('quest', function (currentQuest, manager, quest) {
      // La quête est fini
      if (currentQuest.end === 1) {
          manager.setData('endAt', currentQuest.key);
          manager.emit('complete', manager, quest);
      } else {
          // Prochaine étape de la quête
          if(player._currentQuest ){ 
              this.print.text = this.print.text + 'done\n';
          }
          this.print.text += `${currentQuest.key}...`;
          player._currentQuest = { currentQuest, manager}
      }
  }, this).on('complete', function (manager, quest) {
      delete player._currentQuest;
      this.print.text = this.print.text + 'done\n';
      this.print.text += `\nLa porte est debloquée!`;
  }, this).getNextQuestion();

*/

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

    
    this.anims.create({
    key : "fireMouvement",
      frames : [
      {key : "fireStart2"},
      {key : "fireStart1"},
      {key : "fireStart3"}],
      frameRate : 6,
      repeat : -1
    })
     
    fire1 = this.add.sprite(350, 60, "fireStart1")
    fire1.setScale(0.5);
    fire1.anims.play("fireMouvement", true)

    fire2 = this.add.sprite(1050, 60, "fireStart1")
    fire2.setScale(0.5);
    fire2.anims.play("fireMouvement", true)

    wall1 = this.add.sprite(200, 146, "wall");
    wall1.setScale(0.3);

    wall2 = this.add.sprite(200, 445, "wall");
    wall2.setFlip(false, true);
    wall2.setScale(0.3);

    wall3 = this.add.sprite((w - 200), 146, "wall");
    wall3.setScale(0.3);

    wall4 = this.add.sprite((w - 200), 445, "wall");
    wall4.setFlip(false, true);
    wall4.setScale(0.3);

    doorStart = this.physics.add.staticSprite((w / 2), 28, "door"); //Porte principale
    doorStart.setScale(0.3);
    doorStart.body.setSize(300, 55);
    doorStart.body.setOffset(-56, 472);
    doorStart.rotation += -20.42;

    platforms.add(wall1);
    platforms.add(wall2);
    platforms.add(wall3);
    platforms.add(wall4);

    this.physics.add.collider(platforms, player); //collision
    this.physics.add.collider(player, this.Connor, this.handleMeeting, undefined, this);
    
    
    //Fonction de collision qui éxecute le code dedans quand la fonctions est appelé
    function collision() {
      this.scene.start("labyrintheStart");
    }
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

var config = {
  type: Phaser.AUTO,
  width: 1346,
  height: 561,
  backgroundColor: "#FFFFFF", //#FFFFFF
  physics: {
    default : "arcade",
    arcade : {
      debug : true,
    }
  },
  scene: [SceneStart, LabyrintheStart]
};

let game = new Phaser.Game(config);