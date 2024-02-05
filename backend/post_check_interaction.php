<?php

require_once 'interaction.php';
session_start();

$val = 0;
$int = new Interaction();

$val += $int->check_like($_SESSION['user_id'], $_POST['postId']) ? 10 : 0;
$val += $int->check_dislike($_SESSION['user_id'], $_POST['postId']) ? 1 : 0;

echo $val;
