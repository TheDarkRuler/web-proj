<?php

require_once 'database.php';

class Comment {

    function post_comment($post_id, $user_id, $content) {
        global $db;

        $query = 'INSERT INTO Comments (post_id, content, tp, user_id) VALUES (?, ?, ?, ?)';

        $statement = $db->prepare($query);
        $statement->bind_param('issi', $post_id, $content, date('Y-m-d H:i:s'), $user_id);
        $statement->execute();
        return $statement->get_result();
    }

    function comment_comment($reference_comment, $comment_id) {
        global $db;

        $query = 'INSERT INTO CommentAComment (reference_comment_id, comment_id) VALUES (?, ?)';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $reference_comment, $comment_id);
        $statement->execute();

        return $statement->get_result();
    }

    function get_all_by_post($post_id) {
        global $db;

        $query = 'SELECT * FROM Comments WHERE post_id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $post_id);
        $statement->execute();
        $result = $statement->get_result();
        return $result->fetch_all();
    }
}
