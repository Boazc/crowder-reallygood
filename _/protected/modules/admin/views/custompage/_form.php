<div class="form admin-form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=> strtolower($model->modelNameEn) . '-form',
	'enableAjaxValidation'=>true,	
	'stateful'=>true,
    'htmlOptions'=>array('enctype' => 'multipart/form-data'),
)); ?>

	<p class="note"><?php echo Yii::t('gl','Fields with');?> <span class="required">*</span> <?php echo Yii::t('gl','are required.');?></p>

	<?php echo $form->errorSummary($model); ?>

    <div class="row">
        <?php echo $form->labelEx($model,'name'); ?>
        <?php echo $form->textField($model,'name',array('size'=>60,'maxlength'=>100)); ?>
        <?php echo $form->error($model,'name'); ?>
    </div>

    <?php $model->printFormPic($form); ?>

    <div class="row">
        <?php echo $form->labelEx($model,'alias'); ?>
        <?php echo $form->textField($model,'alias',array('size'=>50,'maxlength'=>50)); ?>
        <?php echo $form->error($model,'alias'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'language'); ?>
        <?php echo $form->dropDownList($model, 'language', Yii::app()->params['languages'], array( 'prompt' => Yii::t('admincustompages', '-- Choose --'), 'class' => 'text-input medium-input' )); ?>
        <?php echo $form->error($model,'language'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'content'); ?>
        <?php $this->widget('application.widgets.ckeditor.CKEditor', array( 'model' => $model, 'attribute' => 'content', 'editorTemplate' => 'full' )); ?>
        <?php echo $form->error($model,'content'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'father_page_id'); ?>
        <?php echo $form->DropDownList($model, 'father_page_id', CHtml::listData( CustomPage::model()->findAll(
            array('select' => 'name, id',
                'condition' => 'is_active = 1 AND id <> "' . $model->id . '"',
                'order' => 'name',
            )),
        "id", "name"), array('id' => false, 'prompt' => '')); ?>
        <?php echo $form->error($model,'father_page_id'); ?>
    </div>

    <?php echo $model->dropNames($form, 'project_id'); ?>

    <div class="row">
        <?php echo $form->labelEx($model,'is_active'); ?>
        <?php echo $form->dropDownList($model, 'is_active', array( 0 => Yii::t('admincustompages', 'Hidden (Draft)'), 1 => Yii::t('admincustompages', 'Open (Published)') ), array( 'class' => 'text-input medium-input' )); ?>
        <?php echo $form->error($model,'is_active'); ?>
    </div>

    <div class="row" >
        <?php  echo $form->labelEx($model,'visible_by'); ?>
        <a id="rolesBtn" style="line-height: 30px;" ><?php echo Yii::t('custompage', 'Page with roles?') ?></a>
    </div>

    <div class="row" id="rolesRow" style="display: none;">
        <small><?php echo Yii::t('admincustompages', 'User roles that can access this page (Defaults to everyone)'); ?></small><br />
        <?php echo $form->listBox($model, 'visible_by',  $roles, array( 'size' => 20, 'prompt' => Yii::t('admincustompages', '-- ALL --'), 'multiple' => 'multiple', 'class' => 'text-input medium-input' )); ?>
        <?php echo $form->error($model,'visible_by'); ?>
    </div>


    <?php $model->printFormMeta($form); ?>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? Yii::t('gl','Create') : Yii::t('gl','Save'), array('class'=>'button')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->

<script type="text/javascript">
    $('#rolesBtn').bind('click', function() {
        $('#rolesRow').slideToggle();
    });
</script>