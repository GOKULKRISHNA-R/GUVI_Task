<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$errors = [];
$data = [];

if (empty($_POST['name'])) {
    $errors['name'] = 'Name is required.';
}
if (empty($_POST['email'])) {
    $errors['email'] = 'Email is required.';
}
if (empty($_POST['dob'])) {
    $errors['dob'] = 'Date of Birth is required.';
}
if (empty($_POST['mobile'])) {
    $errors['mobile'] = 'Mobile Number is required.';
}
if (empty($_POST['password'])) {
    $errors['password'] = 'Password is required.';
} else if (strlen($_POST['password']) < 8 || strlen($_POST['password']) > 10) {
    $errors['password'] = 'Password length should be greater than 7 and less then 11.';
}
if (empty($_POST['cPassword'])) {
    $errors['cPassword'] = 'Confirm Password is required.  ';
}
if (strcmp($_POST['password'], $_POST['cPassword']) != 0) {
    $errors['checkPassword'] = "Password doesn't match";
}

if (!empty($errors)) {
    $data['success'] = false;
    $data['errors'] = $errors;
} else {
    include 'DbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $sql = "INSERT INTO user_info(name, email, mobile, dob, password) VALUES (:name, :email, :mobile, :dob, :password)";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':name', $_POST['name']);
    $stmt->bindParam(':email', $_POST['email']);
    $stmt->bindParam(':mobile', $_POST['mobile']);
    $stmt->bindParam(':dob', $_POST['dob']);
    $stmt->bindParam(':password', $_POST['password']);

    if ($stmt->execute()) {


        // MONGO INSERT START
            $email = $_POST['email'];
            $manager = new MongoDB\Driver\Manager("mongodb+srv://gokulkrishna_r:gokulkrishna_r_1183@guvi-task.tohgkb0.mongodb.net/?retryWrites=true&w=majority");
            $collection = "guvi.user_data";
            $document = [
                "_id" => $email,
                "acc_created_time" => $_POST['time'],
            ];
            $bulk = new MongoDB\Driver\BulkWrite();
            $bulk->insert($document);
            $manager->executeBulkWrite($collection, $bulk);
        // MONGO INSERT END


        $data['success'] = true;
        $data['errors'] = false;
        $data['message'] = 'Success!';
    } else {
        $errors['login'] = "SignUp Failed";
        $data['success'] = false;
    }
}

echo json_encode($data);

?>
