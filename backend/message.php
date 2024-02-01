<?php

require_once 'database.php';

class Message {

    function create_message($sender_id, $receiver_id, $content) {
        global $db;

        $query = 'INSERT INTO Messages (sender_id, receiver_id, content, tp) VALUES (?, ?, ?, ?)';

        $statement = $db->prepare($query);
        $statement->bind_param('iiss', $sender_id, $receiver_id, $content, date('Y-m-d H:i:s'));
        $statement->execute();
        return $statement->get_result();
    }

    function get_all_by_sender($user_id, $receiver_id) {
        global $db;

        $query = 'SELECT * FROM Messages WHERE sender_id = ? AND receiver_id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $receiver_id);
        $statement->execute();
        $result = $statement->get_result();
        return $result->fetch_all();
    }
}
