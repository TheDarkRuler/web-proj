<?php

require_once 'user.php';

session_start();

$u = new User();

if (isset($_POST['func'])) {
    echo $u->getProfileImg($_POST['id']);
} else {
    if ($_POST['filter'] != '') {
        echo json_encode($u->getAllUserByUsername($_POST['limit'], $_POST['filter']));
    } else {
        echo json_encode($u->getAllFollower($_SESSION['user_id'], $_POST['limit']));
    }
}
