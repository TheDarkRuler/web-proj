<?php

require_once 'database.php';

class Post {

    function craete_post($user_id, $content, $description) {
        global $db;

        $query = 'INSERT INTO Posts (user_id, image, description, tp) VALUES (?, ?, ?, ?)';

        $statement = $db->prepare($query);
        $statement->bind_param('isss', $user_id, $content, $description, date('Y-m-d H:i:s'));
        $statement->execute();
        $result = $statement->get_result();

        return $result;
    }

    function update_post_stats($column_name, $value, $post_id) {
        global $db;

        $query = 'UPDATE Posts SET ? = ? + ? WHERE post_id LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ssii', $column_name, $column_name, $value, $post_id);
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

    function get_by_user($user_id, $limit) {
        global $db;

        $query = 'SELECT * FROM Posts WHERE user_id = ?
                ORDER BY tp DESC LIMIT ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $limit);
        $statement->execute();
        $result = $statement->get_result();
        $posts = $result->fetch_all();

        return $posts;
    }

    function get_all_following($user_id, $limit) {
        global $db;

        $query = 'SELECT * FROM Posts WHERE user_id IN (SELECT id2 FROM Follows WHERE id1 = ?) ORDER BY RAND() LIMIT ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $limit);
        $statement->execute();
        $result = $statement->get_result();

        $posts = $result->fetch_all();
        return $posts;
    }

    function get_3_post_format($user_id) {
        $posts = $this->get_all_following($user_id, 3);

        // print_r($posts);
        // die();
    }

    function check_like($user_id, $post_id) {
        global $db;

        $query = "SELECT * FROM Interactions WHERE user_id = ? AND post_id = ? AND interaction LIKE 'like'";

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $post_id);
        $statement->execute();
        $result = $statement->get_result();

        return count($result->fetch_all()) > 0;
    }

    function check_dislike($user_id, $post_id) {
        global $db;

        $query = "SELECT * FROM Interactions WHERE user_id = ? AND post_id = ? AND interaction LIKE 'dislike'";

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $post_id);
        $statement->execute();
        $result = $statement->get_result();

        return count($result->fetch_all()) > 0;
    }
}
