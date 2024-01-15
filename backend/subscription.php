<?php

echo "Hello!";

require_once 'user.php';

$user = new User();

if (isset($_POST['username'])) {

    $username = $_POST['username'];
    $mail = $_POST['mail'];
    $password = $_POST['password'];

    echo 'Username: ' . $username . ', Mail: ' . $mail . ', Password: ' . $password;


    $sub = $user->create_user($username, $mail, $password, NULL, '');

    echo $sub;
} else {
    $mail = $_POST['mail'];
    $password = $_POST['password'];

    $log = $user->login_user($mail, $password);
}

// header('Location: ../frontend/pages/homepage_desktop.html');
