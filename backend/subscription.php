<?php

require_once 'user.php';

$user = new User();

if (isset($_POST['username'])) {

    $username = $_POST['username'];
    $mail = $_POST['mail'];
    $password = $_POST['password'];

    $sub = $user->create_user($username, $mail, $password, NULL, '');

    header('Location: ../frontend/pages/homepage_desktop.html');
} else {
    $mail = $_POST['mail'];
    $password = $_POST['password'];

    $log = $user->login_user($mail, $password);

    if ($log != NULL) {
        header('Location: ../frontend/pages/homepage_desktop.html');
    } else {
        header('Location: ../frontend/index.html');
    }
}
