<?php
/**
 * Register form model
 */
class RegisterForm extends CFormModel
{
	/**
	 * @var string - username
	 */
    public $name;
    
	/**
	 * @var string - password
	 */
	public $password;
	
	/**
	 * @var string - password2
	 */
	public $password2;
    
	/**
	 * @var string - email
	 */
	public $email;

	/**
	 * @var string - captcha
	 */
	public $verifyCode;

      /**
       * @var string - username
       */
      public $mainCategory;

      /**
       * @var string - username
       */
      public $price;
	/**
	 *    table data rules
	 *
	 * @return array
	 */
	public function rules()
	{
		return array(
			//array('username', 'match', 'allowEmpty' => false, 'pattern' => '/[A-Za-z0-9\x80-\xFF]+$/' ),
			array('email', 'email'),
			array('email', 'unique', 'className' => 'Member' ),
			array('email, password, name', 'required'),
			array('name, password', 'length', 'min' => 5, 'max' => 32),
            array('mainCategory, price','safe'),
			//array('password2', 'compare', 'compareAttribute'=>'password'),
			array('email', 'length', 'min' => 3, 'max' => 55),
		    //	array('verifyCode', 'captcha'),
		);
	}
	
	/**
	 * Attribute values
	 *
	 * @return array
	 */
	public function attributeLabels()
	{
		return array(
			'name' => Yii::t('members', 'Full Name'),
			'email' => Yii::t('members', 'Email'),
			'password' => Yii::t('members', 'Password'),
			//'password2' => Yii::t('members', 'Password Confirmation'),
			//'verifyCode' => Yii::t('members', 'Security Code'),
		);
	}
	
}