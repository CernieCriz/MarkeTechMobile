<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['csvfile'])) {
    $uploadDir = __DIR__ . '/';
    $uploadFile = $uploadDir . 'data.csv';
    $fileType = strtolower(pathinfo($_FILES['csvfile']['name'], PATHINFO_EXTENSION));
    if ($fileType !== 'csv') {
        http_response_code(400);
        echo 'Only CSV files are allowed.';
        exit;
    }
    if (move_uploaded_file($_FILES['csvfile']['tmp_name'], $uploadFile)) {
        echo 'success';
    } else {
        http_response_code(500);
        echo 'Failed to upload file.';
    }
} else {
    http_response_code(400);
    echo 'No file uploaded.';
} 