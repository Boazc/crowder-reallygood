<?php
/**
 * Index controller Home page
 */
class StartupController extends SiteBaseController {
    public $topTitle;

    /**
	 * Controller constructor
	 */
    public function init()
    {
        if (Yii::app()->user->isGuest)
        {
            $this->redirect(Yii::app()->createAbsoluteUrl('/login'));
        }

        $this->defaultAction = 'index';
        $this->layout = '/layouts/setting/index';

        parent::init();
    }

    /**
     * New action - for new startup sugestion
     */
    public function actionNew()
    {
        $page = $this->getPage('add_startup');
        $this->renderPartial('/custompages/head',array( 'model' => $page));

        $model = new Startup();

        if(isset($_POST['Startup']))
        {
            $model->attributes=$_POST['Startup'];

            if ($model->site == 'http://')
            {
                $model->site = '';
            }

            if (!$model->validate())
            {
                vModel::printErors($model);
            }
            else
            {
                $model->user_created = Yii::app()->user->id;
                $model->is_active = false;

                // save in DB
                $model->save();

                echo '<div id="success">'. Yii::t('startup', 'Data saved successfuly') . '</div>
                    <script type="text/javascript">
                        $("#startupForm").slideToggle();
                    </script> ';
            }
            die();
        }

        if ($model->site == '')
        {
            $model->site = 'http://';
        }

        $this->render('new', array('model' =>$model,'page' => $page));
    }

    public function actionView($alias)
    {
        $model = Startup::model()->with('category')->find(array('condition' => 't.alias=:alias',
        'params' => array(':alias' => $alias),
        ));

        if ($model)
        {
            $this->render('view', array('model' =>$model));
       }
    }
}
?>