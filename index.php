<?php

require 'furni-backend/vendor/autoload.php';
require 'furni-backend/rest/routes/middleware_routes.php';
require 'furni-backend/rest/routes/item_routes.php';
require 'furni-backend/rest/routes/auth_routes.php';
require 'furni-backend/rest/routes/user_routes.php';
require 'furni-backend/rest/routes/cart_routes.php';



Flight::start();