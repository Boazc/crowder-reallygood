<?php

$this->breadcrumbs=array(
    $model->modelName,
);


Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('event-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<div class="floatleft">
<?php
    echo CHtml::link(Yii::t('gl','Create New' . ' '. $model->modelNameEn),array('create'),array('class'=>'button'));
    echo CHtml::link(Yii::t('gl','Manage') . ' '. $model->modelNamePlural,array('manage'),array('class'=>'button'));
    echo CHtml::link(Yii::t('gl','Advanced Search'),'#',array('class'=>'button search-button'));
?>
</div>

<div class="search-form" style="display:none">
    <?php $this->renderPartial('_search',array(
    'model'=>$model,
)); ?>
</div><!-- search-form -->

<div class="content-box">

<div class="content-box-header"><h3><?php echo Yii::t('gl','Manage').' '. $model->modelNamePlural ?></h3></div>
<div class="content-box-content">
<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=> strtolower($model->modelNameEn) . '-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
    'htmlOptions' =>array('class' => 'my-grid-view'),
	 'columns'=>array(
        // 'id',
         array(
             'name'=>'name', // boolean model attribute (tinyint(1) with values 0 or 1)
             'value' => '$data->renderName()',
             'type' => 'html',
         ),
         //'site',
         //'request_details',
         'short_content',
         //'full_content',
         //'comment',
         'date_created',
         //'date_modified',
         array(
             'name' => 'user_created',
             'value' => array($this,'renderUserCol'),
             'type' => 'raw',
             'filter' => '',
         ),
         array(
             'name' => 'category_id',
             'value' => 'isset($data->category) ? $data->category->name : ""',
             'filter' => CHtml::activeDropDownList($model, 'category_id', CHtml::listData( Category::model()->findAll(
                 array('select' => 'name, id',
                     'condition' => 'is_active = 1',
                     'order' => 'name',
                 )),
                 "id", "name"), array('id' => false, 'prompt' => ''))
         ),
         array(
             'class'=>'JToggleColumn',
             'name'=>'is_active', // boolean model attribute (tinyint(1) with values 0 or 1)
             'filter' => array('0' => 'No', '1' => 'Yes'), // filter
             'checkedButtonImageUrl'=> $this->adminImage . 'checked.png', // checked image
             'uncheckedButtonImageUrl'=> $this->adminImage . 'unchecked.png', // unchecked image
             'checkedButtonLabel'=>Yii::t('gl','Unactivate this'), // tooltip
             'uncheckedButtonLabel'=>Yii::t('gl','Activate this'), // tooltip
             'htmlOptions'=>array('style'=>'text-align:center;min-width:60px;')
         ),
         //'is_removed',
		array(
            'class'=>'CButtonColumn',
            'template' => $model->multiImages ? '{images} {update} {delete}' : '{update} {delete}',
            'buttons'=>array
            (
                'images' => array
                (
                    'label'=>Yii::t('gl','Manage').' '.Yii::t('gl','Images'),
                    'imageUrl'=>Yii::app()->baseUrl.'/images/upimages.jpg',
                    'url'=>'Yii::app()->controller->createUrl("image",array("id"=>$data->primaryKey))',
                ),
                'update' => array
                (
                    'url'=>'Yii::app()->controller->createUrl("/startup/company/",array("id"=>$data->primaryKey))',
                ),
            ),
		),
	),
)); ?>

</div>
</div>