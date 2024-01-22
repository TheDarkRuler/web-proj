<?php

require_once 'post.php';
session_start();

$p = new Post();

$result = $p->get_all_following($_SESSION['user_id'], $_POST['limit']);

echo json_encode($result);
