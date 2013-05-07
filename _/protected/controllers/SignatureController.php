<?php
/**
 * Index controller Home page
 */
class SignatureController extends SiteBaseController {

    /**
	 * Controller constructor
	 */
    public function init()
    {
        $this->defaultAction = 'view';
        $this->layout = '/layouts/noContainer/index';

        parent::init();
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
            $user = Member::model()->find(array('select' => 'id, fbuid,username,first_name' ,'condition'=>'username = :username', 'params' => array( ':username' => $username)));
            if (!$user)
            {
                throw new  CHttpException(Yii::t('exception', 'Username signature was not found'));
            }
            else
            {
                // Get profile
                $profile = Profile::model()->findByPk($user->id, array('select' => 'id, price_invest' ,
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