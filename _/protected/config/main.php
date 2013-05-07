<?php
// Sort cache options
$caches = array();
$fastCache = false;

// Sort the type of cache to use
if( function_exists('xcache_isset') )
{
    // Using XCache
    $caches = array( 'class' => 'CXCache' );
}
else if( extension_loaded('apc') )
{
    // Using APC
    $caches = array( 'class' => 'CApcCache' );
}
else if( function_exists('eaccelerator_get') )
{
    // Using Eaccelerator
    $caches = array( 'class' => 'CEAcceleratorCache' );
}
else if( function_exists('zend_shm_cache_store') )
{
    // Using ZendDataCache
    $caches = array( 'class' => 'CZendDataCache' );
}
else
{
    // Using File Cache - fallback
    $caches = array( 'class' => 'CFileCache' );
    $fastCache = false;
}

// Current active domain
$current_domain = CURRENT_ACTIVE_DOMAIN;

Yii::setPathOfAlias('bootstrap', 'system.web.my.ext.bootstrap');

// Required system configuration. There should be no edit performed here.
return array(
        'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
        'theme' => 'site',
        'name' => 'Crowder - כל אחד יכול להשקיע',
        'defaultController' => 'index',
        'layout' => 'main',
        'charset'=>'UTF-8',
        'sourceLanguage' => 'en',
        'language' => 'he',
        'preload' => array('log', 'session', 'db', 'cache'),
        'modules' => array(
            'admin' => array(
                    'import' => array('admin.components.*',
                    ),
                    'defaultController' => 'index',
                    'modules' => array(
                        'code' => array(
                            'class'=>'system.web.my.modules.code.CodeModule',
                        )
                    ),
                ),
           // 'startup' => array(
                //'defaultController' => 'index',
           // ),

        ),
        'import' => array(
            'system.web.my.*',
            'system.web.my.models.*',
            'system.web.my.ext.jtogglecolumn.*',
            'system.web.my.modules.code.models.*',
            'application.components.*',
            'application.models.*',
            'application.extensions.*',
            //'startup.models.*',
            //'startup.components.*',
        ),
        'params' => array( 
            'fastcache' => $fastCache,
            'languages' => array( 'en' => 'English', 'he' => 'Hebrew' ),
            'single_language' => true,
            'subdomain_languages' => false,
            'loggedInDays' => 10,
            'current_domain' => $current_domain,
            'default_group' => 'user',
            'emailin' => 'support@yiiframework.co.il',
            'emailout' => 'support@yiiframework.co.il',
         ),
        'aliases' => array(
            'helpers' => 'application.widgets',
            'widgets' => 'application.widgets',
            'bootstrap' => 'system.web.my.ext.bootstrap',
        ),
        'components' => array(
            'bootstrap'=>array(
                'class'=>'bootstrap.components.Bootstrap',
            ),
            'format' => array(
                    'class' => 'CFormatter',
             ),
            'email' => array(
                    'class' => 'application.extensions.email.Email',
                    'view' => 'email',
                    'viewVars' => array(),
                    'layout' => 'main',
            ),
            'func' => array(
                    'class' => 'application.components.Functions',
            ),
            'errorHandler'=>array(
                    'errorAction'=>'error',
            ),
            'settings' => array(
                    'class' => 'XSettings',
            ),
            'authManager'=>array(
                        'class'=>'AuthManager',
                        'connectionID'=>'db',
                        'itemTable' => 'tbl_authitem',
                        'itemChildTable' => 'tbl_authitemchild',
                        'assignmentTable' => 'tbl_authassignment',
                        'defaultRoles'=>array('guest'),
            ),
            'image'=>array(
                'class'=>'application.extensions.image.CImageComponent',
                // GD or ImageMagick
                'driver'=>'GD',
                // ImageMagick setup path
                'params'=>array('directory'=>'/opt/local/bin'),
            ),
            'user'  => array(
                    'class' => 'CustomWebUser',
                    'allowAutoLogin' => true,
                    'autoRenewCookie' => true,
                    'loginUrl'=>array('login/index'),
                    'identityCookie' => array('domain' => '.' . $current_domain),
            ),
            'messages' => array(
                    'class' => 'CDbMessageSource',
                    'cacheID' => 'cache',
                    'sourceMessageTable' => 'tbl_sourcemessage',
                    'translatedMessageTable' => 'tbl_message',
            ),
            'urlManager' => array(
                    'class' => 'CustomUrlManager',
                    'urlFormat' => 'path',
                    'cacheID' => 'cache',
                    'appendParams' => true,
                    'urlSuffix' => ''
            ),
           'cache' => $caches,
        ),
);