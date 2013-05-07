<?php

/**
 * This is the model class for table "{{members}}".
 *
 * The followings are the available columns in table '{{members}}':
 * @property integer $id
 * @property string $username
 * @property string $email
 * @property string $password
 * @property string $first_name
 * @property string $last_name
 * @property string $date_modified
 * @property string $date_created
 * @property string $passwordreset
 * @property string $data
 * @property string $role
 * @property string $ipaddress
 * @property integer $fbuid
 * @property string $fbtoken
 */
class Member extends myActiveRecord
{
     public $currentPass;

      /**
       * Default member groups
       */
      const ROLE_ADMIN = 'admin';
      const ROLE_MOD = 'moderator';
      const ROLE_USER = 'user';
      const ROLE_BANNED = 'banned';
      const ROLE_GUEST = 'guest';

    public function init()
    {
        parent::init();

        // Image settings
        //$this->multiImages = true;
        $this->hasImage = true;

        // Meta Seetings
        $this->hasMeta = false;
    }

	/**
	 * Returns the static model of the specified AR class.
	 * @return Member the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{members}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
        return array_merge(
            parent::rules(),
            array(
                array('email, role, first_name, username', 'required'),
                array('email', 'email'),
                array('email, username', 'unique'),
                array('email', 'checkUniqueEmailUpdate'),
                array('username', 'checkUniqueUserUpdate'),
                array('username', 'length', 'min' => 3, 'max' => 250),
                array(' password', 'length', 'min' => 3, 'max' => 40),
                array('email', 'length', 'min' => 3, 'max' => 55),
                 array('role', 'checkRole'),
                 array('email, first_name, last_name', 'length', 'max'=>155),
                // The following rule is used by search().
                // Please remove those attributes that should not be searched.
                array('id, username, email, password, first_name, last_name, date_modified, date_created, passwordreset, data, role, ipaddress, fbuid, fbtoken', 'safe', 'on'=>'search'),
                array('unique, id, password,  date_modified, date_created, passwordreset, data, role, ipaddress, fbuid, fbtoken', 'unsafe', 'on'=>'acount'),
          )
        );
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
            'profile'=>array(self::HAS_ONE, 'Profile', 'id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
        return array_merge(
            parent::attributeLabels(),
            array(
                'id' => Yii::t('st','ID'),
                'username' => Yii::t('st','Username'),
                'email' => Yii::t('st','Email'),
                'password' => Yii::t('st','Password'),
                'first_name' => Yii::t('st','First Name'),
                'last_name' => Yii::t('st','Last Name'),
                'date_modified' => Yii::t('st','Date Modified'),
                'date_created' => Yii::t('st','Date Created'),
                'passwordreset' => Yii::t('st','Passwordreset'),
                'data' => Yii::t('st','Data'),
                'role' => Yii::t('st','Role'),
                'ipaddress' => Yii::t('st','Ipaddress'),
                'fbuid' => Yii::t('st','Fbuid'),
                'fbtoken' => Yii::t('st','Fbtoken'),
		    )
        );
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('username',$this->username,true);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('password',$this->password,true);
		$criteria->compare('first_name',$this->first_name,true);
		$criteria->compare('last_name',$this->last_name,true);
		$criteria->compare('date_modified',$this->date_modified,true);
		$criteria->compare('date_created',$this->date_created,true);
		$criteria->compare('passwordreset',$this->passwordreset,true);
		$criteria->compare('data',$this->data,true);
		$criteria->compare('role',$this->role,true);
		$criteria->compare('ipaddress',$this->ipaddress,true);
		$criteria->compare('fbuid',$this->fbuid);
		$criteria->compare('fbtoken',$this->fbtoken,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}


    /**
    * Check to make sure the role is valid
    */
    public function checkRole()
    {
        $roles = Yii::app()->authManager->getRoles();
        $_temp = array();
        if( count($roles) )
        {
              foreach( $roles as $role )
              {
                    $_temp[ $role->name ] = $role->name;
              }
        }

        if( !in_array($this->role, $_temp) )
        {
              $this->addError('role', Yii::t('adminMember', 'Please select a valid role.'));
        }
    }

    /**
    * Check that the email is unique
    */
    public function checkUniqueEmailUpdate()
    {
        if( $this->scenario == 'update' )
        {
              $user = Member::model()->exists('email=:email AND id!=:id', array(':email'=>$this->email, ':id'=>$this->id));
              if( $user )
              {
                    $this->addError('email', Yii::t('adminMember', 'Sorry, That email is already in use by another member.'));
              }
        }
    }
    /**
    * Check that the username is unique
    */
    public function checkUniqueUserUpdate()
    {
        if( $this->scenario == 'update' )
        {
              $user = Member::model()->exists('username=:username AND id!=:id', array(':username'=>$this->username, ':id'=>$this->id));
              if( $user )
              {
                    $this->addError('username', Yii::t('adminMember', 'Sorry, That username is already in use by another member.'));
              }
        }
    }

    /**
    * Simple yet efficient way for password hashing
    */
    public function hashPassword( $password, $salt )
    {
        return sha1( md5($salt) . $password );
    }

    /**
    * Generate a random readable password
    */
    public function generatePassword($minLength=5, $maxLength=10)
    {
        $length=rand($minLength,$maxLength);

        $letters='bcdfghjklmnpqrstvwxyz';
        $vowels='aeiou';
        $code='';
        for($i=0;$i<$length;++$i)
        {
              if($i%2 && rand(0,10)>2 || !($i%2) && rand(0,10)>9)
                    $code.=$vowels[rand(0,4)];
              else
                    $code.=$letters[rand(0,20)];
        }

        return $code;
    }

