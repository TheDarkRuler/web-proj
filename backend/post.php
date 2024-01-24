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

    function like_post($post_id, $user_id, $value) {
        global $db;

        $query = 'UPDATE Posts SET n_like = n_like + ? WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $value, $post_id);
        $statement->execute();
        $result = $statement->get_result();

        if ($value > 0) {
            $query = "INSERT INTO Interactions(user_id, post_id, interaction) VALUES (?, ?, 'like')";
        } else {
            $query = "DELETE FROM Interactions WHERE user_id = ? AND post_id = ? AND interaction LIKE 'like'";
        }

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $post_id);
        $statement->execute();
        $result = $statement->get_result();

        return $result;
    }

    function dislike_post($post_id, $user_id, $value) {
        global $db;

        $query = 'UPDATE Posts SET n_dislike = n_dislike + ? WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $value, $post_id);
        $statement->execute();
        $result = $statement->get_result();

        if ($value > 0) {
            $query = "INSERT INTO Interactions(user_id, post_id, interaction) VALUES (?, ?, 'dislike')";
        } else {
            $query = "DELETE FROM Interactions WHERE user_id = ? AND post_id = ? AND interaction LIKE 'dislike'";
        }

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $post_id);
        $statement->execute();
        $result = $statement->get_result();

        return $result;
    }

    function update_opposite($type, $user_id, $post_id) {
        if ($type == 'like' && $this->check_dislike($user_id, $post_id)) {
            $this->dislike_post($post_id, $user_id, -1);
        }
        if ($type == 'dislike' && $this->check_like($user_id, $post_id)) {
            $this->like_post($post_id, $user_id, -1);
        }
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

    function get_post_image($post_id) {
        global $db;
        $query = 'SELECT `image` FROM Posts WHERE id LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $post_id);
        $statement->execute();
        $result = $statement->get_result();

        $blob = mysqli_fetch_array($result)[0];
        if ($blob != NULL) {
            $image = imagecreatefromstring($blob);

            ob_start(); //You could also just output the $image via header() and bypass this buffer capture.
            imagejpeg($image, null, 80);
            $data = ob_get_contents();
            ob_end_clean();
            echo '<img alt="post image" class="post-image" src="data:image/jpeg;base64,' . base64_encode($data) . '"/>';
        }
    }

    function get_by_user($user_id, $limit) {
        global $db;

        $query = 'SELECT id, user_id, description, tp, n_like, n_dislike FROM Posts WHERE user_id = ?
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

        $query = 'SELECT Posts.id, Posts.user_id, Posts.description, Posts.tp, Posts.n_like, Posts.n_dislike, Users.username 
                    FROM Posts 
                    INNER JOIN Users ON Users.id = Posts.user_id
                    WHERE user_id IN (SELECT id2 FROM Follows WHERE id1 = ?) 
                    ORDER BY tp DESC LIMIT ?';

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
