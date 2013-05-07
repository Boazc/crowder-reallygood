<?php

// Load main config file
$main = include_once( 'main.php' );

// Development configurations
$development = array(
      'params' => array(
            'facebookappid' => '116046041817365',
            'facebookapikey' => '74e1bebd03d8151aa3a8a8cefe110354',
            'facebookapisecret' => '5e3876b7c0a2b4baf03a5011a52b1b46',
      ),
    'modules'=>array(

        'gii'=>array(
            'class'=>'system.gii.GiiModule',
            'password'=>'nir123',
            // If removed, Gii defaults to localhost only. Edit carefully to taste.
            'ipFilters'=>array('127.0.0.1','::1'),
            'generatorPaths'=>array(
                'system.web.my.ext.bootstrap.gii',
            ),
        ),
    ),
	'components' => array(
		'db' =>  array(
                        'class' => 'CDbConnection',
                        'connectionString' => 'mysql:host=localhost;dbname=crowder',
                        'username' => 'admin',
                        'password' => 'admin123',
                        'charset' => 'UTF8',
                        'tablePrefix' => 'tbl_',
                        'emulatePrepare' => true,
                        'enableProfiling' => true,
                        'schemaCacheID' => 'cache',
                        'schemaCachingDuration' => 120
                ),
        'urlManager' => array(
            'showScriptName' => true,
         ),
		'messages' => array(
						'onMissingTranslation' => array('MissingMessages', 'load'),
		                'cachingDuration' => 0,
         ),
		'cache' => array( 'class' => 'CDummyCache' ),
		'log' => array(
                        'class' => 'CLogRouter',
                        'routes' => array(
                                array(
                                        'class'=>'CWebLogRoute',
                                        'enabled' => true,
                                        'levels' => 'info',
                                ),
                                array(
                                        'class'=>'CProfileLogRoute',
                                        'enabled' => false,
                                ),
								array(
								          'class'=>'application.extensions.yiidebugtb.XWebDebugRouter',
								          'config'=>'alignLeft, opaque, runInDebug, fixedPos, collapsed, yamlStyle',
								          'levels'=>'error, warning, trace, profile, info',
								     ),
                        ),
                ),
        'request' => array(
            'class' => 'CHttpRequest',
            'enableCookieValidation' => false,
            'enableCsrfValidation' => false,
            //'csrfTokenName' => 'SECTOKEN',
            'csrfTokenName' => 'YII_CSRF_TOKEN',
            'csrfCookie' => array( 'domain' => '.' . $current_domain )
        ),
    ),
);
//merge both configurations and return them
return CMap::mergeArray($main, $development);