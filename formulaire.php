<!DOCTYPE html>
<html>
  <head>
  <link rel="stylesheet" href="style.css" />
  </head>
  <body>

    <form action="database/register.php" method="POST">

    <h1 class="show" id="title_form" >Thoralial</h1>
    <h4 class="show" id="subtitle_form" >S'inscrire</h4>

    <input type="text" name="username" placeholder="Nom d'utilisateur" value="<?php $username ?>" required />
    <input type="text" name="email" placeholder="Email" value="<?php $email ?>" required />
    <input type="password" name="password" placeholder="Mot de passe" value="<?php $password ?>" required />
    <input type="submit" name="submit" value="S'inscrire" />
    <p>Deja inscrit ? <a href="database/login.php">Connectez-vous ici</a></p>

    </form>

  </body>
</html>