<?php

/**
 * This is the model class for table "{{startups}}".
 *
 * The followings are the available columns in table '{{startups}}':
 * @property integer $id
 * @property string $alias
 * @property string $name
 * @property string $slogan
 * @property integer $followers
 * @property integer $comp_num
 * @property string $site
 * @property integer $category_id
 * @property string $address
 * @property string $city
 * @property string $phone
 * @property string $image
 * @property string $peach_video_url
 * @property string $request_details
 * @property string $short_content
 * @property string $full_content
 * @property string $comment
 * @property string $date_created
 * @property string $main_image
 * @property string $date_modified
 * @property integer $user_created
 * @property integer $is_visible
 * @property integer $is_active
 * @property integer $is_mail_sent
 */
class Startup extends myActiveRecord
{
    public function init()
    {
        parent::init();

        // Image settings
        //$this->multiImages = true;
        $this->hasImage = true;
        //$this->isImageAjax = true;

        // Meta Seetings
        //$this->hasMeta = false;
    }

	/**
	 * Returns the static model of the specified AR class.
	 * @return Startup the static model class
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
		return '{{startups}}';
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
                array('name', 'required'),
                array('comp_num, category_id, user_created', 'numerical', 'integerOnly'=>true),
                array('alias, name', 'length', 'max'=>125),
                array('phone', 'length', 'min'=>9),
                array('alias', 'unique'),
                array('site', 'url'),
                array('slogan, address', 'length', 'max'=>150),
                array('site, peach_video_url', 'length', 'max'=>256),
                array('city', 'length', 'max'=>50),
                array('phone', 'length', 'max'=>20),
                array('is_mail_sent,is_visible, is_active', 'boolean'),
                array('main_image, request_details, short_content, full_content, comment, date_modified', 'safe'),
			    // The following rule is used by search().
			    // Please remove those attributes that should not be searched.
			    array('name, slogan, comp_num, site, address, city, phone, image', 'safe', 'on'=>'company'),
			    array('name, slogan, comp_num, site, address, city, phone, image', 'safe', 'on'=>'new'),
			    array('is_visible', 'safe', 'on'=>'publish'),
			    array('alias, category_id', 'required', 'on'=>'publish'),
			    array('followers, id, alias, name, slogan, comp_num, site, category_id, address, city, phone, image, peach_video_url, request_details, short_content, full_content, comment, date_created, date_modified, user_created, is_visible, is_active', 'safe', 'on'=>'search'),
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
            'category' => array(self::BELONGS_TO, 'Category', 'category_id'),
            'user' => array(self::BELONGS_TO, 'Member', 'user_created'),
            'members' => array(self::HAS_MANY, 'Startupuser', 'startup_id'),
            'media' => array(self::HAS_MANY, 'Startupmedia', 'startup_id'),
		);
	}
    public function renderName()
    {
        return '<a rel="tooltip" title="צפייה בעמוד מיזם" href="' . Yii::app()->createUrl('/startup/view', array('alias' => $this->alias)) . '">'. $this->name .'</a>';
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
                'alias' => Yii::t('model','Alias'),
                'name' => Yii::t('model','Name'),
                'slogan' => Yii::t('model','Slogan'),
                'comp_num' => Yii::t('model','Comp Num'),
                'site' => Yii::t('model','Site'),
                'category_id' => Yii::t('model','Category'),
                'address' => Yii::t('model','Address'),
                'city' => Yii::t('model','City'),
                'phone' => Yii::t('model','Phone'),
                'image' => Yii::t('model','Image'),
                'peach_video_url' => Yii::t('model','Peach Video Url'),
                'request_details' => Yii::t('model','Request Details'),
                'short_content' => Yii::t('model','הסבר את המיזם בקצרה'),
                'full_content' => Yii::t('model','Full Content'),
                'comment' => Yii::t('model','Comment'),
                'date_created' => Yii::t('model','Date Created'),
                'date_modified' => Yii::t('model','Date Modified'),
                'user_created' => Yii::t('model','User Created'),
                'followers' => Yii::t('model','Followers'),
                'is_visible' => Yii::t('model','Is Visible'),
                'is_active' => Yii::t('model','Is Active'),
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
		$criteria->compare('alias',$this->alias,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('slogan',$this->slogan,true);
		$criteria->compare('comp_num',$this->comp_num);
		$criteria->compare('site',$this->site,true);
		$criteria->compare('category_id',$this->category_id);
		$criteria->compare('address',$this->address,true);
		$criteria->compare('city',$this->city,true);
		$criteria->compare('phone',$this->phone,true);
		$criteria->compare('image',$this->image,true);
		$criteria->compare('peach_video_url',$this->peach_video_url,true);
		$criteria->compare('request_details',$this->request_details,true);
		$criteria->compare('short_content',$this->short_content,true);
		$criteria->compare('full_content',$this->full_content,true);
		$criteria->compare('comment',$this->comment,true);
		$criteria->compare('date_created',$this->date_created,true);
		$criteria->compare('date_modified',$this->date_modified,true);
		$criteria->compare('user_created',$this->user_created);
		$criteria->compare('is_visible',$this->is_visible);
		$criteria->compare('is_active',$this->is_active);
		$criteria->compare('followers',$this->followers);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
            'sort'=>array(
                'defaultOrder'=>'id DESC',
            ),
		));
	}

    public function getFollowersCount()
    {
        //  להקטין באיפון באייפד את הסרטון של מיזם נחבר
        return Yii::t('followers','{num} עוקבים',
            array('{num}' => Follower::model()->count(array('condition'=> 'startup_id =' . $this->id))));
    }
}