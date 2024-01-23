<?php

session_start();
require_once 'post.php';

$p = new Post();

if ($_POST['column'] == 'n_like') {
    $result = $p->like_post($_POST['postId'], $_SESSION['user_id'], $_POST['value']);

    echo $result == false ? false : true;
}

if ($_POST['column'] == 'n_dislike') {
    $result = $p->dislike_post($_POST['postId'], $_SESSION['user_id'], $_POST['value']);

    echo json_encode($result);
}
