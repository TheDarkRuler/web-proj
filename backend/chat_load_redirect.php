<?php

require_once 'chat.php';
require_once 'user.php';

session_start();

$c = new Chat();
$u = new User();

if (isset($_POST['func'])) {
    echo $u->getProfileImg($_POST['id']);
} else {
    if ($_POST['filter'] != '') {
        $result = $c->get_chat_list_limited_filter($_SESSION['user_id'], $_POST['limit'], $_POST['filter']);
        foreach($result as $key => $array){
            $temp = $c->get_last_message($result[$key][0], $_SESSION['user_id']);
            if (count($temp) > 0) {
                $x = date_parse($temp[0][1]);

                $temp[0][0] = substr($temp[0][0], 0, 22);
                $temp[0][1] = $x['hour'] . ':' . $x['minute'];
    
                array_push($result[$key], $temp);
            }
        }
        echo json_encode($result);

    } else {
        $result = $c->get_chat_list_limited($_SESSION['user_id'], $_POST['limit']);
        foreach($result as $key => $array){
            $temp = $c->get_last_message($result[$key][0], $_SESSION['user_id']);
            if (count($temp) > 0) {
                $x = date_parse($temp[0][1]);

                $temp[0][0] = substr($temp[0][0], 0, 22);
                $temp[0][1] = $x['hour'] . ':' . $x['minute'];
    
                array_push($result[$key], $temp);
            }
        }
        echo json_encode($result);
    }
}
