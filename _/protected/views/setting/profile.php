<div id="profileForm" class="settingForm">
    <?php $form=$this->beginWidget('CActiveForm', array(
    'id'=>'profile-form',
    'enableClientValidation'=>false,
    'stateful'=>true,
    'htmlOptions'=>array('enctype' => 'multipart/form-data'),
    'clientOptions' => array(
        'validateOnSubmit'=>true,
        'validateOnChange'=>true,
        'validateOnType'=>false,
    ),
)); ?>

    <?php echo '<div id="sideTitle">'. Yii::t('profile', 'פרטים אישיים') . '</div>' ?>

    <div class="row">
        <?php echo $form->labelEx($model,'about_me_update'); ?>
        <?php echo $form->textArea($model,'about_me_update', array('style' => 'height: 70px;width: 435px;')); ?>
        <?php //$this->widget('application.widgets.ckeditor.CKEditor', array( 'name' => 'Profile[about_me_update]', 'value' => $model->about_me_update, 'editorTemplate' => 'basic' )); ?>
        <?php echo $form->error($model,'about_me_update'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model,'website'); ?>
        <?php echo $form->textField($model,'website'); ?>
        <?php echo $form->error($model,'website'); ?>
    </div>


   <?php
        $model->printFormPic($form);

        $user = Yii::app()->user->getModel(true);
        echo '<img id="settingPic" class="userPicSmall" src="' .$user->getProfilePic() .'">';
    ?>


    <?php echo '<div id="sideTitle">'. Yii::t('profile', 'Price and Main Category') . '</div>' ?>

    <div class="row">
        <?php echo $form->labelEx($model,'price_invest'); ?>
        <?php
        $prices= Price::model()->getAll();
        echo $form->dropDownList($model, 'price_invest', CHtml::listData($prices, 'name', 'name') ,array('id' => false, 'prompt' => '')); ?>
        <?php echo $form->error($model,'price_invest'); ?>
    </div>


    <div class="row">
        <?php echo $form->labelEx($model,'main_cat_id'); ?>
        <?php
        $categories =  Category::model()->findAll(array(
            'select' => 'id, name',
            'condition' => 'is_active = 1',
            'order' => 'name',
        ));
        echo $form->dropDownList($model, 'main_cat_id', CHtml::listData($categories , 'id', 'name') ,array('id' => false, 'prompt' => '')); ?>
        <?php echo $form->error($model,'main_cat_id'); ?>
    </div>

    <?php echo '<div id="sideTitle">'. Yii::t('profile', 'Select Favorite Invest Categories') . '</div>' ?>

    <div class="row">

    <div class="row many" id="categories">
        <?php

        echo CHtml::CheckboxList(
            'categoriesSelected',
            $model->getSelectedCategories(),
            CHtml::listData(Category::model()->findAll(), 'id', 'name'),
            array('template'=>'<div class="prd_cat">{input} {label}</div>',
                'separator' => ' ',
            )
        );
        ?>
    </div>
    </div>

    <div class="row buttons">
        <?php
        echo CHtml::SubmitButton(
                    Yii::t('gl','Save'),
                    array('id'=>'settingsSave',
                                'class' => 'btn')
                );
            echo '<div id="message">';
            if (isset($success))
            {
                echo '<div id="success">'. Yii::t('setting', 'Data saved successfuly') . '</div>';
            }
            echo '</div>';
        ?>
    </div>
    <?php $this->endWidget(); ?>
</div>