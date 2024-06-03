<?php

require_once __DIR__ . '/services/ItemService.class.php';


// Create an instance of the ItemService
$item_service = new ItemService();

// Fetch all items from the database
$items = $item_service->get_all_items();

// Output items as JSON
header('Content-Type: application/json');
echo json_encode($items);


?>