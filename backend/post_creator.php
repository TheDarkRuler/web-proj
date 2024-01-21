<?php

require_once 'post.php';
session_start();

$p = new Post();

if (
    isset($_FILES['post-image']) && $_FILES['post-image']['size'] != 0
    && isset($_POST['description'])
) {
    
    $data = file_get_contents($_FILES['post-image']['tmp_name']);
    $result = $p->craete_post(
        $_SESSION['user_id'],
        $data,
        $_POST['description']
    );

    header('Location: ../frontend/pages/personal_page.html?ref_username=' . $_SESSION['username'] . '&ref_id=' . $_SESSION['user_id']);
}
