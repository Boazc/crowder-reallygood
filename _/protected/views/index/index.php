
<div style="background: #191919;">
<div id="indexMainContent" class="container">

    <?php
    // Main page
    $page = $this->getPage('index');

    echo  '<div id="indexContent">';
        // New startup btn
        if (Yii::app()->user->isGuest)
        {
            echo '<a id="newStartupBtn2" href="'. $this->createUrl('/startup/new') . '"></a>';
        }
        else
        {
            $user = Yii::app()->user->getModel(true);

            $stModel = Startup::model()->findByAttributes(array('user_created' => $user->id), array('select' => 'id, alias'));
            if ($stModel)
            {
                echo '<a id="newStartupBtn2" href="'. $this->createUrl('/startup/company', array('id' => $stModel->id)) . '"></a>';
            }
            else
            {
                echo '<a id="newStartupBtn2" href="'. $this->createUrl('/startup/new') . '"></a>';
            }
        }

        echo '<a id="investBtn2" href="' . $this->createUrl('/startup/index') .'"></a>';

        echo '<div id="mainText">';
            echo $page->content;
        echo '</div>';

    echo '</div>';
    echo '<div id="mainVid">';
    //echo CHtml::link(' ','#',array('id'=>'indexRule', 'title' => Yii::t('index','חוק גיוס המונים')));
    echo '<iframe width="100%" height="315" src="http://www.youtube.com/embed/P0qTWEPGphA?autoplay=0&wmode=transparent" wmode="Opaque" frameborder="0" allowfullscreen ></iframe>';
   //echo '<iframe width="100%" height="315" src="https://vimeo.com/63561927"></iframe>';
    echo '</div>';

    ?>
    <script type="text/javascript">
    //    $("#indexRule").click(function(){
     //       $("#indexRule").hide();
     //   });
    </script>
</div>
</div>
<?php
    // Get all press
    $sponsors =  Sponsor::model()->getAll(5);

    echo '<div id="sponsors">';
    echo '<div class="container">';
    echo '<ul class="initUl">';
    foreach  ($sponsors as $s)
    {
        echo '<li>';
        echo '<a  href="'. $s->desc . '" title="'. $s->name. '"><img class="sponsor_img" src="'. $s->getMainThumbImage() .'" /></a>';
        echo '</li>';
    }
    echo '</ul>';
    echo '</div>';
    echo '</div>';

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
<div class="grayBox">
<div class="container">
<div id="selectedStartup" >
    <h1><?php echo Yii::t('index',' המיזם השבועי'); ?></h1>
    <div id="selectedStartupContent" style="">
    <div id="selectedStartupMedia" class="pull-left" >
        <?php
            if ($str->peach_video_url <> "")
            {
                echo '<iframe width="100%" height="100%" src="http://www.youtube.com/embed/' . $str->peach_video_url .'?wmode=transparent" wmode="Opaque" frameborder="0" allowfullscreen></iframe>';
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
    <div id="startupDetailTop" class="" >
        <div id="startupName"><?php echo $str->name ?>
        <span style="font-size: 18px; margin-left: 10px;"><?php echo $str->slogan; ?></span>
        </div>
        <?php /* <div id="startupMonth"><?php echo Yii::t('startup','Startup of the Month'); ?></div> */ ?>
        <div id="startupDetail">
            <?php echo $str->short_content ?>
        </div>

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
            <div class="">

                <a id="mainStartupView" class="initABtn" href="<?php echo $this->createUrl('/startup/view', array('alias' => $str->alias)); ?>">
                    <div class="btn  btn-large btn-success">
                        <i class="icon-search"></i>
                        <?php echo Yii::t('startup','לדף המיזם'); ?>
                    </div>
                </a>

                <div class="btn-toolbar" style="float: right; margin: 0 0 0 10px;">
                <?php $this->widget('bootstrap.widgets.TbButtonGroup', array(
                'type'=>'info', // '', 'primary', 'info', 'success', 'warning', 'danger' or 'inverse'
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

            </div>
            <div id="count-follow" class="muted"> <?php echo $str->getFollowersCount(); ?> </div>
    </div>
    </div>

</div>
</div>
</div>
</div>
<div id="startups"  class="container">
    <ul id="startupList" class="initUl">
    <?php
        $startups =  Startup::model()->findAll(array(
            'select' => 'id, short_content, image, main_image, name, slogan, alias',
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

<div class="grayBox">
<div class="container">

    <?php
        echo '<div class="middleTitle">'. Yii::t('index','הצטרף להמוני משקיעים שכבר הצטרפו ל - Crowder') . '</div>';
        $this->renderPartial('fundersList', array('top' => 612, 'left' => 185));
        $this->renderPartial("/register/registerForm");
    ?>
</div>
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

<script type="text/javascript">
    $("#selectedStartupMedia").height($("#startupDetailTop").height());
</script>