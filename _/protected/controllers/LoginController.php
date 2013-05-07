<?php
/**
 * Login controller class 
 * Used for authenticate a member
 * 
 */
class LoginController extends SiteBaseController
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
			$this->redirect('index/index');
		}

		// Add page breadcrumb and title
		$this->pageTitle[] = Yii::t('global', 'Login');
		$this->breadcrumbs[ Yii::t('global', 'Login') ] = array('login/index');
		
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
	 * Login action
	 */
	public function actionIndex()
	{
		$model = new LoginForm;

        // if it is ajax validation request
        if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
        {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }

		if( isset($_POST['LoginForm']) )
		{
			$model->attributes = $_POST['LoginForm'];
			if( $model->validate() )
			{
				// Login
				$identity = new InternalIdentity($model->email, $model->password);
                if($identity->authenticate())
				{
					// Member authenticated, Login
					Yii::app()->user->setFlash('success', Yii::t('login', 'Thanks. You are now logged in.'));
					Yii::app()->user->login($identity, (Yii::app()->params['loggedInDays'] * 60 * 60 * 24 ));

                    if (Yii::app()->user->returnUrl)
                    {
                        $this->redirect(Yii::app()->user->returnUrl);
                    }
                    else
                    {
                        $this->redirect('index/index');
                    }
                }

				// Redirect
				$this->render('/index');
			}
		}

            $this->render('index', array('model'=>$model));
	}
	
	/**
	 * Facebook login page
	 */
    public function actionFacebookLogin()
	{
		if (!isset($_GET['scenario']))
        {
            throw new CHttpException(404, Yii::t('error', 'Sorry, No scenario user connect detect.'));
        }

		// Load facebook
		Yii::import('ext.facebook.Facebook');
		$facebook = new Facebook(array(
            'appId' => Yii::app()->params['facebookappid'],
            'secret' => Yii::app()->params['facebookapisecret'],
            'cookie' => true,
            'disableSSLCheck' => false ));
        Facebook::$CURL_OPTS[CURLOPT_CAINFO] = Yii::getPathOfAlias('ext.facebook') . '/fb_ca_chain_bundle.crt';

        // Token ?
        /*
        // Get code from request for access_token
        $code = $_REQUEST["code"];

        if(empty($code)) {
            // Redirect to Login Dialog
            $this->render('facebookdone', array( 'link' => Yii::app()->createAbsoluteUrl('/register', array( 'lang' => false ) ) ) );
        }
        else {

            // Get the token
             $token_url = "https://graph.facebook.com/oauth/access_token?"
                . "client_id=" . $facebook->getAppId() . "&redirect_uri=" . urlencode(Yii::app()->createAbsoluteUrl('/login/facebooklogin'))
                . "&client_secret=" .$facebook->getApiSecret() . "&code=" . $code;

            $response = file_get_contents($token_url);
            $params = null;
            parse_str($response, $params);

            $_SESSION['access_token'] = $params['access_token'];

            $graph_url = "https://graph.facebook.com/me?access_token="
                . $params['access_token'];

            $user = json_decode(file_get_contents($graph_url));
            echo("Hello " . $user->name);
            die();
        }
        */

        $user = $facebook->getUser();

        if ($user) {
            try {
                // Proceed knowing you have a logged in user who's authenticated.
	    		$info = array( 'id' => 0, 'email' => '' );

                //$info = $facebook->api("/me?access_token=" . $params['access_token']);
                $info = $facebook->api("/me");

                //$info = $facebook->getInfo(null, array('access_token'=>$session['access_token']));
                // Authenticate
                $identity = new facebookIdentity($info['id'], $info['email']);
                $auth = $identity->authenticate($_GET['scenario']);

                // What did we discover?
                if( $identity->errorCode == facebookIdentity::NO_FACEBOOK_USER )
                {
                    Yii::app()->user->setFlash('attention', Yii::t('login', 'You are not facebook registered user.'));
                    $this->render('facebookdone', array( 'link' => Yii::app()->createAbsoluteUrl('/register', array( 'lang' => false ) ) ) );
                }
                else if( $identity->errorCode == facebookIdentity::USER_FBEMAIL_IN_USE)
                {
                    // Update member acount with is facebook id
                    $user = Member::model()->find(array(
                        'select' => 'email',
                        'condition' => 'email=:email',
                        'params' => array(':email'=>$info['email'])
                    ));

                    $user->fbuid = $info['id'];
                    $user->update();

                    // Authenticate again for states
                    $identity = new facebookIdentity($info['id'], $info['email']);
                    $auth = $identity->authenticate($_GET['scenario']);

                    // We got through save the a new token
                    Yii::app()->user->login($identity, (Yii::app()->params['loggedInDays'] * 60 * 60 * 24 ));
                   // Member::model()->updateByPk( $identity->getId(), array( 'fbtoken' => $_SESSION['access_token'] ) );
                    Yii::app()->user->setFlash( 'success', Yii::t('login', 'Thank You for conntection Facebook acount to your crowder acount. You are now logged in.') );
                    $this->render('facebookdone', array( 'link' => Yii::app()->createAbsoluteUrl('/index', array( 'lang' => false ) ) ) );
                }
                else if( $identity->errorCode == facebookIdentity::NEW_FACEBOOK_USER )
                {
                    // Create new user
                    $user = new Member();
                    $user->fbuid = $info['id'];
                    $user->username =  isset($info['username']) ? $info['username'] : $info['id'];
                    $user->email = $info['email'];
                    $user->first_name= isset($info['first_name']) ?$info['first_name'] : 'none';
                    $user->last_name  = isset($info['last_name']) ? $info['last_name'] : 'none';
                    $user->scenario = 'facebookRegister';
                    $user->role = 'member';

                        $mes ='Errors:';
                       if ( !$user->save() )
                       {
                           throw new  CException( 'User was not save!' . $user->getMyErrors());
                       }

                        $profile = new Profile();
                        $profile->id = $user->id;
                        $profile->price_invest = isset($_GET['price_invest']) ? $_GET['price_invest'] : 2000 ;
                        $profile->main_cat_id =isset ($_GET['invest_cat']) ? $_GET['invest_cat'] : 1;
                        if (!$profile->save())
                        {
                            throw new  CException( 'User Profile was not save!' . $profile->getMyErrors());
                        }

                        // Authenticate again for states
                        $identity = new facebookIdentity($info['id'], $info['email']);
                        $auth = $identity->authenticate($_GET['scenario']);

                        // We got through save the a new token
                        Yii::app()->user->login($identity, (Yii::app()->params['loggedInDays'] * 60 * 60 * 24 ));
       //                 Member::model()->updateByPk( $identity->getId(), array( 'fbtoken' => $_SESSION['access_token'] ) );
                        Yii::app()->user->setFlash( 'success', Yii::t('login', 'Thank You for registeration. You are now logged in.') );
                        $this->render('facebookdone', array( 'link' => Yii::app()->createAbsoluteUrl('/info/index', array( 'lang' => false ) ) ) );
                }
                else if( $identity->errorCode == facebookIdentity::ERROR_NONE)
                {
                // We got through save the a new token
				Yii::app()->user->login($identity, (Yii::app()->params['loggedInDays'] * 60 * 60 * 24 ));
				//Member::model()->updateByPk( $identity->getId(), array( 'fbtoken' => $_SESSION['access_token'] ) );
				Yii::app()->user->setFlash( 'success', Yii::t('login', 'Thank You. You are now logged in.') );
               $this->render('facebookdone', array( 'link' => Yii::app()->createAbsoluteUrl('/index') ));
            }
            }
            catch (FacebookApiException $e) {
                    error_log($e);
                    $user = null;
                }
        }
		else
		{
			$this->redirect(Yii::app()->createAbsoluteUrl('/index') );
		}
	}
	
	/**
	 * Lost password screen
	 */
	public function actionLostPassword()
	{	
		$model = new LostPasswordForm;
		
		if(isset($_POST['LostPasswordForm']))
	    {
	        $model->attributes=$_POST['LostPasswordForm'];
	        if($model->validate())
			{					
				// Grab the member data
				$member = Member::model()->findByAttributes(array('email' => $model->email));
	
				// Create secret reset link
				$random = $member->hashPassword( $member->email . $member->username , microtime(true) );
				$link = $this->createAbsoluteUrl('/login/reset', array( 'q' => $random, 'lang' => false ));
				
				$message = Yii::t('login', "Dear {username},<br /><br />You've asked a reset for your password.<br /><br /> 
											Please click the link below in order to perform the reset and get a new password emailed to you.<br /><br />
											The reset link is:<br /><br />
											----------------------<br />
											{link}<br />
											----------------------<br /><br /><br />
											<em>If you did not request this reset then please ignore this email.</em>",
											array( '{username}' => $member->username, '{link}' => $link ));
											
				$message .= Yii::t('global', '<br /><br />----------------<br />Regards,<br />The {team} Team.<br />', array('{team}'=>Yii::app()->name));							
				
				$email = Yii::app()->email;
				$email->subject = Yii::t('login', 'Password Reset Request');
				$email->to = $member->email;
				$email->from = Yii::app()->params['emailin'];
				$email->replyTo = Yii::app()->params['emailout'];
				$email->message = $message;
				$email->send();
				
				// Save the key for this member
				$member->passwordreset = $random;
				
				$member->update();
				
				Yii::app()->user->setFlash('success', Yii::t('login', 'Thank You. Check your email for the password reset link.'));
				$model = new LostPasswordForm();
			}
	    }
	
		// Add page breadcrumb and title
		$this->pageTitle[] = Yii::t('login', 'Lost Password');
		$this->breadcrumbs[ Yii::t('login', 'Lost Password') ] = '';
		
		$this->render('lostpassword', array( 'model' => $model ));
	}
	
	/**
	 * Check the var in the password form and if it is ok 
	 * then reset the password and email the member the new one.
	 */
	public function actionReset()
	{
		$q = Yii::app()->format->text( $_GET['q'] );
		
		// Search for this in the DB
		$member = Member::model()->findByAttributes(array('passwordreset'=>$q));
		
		if( !$member )
		{
			Yii::app()->user->setFlash('error', Yii::t('login', 'Sorry, Nothing was found for that reset link.'));
        	$this->redirect('index/index');
		}
		
		// We matched so now reset the reset link,
		// Create a new password and save it for that member
		// Email and redirect
		
		// Create secret reset link
		$password = $member->generatePassword(5, 10);
		$hashedPassword = $member->hashPassword( $password, $member->email );
		
		$message = Yii::t('login', "Dear {username},<br /><br />
									We have reseted your password successfully.<br /><br />
									You new password is: <b>{password}</b><br />",
									array( '{username}' => $member->username, '{password}' => $password ));
									
		$message .= Yii::t('global', '<br /><br />----------------<br />Regards,<br />The {team} Team.<br />', array('{team}'=>Yii::app()->name));							
		
		$email = Yii::app()->email;
		$email->subject = Yii::t('login', 'Password Reset Completed');
		$email->to = $member->email;
		$email->from = Yii::app()->params['emailin'];
		$email->replyTo = Yii::app()->params['emailout'];
		$email->message = $message;
		$email->send();
		
		// Save the key for this member
		$member->passwordreset = '';
		$member->password = $hashedPassword;
		$member->scenario = 'lostpassword';
		
		$member->save();
		
		Yii::app()->user->setFlash('success', Yii::t('login', 'Thank You. Your password was reset. Please check your email for you new generated password.'));
    	$this->redirect('index/index');
	}

}