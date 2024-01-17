<?php

require_once 'user.php';

session_start();

$user = new User();

if (isset($_POST['profile-image'])) {
    $data = $_POST['profile-image'];

    $result = $user->update_pic($data, $_SESSION['mail']);
} else {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $new_password = $_POST['new_password'];
    $mail = $_POST['email'];

    $description = $_POST['description'];

    $user->update_description($description, $_SESSION['mail']);
    $user->update_personal('username', $username, $_SESSION['user_id']);
    $_SESSION['username'] = $username;
    $user->update_personal('mail', $mail, $_SESSION['user_id']);
    $_SESSION['mail'] = $mail;
    if ($user->validate_password($_SESSION['mail'], $password)) {
        $user->update_personal('password', password_hash($new_password, PASSWORD_DEFAULT), $_SESSION['user_id']);
    }
}

header('Location: ../frontend/pages/homepage_desktop.html');
