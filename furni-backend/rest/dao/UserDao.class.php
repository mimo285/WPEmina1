<?php

require_once __DIR__ . '/BaseDao.class.php';

class UserDao extends BaseDao {
    public function __construct() {
        parent::__construct('user');
    }
   
    public function add_user($user){
        $query = "INSERT INTO user (name, surname, email, password)
                  VALUES (:firstName, :lastName, :email, :password)";
        $statement = $this->connection->prepare($query);
        
        // Bind parameters
        $statement->bindParam(':lastName', $user['lastName']);
        $statement->bindParam(':firstName', $user['firstName']);
        $statement->bindParam(':email', $user['email']);
        $statement->bindParam(':password', $user['password']);
        
        // Execute the statement
        $statement->execute();
        
        // Get the ID of the inserted user
        $user['id'] = $this->connection->lastInsertId();
        
        return $user;
    }
    
}