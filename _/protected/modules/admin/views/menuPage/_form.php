<div class="form admin-form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=> strtolower($model->modelName) . '-form',
	'enableAjaxValidation'=>true,	
	'stateful'=>true,
    'htmlOptions'=>array('enctype' => 'multipart/form-data'),
)); ?>

	<p class="note"><?php echo Yii::t('gl','Fields with');?> <span class="required">*</span> <?php echo Yii::t('gl','are required.');?></p>

	<?php echo $form->errorSummary($model); ?>

    <?php echo $model->dropNames($form, 'menu_id'); ?>

    <div class="row">
        <?php echo $form->labelEx($model,'index_id'); ?>
        <?php echo $form->textField($model,'index_id'); ?>
        <?php echo $form->error($model,'index_id'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'static_page_id'); ?>
        <?php
        $pages = CustomPages::model()->findAll(
            array('select' => 'title, id',
                        'order' => 'title',
            ));
        echo $form->dropDownList($model, 'static_page_id', CHtml::listData($pages, 'id', 'title') ,array('id' => false, 'prompt' => '')); ?>
        <?php echo $form->error($model,'static_page_id'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'name'); ?>
        <?php echo $form->textField($model,'name',array('size'=>60,'maxlength'=>100)); ?>
        <?php echo $form->error($model,'name'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'link'); ?>
        <?php echo $form->textField($model,'link',array('size'=>60,'maxlength'=>100)); ?>
        <?php echo $form->error($model,'link'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'is_active'); ?>
        <?php echo $form->dropDownList($model, 'is_active', array( 0 => Yii::t('admincustompages', 'Hidden (Draft)'), 1 => Yii::t('admincustompages', 'Open (Published)') ), array( 'class' => 'text-input medium-input' )); ?>
        <?php echo $form->error($model,'is_active'); ?>
    </div>

    <?php $model->printFormPic($form); ?>

    <?php $model->printFormMeta($form); ?>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? Yii::t('gl','Create') : Yii::t('gl','Save'), array('class'=>'button')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->