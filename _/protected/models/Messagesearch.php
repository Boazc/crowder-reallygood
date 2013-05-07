<?php

/**
 * This is the model class for table "{{SourceMessage}}".
 *
 * The followings are the available columns in table '{{SourceMessage}}':
 * @property integer $id
 * @property string $language
 * @property string $translation
 */
class Messagesearch extends myActiveRecord
{

    public $cat;
    public $source;

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
	 * @return MessageSearch the static model class
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
		return '{{message}}';
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
                array('language', 'length', 'max'=>16),
                array('translation', 'safe'),
                // The following rule is used by search().
                // Please remove those attributes that should not be searched.
                array('id, source, cat, language, translation', 'safe', 'on'=>'search'),
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
            'srcmsg' => array( self::BELONGS_TO, 'SourceMessage', 'id' ,'together'=>true),
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
                'language' => Yii::t('model','Language'),
                'translation' => Yii::t('model','Translation'),
                'source' => Yii::t('model','Source Msg'),
                'cat' => Yii::t('model','Category'),
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
        $criteria->compare('language',$this->language,true);
        $criteria->compare('translation',$this->translation,true);

        $where = "";

        if ($this->source != "")
        {
           $where .=   'srcmsg.message LIKE "%' . $this->source .'%" ';
        }

        if ($this->cat != "")
        {
            if ($where != "")
            {
                $where .=   'AND srcmsg.category LIKE "' . $this->cat . '%"';
            }
            else
            {
                $where .=   'srcmsg.category LIKE "' . $this->cat . '%"';
            }
        }

        $criteria->with = array(
            'srcmsg' => array(
                'select' => 'category, message',
                'condition' => $where,
            ));

        return new CActiveDataProvider($this, array(
            'criteria'=>$criteria,
        ));
    }
}