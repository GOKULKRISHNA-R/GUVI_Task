<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$errors = [];
$data = [];

if (empty($_POST['email'])) {
    $errors['email'] = 'Email is required.';
}
if (empty($_POST['password'])) {
    $errors['password'] = 'Password is required.';
} 

if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    include 'DbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $sql = "SELECT * FROM user_info WHERE email = :email AND password = :password" ;
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $_POST['email']);
    $stmt->bindParam(':password', $_POST['password']);    
    
    if ($stmt->execute()) {
        $result = $stmt->fetch();
        if( $result ){
            
            $email = $result['email'];
            // MONGO INSERT START
            $manager = new MongoDB\Driver\Manager("mongodb+srv://gokulkrishna_r:gokulkrishna_r_1183@guvi-task.tohgkb0.mongodb.net/?retryWrites=true&w=majority");
            $collection = "guvi.user_data";
            $query = new MongoDB\Driver\Query(["_id" => $email]);
            $localIP = getHostByName(getHostName());
            $exeresult = $manager->executeQuery($collection, $query);
            // echo $localIP ;
            if ($exeresult->isDead()) {
                // echo "Document with _id value $email does not exist in collection.";
                $document = [
                    "_id" => $email,
                    "last_login_time" => $_POST['time'],
                    "last_loggedin_ip" => $localIP,
                ];
                $bulk = new MongoDB\Driver\BulkWrite();
                $bulk->insert($document);
                $manager->executeBulkWrite($collection, $bulk);
            } else {
                // echo "Document with _id value $email exists in collection.";
                $filter = ["_id" => $email];
                $update = ['$set' => [
                    "last_login_time" => $_POST['time'],
                    "last_loggedin_ip" => $localIP ]
                ];
                $bulk = new MongoDB\Driver\BulkWrite();
                $bulk->update($filter, $update);
                $manager->executeBulkWrite($collection, $bulk);
            }
            // MONGO INSERT END

            $data['success'] = true;
            $data['errors'] = false;
            $data['message'] = 'Success!';
            $data['response'] = $result;
        }
    } else {
        $errors['login'] = "SignUp Failed";
        $data['success'] = false;
    }
}

echo json_encode($data);

?>
