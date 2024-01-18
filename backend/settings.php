<?php

require_once 'user.php';

session_start();

$user = new User();

if (isset($_FILES['profile-image'])) {
    $data = file_get_contents($_FILES['profile-image']['tmp_name']);
    $user->update_pic($data, $_SESSION['user_id']);
}

if (isset($_POST['description']) && !empty($_POST['description'])) {
    $description = $_POST['description'];
    $user->update_description($description, $_SESSION['mail']);
}

if (isset($_POST['username']) && !empty($_POST['username'])) {
    $username = $_POST['username'];
    $user->update_username($username, $_SESSION['user_id']);
    $_SESSION['username'] = $username;
}

if (isset($_POST['email']) && !empty($_POST['email'])) {
    $mail = $_POST['email'];
    $user->update_email('mail', $mail, $_SESSION['user_id']);
    $_SESSION['mail'] = $mail;
}

if (isset($_POST['new_password']) && isset($_POST['password']) && !empty($_POST['new_password']) && !empty($_POST['password'])) {
    $password = $_POST['password'];
    $new_password = $_POST['new_password'];
    if ($user->validate_password($_SESSION['mail'], $password)) {
        $user->update_password('password', password_hash($new_password, PASSWORD_DEFAULT), $_SESSION['user_id']);
    }
}

header('Location: ../frontend/pages/settings.html');
