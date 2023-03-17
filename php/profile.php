<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$data= [];
$email = $_POST['email'];

    $manager = new MongoDB\Driver\Manager("mongodb+srv://gokulkrishna_r:gokulkrishna_r_1183@guvi-task.tohgkb0.mongodb.net/?retryWrites=true&w=majority");
    $collection = "guvi.user_data";
    $localIP = getHostByName(getHostName());
    $filter = ["_id" => $email];
    if (array_key_exists("linkedin",$_POST)) {
        $update = ['$set' => [
            "linkedin" => $_POST['linkedin'],
            ]
        ];
    }else if ( array_key_exists("github",$_POST) ) {
        $update = ['$set' => [
            "github" => $_POST['github'],
            ]
        ];
    }else if ( array_key_exists("address",$_POST) ) {
        $update = ['$set' => [
            "address" => $_POST['address'],
            ]
        ];
    }
    $bulk = new MongoDB\Driver\BulkWrite();
    $bulk->update($filter, $update);
    $result = $manager->executeBulkWrite($collection, $bulk);
    // echo $result;
    $data["res"] = $result ;
    
echo json_encode($data);

?>
