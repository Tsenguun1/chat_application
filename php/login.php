<?php
session_start();
include_once "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if (!empty($email) && !empty($password)) {
        $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
        if (mysqli_num_rows($sql) > 0) {
            $row = mysqli_fetch_assoc($sql);
            if (password_verify($password, $row['password'])) {
                $status = "Active Now";
                $sql2 = mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id = {$row['unique_id']}");
                if ($sql2) {
                    $_SESSION['unique_id'] = $row['unique_id'];
                    echo 'SUCCESS!';
                    
                } else {
                    echo "Failed to update status!";
                }
            } else {
                echo "Email or Password is incorrect!";
            }
        } else {
            echo "Email or Password is incorrect!";
        }
    } else {
        echo "All input fields are required.";
    }
} else {
    echo "Invalid request!";
}
?>
