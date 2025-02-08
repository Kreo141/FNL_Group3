<?php
header('Content-Type: application/json');

$host = "localhost"; // Change to your database host
$dbname = "fnd_group3"; // Change to your database name
$username = "root@localhost"; // Change to your database username
$password = ""; // Change to your database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT image_url, title, description, button_text FROM slides ORDER BY id ASC");
    $slides = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($slides);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>
