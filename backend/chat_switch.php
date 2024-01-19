<?php

require_once 'chat.php';

$c = new Chat();

$result = $c->get_last_messages($_POST['sender'], $_POST['receiver'], 8);

echo json_encode($result);
