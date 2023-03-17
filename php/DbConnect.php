<?php
    class DbConnect {
        
        public function connect() {
            try {
                $dsn = "mysql:host='ap-south.connect.psdb.cloud';dbname='guvi_task'";
                $options = array(
                  PDO::MYSQL_ATTR_SSL_CA => "/etc/ssl/certs/ca-certificates.crt",
                );
                $pdo = new PDO($dsn, '9la034xqmuztf4dggswi', 'pscale_pw_dXZKMWMhjPiPs9GTboYrRqmENaxzviLyqqpTT23YZhn', $options);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $pdo;
            } catch (\Exception $e) {
                echo "Database Error: " . $e->getMessage();
            }
        }
         
    }
?>