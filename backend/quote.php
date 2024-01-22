<?php

require_once 'database.php';

class Quote {

    function create_quote($content, $day, $author) {
        global $db;

        $query = 'INSERT Quotes (content, quote_day, author) VALUES (?, ?, ?)';

        $statement = $db->prepare($query);
        $statement->bind_param('sss', $content, $day, $author);
        $statement->execute();
        $result = $statement->get_result();

        return $result;
    }

    function get_daily_quote() {
        global $db;

        $query = 'SELECT * FROM Quotes WHERE quote_day = ?';

        $statement = $db->prepare($query);
        $today = date('Y-m-d');
        $statement->bind_param('s', $today);
        $statement->execute();
        $result = $statement->get_result();
        $posts = $result->fetch_all();

        return $posts;
    }

    function get_random_quote() {
        global $db;

        $query = 'SELECT * FROM Quotes ORDER BY RAND() LIMIT 1';

        $statement = $db->prepare($query);
        $statement->execute();
        $result = $statement->get_result();

        return $result->fetch_all();
    }
}
