<?php

require_once 'database.php';

// 0 : id, 1 : username, 2 : mail, 3 : password

class User {

    private function return_info_user($mail) {
        global $db;

        $query = 'SELECT id, username, mail, profile_picture, description, 
            n_follower, n_following, n_post FROM Users WHERE mail LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('s', $mail);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all();
    }

    function create_user($user, $email, $password, $description) {
        global $db;
        $query = 'INSERT INTO Users (username, mail, password, first_login, profile_picture, description) VALUES (?, ?, ?, ?, ?, ?)';

        $crypto_password = password_hash($password, PASSWORD_DEFAULT);

        $path = "../frontend/img/default_profile.jpg";
        $blobProfile = file_get_contents($path);

        if (count($this->return_info_user($email)) > 0) {
            return array();
        }

        try {
            $statement = $db->prepare($query);
            $statement->bind_param('ssssss', $user, $email, $crypto_password, date('Y-m-d H:i:s'), $blobProfile, $description);
            $statement->execute();
            $result = $statement->get_result();

            return $this->return_info_user($email);
        } catch (Exception $e) {
            return array();
        }
    }

    function login_user($email, $password) {
        global $db;

        $query = 'SELECT * FROM Users WHERE mail LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('s', $email);
        $statement->execute();
        $result = $statement->get_result();

        $user = $result->fetch_all()[0];

        $verify = password_verify($password, $user[3]);

        // should update last_login
        $query = 'UPDATE Users SET last_login = ? WHERE mail LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ss', date('Y-m-d H:i:s'), $mail);
        $statement->execute();

        return $verify == true ? $this->return_info_user($email) : array();
    }

    function increase_field($field, $mail) {
        global $db;

        $query = 'UPDATE Users SET ? = ? + 1 WHERE mail LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('sss', $field, $field, $mail);
        $statement->execute();
        $result = $statement->get_result();

        return $result;
    }

    function update_pic($data, $user_id) {
        global $db;

        $query = 'UPDATE Users SET profile_picture = ? WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('si', $data, $user_id);
        $statement->execute();
        $result = $statement->get_result();

        return $result;
    }

    function update_description($description, $mail) {
        global $db;

        $query = 'UPDATE Users SET description = ? WHERE mail LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ss', $description, $mail);
        $statement->execute();
        $result = $statement->get_result();

        return $result;
    }

    function update_username($value, $user_id) {
        global $db;

        $query = "UPDATE Users SET username = ? WHERE id = ?";

        $statement = $db->prepare($query);
        $statement->bind_param('si', $value, $user_id);
        $statement->execute();

        return $statement->error ? false : true;
    }

    function update_email($value, $user_id) {
        global $db;

        $query = "UPDATE Users SET mail = ? WHERE id = ?";

        $statement = $db->prepare($query);
        $statement->bind_param('si', $value, $user_id);
        $statement->execute();

        return $statement->error ? false : true;
    }

    function update_password($value, $user_id) {
        global $db;

        $query = "UPDATE Users SET password = ? WHERE id = ?";

        $statement = $db->prepare($query);
        $statement->bind_param('si', $value, $user_id);
        $statement->execute();

        return $statement->error ? false : true;
    }

    function validate_password($user_id, $check_password) {
        global $db;

        $query = 'SELECT password FROM Users WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
        $statement->execute();
        $result = $statement->get_result();
        $fetch = $result->fetch_all()[0][0];

        $verify = password_verify($check_password, $fetch);

        return $verify;
    }

    function getProfileImg($u_id) {
        global $db;
        $query = 'SELECT `profile_picture` FROM Users WHERE id LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $u_id);
        $statement->execute();
        $result = $statement->get_result();

        $blob = mysqli_fetch_array($result)[0];
        if ($blob != NULL) {
            $image = imagecreatefromstring($blob);

            ob_start(); //You could also just output the $image via header() and bypass this buffer capture.
            imagejpeg($image, null, 80);
            $data = ob_get_contents();
            ob_end_clean();
            echo '<img src="data:image/jpeg;base64,' . base64_encode($data) . '"/>';
        }
    }

    function get_user_stats($user_id) {
        global $db;

        $query = 'SELECT n_follower, n_following, n_post FROM `Users` WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all()[0];
    }

    function get_user_description($user_id) {
        global $db;

        $query = 'SELECT description FROM `Users` WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all()[0];
    }

    function get_username($user_id) {
        global $db;

        $query = 'SELECT username FROM `Users` WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all()[0];
    }

    function new_follow($user_id, $follow_id) {
        global $db;

        $query = 'INSERT INTO Follows (id1, id2) VALUES (?, ?)';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $follow_id);
        $statement->execute();

        $query = 'UPDATE `Users`
            SET n_following = n_following + 1
            WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
        $statement->execute();

        $query = 'UPDATE `Users`
            SET n_follower = n_follower + 1
            WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $follow_id);
        $statement->execute();

        $query = "INSERT INTO Interactions (user_id, rec_user_id, interaction) VALUES (?, ?, 'follow')";

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $follow_id);
        $statement->execute();
    }

    function remove_follow($user_id, $follow_id) {
        global $db;

        $query = 'DELETE FROM Follows
                WHERE id1 = ? AND id2 = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $follow_id);
        $statement->execute();

        $query = 'UPDATE `Users`
            SET n_following = n_following - 1
            WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $user_id);
        $statement->execute();

        $query = 'UPDATE `Users`
            SET n_follower = n_follower - 1
            WHERE id = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('i', $follow_id);
        $statement->execute();
    }

    function is_following($user_id, $follow_id) {
        global $db;

        $query = 'SELECT id1, id2 FROM `Follows` WHERE id1 = ? AND id2 = ?';

        $statement = $db->prepare($query);
        $statement->bind_param('ii', $user_id, $follow_id);
        $statement->execute();

        $result = $statement->get_result();

        return  isset($result->fetch_all()[0][0]);
    }
}
