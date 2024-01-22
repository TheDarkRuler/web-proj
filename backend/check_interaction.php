<?php

session_start();
require_once 'post.php';

$p = new Post();

if ($_POST['column'] == 'n_like') {
    echo $p->check_like($_SESSION['user-id'], $_POST['postId']);
}

if ($_POST['column'] == 'n_dislike') {
    echo $p->check_dislike($_SESSION['user-id'], $_POST['postId']);
}
