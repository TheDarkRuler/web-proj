<?php

require_once 'message.php';

$m = new Message();

$m->create_message($_SESSION['user_id'], $_POST['receiver'], $_POST['message']);
