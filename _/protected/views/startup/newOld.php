<?php
    echo $page->content;
?>

<div id="startupForm" class="settingForm">
    <?php $form=$this->beginWidget('CActiveForm', array(
    'id'=>'startup-form',
    'enableAjaxValidation'=>true,
    'stateful'=>true,
    'htmlOptions'=>array('enctype' => 'multipart/form-data'),
    'clientOptions' => array(
        'validateOnSubmit'=>true,
        'validateOnChange'=>true,
        'validateOnType'=>false,
    ),
));
    ?>

    <div class="row">
        <?php echo $form->labelEx($model,'name'); ?>
        <?php echo $form->textField($model,'name'); ?>
        <?php echo $form->error($model,'name'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'site'); ?>
        <?php echo $form->textField($model,'site', array('style' => 'direction: ltr;')); ?>
        <?php echo $form->error($model,'site'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'request_details'); ?>
        <?php echo $form->textArea($model,'request_details', array('style' => 'height: 70px;width: 435px;')); ?>
        <?php echo $form->error($model,'request_details'); ?>
    </div>

    <?php
        echo '<div class="row">';
        echo $form->labelEx($model,'category_id');
        echo $form->dropDownList($model, 'category_id', CHtml::listData(
                Category::model()->findAll(
                array('select' => 'name, id',
                    'condition' => 'is_active = 1',
                    'order' => 'name',
                )),
            'id', 'name') ,array('id' => false, 'prompt' => Yii::t('startup','Choose category...')));
        echo $form->error($model,'category_id');
        echo '</div>';
    ?>

    <div class="row buttons">
        <?php
        echo CHtml::ajaxSubmitButton(
            Yii::t('gl','Save'),
            Chtml::normalizeUrl(array('startup/new')),
            array('update'=>'#message'),
            array('id'=>'settingsSave',
                'class' => 'btn')
        );
        ?>
    </div>
    <?php $this->endWidget(); ?>
</div>
<div id="message"></div>