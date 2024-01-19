<?php

require_once 'message.php';

session_start();

$m = new Message();

$m->create_message($_SESSION['user_id'], $_POST['receiver'], $_POST['message']);
