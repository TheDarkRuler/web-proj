<?php

session_start();

$_SESSION['page_username'] = $_GET['username'];
$_SESSION['page_user_id'] = $_GET['user_id'];

header('Location: ../frontend/pages/personal_page.html');
