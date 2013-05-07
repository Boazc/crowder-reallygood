<div class="content-box">

    <div class="content-box-header"><h3><?php echo Yii::t('gl','Advanced Search') ?></h3></div>
    <div class="content-box-content">

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

    <div class="row">
        <?php echo $form->label($model,'id'); ?>
        <?php echo $form->textField($model,'id'); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'name'); ?>
        <?php echo $form->textField($model,'name',array('size'=>60,'maxlength'=>125)); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'site'); ?>
        <?php echo $form->textField($model,'site',array('size'=>60,'maxlength'=>256)); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'request_details'); ?>
        <?php echo $form->textArea($model,'request_details',array('rows'=>6, 'cols'=>50)); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'short_content'); ?>
        <?php echo $form->textArea($model,'short_content',array('rows'=>6, 'cols'=>50)); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'full_content'); ?>
        <?php echo $form->textArea($model,'full_content',array('rows'=>6, 'cols'=>50)); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'comment'); ?>
        <?php echo $form->textArea($model,'comment',array('rows'=>6, 'cols'=>50)); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'date_created'); ?>
        <?php echo $form->textField($model,'date_created'); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'date_modified'); ?>
        <?php echo $form->textField($model,'date_modified'); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'user_created'); ?>
        <?php echo $form->textField($model,'user_created'); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'category_id'); ?>
        <?php echo $form->textField($model,'category_id'); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'is_active'); ?>
        <?php echo $form->textField($model,'is_active'); ?>
    </div>

	<div class="row buttons">
		<?php echo CHtml::submitButton(Yii::t('gl','Search'), array('class' => 'button')); ?>
	</div>

<?php $this->endWidget(); ?>
</div>
</div>

</div><!-- search-form -->