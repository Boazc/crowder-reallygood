<div id="acountForm" class="settingForm">
    <?php $form=$this->beginWidget('CActiveForm', array(
    'id'=>'acount-form',
    'enableClientValidation'=>true,
    'clientOptions' => array(
        'validateOnSubmit'=>true,
        'validateOnChange'=>true,
        'validateOnType'=>false,
    ),
)); ?>

    <div class="row">
        <?php echo $form->labelEx($model,'first_name'); ?>
        <?php echo $form->textField($model,'first_name'); ?>
        <?php echo $form->error($model,'first_name'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'last_name'); ?>
        <?php echo $form->textField($model,'last_name'); ?>
        <?php echo $form->error($model,'last_name'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'email'); ?>
        <?php echo $form->textField($model,'email'); ?>
        <?php echo $form->error($model,'email'); ?>
    </div>

    <div class="row">
        <?php $model->username = urldecode($model->username);
            echo $form->labelEx($model,'username'); ?>
        <?php echo $form->textField($model,'username'); ?>
        <?php echo $form->error($model,'username'); ?>
    </div>

    <div class="row buttons">
        <?php
        echo CHtml::ajaxSubmitButton(
                    Yii::t('gl','Save'),
                    Chtml::normalizeUrl(array('setting/acount')),
                    array('update'=>'#message'),
                    array('id'=>'settingsSave',
                                'class' => 'btn')
                );
        ?>
        <div id="message"></div>

    </div>

    <?php $this->endWidget(); ?>
</div>