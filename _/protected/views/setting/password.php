<div id="passwordForm" class="settingForm">
    <?php $form=$this->beginWidget('CActiveForm', array(
    'id'=>'password-form',
    'enableClientValidation'=>true,
    'clientOptions' => array(
        'validateOnSubmit'=>true,
        'validateOnChange'=>true,
        'validateOnType'=>false,
    ),
)); ?>
    <? echo '<div id="sideTitle">'. Yii::t('password', 'If you sign in only with Facebook, leave Old Password empty') . '</div>' ?>
    <div class="row">
        <?php echo $form->labelEx($model,'oldPassword'); ?>
        <?php echo $form->passwordField($model,'oldPassword'); ?>
        <?php echo $form->error($model,'oldPassword'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'password'); ?>
        <?php echo $form->passwordField($model,'password'); ?>
        <?php echo $form->error($model,'password'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'password2'); ?>
        <?php echo $form->passwordField($model,'password2'); ?>
        <?php echo $form->error($model,'password2'); ?>
    </div>

    <?php if ($user->fbuid): ?>

         <div id="sideTitle"> <?php echo Yii::t('acount', 'You signin with Facebook') ?> </div>

        <div id="fbRemove" class="row">
            <?php echo $form->CheckBox($model,'removeFacebook'); ?>
            <?php echo $form->labelEx($model,'removeFacebook'); ?>
            <?php echo $form->error($model,'removeFacebook'); ?>
        </div>

    <?php endif ?>

    <div class="row buttons">
        <?php
        echo CHtml::ajaxSubmitButton(
                    Yii::t('gl','Save'),
                    Chtml::normalizeUrl(array('setting/password')),
                    array('update'=>'#message'),
                    array('id'=>'settingsSave',
                                'class' => 'btn')
                );
        ?>
    </div>
    <div id="message"></div>

    <?php $this->endWidget(); ?>
</div>