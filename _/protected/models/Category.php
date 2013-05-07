<?php

/**
 * This is the model class for table "{{categories}}".
 *
 * The followings are the available columns in table '{{categories}}':
 * @property integer $id
 * @property string $lang
 * @property string $alias
 * @property string $name
 * @property integer $price_sum
 * @property integer $funders_amount
 * @property integer $is_active
 * @property string $description
 * @property string $date_created
 * @property string $date_modified
 */
class Category extends myActiveRecord
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
	 * @return Category the static model class
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
		return '{{categories}}';
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
                array('name, price_sum, funders_amount, is_active', 'required'),
                array('price_sum, funders_amount, is_active', 'numerical', 'integerOnly'=>true),
                array('lang, alias, name', 'length', 'max'=>30),
                array('description', 'length', 'max'=>250),
                array('alias, date_modified', 'safe'),
			    // The following rule is used by search().
			    // Please remove those attributes that should not be searched.
			    array('id, lang, alias, name, price_sum, funders_amount, is_active, description, date_created, date_modified', 'safe', 'on'=>'search'),
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
                'id' => Yii::t('st','ID'),
                'lang' => Yii::t('st','Language'),
                'alias' => Yii::t('st','Alias'),
                'name' => Yii::t('st','Name'),
                'price_sum' => Yii::t('st','Price Sum'),
                'funders_amount' => Yii::t('st','Funders Amount'),
                'is_active' => Yii::t('st','Is Active'),
                'description' => Yii::t('st','Description'),
                'date_created' => Yii::t('st','Date Created'),
                'date_modified' => Yii::t('st','Date Modified'),
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
		$criteria->compare('lang',$this->lang,true);
		$criteria->compare('alias',$this->alias,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('price_sum',$this->price_sum);
		$criteria->compare('funders_amount',$this->funders_amount);
		$criteria->compare('is_active',$this->is_active);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('date_created',$this->date_created,true);
		$criteria->compare('date_modified',$this->date_modified,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}