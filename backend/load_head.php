<?php

require_once 'user.php';

$u = new User();

$first =  $u->getProfileImg($_POST['user_id']);

echo $first;
