<?php

require_once 'database.php';

class Chat {

    function get_messages_between($sender, $receiver) {
        global $db;

        $query = 'SELECT * FROM Messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY tp DESC';

        $statement = $db->prepare($query);
        $statement->bind_param('iiii', $sender, $receiver, $receiver, $sender);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all();
    }

    function get_chat_list($user_id) {
        global $db;

        $query = 'SELECT id, username FROM Users INNER JOIN Follows ON Users.id = Follows.id2 WHERE Follows.id1 = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all();
    }

    function get_chat_list_limited($user_id, $limit) {
        global $db;

        $query = 'SELECT id, username FROM Users INNER JOIN Follows ON Users.id = Follows.id2 WHERE Follows.id1 = ? LIMIT ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $limit);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all();
    }

    function get_last_message($sender, $receiver) {
        global $db;

        $query = 'SELECT content, tp FROM Messages WHERE sender_id = ? AND receiver_id = ? ORDER BY tp DESC LIMIT 1';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $sender, $receiver);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all();
    }

    function get_last_messages($sender, $receiver, $limit) {
        global $db;

        $query = 'SELECT * FROM Messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY tp DESC LIMIT ?';

        $statement = $db->prepare($query);
        $statement->bind_param('iiiii', $sender, $receiver, $receiver, $sender, $limit);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all();
    }

    function get_n_most_recent_user($user_id, $n) {
        global $db;

        $query = 'SELECT Users.id, Users.username
        FROM Users
        INNER JOIN Messages ON Messages.receiver_id = Users.id
        WHERE Messages.sender_id = ?
        GROUP BY Users.id
        ORDER BY Messages.tp DESC LIMIT ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $n);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all();
    }
}
