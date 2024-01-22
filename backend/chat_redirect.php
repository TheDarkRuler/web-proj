<?php

session_start();

if (isset($_POST['chat_id'])) {
    $_SESSION['chat-id'] = $_POST['chat_id'];
} else {
    echo $_SESSION['chat-id'];
}
