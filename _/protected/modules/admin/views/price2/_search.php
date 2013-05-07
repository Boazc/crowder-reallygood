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
        <?php echo $form->textField($model,'name',array('size'=>60,'maxlength'=>100)); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'desc'); ?>
        <?php echo $form->textField($model,'desc'); ?>
    </div>

    <div class="row">
        <?php echo $form->label($model,'is_active'); ?>
        <?php echo $form->textField($model,'is_active'); ?>
    </div>

    <div class="row buttons">
        <?php echo CHtml::submitButton(Yii::t('gl','Search')); ?>
    </div>

	<div class="row buttons">
		<?php echo CHtml::submitButton(Yii::t('gl','Search'), array('class' => 'button')); ?>
	</div>

<?php $this->endWidget(); ?>
</div>
</div>

</div><!-- search-form -->