<?php 
    $jsonData = file_get_contents('php://input');

    // Декодируем JSON-данные в ассоциативный массив
    $data = json_decode($jsonData, true);
    
    // Проверяем, успешно ли декодированы данные
    if (json_last_error() === JSON_ERROR_NONE) {
        // Выводим данные в консоль
        error_log(print_r($data, true)); // Используем error_log для вывода в консоль сервера
    
        // Отправляем ответ клиенту
        echo json_encode(['status' => 'success', 'received_data' => $data]);
    } else {
        // Если произошла ошибка декодирования
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    }
?>