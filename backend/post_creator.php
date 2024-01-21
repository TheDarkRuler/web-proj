<?php

require_once 'post.php';
session_start();

$p = new Post();

if (
    isset($_FILES['profile-image']) && $_FILES['profile-image']['size'] != 0
    && isset($_POST['description'])
) {

    $result = $p->craete_post(
        $_SESSION['user_id'],
        file_get_contents($_FILES['profile-image']['tmp_name']),
        $_POST['description']
    );

    header('Location: ../frontend/pages/personal_page.html?ref_username=' . $_SESSION['username'] . '&ref_id=' . $_SESSION['user_id']);
}
