<?php

$manager = new MongoDB\Driver\Manager("mongodb+srv://gokulkrishna_r:gokulkrishna_r_1183@guvi-task.tohgkb0.mongodb.net/?retryWrites=true&w=majority");

// // specify the collection name and query to retrieve all documents
// $query = new MongoDB\Driver\Query([]);

// // execute the query and retrieve a cursor
// $cursor = $manager->executeQuery("guvi.user_data", $query);

// // echo $cursor ;

// // // iterate through the cursor and process each document
// foreach ($cursor as $obj) {
//     // process the document as needed
//     // echo  $document ;
//     // var_dump($document);

//     $document = json_decode(json_encode($obj), true);

//     $id = $document["_id"]["oid"]; 
// $name = $document["gk"]["name"];

// print $id ;
// print $name ;
// }

?>
