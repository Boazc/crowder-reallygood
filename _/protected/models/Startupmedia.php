<?php

/**
 * This is the model class for table "{{startup_media}}".
 *
 * The followings are the available columns in table '{{startup_media}}':
 * @property integer $id
 * @property integer $startup_id
 * @property integer $media_type_id
 * @property string $title
 * @property string $content
 * @property string $image
 * @property integer $index_id
 */
class Startupmedia extends myActiveRecord
{
    public  $media_type_id_code_type =  'media_type';

    const MEDIA_IMAGE = 1;
   const MEDIA_PITCH = 2;

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
	 * @return Startupmedia the static model class
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
		return '{{startup_media}}';
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
                array('startup_id, media_type_id', 'required'),
                array('startup_id, media_type_id, index_id', 'numerical', 'integerOnly'=>true),
                array('title, image', 'length', 'max'=>124),
                array('content', 'length', 'max'=>500),
			    // The following rule is used by search().
			    // Please remove those attributes that should not be searched.
			    array('id, startup_id, media_type_id, title, content, image, index_id', 'safe', 'on'=>'search'),
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
            'media_type' => array(self::BELONGS_TO, 'Name', 'media_type_id'),
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
                'startup_id' => Yii::t('model','Startup'),
                'media_type_id' => Yii::t('model','Media Type'),
                'title' => Yii::t('model','Title'),
                'content' => Yii::t('model','Content'),
                'image' => Yii::t('model','Image'),
                'index_id' => Yii::t('model','Index'),
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
		$criteria->compare('startup_id',$this->startup_id);
		$criteria->compare('media_type_id',$this->media_type_id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('content',$this->content,true);
		$criteria->compare('image',$this->image,true);
		$criteria->compare('index_id',$this->index_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

    public static function getAllImage($id)
    {
        if ($id)
        {
            return Startupmedia::model()->findAllByAttributes(
                array('startup_id' => $id, 'media_type_id' => Startupmedia::MEDIA_IMAGE),
                array('order' => 'index_id',
                      'select'=> 'id,title, image, index_id'));
        }
    }

    public static function getAllPitch($id)
    {
        if ($id)
        {
            return Startupmedia::model()->findAllByAttributes(
                array('startup_id' => $id, 'media_type_id' => Startupmedia::MEDIA_PITCH),
                array('order' => 'index_id',
                      'select'=> 'id,title,content, image, index_id'));
        }
    }
}