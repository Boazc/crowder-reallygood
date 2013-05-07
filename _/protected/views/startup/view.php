<?php
    /** @var $model Startup*/

Yii::app()->clientScript->registerScriptFile($this->jsUrl .'html5gallery/html5gallery.js');

?>
<div id="startupTopMain">
    <div id="startupTopDetails"  class="container">
        <div class="row">
            <div class="span3" style="width: 210px;"><img id="startupIndexImg" src="<?php echo $model->getMainImage() ?>">    <div id="startupVFollow"  > <?php $this->widget('bootstrap.widgets.TbButtonGroup', array(
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
                        'label'=>'עקוב אחריי', 'url'=>$this->createUrl('/startup/follow', array('id'=> $model->id))),
                    array('items'=>array(
                        array(
                            'label'=>'הסר ממעקב',
                            'icon' =>  'icon-minus-sign',
                            'url'=>$this->createUrl('/startup/unfollow', array('id'=> $model->id)),
                            'ajaxOptions' => array(
                                'type'=>'get',
                                'dataType'=>'json',
                                'success'=>'js:function(data){ Message.register(data.status,data.message);}',
                            ),
                        ),
                    )),
                ),
            )); ?></div>

            </div>
            <div class="span7">
                <div id="startupName"><?php echo $model->name ?></div>
                <div id="startupVSlogan"><?php echo $model->slogan; ?></div>
                <div id="strTopData">

                    <?php
                    if (isset($model->category))
                    {
                        echo '<div id="startupVCategory"><span class="typeLab">' . Yii::t('str','תחום:'). '</span>' . $model->category->name .'</div>';
                    }

                    if ($model->city != "")
                    {
                        echo '<div id="startupVCategory"><span class="typeLab">' . Yii::t('str','מיקום:'). '</span>' . $model->city .', ישראל</div>';
                    }
                    if ($model->site != "")
                    {
                        echo '<div id="startupVCategory"><span class="typeLab">' . Yii::t('str','אתר:'). '</span><a href="' . $model->site .'">' . $model->site .'</a></div>';
                    }

                        if (isset($model->user))
                        {
                            echo '<div id="startupVCategory"><span class="typeLab">' . Yii::t('str','מקים המיזם:'). '</span>'. $model->user->getFullName() .'</div>';
                        }
                    ?>
                </div>
                <div id="shortContent">
                    <?php echo $model->short_content; ?>
                </div>
            </div>
            <div  class="span2" style="float: left;">
                <a class="initABtn" href="<?php echo $this->createUrl('/startup/view', array('alias' => $nextAlias)); ?>">
                    <div class="btn  btn-large btn-success">
                        <i class="icon-chevron-left"></i>
                        <?php echo Yii::t('startup','למיזם הבא'); ?>
                    </div>
                </a>

            </div>
        </div>
    </div>
