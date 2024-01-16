<?php

require_once 'database.php';

class Post {

    function craete_post($user_id, $content, $description) {
        global $db;

        $query = 'INSERT INTO Posts (user_id, image, description, tp) VALUES (?, ?, ?, ?)';

        $statement = $db->prepare($query);
        $statement->bind_param('ibss', $user_id, $content, $description, date('Y-m-d H:i:s'));
        $statement->execute();
        $result = $statement->get_result();

        return $result;
    }

    function get_all_by_user($user_id) {
        global $db;

        $query = 'SELECT * FROM Posts WHERE user_id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
        $statement->execute();
        $result = $statement->get_result();
        $posts = $result->fetch_all();

        return $posts;
    }

    function get_all_following($user_id) {
        global $db;

        $query = 'SELECT * FROM Posts WHERE user_id IN (SELECT id2 FROM Follows WHERE id1 = ?) ORDER BY RAND()';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
        $statement->execute();
        $result = $statement->get_result();

        $posts = $result->fetch_all();
        return $posts;
    }
}
