<?php
    class DbConnect { 
        public function connect() {
            try {
                $dsn = "mysql:host={$_ENV["HOST"]};dbname={$_ENV["DATABASE"]}";
                $options = array(
                  PDO::MYSQL_ATTR_SSL_CA => "/etc/ssl/certs/ca-certificates.crt",
                );
                
                $conn = new PDO($dsn, $_ENV["USERNAME"], $_ENV["PASSWORD"], $options);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch (\Exception $e) {
                echo "Database Error: " . $e->getMessage();
            }
        }
         
    }
?>
