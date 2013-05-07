<?php
/**
 * Index controller Home page
 */
class InfoController extends SiteBaseController {
    public $menuRender;
    public $topTitle;
    public $defualtIndexPage = 'overview';
    /**
	 * Controller constructor
	 */
    public function init()
    {
        $this->menuRender ='/info/_manu';
        $this->defaultAction = 'index';
        $this->layout = '/layouts/setting/index';

        $this->topTitle = Yii::t('info' ,'Information Center');
        parent::init();
    }

    public function actionIndex($alias)
    {
        if ($alias == 'index')
        {
             $alias = $this->defualtIndexPage;
            //throw new CHttpException(404, Yii::t('error', 'Sorry, The page you were looking for was not found.'));
        }

        $model= $this->getPage($alias);

        $this->render('index', array('model' =>$model));
    }

}