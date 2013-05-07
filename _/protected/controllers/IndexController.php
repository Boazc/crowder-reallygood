<?php
/**
 * Index controller Home page
 */
class IndexController extends SiteBaseController {
	/**
	 * Controller constructor
	 */
    public function init()
    {
        $this->layout = '/layouts/index';
        $this->defaultAction = 'index';

        parent::init();
    }

	/**
	 * Index action
	 */
    public function actionindex()
    {
        $this->render('index');
    }

    public function actionSubscriber()
    {
        // New subscriber form
        $model = new Newsletter;

        if( isset($_POST['Newsletter']) )
        {
            $model->attributes = $_POST['Newsletter'];

            if (!$model->validate())
            {
                vModel::printErors($model);
                die();
            }

            vModel::savePrintSuccess($model,Yii::t('subscribe', 'פרטי מייל נשמרו במערכת'));
            die();
        }
    }
}