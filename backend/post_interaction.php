<?php

session_start();
require_once 'post.php';

$p = new Post();

if ($_POST['column'] == 'n_like') {
    $result = $p->like_post($_POST['postId'], $_SESSION['user_id'], $_POST['value']);
    $p->update_opposite('like', $_SESSION['user_id'], $_POST['postId']);

    echo $result == false ? false : true;
}

if ($_POST['column'] == 'n_dislike') {
    $result = $p->dislike_post($_POST['postId'], $_SESSION['user_id'], $_POST['value']);
    $p->update_opposite('dislike', $_SESSION['user_id'], $_POST['postId']);

    echo json_encode($result);
}
