<?php

require_once 'user.php';

$u = new User();

if ($_POST['type'] == 'follow') {
    $u->new_follow($_POST['follower'], $_POST['following']);
} else {
    $u->remove_follow($_POST['follower'], $_POST['following']);
}

