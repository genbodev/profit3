<?php
/**
 * Created by PhpStorm.
 * User: Igor
 * Date: 04.01.2018
 * Time: 20:30
 */

if (isset($_POST) && isset($_POST['offset'])) {

    $db = new PDO('mysql:host=localhost;dbname=profit3', 'root', '');
    $stmt = $db->prepare("SELECT  l.* FROM employees l LEFT JOIN wages r ON r.worker_id = l.id AND MONTH(r.date) = '2' WHERE r.worker_id IS NULL LIMIT {$_POST['offset']}, 10000");
    $stmt->execute();
    $rows = $stmt->fetchAll();
    echo json_encode(array('status' => true, 'names' => $rows));
}