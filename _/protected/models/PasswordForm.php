<?php
/**
 * Register form model
 */
class PasswordForm extends CFormModel
{
    /**
     * @var string - oldPassword
     */
    public $oldPassword;

    /**
     * @var string - password
     */
    public $password;

    /**
     * @var string - password2
     */
    public $password2;
    /**
     * @var string - captcha
     */
    public $verifyCode;
    public $removeFacebook;


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
            array(' password2, password', 'required'),
            array('password2', 'compare', 'compareAttribute'=>'password'),
            array('oldPassword', 'checkOldPassword'),
            array('removeFacebook', 'boolean'),

            //	array('verifyCode', 'captcha'),
        );
    }

    public function checkOldPassword()
    {
        $user = Yii::app()->user->getModel(true);

        if ($user->password && count($this->getErrors()) == 0 )
        {
            $identity = new InternalIdentity($user->email, $this->oldPassword);
            if(!$identity->authenticate())
            {
                $this->addError('oldPassword', Yii::t('changePass', 'Old password is not correct.'));
            }
        }
    }

    /**
     * Attribute values
     *
     * @return array
     */
    public function attributeLabels()
    {
        return array(
            'oldPassword' => Yii::t('members', 'Old Password'),
            'password' => Yii::t('members', 'Password'),
            'password2' => Yii::t('members', 'Password Confirmation'),
            'removeFacebook' => Yii::t('password', 'If you want to remove check it and put new password'),
            //'verifyCode' => Yii::t('members', 'Security Code'),
        );
    }

}