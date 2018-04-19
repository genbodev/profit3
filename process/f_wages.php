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
    //$db->query("DELETE FROM wages");
    foreach (range(1, 10000) as $x) {
        $db->query("INSERT INTO wages (worker_id, date, value) VALUES (
                                        '{$faker->numberBetween($min = 1, $max = 202000)}', 
                                        '{$faker->date($format = '2017-m-d')}',
                                        '{$faker->numberBetween($min = 80000, $max = 200000)}'
                                        )");
    }
    echo json_encode(array('status' => true));
}