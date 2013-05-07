<?php
/**
 * error controller Home page
 */
class ErrorController extends SiteBaseController {
    public $topTitle;

    /**
	 * init
	 */
	public function init()
	{
		parent::init();
        $this->defaultAction = 'error';
        $this->layout = '/layouts/setting/index';

        $this->topTitle = Yii::t('error', 'Error');

        $this->breadcrumbs[ Yii::t('error', 'Error') ] = array('/index');
		$this->pageTitle[] = Yii::t('error', 'Error'); 
	}
	/**
	 * Index action
	 */
    public function actionError() {
		$error = Yii::app()->errorHandler->error;
        $this->render('error', array('error'=>$error));
    }

    public function actionAdmin() {
            throw new CHttpException(null,Yii::t('error', 'Sorry, You are not allowed to enter this section.') );
    }
}