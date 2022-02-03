<?php
  session_start();
  if(!isset($_SESSION["username"])){
    header("Location: database/login.php");
    exit(); 
  }
?>
<!DOCTYPE html>
<html lang="fr-FR">

  <head>

    <meta charset="utf-8" />
    <meta name="description" content="Page web du projet de NSI. Ce site regrouppe quelque jeux en ligne programmer par nous même en javascript" />
    <meta name="author" content="Thorvald Helbling, Alexis STOCK, Lionel FUCHS" />
    <title>Thoralial</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js"></script>

  </head>

  <header>

    <img id="LogoThoralial" src="info/image/LogoThoralial.png" alt="Logo du site" />

    <div>
      <h1>Bienvenue <?php echo $_SESSION['username']; ?> !</h1>
      <p>C'est votre tableau de bord.</p>
      <a href="database/logout.php">Déconnexion</a>
    </div>

  </header>

  <body>

    <script id="js" type="text/javascript" src="javascript/main.js"></script>
    <script></script>

  </body>

  <footer>
    
    <div id="personne">
      <p>
        Ce projet a étais réalisé par : <a href="https://thorvaldcv.000webhostapp.com/"> Thorvald HELBLING</a>, <a href="#presentation"> Lionel FUCHS </a> et <a href="https://alexiscv.000webhostapp.com/"> Alexis STOCK </a>
      </p>
    </div>

  </footer>
</html>
