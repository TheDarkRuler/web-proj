<?php

require_once 'post.php';
session_start();

$p = new Post();

if (isset($_POST['func'])) {
    $result = $p->get_post_image($_POST['id']);
    echo $result;
} else {
    $result = $p->get_all_following($_SESSION['user_id'], $_POST['limit']);
    echo json_encode($result);
}