    /**
    * Save date and password before saving
    */
    public function beforeValidate()
    {
        if( $this->isNewRecord )
        {
            $this->date_created = new CDbExpression('NOW()');
            $this->ipaddress = Functions::getIpAddress();

            // Add username if needed
            if ($this->username == "")
            {
                $digits = 2;
                $rand = str_pad(rand(0, pow(10, $digits)-1), $digits, '0', STR_PAD_LEFT);

                $this->username = Yii::app()->func->makeAlias( $this->first_name ."." . $this->last_name .'.' . $rand );
            }

        }
        else
        {
              $this->date_modified = new CDbExpression('NOW()');
        }

        // Default Pass
        if( $this->scenario == 'AdminRegister')
        {
            if ($this->password == '')
            {
                $this->password = 'Aa1234567';
            }
        }

        // Make an user name for none facebook registered
       if ( $this->scenario == 'acount')
       {
           if ($this->username)
            {
                $this->username = Yii::app()->func->makeAlias( $this->username);
            }
       }

        // Save data array as serialized string
        if( is_array( $this->data ) && count( $this->data ) )
        {
              $this->data = serialize( $this->data );
        }

        return parent::beforeValidate();
    }

    /**
     * Save date and password before saving
     */
    public function beforeSave()
    {
        if( $this->scenario  == 'lostpassword' || $this->scenario == 'register'  ||$this->scenario == 'create'  || $this->scenario == 'change' || $this->scenario == 'update'  || $this->scenario == 'acount' || $this->scenario == 'AdminRegister' )
        {
            // If its only facebook user not register
            if ($this->password)
            {
                if (!isset($this->unique) || $this->unique == '')
                {
                    $this->unique = md5(uniqid());
                }

                $this->password = $this->hashPassword( $this->password, $this->unique);
            }
            else if ($this->currentPass)
            {
                $this->password = $this->currentPass;
            }
        }

        return parent::beforeSave();

    }
    /**
    * @return integer
    */
    public function getId()
    {
        return $this->id;
    }

    /**
    * @return string
    */
    public function getUsername()
    {
        return $this->username;
    }

    /**
    * @return string
    */
    public function getEmail()
    {
        return $this->email;
    }

    /**
    * @return either string or hash
    */
    public function getPassword()
    {
        return $this->password;
    }

    /**
    * @return string
    */
    public function getJoined()
    {
        return Yii::app()->dateFormatter->formatDateTime( $this->date_created, 'short', '' );
    }

    /**
    * @return array
    */
    public function getMemberData()
    {
        return unserialize( $this->data );
    }

    /**
    * Get member profile links
    */
    public function getProfileLink()
    {
        return CHtml::link( urldecode($this->username), array('/profile/' . $this->username, 'lang'=>false ) );
    }

    public function getFullName()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function updateRoles()
    {
        $message = 'Role updated: ';

       // $message = $this->updateRole('Mentor', self::ROLE_MENTOR);
        //$message .= $this->updateRole('Entrepreneur', self::ROLE_ENTERP);
        //$message .= $this->updateRole('VcInvestor', self::ROLE_INVESTOR);

        return substr_replace( $message,"",-1);
    }

    public function updateRole($model, $auth)
    {
        // Check mentor
        $role =  $model::model()->find(array('condition' => 'id =' . $this->id, 'limit' => '1'));
        if (Yii::app()->authManager->checkAccess($auth, $this->id))
        {
            if ($role == null)
            {
                $role = new $model();
                $role->id = $this->id;
                $role->is_active = true;
                $role->is_visible = false;

                if ($role->save())
                {
                    return $model . ' added,';
                }
                else
                {
                    return $model . ' not added, problem ocured';
                }


            }
        }
        else
        {
            if ($role)
            {
                $role->is_active = false;
                $role->update();
                return $model . ' removed,';
            }
        }
    }

    public function getProfilePic($large = false)
    {
        if ($this->fbuid)
        {
            if ($large)
            {
                return  'https://graph.facebook.com/' .$this->fbuid .'/picture?type=large';
            }
            else
            {
                return  'https://graph.facebook.com/' .$this->fbuid .'/picture';
            }

        }
        else // Facebook pic
        {
            $profile = new Profile();
            $profile->id = Yii::app()->user->id;

            if ($large)
            {
                return  $profile->getMainImage();
            }
            else
            {
                return  $profile->getMainThumbImage();
            }
        }
    }
    // Important: The Method below must return each record with id, label keys. See how i've wrote the query "title AS label" below.

    /* Result should be in this format
      array(
        'id'=>4,
        'label'=>'John',
      ),
      array(
        'id'=>3,
        'label'=>'Grace',
      ),
      array(
        'id'=>5,
        'label'=>'Matt',
      ),

    */
    public static function usersAutoComplete($name='') {

        // Recommended: Secure Way to Write SQL in Yii
        $sql= 'SELECT id , CONCAT (first_name, " ", last_name) AS label, fbuid FROM {{members}} WHERE first_name LIKE :name LIMIT 5';
        $name = $name .'%';
        $users = Yii::app()->db->createCommand($sql)->queryAll(true,array(':name'=>$name));

        foreach ($users as &$user) {
            $member = new Member();
            $member->id = $user['id'];
            $member->fbuid =$user['fbuid'];

            $user['fbuid'] = $member->getProfilePic();
        }

        return $users;

        // Not Recommended: Simple Way for those who can't understand the above way.
        // Uncomment the below and comment out above 3 lines
        /*
        $sql= "SELECT id ,title AS label FROM users WHERE title LIKE '$name%'";
            return Yii::app()->db->createCommand($sql)->queryAll();
        */

    }
}