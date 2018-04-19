<?php
/**
 * Created by PhpStorm.
 * User: Igor
 * Date: 04.01.2018
 * Time: 20:30
 */

if (isset($_POST)) {
    require __DIR__ . '/../vendor/autoload.php';
    $faker = \Faker\Factory::create('ru_RU');

    $db = new PDO('mysql:host=localhost;dbname=profit3', 'root', '');
    //$db->query("DELETE FROM employees");
    foreach (range(1, 10000) as $x) {
        $db->query("INSERT INTO employees (name) VALUES ('{$faker->name}')");
    }
    echo json_encode(array('status' => true));
}