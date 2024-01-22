<?php

session_start();

if (isset($_POST['chat_id'])) {
    $_SESSION['chat-id'] = $_POST['chat_id'];
} else if (isset($_POST['pageId'])) {
    $_SESSION['chat-id'] = $_SESSION['ref_userid'];
} else {
    echo $_SESSION['chat-id'];
}
