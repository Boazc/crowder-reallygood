<div id="notificationForm" class="settingForm">
    <?php $form=$this->beginWidget('CActiveForm', array(
    'id'=>'notification-form',
    'enableClientValidation'=>true,
    'clientOptions' => array(
        'validateOnSubmit'=>true,
        'validateOnChange'=>true,
        'validateOnType'=>false,
    ),
)); ?>

    <?php echo '<div id="sideTitle">'. Yii::t('notify', 'Updates Notification ') . '</div>' ?>

    <div class="row">
        <?php echo $form->CheckBox($model,'email_me_startups'); ?>
        <?php echo $form->labelEx($model,'email_me_startups'); ?>
        <?php echo $form->error($model,'email_me_startups'); ?>
    </div>

    <div class="row">
        <?php echo $form->CheckBox($model,'email_me_meessage'); ?>
        <?php echo $form->labelEx($model,'email_me_meessage'); ?>
        <?php echo $form->error($model,'email_me_meessage'); ?>
    </div>


    <div class="row buttons">
        <?php
        echo CHtml::ajaxSubmitButton(
                    Yii::t('gl','Save'),
                    Chtml::normalizeUrl(array('setting/notification')),
                    array('update'=>'#message'),
                    array('id'=>'settingsSave',
                                'class' => 'btn')
                );
        ?>
        <div id="message"></div>

    </div>

    <?php $this->endWidget(); ?>
</div>