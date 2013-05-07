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
        <?php echo $form->labelEx($model,'name'); ?>
        <?php echo $form->textField($model,'name',array('size'=>'50','maxlength'=>100, 'style' => 'font-size: 1.5em')); ?>
        <?php echo $form->error($model,'name'); ?>
    </div>


    <div class="row">
        <?php echo $form->labelEx($model,'desc'); ?>
        <?php echo $form->textField($model,'desc',array('size'=>'50','maxlength'=>200)); ?>
        <?php echo $form->error($model,'desc'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'index_id'); ?>
        <?php echo $form->textField($model,'index_id',array('size'=>'20','maxlength'=>100, 'style' => 'font-size: 1.5em')); ?>
        <?php echo $form->error($model,'index_id'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'is_active'); ?>
        <?php echo $form->CheckBox($model,'is_active'); ?>
        <?php echo $form->error($model,'is_active'); ?>
    </div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? Yii::t('gl','Create') : Yii::t('gl','Save'), array('class'=>'button')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->