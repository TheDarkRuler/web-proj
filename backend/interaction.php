<?php

require_once 'database.php';

class Interaction {
    function get_notifications($user_id) {
        global $db;

        $query = "SELECT U2.username, I.interaction, I.tp, I.id, I.seen 
            FROM Interactions I
            LEFT JOIN Posts P ON P.id = I.post_id 
            LEFT JOIN Users U1 ON U1.id = I.rec_user_id
            INNER JOIN Users U2 ON U2.id = I.user_id 
            WHERE U1.id = ? OR P.user_id = ? 
            ORDER BY I.tp DESC";

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $user_id);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all();
    }

    function set_seen($notification_id) {
        global $db;

        $query = "UPDATE Interactions SET seen = 1 WHERE id = ?";

        $statement = $db->prepare($query);
        $statement->bind_param('i', $notification_id);
        $statement->execute();

        return $statement->get_result() == false ? false : true;
    }
}
