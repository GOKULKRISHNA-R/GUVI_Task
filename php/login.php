<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$errors = [];
$data = [];

$redis = new Redis(); 
$redis->connect('127.0.0.1', 6379);

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
    include 'redis.php' ;
    $redisObj = new RedisLogin ;
    $redisResult = $redisObj->log($_POST['email']);
    // $result = [];
    if( $redisResult == -1 )
    {
        
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
                $localIP = getHostByName(getHostName());
                $filter = ["_id" => $email];
                $update = ['$set' => [
                    "last_login_time" => $_POST['time'],
                    "last_loggedin_ip" => $localIP ]
                ];
                $bulk = new MongoDB\Driver\BulkWrite();
                $bulk->update($filter, $update);
                $manager->executeBulkWrite($collection, $bulk);
            // MONGO INSERT END

            $data['success'] = true;
            $data['errors'] = false;
            $data['message'] = 'Success!';
            $data['response'] = $result;

            // REDIS START 
                // echo "Connection to server sucessfully"; 
                $redis->set("email", $result['email']); 
                $redis->set("name", $result['name']); 
                $redis->set("password", $result['password']); 
                $redis->set("dob", $result['dob']); 
                $redis->set("mobile", $result['mobile']); 
       // REDIS END
        }
    } else {
        $errors['login'] = "SignUp Failed";
        $data['success'] = false;
        $data['error'] = $errors;
    }
    
}else if( $redisResult == 0 ) {
    $errors['login'] = "SignUp Failed. Incorrect username Password";
    $data['success'] = false;
    $data['error'] = $errors;

    }else {
        // echo 'alert("from redis")';  
        $data['success'] = true;
        $data['errors'] = false;
        $data['message'] = 'Success!';
        $data['response']["email"] = $redis->get("email");
        $data['response']["name"] = $redis->get("name");
        $data['response']["password"] = $redis->get("password");
        $data['response']["dob"] = $redis->get("dob");
        $data['response']["mobile"] = $redis->get("mobile");
    }
}

echo json_encode($data);

?>
