<?php

/**
 * This is the model class for table "{{manu_page}}".
 *
 * The followings are the available columns in table '{{manu_page}}':
 * @property integer $id
 * @property integer $manu_id
 * @property integer $static_page_id
 * @property string $name
 * @property string $link
 * @property integer $is_active
 * @property integer $index_id
 */
class ManuPage extends myActiveRecord
{
    public  $is_static_page;

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
	 * @return ManuPage the static model class
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
		return '{{manu_page}}';
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
                array('manu_id', 'required'),
                array('manu_id, static_page_id, index_id', 'numerical', 'integerOnly'=>true),
                array('name', 'length', 'max'=>100),
                array('is_active', 'boolean'),
                array('link,name', 'safe'),
			    // The following rule is used by search().
			    // Please remove those attributes that should not be searched.
			    array('id, manu_id, static_page_id, name, link, is_active, index_id', 'safe', 'on'=>'search'),
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
            'manu' => array(self::BELONGS_TO, 'Manu', 'manu_id'),
            'staticPage' => array(self::BELONGS_TO, 'StaticPage', 'static_page_id'),
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
                'manu_id' => Yii::t('st','Manu'),
                'static_page_id' => Yii::t('st','Static Page'),
                'name' => Yii::t('st','Name'),
                'link' => Yii::t('st','Link'),
                'is_active' => Yii::t('st','Is Active'),
                'index_id' => Yii::t('st','Index'),
		        'is_static_page' => Yii::t('st','Is Static Page'),
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
		$criteria->compare('manu_id',$this->manu_id);
		$criteria->compare('static_page_id',$this->static_page_id);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('link',$this->link,true);
		$criteria->compare('is_active',$this->is_active);
		$criteria->compare('index_id',$this->index_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}