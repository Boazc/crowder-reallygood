<?php

/**
 * This is the model class for table "{{user_category}}".
 *
 * The followings are the available columns in table '{{user_category}}':
 * @property integer $user_id
 * @property integer $category_id
 */
class MemberCategory extends CActiveRecord
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
	 * @return MemberCategory the static model class
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
		return '{{user_category}}';
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
                array('user_id, category_id', 'required'),
                array('user_id, category_id', 'numerical', 'integerOnly'=>true),
			    // The following rule is used by search().
			    // Please remove those attributes that should not be searched.
			    array('user_id, category_id', 'safe', 'on'=>'search'),
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
                'user_id' => Yii::t('st','User'),
                'category_id' => Yii::t('st','Category'),
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
		$criteria->compare('category_id',$this->category_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}