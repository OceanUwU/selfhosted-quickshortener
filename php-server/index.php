<?php
require('cfg.php');
$random_alphabet = '123456789abcdefghijkmnpqrstuvwxyz';

$db = new SQLite3('data.db');
$db->busyTimeout(5000);
header('Access-Control-Allow-Origin: *');

$path = substr($_SERVER['REQUEST_URI'], 1);
if ($path == 'api/create' && array_key_exists('f', $_POST) && array_key_exists('t', $_POST) && array_key_exists('k', $_POST)) {
    header('Content-Type: application/json');

    if ($_POST['k'] !== $key) {
        die('false');
    }

    if (($_POST['f']) == 'generateRandomLink') {
        do {
            $from = '';
            for ($i = 0; $i < $random_length; $i++)
                $from .= substr($random_alphabet, random_int(0, strlen($random_alphabet)-1), 1);
        } while ($db->querySingle('SELECT COUNT(1) as count FROM links WHERE origin == "'.$db->escapeString($from).'"') > 0);
    } else {
        $from = $_POST['f'];
    }

    $db->exec('INSERT INTO links (origin, destination) VALUES ("'.$db->escapeString($from).'", "'.$db->escapeString($_POST['t']).'")');

    echo json_encode($from);
} else {
    $result = $db->querySingle('SELECT destination from links WHERE origin="'.$db->escapeString($path).'"');
    if (is_null($result)) {
        echo '"/'.$path.'" is not a shortened link';
    } else {
        header('Location: '.$result);
    }
};