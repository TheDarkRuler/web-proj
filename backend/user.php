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

    function create_user($user, $email, $password, $pic, $description) {
        global $db;

        $query = 'INSERT INTO Users (username, mail, password, first_login, profile_picture, description) VALUES (?, ?, ?, ?, ?, ?)';

        $crypto_password = password_hash($password, PASSWORD_DEFAULT);

        $statement = $db->prepare($query);
        $statement->bind_param('ssssbs', $user, $email, $crypto_password, date('Y-m-d H:i:s'), $pic, $description);
        $statement->execute();
        $result = $statement->get_result();

        return $this->return_info_user($email);
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

        return $verify == true ? $this->return_info_user($email) : null;
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

    function update_pic($data, $mail) {
        global $db;

        $query = 'UPDATE Users SET profile_picture = ? WHERE mail LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('bs', $data, $mail);
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
}
