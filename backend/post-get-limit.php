<?php

require_once 'post.php';
    
$p = new Post();

if (isset($_POST['func'])) {
    $result = $p->get_post_image($_POST['id']);
    echo $result;
} else {
    $result = $p->get_by_user($_POST['id'], $_POST['limit']);
    echo json_encode($result);
}
