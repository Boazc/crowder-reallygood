<?php
/**
 * Logout controller class 
 * 
 */
class LogoutController extends SiteBaseController
{
	/**
	 * Controller constructor
	 */
	public function init()
	{
		// Guests are not allowed
		if( Yii::app()->user->isGuest )
		{
			$this->redirect('index', true);
		}
		
		parent::init();
	}
	
	/**
	 * Logout action
	 */
	public function actionindex()
	{
		Yii::app()->user->logout(true);
		Yii::app()->user->setFlash('success', Yii::t('Member', 'You are now logged out.'));
		$this->redirect('index', true);
	}
}