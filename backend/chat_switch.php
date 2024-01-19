<?php

require_once 'chat.php';

$c = new Chat();

$result = $c->get_messages_between($_POST['sender'], $_POST['receiver']);

echo json_encode($result);
