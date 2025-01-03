<?php
  session_start();
  if (isset($_SESSION['unique_id'])) {
    // If user is already logged in, redirect to User Page
    header("location: users.php");
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Realtime Chat App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/login.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css" />
  </head>
  <body>
    <div class="wrapper">
      <section class="form signup">
        <header>Realtime Chat App</header>
        <form action="#">
          <div class="error-txt"></div>
          <div class="field">
            <label>Email Address</label>
            <input type="text" name="email" placeholder="Enter your email" required />
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter Password" required />
            <i class="fas fa-eye"></i>
          </div>
          <div class="field button">
            <input type="submit" value="Continue to Chat" />
          </div>
        </form>
        <div class="link">
          Not signed up yet?
          <a href="index.php">Sign up now</a>
        </div>
      </section>
    </div>
  </body>

  <script src="javascript/password-visibility.js"></script>
  <script src="javascript/login.js"></script>
</html>
