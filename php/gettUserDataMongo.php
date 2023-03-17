<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$manager = new MongoDB\Driver\Manager("mongodb+srv://gokulkrishna_r:gokulkrishna_r_1183@guvi-task.tohgkb0.mongodb.net/?retryWrites=true&w=majority");

$query = new MongoDB\Driver\Query(['_id'=>$_POST['email']]);
$cursor = $manager->executeQuery("guvi.user_data", $query);

foreach ($cursor as $obj) {
    
    $document = json_decode(json_encode($obj), true);
    $data["result"] = $document ;
}

echo json_encode($data);

?>
