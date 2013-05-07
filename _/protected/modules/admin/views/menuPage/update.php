<?php

$this->breadcrumbs=array(
    $model->modelNamePlural => array('manage'),
    Yii::t('gl','Update') . ' ' .  $model->modelName,
);

?>

<div class="floatleft">
    <?php
    echo CHtml::link(Yii::t('gl','Create New' . ' '. $model->modelNameEn),array('create'),array('class'=>'button'));
    echo CHtml::link(Yii::t('gl','Manage') . ' '. $model->modelNamePlural,array('manage'),array('class'=>'button'));
    ?>
</div>

<div class="content-box">

    <div class="content-box-header"><h3><?php echo Yii::t('gl','Update').' ' . $model->name  ?></h3></div>
    <div class="content-box-content">

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
    </div>
</div>