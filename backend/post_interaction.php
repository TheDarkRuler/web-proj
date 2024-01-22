<?php

session_start();
require_once 'post.php';

$p = new Post();

if ($_POST['column'] == 'n_like') {
    $result = $p->update_post_stats($_POST['column'], $_POST['value'], $_POST['postId']);

    echo json_encode($result);
}

if ($_POST['column'] == 'n_dislike') {
    $result = $p->update_post_stats($_POST['column'], $_POST['value'], $_POST['postId']);

    echo json_encode($result);
}
