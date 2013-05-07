<?php
     $startups =  Startup::model()->findAll(array(
       'condition' => 'is_active = 1',
        'limit' => '2',
    ));
?>
<div id="startups">

<?php  foreach ($startups as $key=>$str):?>

    <div id="startupIndex" style="<?php echo $key == 0 ? 'padding-left: 10px; float:left;' : 'padding-right: 10px; float:right;'?> ">

        <img id="startupIndexImg" src="<?php echo $str->getMainImage() ?>">

        <div id="startupDetailTop">
            <div id="startupName"><?php echo $str->name ?></div>
            <a id="starupView" href="<?php echo $this->createUrl('/startup/' . $str->alias); ?>" class="btn" ><?php echo Yii::t('startup','View Startup'); ?></a>
            <?php /* <div id="startupMonth"><?php echo Yii::t('startup','Startup of the Month'); ?></div> */ ?>
        </div>
        <div id="startupDetail">
            <?php echo $str->short_content ?>
        </div>
    </div>

<?php endforeach;?>

</div>