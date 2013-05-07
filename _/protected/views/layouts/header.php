
<div id="header">
    <a id="comment" href="<?php echo Yii::app()->createAbsoluteUrl('contactus') ?>"></a>

    <div id="headerTitle">
        <div id="noise" >
            <div class="wrapper">
                <div id="topText">

                    <div id="topTitle">רוצה להשקיע בסטארט אפ ?</div>
                    <div >בקרוב תוכל להשקיע לא פחות מ 100 ₪ </div>
                    <div>בסטרטאפים המועדפים עליך ביותר. </div>
                    <A id="btnLearnMore" >למד עוד...</A>

                </div>
                <?php
                // Show the register or login button
                if( Yii::app()->user->isGuest )
                {
                    echo '<div id="signUp" class="roundedCorners ">';
                    //echo Yii::t('header',"Let's invest in each other.");
                    echo Yii::t('header',"בוא ותשקיע במיזמים חדשים.");
                        echo '<div id="signUpBtn" class="ease topBtn" onclick="goToByScroll(\'registerBox\')">';
                            // echo Yii::t('header',"Sign Up for Early Access");
                            echo Yii::t('header',"הרשם עכשיו וקבל גישה מוקדמת");
                        echo '</div> ';
                    echo '</div> ';
                }
                else
                {
                    // Startup update Weekly
                    echo '<div id="signUp" class="roundedCorners" style="padding: 13px;  width: 319px; text-align: right;">';
                    //echo Yii::t('header',"Let's invest in each other.");
                    echo Yii::t('header',"קבל מידי שבוע ישירות למייל עדכונים על סטארט אפים:");
                    echo '<div >';

                    $model = new Newsletter();
                    echo CHtml::form();

                    echo CHtml::activeTextField($model, 'email', array( 'id' => 'mailDel' ));
                    echo CHtml::error($model, 'email', array( 'class' => 'input-notification errorshow png_bg' ));

                    echo CHtml::ajaxSubmitButton(
                        Yii::t('header',"הוסף אותי"),
                        Chtml::normalizeUrl(array('index/subscriber')),
                        array('update'=>'#message'),
                            array('id'=>'weeklyMail',
                                'class' => 'ease topBtn')
                        );
                        echo '<div id="message" style="font-size: 11px;margin-top: 10px;"></div>';

                    echo '</div> ';
                    echo '</div> ';
                }

                $spons = Sponsor::model()->getAll();
                echo '<ul id="sponsors" class="initUl">';
                foreach  ($spons as $s)
                {
                    echo '<li>';
                    echo '<a  href="'. $s->desc . '" title="'. $s->name. '"><img class="sponsor_img" src="'. $s->getMainThumbImage() .'" /></a>';
                    echo '</li>';
                }
                echo '</ul>';
                ?>
            </div>
        </div>
    </div>

    <?php if(isset($this->breadcrumbs) && false):?>
    <?php $this->widget('zii.widgets.CBreadcrumbs', array(
        'links'=>$this->breadcrumbs,
        'homeLink'=>CHtml::link(Yii::t('gl','Home'), array('/index')),
    )); ?>
    <?php endif?>

</div>

