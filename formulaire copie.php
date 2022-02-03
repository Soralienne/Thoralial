<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style.css" />
</head>
  <body>

    <form action="database/register.php" method="POST">

      <h1>Thoralial</h1>
      <h4>S'inscrire</h4>

      <input type="text" name="username" placeholder="Nom d'utilisateur" required />
      <input type="text" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Mot de passe" required />
      <input type="submit" name="submit" value="S'inscrire" />
      <p>Deja inscrit ? <a href="database/login.php">Connectez-vous ici</a></p>

    </form>

    <p class="hidden" id="error_username">Ce nom d'utilisateur à déjà étais utilisé.</p>

  </body>
</html>
