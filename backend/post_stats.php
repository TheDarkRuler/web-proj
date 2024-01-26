<?php

require_once 'post.php';

$p = new Post();

$result = $p->get_stats($_POST['postId']);

echo json_encode($result[0]);
