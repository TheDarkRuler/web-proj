<?php

require_once 'comment.php';
session_start();

$c = new Comment();

if ($_POST['type'] == 'show') {
    $result = $c->get_all_by_post($_POST['postId']);

    echo json_encode($result);
}

if ($_POST['type'] == 'insert') {
    $result = $c->post_comment($_POST['postId'], $_SESSION['user_id'], $_POST['content']);

    echo !$result ? 0 : 1;
}
