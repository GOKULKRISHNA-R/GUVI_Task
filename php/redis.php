<?php
class RedisLogin{
    public function log($email)
    {        
        $data = -1 ;
        $redis = new Redis(); 
        $redis->connect('127.0.0.1', 6379);  
         $email = $redis->get("email");
         $password = $redis->get("password");
         if( $email && $password){
          if( $email == $_POST['email'] && $password == $_POST['password']){
             $data = 1 ;
         }else{
              $data= 0 ;
             }
         }else{
             $data = -1 ;
         }
         return $data ;
    }
}

?>
