<?php

require_once 'database.php';

// 0 : id, 1 : username, 2 : mail, 3 : password

class User {

    function create_user($user, $email, $password, $pic, $description) {
        global $db;

        $query = 'INSERT INTO Users (username, mail, password, first_login, profile_picture, description) VALUES (?, ?, ?, ?, ?, ?)';

        $crypto_password = password_hash($password, PASSWORD_DEFAULT);

        $statement = $db->prepare($query);
        $statement->bind_param('ssssbs', $user, $email, $crypto_password, date('Y-m-d H:i:s'), $pic, $description);
        $statement->execute();
        $result = $statement->get_result();

        return $result;
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

        return $verify == true ? $user : null;
    }
}