</div>
<div id="startupBottom">
    <div id="startupMenu">
        <div id="toSrollFix"></div>
        <div class="container">
            <ul id="startupMenuList">
                <li id="onTeam"><?php echo Yii::t('startup', 'על הצוות') ?></li>
                <li id="onCompany" class="active"><?php echo Yii::t('startup', 'על החברה') ?></li>
            </ul>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="span7">

                <?php

                $medias = Startupmedia::model()->findAllByAttributes(
                    array (
                        'startup_id' => $model->id,
                    ),
                    array(
                        'order' => 'index_id ASC',
                    ));

                $paragraphs = array();

                // Print Gallery
                echo '<div id="strGallery" style="text-align:center;">';
                echo '<div style="display:none;margin:0 auto;" class="html5gallery" data-showcarousel="false" data-skin="light" data-width="500" data-height="350">';

                // Add Video
                echo '<a href="http://www.youtube.com/embed/' . $model->peach_video_url . '?wmode=transparent"><img src="http://img.youtube.com/vi/' . $model->peach_video_url . '/2.jpg" alt="' . $model->name . '"></a>';


                // Go threw all media
                foreach ($medias as $media)
                {
                    if ($media->media_type_id == Startupmedia::MEDIA_IMAGE)
                    {
                        echo  '<a href="' . $media->getMainImage()  . '"><img src="'.$media->getMainThumbImage()  . '" alt="'. $media->title . '"></a>';
                        //$images[] =  array('image'=> $media->getMainImage() , 'caption'=>$media->title);
                    }
                    else if ($media->media_type_id == Startupmedia::MEDIA_PITCH)
                    {
                        $paragraphs[] =  $media;
                    }
                }

                echo '</div>';
                echo '</div>';
                ?>
                <ul id="pitchList" class="initUl">
                <?php
                foreach ($paragraphs as $paragraph)
                {
                    echo '<li>';
                        echo '<div class="mediumTitle">' . $paragraph->title . '</div>';
                        echo '<div class="paragContent">' . $paragraph->content . '</div>';
                    echo '</li>';
                }
                ?>
                </ul>

                <ul id="startupMemberList" class="initUl">
                    <?php
                    $members = Startupuser::model()->with('member')->findAllByAttributes(array('startup_id' => $model->id));
                    $defPic = yii::app()->baseUrl . '/uploads/Profiles/default.png';

                    echo '<div class="mediumTitle">' . Yii::t('startup','הצוות') . '</div>';

                    foreach ($members as $member )
                    {
                        echo '<li>';
                        if (isset($member->member))
                        {
                            echo '<img src="' . $member->member->getProfilePic() . '" >';
                            echo '<div class="startupMember">';
                                echo '<div class="startupMemberName">' . $member->member->getFullName(). '</div>';
                                echo '<div class="startupMemberRole">' .$member->title . '</div>';
                                echo '<div class="startupMemberProfile">' . $member->member->profile->about_me_update . '</div>';
                            echo '</div>';
                        }
                        else
                        {
                            echo '<img src="' . $defPic . '" >';
                            echo '<div class="startupMember">';
                                echo '<div class="startupMemberName">' . $member->full_name . '</div>';
                                echo '<div class="startupMemberRole">' .$member->title . '</div>';
                            echo '</div>';
                        }
                        echo '</li>';
                    }
                    ?>
                </ul>
                <script type="text/javascript">
                    $("#onTeam").click(function() {
                        // Change class
                        $("#onTeam").addClass('active');
                        $("#onCompany").removeClass('active');

                        $("#pitchList").fadeOut();
                        $("#startupMemberList").fadeIn();
                        goToByScroll("toSrollFix");
                    });
                    $("#onCompany").click(function() {
                        $("#onTeam").removeClass('active');
                        $("#onCompany").addClass('active');

                        $("#startupMemberList").fadeOut();
                        $("#pitchList").fadeIn();
                        goToByScroll("toSrollFix");

                    });

                </script>
            </div>
            <div id="viewFollowersStr" class="span4">
                <div id="followersStartup">
                    <div style="display: table;">
                        <div id="startupViewFtitle" class="mediumTitle"><?php echo Yii::t('startup', 'עוקבים') ?></div>

                        <div id="followVCount" style="line-height: 38px !important;"><?php echo $model->getFollowersCount() ?> </div>
                    </div>
                    <div>
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
                    </div>
                    <div id="startupFollowB">
                        <?php $this->widget('bootstrap.widgets.TbButtonGroup', array(
                        'type'=>'info', // '', 'primary', 'info', 'success', 'warning', 'danger' or 'inverse'
                        'size' => 'medium',
                        'buttons'=>array(
                            array(
                                'buttonType' => 'ajaxButton',
                                'icon' =>  'icon-plus-sign',
                                'ajaxOptions' => array(
                                    'type'=>'get',
                                    'dataType'=>'json',
                                    'success'=>'js:function(data){ Message.register(data.status,data.message);}',
                                ),
                                'label'=>'עקוב אחריי', 'url'=>$this->createUrl('/startup/follow', array('id'=> $model->id))),
                            array('items'=>array(
                                array(
                                    'label'=>'הסר ממעקב',
                                    'icon' =>  'icon-minus-sign',
                                    'url'=>$this->createUrl('/startup/unfollow', array('id'=> $model->id)),
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
                <div id="faceComments">

                    <div id="fb-root"></div>
                    <script>(function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s); js.id = id;
                        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=<?php echo Yii::app()->params['facebookappid'] ?>";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));</script>
                    <div class="fb-comments"  data-href="<?php echo Yii::app()->createAbsoluteUrl('/startup/view', array('alias'=>$model->alias)); ?>" data-width="400px" data-num-posts="5"></div>
                </div>
            </div>
        </div>
    </div>
</div>
