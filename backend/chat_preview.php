<?php

require_once 'chat.php';

session_start();

$c = new Chat();

$result = $c->get_n_most_recent_user($_SESSION['user_id'], 5);

echo json_encode($result);
