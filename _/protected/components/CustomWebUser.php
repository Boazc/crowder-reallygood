<?php
/**
 * Custom user class
 */
class CustomWebUser extends CWebUser
{
    const LOGIN_SCENARIO = 1;
    const SIGNUP_SCENARIO = 0;

	/**
	 * @var object
	 */
	private $_model = null;
	
	/**
	 * This is here since there is a bug with cookies
	 * that have been saved to a domain name such as
	 * .domain.com so all subdomains can access it as well
	 * @see http://code.google.com/p/yii/issues/detail?id=856
	 */
   public function logout($destroySession = true)
   {
      if ($this->allowAutoLogin && isset($this->identityCookie['domain']))
       {
         $cookies = Yii::app()->getRequest()->getCookies();

         if (null !== ($cookie = $cookies[$this->getStateKeyPrefix()]))
         {
            $originalCookie = new CHttpCookie($cookie->name, $cookie->value);
            $cookie->domain = $this->identityCookie['domain'];
            $cookies->remove($this->getStateKeyPrefix());
            $cookies->add($originalCookie->name, $originalCookie);
         }

		// Remove Roles
		$assigned_roles = Yii::app()->authManager->getRoles(Yii::app()->user->id);
		if(!empty($assigned_roles))
        {
          $auth=Yii::app()->authManager;
          foreach($assigned_roles as $n=>$role)
          {
              if($auth->revoke($n,Yii::app()->user->id))
              Yii::app()->authManager->save();
          }
      	}                
      }         
                
      parent::logout($destroySession);
   }

	/**
	 * @return string - User role
	 */
    public function getRole() {
        if($user = $this->getModel()){

            return $user->role;
        }
    }

	/**
	 * @return object - Members AR Object
	 */
    public  function getModel($full = false){
        if (!$this->isGuest && $this->_model === null){
            $this->_model = Member::model()->findByPk($this->id,
                $full ? array() :array('select' => 'role,email, fbuid, first_name, last_name'));
        }
        if ($this->_model === null)
        {
            $this->logout(true);
        }
        return $this->_model;
    }

}