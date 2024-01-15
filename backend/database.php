<?php

$conf = parse_ini_file('config.ini');

$db = new mysqli($conf['db_host'], $conf['db_user'], $conf['db_password'], $conf['db_name']);

if ($db->connect_error) {
    die('Connection error: ' . $db->connect_error);
}
