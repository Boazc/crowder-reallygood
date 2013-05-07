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
        <?php echo $form->textField($model,'name',array('size'=>60,'maxlength'=>125)); ?>
        <?php echo $form->error($model,'name'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'comment'); ?>
        <?php echo $form->textArea($model,'comment',array('rows'=>6, 'cols'=>50)); ?>
        <?php echo $form->error($model,'comment'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'alias'); ?>
        <?php echo $form->textField($model,'alias',array('size'=>60,'maxlength'=>40)); ?>
        <?php echo $form->error($model,'alias'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'category_id'); ?>
        <?php echo $form->DropDownList($model, 'category_id', CHtml::listData( Category::model()->findAll(
            array('select' => 'name, id',
                'condition' => 'is_active = 1',
                'order' => 'name',
            )),
        "id", "name"), array('id' => false, 'prompt' => '')); ?>
        <?php echo $form->error($model,'category_id'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'full_content'); ?>
        <?php $this->widget('application.widgets.ckeditor.CKEditor', array( 'model' => $model, 'attribute' => 'full_content', 'editorTemplate' => 'full' )); ?>
        <?php echo $form->error($model,'full_content'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'short_content'); ?>
        <?php echo $form->textArea($model,'short_content',array('rows'=>6, 'cols'=>50)); ?>
        <?php echo $form->error($model,'short_content'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'site'); ?>
        <?php echo $form->textField($model,'site',array('size'=>60,'maxlength'=>256)); ?>
        <?php echo $form->error($model,'site'); ?>
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