<div id="socialForm" class="settingForm">
    <?php $form=$this->beginWidget('CActiveForm', array(
    'id'=>'social-form',
    'enableClientValidation'=>true,
    'clientOptions' => array(
        'validateOnSubmit'=>true,
        'validateOnChange'=>true,
        'validateOnType'=>false,
    ),
)); ?>

    <?php echo '<div id="sideTitle">'. Yii::t('social', 'Facebook') . '</div>' ?>

    <div class="row">
        <?php echo $form->CheckBox($model,'facebook_show'); ?>
        <?php echo $form->labelEx($model,'facebook_show'); ?>
        <?php echo $form->error($model,'facebook_show'); ?>
    </div>

    <?php echo '<div id="sideTitle">'. Yii::t('social', 'Linkedin') . '</div>' ?>

    <div class="row">
        <?php echo $form->labelEx($model,'linkedin_uid'); ?>
        <?php echo $form->textField($model,'linkedin_uid'); ?>
        <?php echo $form->error($model,'linkedin_uid'); ?>
    </div>

    <div class="row">
        <?php echo $form->CheckBox($model,'linkedin_show'); ?>
        <?php echo $form->labelEx($model,'linkedin_show'); ?>
        <?php echo $form->error($model,'linkedin_show'); ?>
    </div>

    <?php echo '<div id="sideTitle">'. Yii::t('social', 'Twitter') . '</div>' ?>

    <div class="row">
        <?php echo $form->labelEx($model,'twitter_uid'); ?>
        <?php echo $form->textField($model,'twitter_uid'); ?>
        <?php echo $form->error($model,'twitter_uid'); ?>
    </div>

    <div class="row">
        <?php echo $form->CheckBox($model,'twitter_show'); ?>
        <?php echo $form->labelEx($model,'twitter_show'); ?>
        <?php echo $form->error($model,'twitter_show'); ?>
    </div>

    <div class="row buttons">
        <?php
        echo CHtml::ajaxSubmitButton(
                    Yii::t('gl','Save'),
                    Chtml::normalizeUrl(array('setting/social')),
                    array('update'=>'#message'),
                    array('id'=>'settingsSave',
                                'class' => 'btn')
                );
        ?>
        <div id="message"></div>

    </div>

    <?php $this->endWidget(); ?>
</div>