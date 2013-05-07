<?php

// Load main config file
$main = include_once( 'main.php' );

//require_once( '' );

// Production configurations
$production = array(
      'params' => array(
            'facebookappid' => '466243770054307',
            'facebookapikey' => '466243770054307',
            'facebookapisecret' => '8684a5ec1ca2df305b78cf0a7b2e9d17',
      ),
       'components' => array(
		'db' =>  array(
                'class' => 'CDbConnection',
                'connectionString' => 'mysql:host=localhost;dbname=crowder',
                'username' => 'tauproject',
                'password' => 'nir32155q',
                'charset' => 'UTF8',
                'tablePrefix' => 'tbl_',
                'emulatePrepare' => true,
                'enableProfiling' => true,
                'schemaCacheID' => 'cache',
                'schemaCachingDuration' => 3600
            ),
        'urlManager' => array(
         'showScriptName' => false,
        ),
		'messages' => array(
            'onMissingTranslation' => array('MissingMessages', 'load'),
            'cachingDuration' => 0,
            //'cachingDuration' => 3600,
	         ),
         'cache' => array( 'class' => 'CDummyCache' ),
       	'log' => array(
                'class' => 'CLogRouter',
                'routes' => array(
                    // Configures Yii to email all errors and warnings to an email address
                    array(
                        'class' => 'LogEmailMessages',
                        //'levels' => 'error, warning',
                        'levels' => 'error',
                        'emails' => 'nir@taunet.co.il',
                        'sentFrom' => 'admin@crowder.co.il',
                        'subject' => 'Crowder Application Error',
                        'enabled' => false,
                    ),
                ),
            ),
        'request' => array(
                'class' => 'CHttpRequest',
                'enableCookieValidation' => false,
                'enableCsrfValidation' => true,
                //'csrfTokenName' => 'SECTOKEN',
                'csrfTokenName' => 'YII_CSRF_TOKEN',
                'csrfCookie' => array( 'domain' => '.' . $current_domain )
            ), /*
        'session' =>  array(
                'class' => 'CDbHttpSession',
                'sessionTableName' => 'tbl_sessions',
                'connectionID' => 'db',
                'cookieParams' => array('domain' => '.' . $current_domain ),
                'timeout' => 3600,
                'sessionName' => 'SECSESS',
            ), */
    ),
);
//merge both configurations and return them
return CMap::mergeArray($main, $production);