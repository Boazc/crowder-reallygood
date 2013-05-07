<?php
/**
 * Index controller Home page
 */
class ProfileController extends SiteBaseController {


    /**
     * Controller constructor
     */
    public function init()
    {
        $this->defaultAction = 'view';
        $this->layout = '/layouts/internal/index';

        parent::init();
    }

    public function actionMy()
    {
        if (Yii::app()->user->username)
        {
            $this->actionView(urldecode(Yii::app()->user->username));
        }
        else
        {
            throw new  CHttpException(Yii::t('exception', 'Username was not declared'));
        }

    }

    /**
     * Index action
     */
    public function actionView($username)
    {
        if (!$username)
        {
            throw new  CHttpException(Yii::t('exception', 'Username was not declared'));
        }
        else
        {
            $username = urlencode($username);

            $user = Member::model()->find(array('select' => 'id, fbuid,username,first_name, last_name' ,
                                                                                    'condition'=>'username = :username',
                                                                                    'params' => array( ':username' => $username)));
            if (!$user)
            {
                throw new  CHttpException(Yii::t('exception', 'Username signature was not found'));
            }
            else
            {
                // Get profile
                $profile = Profile::model()->findByPk($user->id, array('select' => 'id, about_me_update, price_invest, website' ,
                    'with' => array(
                        'mainCategory' => array('select' => 'id, name, price_sum,funders_amount')
                    )));

                if (!$profile)
                {
                    throw new  CHttpException(Yii::t('exception', 'Profile was not set to user'));
                }
                else
                {
                    $this->render('view', array('profile'=>$profile, 'user' => $user));
                }
            }
        }
    }



}