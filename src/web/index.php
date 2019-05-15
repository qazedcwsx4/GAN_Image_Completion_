<?php

//function main(&$model)
//{
    header("Access-Control-Allow-Origin: *");

    //var_dump($_POST);
    $encodedData = str_replace(' ', '+', $_POST['file']);
    $decodedData = base64_decode($encodedData);
    file_put_contents('xd.png', $decodedData);

    system('source xd/bin/activate');
    system('python playground.py xd.png');

    $returnData = file_get_contents('xdxd.png');
    echo(base64_encode($returnData));

    //var_dump($decodedData);

    /*if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
    }*/

    //return 'mainView';
//}