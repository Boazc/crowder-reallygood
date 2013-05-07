<?php
/**
 * Admin base controller class
 */
class AdminBaseController extends Controller {
	
	/**
	 * admins breadcrumbs
	 */
	public $breadcrumbs = array();
	
    /**
     * Class constructor
     *
     */
    public function init() {
        $this->layout='/layouts/column2';

		// Add default page title which is the application name
        $this->pageTitle[] = Yii::t('global', Yii::app()->name);
		$this->pageTitle[] = Yii::t('global', 'Admin');
		
		// By default we register the robots to 'none'
        Yii::app()->clientScript->registerMetaTag( 'noindex, nofollow', 'robots' );

		// We add a meta 'language' tag based on the currently viewed language
		Yii::app()->clientScript->registerMetaTag( Yii::app()->language, 'language', 'content-language' );

		// Make sure we have access
		if(  Yii::app()->user->isGuest )
        {
            $this->redirect(Yii::app()->createAbsoluteUrl('/login'));
        }

        if(Yii::app()->authManager->checkAccess("op_acp_access", Yii::app()->user->id) == false)
        {
            $this->redirect(Yii::app()->createAbsoluteUrl('error/admin'));
		}
        /* Run init */
        parent::init();
    }
}