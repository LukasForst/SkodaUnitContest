<?php

/**
 *
 */

require_once './vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('./templates');
$twig = new Twig_Environment($loader, array(
    'cache' => './twig_cache',
));

$context = [
    'name' => 'Fabien'
];

echo $twig->render('default.html', $context);