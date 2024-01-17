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
        
        $statement = $db->prepare($query);
        $statement->bind_param('ssssss', $user, $email, $crypto_password, date('Y-m-d H:i:s'), $blobProfile, $description);
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

    function update_pic($data, $user_id) {
        global $db;

        $query = 'UPDATE Users SET profile_picture = ? WHERE id = 1';

        $statement = $db->prepare($query);
        $statement->bind_param('s', $data);
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

    function validate_password($mail, $check_password) {
        global $db;

        $query = 'SELECT password FROM Users WHERE mail LIKE ?';

        $statement = $db->prepare($query);
        $statement->bind_param('s', $mail);
        $statement->execute();
        $result = $statement->get_result();
        $fetch = $result->fetch_all()[0];

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
            echo '<img src="data:image/jpg;base64,' .  base64_encode($data)  . '" />';
        }
    }
}
