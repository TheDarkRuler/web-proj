<?php

require_once 'user.php';

$user = new User();

if (isset($_POST['username'])) {

    $username = $_POST['username'];
    $mail = $_POST['mail'];
    $password = $_POST['password'];

    $sub = $user->create_user($username, $mail, $password, NULL, '');
    echo $_POST['size'];
    // $_POST['screen-size'] ? header('Location: ../frontend/pages/homepage_desktop.html'):
    //                       header('Location: ../frontend/pages/homepage_mobile.html');

} else {
    $mail = $_POST['mail'];
    $password = $_POST['password'];

    $log = $user->login_user($mail, $password);

    if ($log != NULL) {
        // $_POST['screen-size'] ? header('Location: ../frontend/pages/homepage_desktop.html') :
        //     header('Location: ../frontend/pages/homepage_mobile.html');
        echo $_POST['size'];
    } else {
        header('Location: ../frontend/index.html');
    }
}
