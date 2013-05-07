<div class="form admin-form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=> strtolower($model->modelName) . '-form',
	'enableAjaxValidation'=>true,	
	'stateful'=>true,
    'htmlOptions'=>array('enctype' => 'multipart/form-data'),
)); ?>

	<p class="note"><?php echo Yii::t('gl','Fields with');?> <span class="required">*</span> <?php echo Yii::t('gl','are required.');?></p>

	<?php echo $form->errorSummary($model); ?>

    <div class="row">
        <?php echo $form->labelEx($model,'translation'); ?>
        <?php echo $form->textArea($model,'translation',array('rows'=>6, 'cols'=>50)); ?>
        <?php echo $form->error($model,'translation'); ?>
    </div>

    <?php $model->printFormMeta($form); ?>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? Yii::t('gl','Create') : Yii::t('gl','Save'), array('class'=>'button')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->
