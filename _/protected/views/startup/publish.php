
<div id="startupForm" class="settingForm">

    <?php $form=$this->beginWidget('CActiveForm', array(
    'id'=>'publish-form',
    'enableClientValidation'=>true,
    'enableAjaxValidation'=>true,
    'clientOptions' => array(
        'validateOnSubmit'=>true,
        'validateOnChange'=>true,
        'validateOnType'=>false,
    ),
)); ?>

    <div id="companyDetails" class="stForm">
        <div  class="stTitle"><?php echo Yii::t('stForm','Submit your company') ?></div>
        <div class="stFormInput">
            <div class="row">
                <?php echo $form->labelEx($model,'alias'); ?>
                <?php echo '<span id="aliasS"> /' . Yii::app()->createAbsoluteUrl('/startup/view/') . '</span>' .  $form->textField($model,'alias'); ?>
                <?php echo $form->error($model,'alias'); ?>
            </div>

            <div class="row">
                <?php echo $form->labelEx($model,'is_visible'); ?>
                <?php
                    echo $form->radioButtonList($model, 'is_visible', array(
                    '1' => Yii::t('startup', 'Public'),
                    '0' => Yii::t('startup', 'Private'),
                    ));
                ?>
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

        </div>
    </div>


    <div class="buttons">
        <input id="saveDetail" class="btn btn-large btn-success" type="submit" name="submitCompany" value="<?php echo Yii::t('startup','Save & Publish Startup') ?>">
    </div>
    <?php $this->endWidget(); ?>
</div>

<script type="text/javascript">

    jQuery(function ($) {
        jQuery('body').undelegate('#saveDetail', 'click').delegate('#saveDetail', 'click', function () {
            jQuery.ajax({
                'type': 'POST',
                'url': '<?php echo $this->createUrl('/startup/publish', array('id'=> $id));?>',
                'cache': false,
                'dataType': 'json',
                'data': jQuery(this).parents("form").serialize(),
                'success': function (response) {
                    if (response && response.status) {
                        switch(response.status) {
                            case 'error':
                                Message.register(response.status, response.message);
                                break;
                            case 'success':
                                Message.register(response.status, response.message);
                                setInterval(function(){
                                    window.location.replace("<?php echo $this->createUrl('/startup/view/', array('alias'=> ''))?>" + response.alias );
                                },2000);
                                break;
                        }
                    }
                }
            });
            return false;
        });
    });
</script>
