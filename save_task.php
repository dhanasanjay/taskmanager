<?php
$host = 'localhost';
$db = 'task_manager';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

$title = $data['title'];
$description = $data['description'];
$status = 'pending';

$sql = "INSERT INTO tasks (title, description, status) VALUES ('$title', '$description', '$status')";

if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    $task = array("id" => $last_id, "title" => $title, "description" => $description, "status" => $status);
    echo json_encode($task); // Return the newly created task
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
}

$conn->close();
?>
