<?php

/**
 * This is the model class for table "{{custompages}}".
 *
 * The followings are the available columns in table '{{custompages}}':
 * @property integer $id
 * @property string $name
 * @property string $alias
 * @property string $language
 * @property string $content
 * @property integer $father_page_id
 * @property integer $project_id
 * @property integer $user_created
 * @property integer $user_modified
 * @property string $date_modified
 * @property string $visible_by
 * @property integer $is_active
 */
class CustomPage extends myActiveRecord
{
    public  $project_id_code_type =  'project_type';

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
     * @return CustomPage the static model class
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
        return '{{custompagesmy}}';
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
                array(' name, alias', 'required'),
                array('alias', 'CheckUniqueAlias'),
                array('language', 'required'),
                array('father_page_id, project_id, user_created, user_modified', 'numerical', 'integerOnly'=>true),
                array('name', 'length', 'max'=>100),
                array('alias', 'match', 'allowEmpty'=>false, 'pattern'=>'/^[A-Za-z0-9_.-]+$/'),
                array('language', 'length', 'max'=>16),
                array('is_active', 'boolean'),
                array('content, date_modified, visible_by', 'safe'),
                // The following rule is used by search().
                // Please remove those attributes that should not be searched.
                array('id, name, alias, language, content, father_page_id, project_id, user_created, user_modified, date_modified, visible_by, is_active', 'safe', 'on'=>'search'),
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
            'author' => array(self::BELONGS_TO, 'Member', 'user_created'),
            'lastauthor' => array(self::BELONGS_TO, 'Member', 'user_modified'),
            'fatherPage' => array(self::BELONGS_TO, 'CustomPage', 'father_page_id'),
            'project' => array(self::BELONGS_TO, 'Name', 'project_id'),
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
                'name' => Yii::t('st','Name'),
                'alias' => Yii::t('st','Alias'),
                'language' => Yii::t('st','Language'),
                'content' => Yii::t('st','Content'),
                'father_page_id' => Yii::t('st','Father Page'),
                'project_id' => Yii::t('st','Subject'),
                'user_created' => Yii::t('st','user_created'),
                'user_modified' => Yii::t('st','User Modified'),
                'date_modified' => Yii::t('st','Date Modified'),
                'visible_by' => Yii::t('st','Visible'),
                'is_active' => Yii::t('st','Is Active'),
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
        $criteria->compare('name',$this->name,true);
        $criteria->compare('alias',$this->alias,true);
        $criteria->compare('language',$this->language,true);
        $criteria->compare('content',$this->content,true);
        $criteria->compare('father_page_id',$this->father_page_id);
        $criteria->compare('project_id',$this->project_id);
        //$criteria->compare('user_created',$this->user_created);
        $criteria->compare('user_modified',$this->user_modified);
        $criteria->compare('date_modified',$this->date_modified,true);
        $criteria->compare('visible_by',$this->visible_by,true);
        $criteria->compare('is_active',$this->is_active);

        $criteria->with =
            array(
                'author' => array(
                    'alias'=>'u',
                    'select'=> 'u.username',
                    'condition' =>isset($this->user_created) ?  'u.username LIKE "%' .$this->user_created .'%"' : '',
                ),
                'lastauthor' => array(
                    'alias'=>'u2',
                    'select'=> 'u2.username',
                )
            );
        return new CActiveDataProvider($this, array(
            'criteria'=>$criteria,
            'sort'=>array(
                'defaultOrder'=>'t.id DESC',
            )
        ));
    }

    /**
     * Before save operations
     */
    public function beforeSave()
    {
        // Fix the language, tags and visibility
        $this->visible_by = ( is_array( $this->visible_by ) && count( $this->visible_by ) ) ? implode(',', $this->visible_by) : $this->visible_by;
        $this->language = ( is_array( $this->language ) && count( $this->language ) ) ? implode(',', $this->language) : $this->language;

        // Alias
        $this->alias = str_replace(' ', '.', $this->alias);

        return parent::beforeSave();
    }

    /**
     * after save method
     */
    public function afterSave()
    {
        Yii::app()->urlManager->clearCache();

        return parent::afterSave();
    }

    /**
     * Check alias and language combination
     */
    public function CheckUniqueAlias()
    {
        if( $this->isNewRecord )
        {
            // Check if we already have an alias with those parameters
            if( self::model()->exists('alias=:alias AND language = :lang', array(':alias' => $this->alias, ':lang' => $this->language ) ) )
            {
                $this->addError('alias', Yii::t('custompages', 'There is already a page with that alias and language combination.'));
            }
        }
        else
        {
            // Check if we already have an alias with those parameters
            if( self::model()->exists('alias=:alias AND language = :lang AND id!=:id', array( ':id' => $this->id, ':alias' => $this->alias, ':lang' => $this->language ) ) )
            {
                $this->addError('alias', Yii::t('custompages', 'There is already a page with that alias and language combination.'));
            }
        }
    }
}