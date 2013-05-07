<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController
{
    public $modelName;
	/**
	 * @var string the default layout for the controller view. Defaults to '//layouts/column1',
	 * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
	 */
	public $layout='//layouts/column1';
	/**
	 * @var array context menu items. This property will be assigned to {@link CMenu::items}.
	 */
	public $menu=array();
	/**
	 * @var array the breadcrumbs of the current page. The value of this property will
	 * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
	 * for more details on how to specify this property.
	 */
	public $breadcrumbs=array();

    public $image;

    /**
     * This is the general page title, We use this instead of the
     * applications pageTitle since it's not designed to be a string
     * But rather an array so we could reverse it later for SEO improvements
     *
     * @var string
     **/
    public $pageTitle = array();

    function init()
    {
            parent::init();

            $this->loadSettings();

            if (!isset($this->modelName))
            {
                 $this->modelName = str_replace('Controller', '' ,get_class($this));
            }

            if (isset(Yii::app()->theme))
            {
               $this->image = Yii::app()->theme->baseUrl . '/images/';
            }
            else
            {
                  $this->image = Yii::app()->baseUrl . '/images/';
           }

    }

    public function loadSettings() {

        // If the langauge is set then set the application
        // Language appropriatly
        if( ( isset($_GET['lang']) && in_array( $_GET['lang'], array_keys(Yii::app()->params['languages']) ) ) )
        {
            Yii::app()->setLanguage( $_GET['lang'] );
        }

        // Convert application name
        Yii::app()->name = Yii::app()->settings->applicationName != '' ? Yii::app()->settings->applicationName : Yii::app()->name;

        // Other settings
        if( count( Yii::app()->params ) )
        {
            foreach( Yii::app()->params as $key => $value )
            {
                // Skip the ones that does not exists
                if( !Yii::app()->settings->$key )
                {
                    continue;
                }

                // Add them anyways
                Yii::app()->params[ $key ] = Yii::app()->settings->$key != '' ? Yii::app()->settings->$key : Yii::app()->params[ $key ];
            }
        }

        // Convert settings into params
        if( count( Yii::app()->settings->settings ) )
        {
            foreach(Yii::app()->settings->settings as $settingKey => $settingValue)
            {
                Yii::app()->params[ $settingKey ] = $settingValue;
            }
        }
    }
}