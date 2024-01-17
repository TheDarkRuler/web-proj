<?php

require_once 'user.php';

$user = new User();

session_start();

if (isset($_POST['username'])) {
    global $db;

    $username = $_POST['username'];
    $mail = $_POST['mail'];
    $password = $_POST['password'];

    $result = $user->create_user($username, $mail, $password, '')[0];

    $_SESSION['user_id'] = $result[0];
    $_SESSION['username'] = $result[1];
    $_SESSION['mail'] = $result[2];

    if ($_POST['size'] > 600) {
        $_SESSION['device'] = "homepage_desktop.html";
        header('Location: ../frontend/pages/homepage_desktop.html');
    } else {
        $_SESSION['device'] = "homepage_mobile.html";
        header('Location: ../frontend/pages/homepage_mobile.html');
    }

} else {
    $mail = $_POST['mail'];
    $password = $_POST['password'];

    $result = $user->login_user($mail, $password)[0];

    if ($result != null) {

        $_SESSION['user_id'] = $result[0];
        $_SESSION['username'] = $result[1];
        $_SESSION['mail'] = $result[2];

        if ($_POST['size'] > 600) {
            $_SESSION['device'] = "homepage_desktop.html";
            header('Location: ../frontend/pages/homepage_desktop.html');
        } else {
            $_SESSION['device'] = "homepage_mobile.html";
            header('Location: ../frontend/pages/homepage_mobile.html');
        }
    } else {
        header('Location: ../frontend/index.html');
    }
}
