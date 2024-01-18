<?php

require_once 'user.php';

$u = new User();

$first =  $u->get_username($_POST['user_id']);

echo json_encode($first);
