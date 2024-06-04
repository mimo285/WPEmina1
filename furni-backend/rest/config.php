<?php

ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

/*
class Config {
    public static function DB_NAME() {
        return Config::get_env("DB_NAME", "furni");
    }
    public static function DB_PORT() {
        return Config::get_env("DB_PORT", 3306);
    }
    public static function DB_USER() {
        return Config::get_env("DB_USER", 'root');
    }
    public static function DB_PASSWORD() {
        return Config::get_env("DB_PASSWORD", '');
    }
    public static function DB_HOST() {
        return Config::get_env("DB_HOST", '127.0.0.1');
    }
    public static function JWT_SECRET() {
        return Config::get_env("DB_HOST", 'L0ky$aCZc0Czzc$V7MvJ*(F-y//=m,');
    }
    public static function get_env($name, $default){
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
    }
}
*/

//database access credentials

define("DB_NAME", "furni");
define("DB_PORT", 3306);
define("DB_USER", "root");
define("DB_PASSWORD", "");
define("DB_HOST", "127.0.0.1");

define('JWT_SECRET', 'L0ky$aCZc0Czzc$V7MvJ*(F-y//=m,');