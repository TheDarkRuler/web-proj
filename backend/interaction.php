<?php

require_once 'database.php';

class Interaction {
    function get_notifications($user_id) {
        global $db;

        $query = "SELECT Users.username, Interactions.interaction, Interactions.tp, Interactions.id 
            FROM Interactions 
            INNER JOIN Posts ON Posts.id = Interactions.post_id 
            INNER JOIN Users ON Users.id = Interactions.user_id 
            WHERE Posts.user_id = ?";

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
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
