<?php

/**
 * This is the model class for table "{{followers}}".
 *
 * The followings are the available columns in table '{{followers}}':
 * @property integer $user_id
 * @property integer $startup_id
 */
class Follower extends myActiveRecord
{
    public function init()
    {
        parent::init();

        // Image settings
        //$this->multiImages = true;
        //$this->hasImage = true;

        // Meta Seetings
        $this->hasMeta = false;
    }

	/**
	 * Returns the static model of the specified AR class.
     * @param string $className active record class name.
	 * @return Follower the static model class
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
		return '{{followers}}';
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
                array('user_id, startup_id', 'required'),
                array('user_id, startup_id', 'numerical', 'integerOnly'=>true),
			    // The following rule is used by search().
			    // Please remove those attributes that should not be searched.
			    array('user_id, startup_id', 'safe', 'on'=>'search'),
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
            'user' => array(self::BELONGS_TO, 'Member', 'user_id'),
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
                'user_id' => Yii::t('model','User'),
                'startup_id' => Yii::t('model','Startup'),
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

		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('startup_id',$this->startup_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}