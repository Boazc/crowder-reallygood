<?php

$this->breadcrumbs=array(
    $model->modelNamePlural => array('manage'),
	Yii::t('gl','Create'),
);

$this->menu = array(
	array('label'=>Yii::t('gl','Manage').' '.$model->modelNamePlural , 'url'=>array('manage')),
);
?>

<div class="content-box">

    <div class="content-box-header"><h3><?php echo Yii::t('gl','Create New' . ' '. $model->modelNameEn) ?></h3></div>
    <div class="content-box-content">

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
    </div>
</div>