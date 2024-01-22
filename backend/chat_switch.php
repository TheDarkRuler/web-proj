<?php

require_once 'chat.php';
session_start();

$c = new Chat();

$result = $c->get_messages_between($_SESSION['user_id'], $_POST['receiver']);

echo json_encode($result);
