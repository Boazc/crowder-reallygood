<?php
/**
 * Index controller Home page
 */
class SettingController extends SiteBaseController {
    public $menuRender;
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

        $this->topTitle = Yii::t('sideManuP','Settings');
        $this->menuRender ='/setting/_manu';
         $this->defaultAction = 'acount';
        $this->layout = '/layouts/setting/index';

        parent::init();
    }


    /**
     * Index action
     */
    public function actionPassword()
    {
        $model= new PasswordForm();

        if(isset($_POST['PasswordForm']))
        {
            $model->attributes=$_POST['PasswordForm'];

            if (!$model->validate())
            {
                vModel::printErors($model);
            }
            else
            {
                $user = Yii::app()->user->getModel(true);
                $user->password = $model->password;
                $user->scenario = 'update';

                if ($model->removeFacebook)
                {
                     $user->fbuid = "";
                    $user->fbtoken = "";
                }

                // save in DB
                $user->save();

                echo '<div id="success">'. Yii::t('setting', 'Password updated successfuly') . '</div>';
            }
            die();
        }

        $this->render('password', array('model' =>$model,'user' => Yii::app()->user->getModel(false)));
    }

	/**
	 * Index action
	 */
    public function actionAcount()
    {
        $model= Yii::app()->user->getModel(true);
        $model->scenario = 'acount';
        if(isset($_POST['Member']))
        {
            $model->attributes=$_POST['Member'];

            // remove pass
            $model->currentPass = $model->password;
            $model->password = '';

            if (!$model->validate())
            {
                vModel::printErors($model);
            }
            else
            {
                // save in DB
                $model->update();

                echo '<div id="success">'. Yii::t('setting', 'Data saved successfuly') . '</div>';
            }
            die();
        }

        $this->render('acount', array('model' =>$model));
    }


    /**
     * Index action
     */
    public function actionProfile()
    {
        $model= Profile::model()->findByPk(Yii::app()->user->id,
            array('select' => 'id, website, about_me_update, price_invest, main_cat_id'));

        if(isset($_POST['Profile']))
        {
            $model->attributes=$_POST['Profile'];

            if ( $model->website == "http://")
            {
                $model->website = "";
            }
            if (!$model->validate())
            {
                vModel::printErors($model);
            }
            else
            {
                // save in DB
                $model->save();

                if (isset($_POST['categoriesSelected']))
                {
                    // Update store categories
                    $model->updateCategories($_POST['categoriesSelected']);
                }
                else
                {
                    $model->updateCategories(null);
                }

                $file = CUploadedFile::getInstance($model, 'image');
                if (is_object($file) && get_class($file)==='CUploadedFile')
                {
                    $user =  Member::model()->findByPk(Yii::app()->user->id, array('select' => 'id, use_fbpic'));
                    $user->use_fbpic = true;
                    $user->update();

                }
                if (!$model->website)
                {
                    $model->website = "http://";
                }
                $this->render('profile', array('model' =>$model, 'success' => true));
            }
            die();
        }

        if (!isset($model->website))
        {
            $model->website = "http://";
        }
        $this->render('profile', array('model' =>$model));
    }

    public function actionNotification()
    {
        $model= Profile::model()->findByPk(Yii::app()->user->id,
            array('select' => 'id, email_me_meessage, email_me_startups'));

        if(isset($_POST['Profile']))
        {
            $model->attributes=$_POST['Profile'];

            if (!$model->validate())
            {
                vModel::printErors($model);
            }
            else
            {
                // save in DB
                $model->update();

                echo '<div id="success">'. Yii::t('setting', 'Data saved successfuly') . '</div>';
            }
            die();
        }

        $this->render('notification', array('model' =>$model));
    }


    public function actionCertification()
    {
        $this->render('certification');
    }

    public function actionSocial()
    {
        $model= Profile::model()->findByPk(Yii::app()->user->id,
            array('select' => 'id, facebook_show,linkedin_show,twitter_show ,linkedin_uid, twitter_uid '));

        if(isset($_POST['Profile']))
        {
            $model->attributes=$_POST['Profile'];

            if (!$model->validate())
            {
                vModel::printErors($model);
            }
            else
            {
                // save in DB
                $model->update();

                echo '<div id="success">'. Yii::t('setting', 'Data saved successfuly') . '</div>';
            }
            die();
        }

        $this->render('social', array('model' =>$model));
    }



}