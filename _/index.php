<?php

// change the following paths if necessary
$config=dirname(__FILE__).'/protected/config/';

// Define root directory
defined('ROOT_PATH') or define('ROOT_PATH', dirname(__FILE__) . '/');

// remove the following lines when in production mode
if (strpos($_SERVER['HTTP_HOST'],'localhost') !== false) {
    define('YII_DEBUG',true);
} else {
    define('YII_DEBUG',false);
}


if( YII_DEBUG === true )
{
    //$yii=dirname(__FILE__).'/../framework1.1.8/yiilite.php';
    $yii=dirname(__FILE__).'/../framework/yiilite.php';

    ini_set('display_errors', true);
    error_reporting(E_ALL);

    // By default we use testing.com for the currently active domain
    define('CURRENT_ACTIVE_DOMAIN', 'localhost/yii/funder');
}
else
{
    //$yii=dirname(__FILE__).'/../yii-1.1.8.r3324/framework/yii.php';
    //$yii=dirname(__FILE__).'/../yii-1.1.8.r3324/framework/yiilite.php';
    $yii=dirname(__FILE__).'/../framework/yiilite.php';

    ini_set('display_errors', true);
    error_reporting(E_ALL);

    // On production it will be the yiiframework.co.il domain name
    define('CURRENT_ACTIVE_DOMAIN', 'crowder.co.il');
}

$configFile = YII_DEBUG ? 'dev.php' : 'production.php';

require_once($yii);
Yii::createWebApplication($config . $configFile)->run();