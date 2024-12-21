<?php
session_start();

if (!isset($_SESSION['unique_id'])) {
    header("location: ../login.php");
} else {
    include_once "config.php";
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);
    $is_encrypted = isset($_POST['is_encrypted']) ? $_POST['is_encrypted'] : 0; // Check if message is encrypted

    if (!empty($message)) {
        $sql = mysqli_query($conn, "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg, is_encrypted) 
                                    VALUES ({$incoming_id}, {$outgoing_id}, '{$message}', {$is_encrypted})") 
                                    or die(mysqli_error($conn));
    }
}
?>
