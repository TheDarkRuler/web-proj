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
    $mail = $_POST['email'];

    $result = '';

    echo 'Here';
}

// header('Location: ../frontend/pages/homepage_desktop.html');
