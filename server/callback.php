<?php
session_start();
require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client([
    'base_uri' => 'http://localhost:8080/',
]);

$response = $client->post('realms/myapp-realm/protocol/openid-connect/token', [
    'form_params' => [
        'grant_type' => 'authorization_code',
        'client_id' => 'securite-client',
        'client_secret' => 'YOUR_CLIENT_SECRET',
        'redirect_uri' => 'http://localhost/Securite/callback.php',
        'code' => $_GET['code'],
    ],
]);

$data = json_decode($response->getBody(), true);

$_SESSION['access_token'] = $data['access_token'];

header('Location: /Securite/admin.php');
exit();
?>