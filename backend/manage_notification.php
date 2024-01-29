<?php

require_once 'interaction.php';
session_start();

$n = new Interaction();

if ($_POST['type'] == 'get') {
    $result = $n->get_notifications($_SESSION['user_id']);
}

if ($_POST['type'] == 'set') {
    $result = $n->set_seen($_POST['notification']);
}

echo json_encode($result);
