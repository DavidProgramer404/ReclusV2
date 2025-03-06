<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);
    $subject = htmlspecialchars($data['subject']);
    $message = htmlspecialchars($data['message']);

    $to = "kyoyoukenzi@gmail.com"; // Cambia esto por tu correo electrónico
    $headers = "From: " . $email;
    $body = "Nombre: " . $name . "\n\n" . "Correo: " . $email . "\n\n" . "Asunto: " . $subject . "\n\n" . "Mensaje: " . $message;

    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado.";
    } else {
        echo "Error al enviar el mensaje.";
    }
}
?>
