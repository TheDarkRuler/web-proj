<?php

session_start();

if (isset($_POST['chat-id'])) {
    $_SESSION['chat-id'] = $_POST['chat-id'];
} else {
    echo $_SESSION['chat-id'];
}
