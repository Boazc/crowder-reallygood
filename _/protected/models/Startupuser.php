<?php

/**
 * This is the model class for table "{{user_startup}}".
 *
 * The followings are the available columns in table '{{user_startup}}':
 * @property integer $id
 * @property integer $user_id
 * @property integer $startup_id
 * @property string $email_for_new
 * @property string $full_name
 * @property string $title
 * @property integer $is_admin
 */
class Startupuser extends myActiveRecord
{
    public function init()
    {
        parent::init();

        // Image settings
        //$this->multiImages = true;
        //$this->hasImage = true;

        // Meta Seetings
        //$this->hasMeta = false;
    }

	/**
	 * Returns the static model of the specified AR class.
	 * @return Startupuser the static model class
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
		return '{{user_startup}}';
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
                array('is_admin', 'boolean'),
                array('user_id, startup_id', 'numerical', 'integerOnly'=>true),
                array('email_for_new, title', 'length', 'max'=>125),
                array('full_name', 'length', 'max'=>40),
			    // The following rule is used by search().
			    // Please remove those attributes that should not be searched.
			    array('id, user_id, startup_id, email_for_new, full_name, title, is_admin', 'safe', 'on'=>'search'),
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
            'member' => array(self::BELONGS_TO, 'Member', 'user_id'),
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
                'id' => Yii::t('model','ID'),
                'user_id' => Yii::t('model','User'),
                'startup_id' => Yii::t('model','Startup'),
                'email_for_new' => Yii::t('model','Email For New'),
                'full_name' => Yii::t('model','Full Name'),
                'title' => Yii::t('model','Title'),
                'is_admin' => Yii::t('model','Is Admin'),
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
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('startup_id',$this->startup_id);
		$criteria->compare('email_for_new',$this->email_for_new,true);
		$criteria->compare('full_name',$this->full_name,true);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('is_admin',$this->is_admin);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}