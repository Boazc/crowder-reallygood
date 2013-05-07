<?php
/**
 * Register controller class
 */
class RegisterController extends SiteBaseController
{
	/**
	 * Controller constructor
	 */
	public function init()
	{
        $this->layout = '/layouts/index';

		// Do not allow logged in users here
		if( Yii::app()->user->id )
		{
			$this->redirect('index');
		}
		
		// Add page breadcrumb and title
		$this->pageTitle[] = Yii::t('global', 'Register');
		$this->breadcrumbs[ Yii::t('global', 'Register') ] = "";
		
		parent::init();
	}
	
	/**
	 * List of available actions
	 */
	public function actions()
	{
	   return array(
	      'captcha' => array(
	         'class' => 'CCaptchaAction',
	         'backColor' => 0xFFFFFF,
		     'minLength' => 3,
		     'maxLength' => 7,
			 'testLimit' => 3,
			 'padding' => array_rand( range( 2, 10 ) ),
	      ),
	   );
	}
	
	/**
	 * Register action
	 */
	public function actionIndex()
	{
		$model = new RegisterForm;

        // if it is ajax validation request
        if(isset($_POST['ajax']) && $_POST['ajax']==='register-form')
        {
              echo CActiveForm::validate($model);
              Yii::app()->end();
        }

		if( isset($_POST['RegisterForm']) )
		{
			$model->attributes = $_POST['RegisterForm'];
			if( $model->validate() )
			{
				// Save the member and redirect
				$user = new Member;
				$user->scenario = 'create';
				$user->role = 'member';
				$user->attributes = $_POST['RegisterForm'];

                // Set first name
                $fullName = $_POST['RegisterForm']['name'];
                $arr = explode(' ',trim($fullName));
                $user->first_name = $arr[0];

                // Get last name
                foreach ($arr as $k => $v) {
                      if ($k < 1) continue;
                      $user->last_name .= $v . " ";
                }
                $user->last_name = trim($user->last_name);

                // Set username
                $user->username = Yii::app()->func->makeAlias( $user->first_name ."." . $user->last_name);

                // Check if username exist
                if (!$user->validate(array('username')))
                {
                    $digits = 2;
                    $rand = str_pad(rand(0, pow(10, $digits)-1), $digits, '0', STR_PAD_LEFT);

                    $user->username = Yii::app()->func->makeAlias( $user->first_name ."." . $user->last_name .'.' . $rand );
                }

                // Save user
				if ($user->validate())
                {
                    $user->save();
                }
                else
                {
                    throw new  CException( 'User was not save!' . $user->getMyErrors());
                }

                // Add profile
                $profile = new Profile();
                $profile->id = $user->id;
                $profile->price_invest = $model->price;
                $profile->main_cat_id = $model->mainCategory;

                $profile->save(false);

                // Force login
                $identity = new InternalIdentity($model->email, $model->password);
                $identity->authenticate();
                Yii::app()->user->login($identity, (Yii::app()->params['loggedInDays'] * 60 * 60 * 24 ));

                // Redirect
                Yii::app()->user->setFlash('success', Yii::t('register', 'Registration Completed. Please sign in.'));
                $this->redirect($this->createUrl('/info/index'));
            }
		}
		
		$this->render('registerForm', array('model'=>$model));
	}

}