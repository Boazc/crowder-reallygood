<?php

/**
 * This is the model class for table "{{profile}}".
 *
 * The followings are the available columns in table '{{profile}}':
 * @property integer $id
 * @property string $city
 * @property integer $country_id
 * @property integer $facebook_show
 * @property integer $linkedin_uid
 * @property integer $linkedin_show
 * @property integer $twitter_uid
 * @property integer $twitter_show
 * @property integer $main_cat_id
 * @property integer $price_invest
 * @property string $website
 * @property string $birthday
 * @property string $about_me_update
 * @property integer $email_me_meessage
 * @property integer $email_me_startups
 * @property Category $mainCategory
 */
class Profile extends myActiveRecord
{
    public function init()
    {
        parent::init();

        // Image settings
        //$this->multiImages = true;
        $this->hasImage = true;

        // Meta Seetings
        //$this->hasMeta = false;
    }

	/**
	 * Returns the static model of the specified AR class.
	 * @return Profile the static model class
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
		return '{{profile}}';
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
                    array('id', 'required'),
                    array('id, country_id,  main_cat_id, price_invest, email_me_meessage, email_me_startups', 'numerical', 'integerOnly'=>true),
                    array('city, website', 'length', 'max'=>250),
                    array('linkedin_uid, twitter_uid, website', 'url'),
                    array('birthday, about_me_update', 'safe'),
                    //array('twitter_uid', 'match', 'allowEmpty'=>true, 'pattern'=>'https://twitter.com/*'),
                    array('facebook_show,linkedin_show,twitter_show, email_me_meessage, email_me_startups','boolean'),
                    // The following rule is used by search().
                    // Please remove those attributes that should not be searched.
                    array('id, city,country_id, facebook_show, linkedin_uid, linkedin_show, twitter_uid, twitter_show, main_cat_id, birthday, email_me_meessage, email_me_startups', 'unsafe', 'on'=>'profile'),
                    array('id, city, country_id, facebook_show, linkedin_uid, linkedin_show, twitter_uid, twitter_show, main_cat_id, price_invest, birthday, about_me_update', 'safe', 'on'=>'notification'),
                    array('id, city, country_id, main_cat_id, price_invest, birthday, about_me_update, email_me_meessage, email_me_startups', 'safe', 'on'=>'spcial'),
                    array('id, city, country_id, facebook_show, linkedin_uid, linkedin_show, twitter_uid, twitter_show, main_cat_id, price_invest, birthday, about_me_update, email_me_meessage, email_me_startups', 'safe', 'on'=>'search'),
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
            'mainCategory' => array(self::BELONGS_TO, 'Category', 'main_cat_id'),
            'categories'=>array(self::MANY_MANY, 'Category','tbl_user_category(user_id, category_id)','together'=>true),
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
                'city' => Yii::t('st','City'),
                'country_id' => Yii::t('strofilerofilerofile','Country'),
                'facebook_show' => Yii::t('st','Facebook Show'),
                'linkedin_uid' => Yii::t('st','Linkedin Uid'),
                'linkedin_show' => Yii::t('st','Linkedin Show'),
                'twitter_uid' => Yii::t('st','Twitter Uid'),
                'twitter_show' => Yii::t('st','Twitter Show'),
                'main_cat_id' => Yii::t('st','Main Cat'),
                'price_invest' => Yii::t('st','Price Invest'),
                'website' => Yii::t('st','Website'),
                'birthday' => Yii::t('st','Birthday'),
                'about_me_update' => Yii::t('st','About Me Update'),
                'email_me_meessage' => Yii::t('st','Email Me Meessage'),
                'email_me_startups' => Yii::t('st','Email Me Startups'),
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
		$criteria->compare('city',$this->city,true);
		$criteria->compare('country_id',$this->country_id);
		$criteria->compare('facebook_show',$this->facebook_show);
		$criteria->compare('linkedin_uid',$this->linkedin_uid);
		$criteria->compare('linkedin_show',$this->linkedin_show);
		$criteria->compare('twitter_uid',$this->twitter_uid);
		$criteria->compare('twitter_show',$this->twitter_show);
		$criteria->compare('main_cat_id',$this->main_cat_id);
		$criteria->compare('price_invest',$this->price_invest);
		$criteria->compare('birthday',$this->birthday,true);
		$criteria->compare('about_me_update',$this->about_me_update,true);
		$criteria->compare('email_me_meessage',$this->email_me_meessage);
		$criteria->compare('email_me_startups',$this->email_me_startups);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

    /**
     * Save date and password before saving
     */
    public function beforeSave()
    {
        if( $this->isNewRecord )
        {
            // Set mailer
            $this->email_me_meessage = true;

            // Update category
            $cat =  Category::model()->findByPk($this->main_cat_id, array('select'=> 'id, price_sum, funders_amount'));
            $cat->price_sum = $cat->price_sum + $this->price_invest;
            $cat->funders_amount= $cat->funders_amount + 1;

            $cat->update();
        }

        return parent::beforeSave();
    }

    public function getSelectedCategories()
    {
        // for initial the categories.
        $selectedCat [] = 0;

        if (!$this->isNewRecord)
        {
            $categotries = MemberCategory::model()->findAll(array(
                'condition' => 'user_id = ' . $this->id,
            ));

            foreach	($categotries as $cat)
            {
                $selectedCat[] =  $cat->category_id;
            }
        }

        return array_values($selectedCat);
    }


    public function updateCategories($categories)
    {
        MemberCategory::model()->deleteAll('user_id=:id',array(':id'=>$this->id));
        $values = "";

        if (isset($categories))
        {
            foreach ($categories as $cat_id)
            {
                $values .= '('. $this->id . ',' . $cat_id . ' ),';
            }

            $sql = 'INSERT INTO tbl_user_category (user_id, category_id) VALUES ' . substr($values,0,-1);
            $command = Yii::app()->db->createCommand($sql);
            $command->execute();
        }
    }

    public function getListCategories($link = true)
    {
        $CategoriesList ='';
        foreach	($this->categories as $category)
        {
            if ($link)
            {
                $CategoriesList .= CHtml::link($category->name,array('category/view',
                    'id'=>$category->id,
                    'name' => $category->name)) . ", ";
            }
            else
            {
                $CategoriesList .= $category->name .', ';
            }
        }

        return substr($CategoriesList,0,-2);
    }
}