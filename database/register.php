<!DOCTYPE html>
<html>
  <head>
  <link rel="stylesheet" href="../style.css" />
  </head>
  <body>

    <p class="hidden" id="error_username" >Ce nom d'utilisateur à déjà étais utilisé. <a href="../formulaire.php" >Cliqué ici pour ressayer</a></p>

    <?php

    require('config.php');

    $username = stripslashes($_POST['username']);
    $username = mysqli_real_escape_string($conn, $username); 
    $email = stripslashes($_POST['email']);
    $email = mysqli_real_escape_string($conn, $email);
    $password = stripslashes($_POST['password']);
    $password = mysqli_real_escape_string($conn, $password);

    $check_username = mysqli_query($conn, "SELECT * FROM users where (username = '$username' ) ");

    if (mysqli_num_rows($check_username) > 0){
      echo "<script type='text/javascript'>
      var style_display_error_usrname = document.getElementById('error_username'); 
      style_display_error_usrname.style.display = 'block';
      </script>";
    }

    else{
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $result = mysqli_query($conn, "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '".hash('sha256', $password)."')");
    }

    echo "<div><h3>Vous êtes inscrit avec succès.</h3><p>Cliquez ici pour vous <a href='login.php'>connecter</a></p></div>";
    }
    ?>

  </body>
</html>