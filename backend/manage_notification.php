<?php

require_once 'interaction.php';
session_start();

$n = new Interaction();

$result = $n->get_notifications($_SESSION['user_id']);

echo json_encode($result);
