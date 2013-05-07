<?php

$this->breadcrumbs=array(
    $model->modelNamePlural => array('manage'),
    Yii::t('gl','Update') . ' ' .  $model->modelName,
);

$this->menu=array(
    $model->multiImages ? array('label'=>Yii::t('gl','Manage Photos'), 'url'=>array('image', 'id' => $model->id)) : array(),
    array('label'=>Yii::t('gl','Create New') .' '. $model->modelName , 'url'=>array('create')),
    array('label'=>Yii::t('gl','Manage').' '. $model->modelNamePlural, 'url'=>array('manage')),
);
?>

<div class="title_content"><?php echo Yii::t('gl','Update').' ' . $model->name ?></div>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>