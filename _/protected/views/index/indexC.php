<?php
    // Get all press
    $sponsors =  Sponsor::model()->findAll(array(
        'condition' => 'is_active = 1',
        'limit' => '5',
    ));

    echo '<ul id="sponsors" class="initUl">';
    foreach  ($sponsors as $s)
    {
        echo '<li>';
        echo '<a  href="'. $s->desc . '" title="'. $s->name. '"><img class="sponsor_img" src="'. $s->getMainThumbImage() .'" /></a>';
        echo '</li>';
    }
    echo '</ul>';

    /** @var $str Startup */
    $str =  Startup::model()->findByPk(Yii::app()->params["selected_startup"]);

    $followers = Follower::model()->findAll(array(
        'condition'=> 'startup_id =' . $str->id,
        'limit' => 5,
        'with' => array(
            'user'=> array(
                'select' => 'id, fbuid, username,first_name, last_name',
            )
        )
    ));
?>
<div class="wrapper grayBox">
<div id="selectedStartup" >
    <h1><?php echo Yii::t('index','מיזם נבחר'); ?></h1>
    <div id="selectedStartupMedia" class="pull-left" >
        <?php
            if ($str->peach_video_url <> "")
            {
                echo '<iframe width="470" height="300" src="http://www.youtube.com/embed/' . $str->peach_video_url .'" frameborder="0" allowfullscreen></iframe>';
            }
            else
            {

                $mediaStr = Startupmedia::model()->findAllByAttributes(
                    array (
                        'startup_id' => $str->id,
                        'media_type_id' => Startupmedia::MEDIA_IMAGE,
                    ),
                    array(
                        'order' => 'index_id ASC',
                    ));

                echo '<img  id="startupIndexImg" src="' . $mediaStr->getMainImage() . '">';
            }
        ?>
    </div>
    <div id="startupDetailTop" class="span6">
        <div id="startupName"><?php echo $str->name ?></div>
        <h1 ><?php echo $str->slogan; ?></h1>

        <?php /* <div id="startupMonth"><?php echo Yii::t('startup','Startup of the Month'); ?></div> */ ?>
        <div id="startupDetail">
            <?php echo $str->short_content ?>
        </div>
        <a id="starupView" href="<?php echo $this->createUrl('/startup/view', array('alias' => $str->alias)); ?>" style="margin-bottom: 15px;" class="btn btn-large" ><?php echo Yii::t('startup','לדף המיזם'); ?></a>

        <div id="startup-followers">
            <h2 ><?php echo Yii::t('index','מי עוקב אחרינו?'); ?></h2>
            <ul id="followers" class="initUl memberList">
                <?php
                    foreach ($followers as $follower)
                    {
                        if (isset($follower->user))
                        {
                        echo '<li>';
                            echo '<a class="member" rel="tooltip" title="' . $follower->user->getFullName()  . '" href="' . $this->createUrl('/signature/' . urldecode($follower->user->username)) . '">';
                                echo '<img src="' . $follower->user->getProfilePic(false)  . '">';
                            echo '</a>';
                        echo '</li>';
                        }
                    }
                ?>
            </ul>
            <div class="row">
            <div class="btn-toolbar span4">
                <?php $this->widget('bootstrap.widgets.TbButtonGroup', array(
                'type'=>'success', // '', 'primary', 'info', 'success', 'warning', 'danger' or 'inverse'
                'size' => 'large',
                'buttons'=>array(
                    array(
                        'buttonType' => 'ajaxButton',
                        'icon' =>  'icon-plus-sign',
                        'ajaxOptions' => array(
                            'type'=>'get',
                            'dataType'=>'json',
                            'success'=>'js:function(data){ Message.register(data.status,data.message);}',
                        ),
                        'label'=>'עקוב אחריי', 'url'=>$this->createUrl('/startup/follow', array('id'=> $str->id))),
                        array('items'=>array(
                            array(
                                'label'=>'הסר ממעקב',
                                'icon' =>  'icon-minus-sign',
                                'url'=>$this->createUrl('/startup/unfollow', array('id'=> $str->id)),
                                'ajaxOptions' => array(
                                    'type'=>'get',
                                    'dataType'=>'json',
                                    'success'=>'js:function(data){ Message.register(data.status,data.message);}',
                                ),
                            ),
                        )),
                    ),
            )); ?>
            </div>
            <div id="count-follow" class="muted span3"> <?php echo $str->getFollowersCount(); ?> </div>
        </div>
    </div>

</div>
</div>
</div>
</div>
<div id="startups"  class="wrapper">
    <ul id="startupList" class="initUl">
    <?php
        $startups =  Startup::model()->findAll(array(
            'select' => 'id, short_content, image, name, slogan, alias',
            'condition' => 'is_active = 1 AND is_visible = 1',
            'limit' => 8,
        ));

        foreach ($startups as $startup)
        {
            $this->renderPartial('/startup/_view', array('data' => $startup));
        }
    ?>
    </ul>
</div>

<div class="grayBox wrapper">
    <?php
        echo '<div class="middleTitle">'. Yii::t('index','הצטרף להמוני משקיעים אשר התקדמו לשלב הבא עם קראודר המספרים מדברים בעד עצמם...') . '</div>';
        $this->renderPartial('fundersList', array('top' => 612, 'left' => 185));
        $this->renderPartial("/register/registerForm");
    ?>
</div>
<?php
/*
    if( Yii::app()->user->isGuest )
    {
        $this->renderPartial('startup');

    }
else
{
        $this->renderPartial('startup');
        $this->renderPartial('fundersList', array('top' => 612, 'left' => 185));
    }

*/ ?>