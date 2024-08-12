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

$id = $data['id'];

$sql = "UPDATE tasks SET status='completed' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Task marked as complete"]);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
}

$conn->close();
?>
