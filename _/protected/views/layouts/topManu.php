<?php
        // Name
        $brand = 'Crow<span id="logoFund" class="ease" >d</span>er';

        // Build startup option
        $startup = array('label'=>Yii::t('mainmanu','פרסם מיזם'), 'url'=>array('/startup/new'));

        // Show the register or login button
        if( Yii::app()->user->isGuest )
        {
            $this->widget('bootstrap.widgets.TbNavbar',array(
                'type' => 'inverse',
                'brand'=>$brand,
                'collapse'=>true,
                'items'=>array(
                    array(
            'class'=>'bootstrap.widgets.TbMenu',
            'items'=>array(
                array('label'=>Yii::t('mainmanu','כניסה'), 'url'=>array('/login')),
                array('label'=>Yii::t('mainmanu','הרשמה'), 'url'=>array('/register')),
                $startup,
                array('label'=>Yii::t('mainmanu','צפה במיזמים'), 'url'=>array('/startup/index')),
                array('label'=>Yii::t('mainmanu','איך זה עובד'), 'url'=>'#', 'items'=>array(
                    array('label'=>Yii::t('mainmanu','מי אנחנו'), 'icon'=>'icon-star', 'url'=>array('/info/overview')),
                    array('label'=>Yii::t('mainmanu','יזמים'), 'icon'=>'icon-road', 'url'=>array('/info/how')),
                    array('label'=>Yii::t('mainmanu','משקיעים'), 'icon'=>'icon-lock', 'url'=>array('/info/how')),
                    array('label'=>Yii::t('mainmanu','חוק מימון חברתי לעסקים'), 'icon'=>'icon-signal', 'url'=>array('/info/law')),
                )),
            ),
            ))
            ));
        }
        else  // echo user option
        {
            $user = Yii::app()->user->getModel(true);
            // Mail

            /** @var $stModel Startup */
            $stModel = Startup::model()->findByAttributes(array('user_created' => $user->id), array('select' => 'id, alias'));
            if ($stModel)
            {
                if ($stModel->alias != "")
                {
                    $startup = array('label'=>Yii::t('mainmanu','Manage Startup'), 'url'=>array('/startup/view', 'alias'=>$stModel->alias), 'items'=>array(
                        array('label'=>Yii::t('mainmanu','צפייה בדף מיזם'), 'icon'=>'icon-th-list', 'url'=>array('/startup/view', 'alias'=>$stModel->alias)),
                        array('label'=>Yii::t('mainmanu','עריכת מיזם'), 'icon'=>'icon-pencil', 'url'=>array('/startup/company', 'id'=>$stModel->id)),
                    ));
                }
                else
                {
                    $startup = array('label'=>Yii::t('mainmanu','Manage Startup'), 'url'=>array('/startup/company', 'id'=>$stModel->id));
                }
            }

             $this->widget('bootstrap.widgets.TbNavbar',array(
                 'type' => 'inverse',
                 'collapse'=>true,
                 'brand'=> $brand,
                 'items'=>array(
                    '<img class="userPicSmall" src="' . $user->getProfilePic() .'">',
                     array('class'=>'bootstrap.widgets.TbMenu',
                     'id' => 'menuUser',
                     'htmlOptions' => array('class' => 'pull-right'),
                     'items'=>array(
                        array('label'=>$user->getFullName(), 'url'=>'#', 'items'=>array(
                            array('label'=>Yii::t('mainmanu','פרופיל'), 'icon'=>'user', 'url'=>array('/profile/'. $user->username)),
                            array('label'=>Yii::t('mainmanu','הגדרות'), 'icon'=>'cog', 'url'=>array('/setting')),
                            array('label'=>Yii::t('mainmanu','התנתקות'), 'icon'=> 'icon-minus', 'url'=>array('/logout')),
                        )),
                        $startup,
                         array('label'=>Yii::t('mainmanu','צפה במיזמים'), 'url'=>array('/startup/index')),
                         array('label'=>Yii::t('mainmanu','איך זה עובד'), 'url'=>'#', 'items'=>array(
                             array('label'=>Yii::t('mainmanu','מי אנחנו'), 'icon'=>'icon-star', 'url'=>array('/info/overview')),
                             array('label'=>Yii::t('mainmanu','יזמים'), 'icon'=>'icon-road', 'url'=>array('/info/how')),
                             array('label'=>Yii::t('mainmanu','משקיעים'), 'icon'=>'icon-lock', 'url'=>array('/info/how')),
                             array('label'=>Yii::t('mainmanu','חוק מימון חברתי לעסקים'), 'icon'=>'icon-signal', 'url'=>array('/info/law')),
                         )),
                    )),
                ),
            ));
        }

  ?>
<div class="container">
    <ul  id="messageList" class="container"></ul>
</div>
