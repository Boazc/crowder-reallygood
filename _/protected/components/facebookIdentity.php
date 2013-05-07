<?php
/**
 * facebook Identity Class
 * Basically verifies a member by his facebook user id
 * 
 * 
 */
class facebookIdentity extends CBaseUserIdentity
{
      const NO_FACEBOOK_USER=1;
      const NEW_FACEBOOK_USER=3;
      const USER_FBEMAIL_IN_USE=4;

	/**
	 * @var int unique member id
	 */
    private $_id;

	protected $fbuid;
	protected $fbemail;

	/**
	 * Initiate the class
	 */
	public function __construct( $fbuid, $fbemail )
	{
		$this->fbuid = $fbuid;
		$this->fbemail = $fbemail;
	}

	/**
	 * Authenticate a member
	 *
	 * @return int value greater then 0 means an error occurred 
	 */
    public function authenticate($scenario = CustomWebUser::LOGIN_SCENARIO )
    {
        $record=Member::model()->find('fbuid=:fbuid', array(':fbuid'=>$this->fbuid));

        if($record===null)
       {
           $userNormalRegister =Member::model()->find('email=:email', array(':email'=>$this->fbemail));

           // There is no user with mail and fbuid
           if ($userNormalRegister === null)
           {
               if ($scenario == CustomWebUser::SIGNUP_SCENARIO)
               {
                   $this->errorCode=self::NEW_FACEBOOK_USER;
               }
               else if ($scenario == CustomWebUser::LOGIN_SCENARIO)
               {
                    $this->errorCode = self::NO_FACEBOOK_USER;
               }
          }
           else // there is normalRegisteration with this mail
           {
               $this->errorCode = self::USER_FBEMAIL_IN_USE;
           }
       }
        else
        {
            $this->_id = $record->id;

	        $auth=Yii::app()->authManager;
            if(!$auth->isAssigned($record->role,$this->_id))
            {
                if($auth->assign($record->role,$this->_id))
                {
                    Yii::app()->authManager->save();
                }
            }
			
			// We add username to the state 
            $this->setState('name', $record->getFullName());
            $this->setState('username', $record->username);
            $this->setState('email', $record->email);
            $this->setState('role', $record->role);
            $this->errorCode = self::ERROR_NONE;
        }

        return !$this->errorCode;
    }
 
	/**
	 * @return int unique member id
	 */
    public function getId()
    {
        return $this->_id;
    }
}