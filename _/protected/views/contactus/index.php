<div id="formcenter">

    <div id="sideTitle"><?php echo Yii::t('contactus', 'Please fill all required fields and hit the submit button once your done.'); ?></div>

	<?php if($model->hasErrors()): ?>
	<div class="errordiv">
		<?php echo CHtml::errorSummary($model); ?>
	</div>
	<?php endif; ?>
	
	<?php echo CHtml::form('', 'post', array('class'=>'frmcontact')); ?>

    <div  class="settingForm">

        <div class="row">

		<?php echo CHtml::activeLabel($model, 'name'); ?>
		<?php $model->name = urldecode($model->name);
            echo CHtml::activeTextField($model, 'name', array( 'class' => 'textboxcontact tiptopfocus', 'title' => Yii::t('contactus', 'Please enter your name') )); ?>
		<?php echo CHtml::error($model, 'name', array( 'class' => 'errorfield' )); ?>

		</div>
        <div class="row">

		<?php echo CHtml::activeLabel($model, 'email'); ?>
		<?php echo CHtml::activeTextField($model, 'email', array( 'class' => 'textboxcontact tiptopfocus', 'title' => Yii::t('contactus', 'Please enter your email address') )); ?>
		<?php echo CHtml::error($model, 'email', array( 'class' => 'errorfield' )); ?>
            </div>
        <div class="row">

		<?php echo CHtml::activeLabel($model, 'subject'); ?>
		<?php echo CHtml::activeDropDownList($model, 'subject', ContactUs::model()->getTopics(), array( 'class' => 'textboxcontact' )); ?>
		<?php echo CHtml::error($model, 'subject', array( 'class' => 'errorfield' )); ?>

        </div>
            <div class="row">

		<?php echo CHtml::activeLabel($model, 'content'); ?>
		<?php echo CHtml::activeTextArea($model, 'content', array( 'class' => 'textareacontact tiptopfocus', 'title' => Yii::t('contactus', 'Please enter your message') )); ?>
		<?php echo CHtml::error($model, 'content', array( 'class' => 'errorfield' )); ?>

            </div>

                <div class="row">

		<?php /* echo CHtml::activeLabel($model, 'verifyCode'); ?>
		<?php echo CHtml::activeTextField($model, 'verifyCode', array( 'class' => 'textboxcontact tiptopfocus', 'title' => Yii::t('contactus', 'Enter the text displayed in the image below') )); ?>
		<?php echo CHtml::error($model, 'verifyCode', array( 'class' => 'errorfield' )); ?>
		<br />
		<?php $this->widget('CCaptcha'); */ ?>

        </div>

		<p style='text-align:right;'>
			<?php echo CHtml::submitButton(Yii::t('global', 'Submit'), array('class'=>'btn btn-large btn-success', 'name'=>'submit')); ?>
		</p>
		
	</div>
	
	<?php echo CHtml::endForm(); ?>
	
</div>