<?php
/**
 * Created by JetBrains PhpStorm.
 * User: nir
 * Date: 18/07/12
 * Time: 20:29
 * To change this template use File | Settings | File Templates.
 */

    Yii::app()->clientScript->registerScriptFile( Yii::app()->themeManager->baseUrl . '/script/jquery.bpopup.min.js' , CClientScript::POS_END );

    $cat = Category::model()->find('name = :name', array(':name' => 'בריאות'));

    $defualtPriceInvest = '2000' ;
    $defualtCatInvestId = $cat->id;
    $defualtCatName = $cat->name;

    if (!isset($model))
    {
        $model = new RegisterForm();
    }

    $model->price = $defualtPriceInvest ;
    $model->mainCategory = $defualtCatInvestId;
?>
<div id="registerBox">

    <div id="investPriceBox">
        <div id="tInvestPrice"><?php echo Yii::t('investPrice', 'מלא את הפרטים הבאים והפוך לחלק מקהילת הסטארט-אפים של ישראל ') ?></div>

    </div>

    <div id="normalRegister" >
        <div class="form">
              <?php $form=$this->beginWidget('CActiveForm', array(
                      'action' => $this->createUrl('/register/index'),
                      'id'=>'register-form',
                      'enableAjaxValidation'=>true,
                      'enableClientValidation'=>true,
                      'clientOptions'=>array(
                            'validateOnSubmit'=>true,
                      ),
                )); ?>

              <div class="row">
                    <?php echo $form->labelEx($model,'name'); ?>
                    <?php echo $form->textField($model,'name'); ?>
                    <?php echo $form->error($model,'name'); ?>
              </div>

              <div class="row">
                    <?php echo $form->labelEx($model,'email'); ?>
                    <?php echo $form->textField($model,'email'); ?>
                    <?php echo $form->error($model,'email'); ?>
              </div>

              <div class="row">
                    <?php echo $form->labelEx($model,'password'); ?>
                    <?php echo $form->passwordField($model,'password'); ?>
                    <?php echo $form->error($model,'password'); ?>
              </div>

              <?php echo $form->hiddenField($model,'mainCategory'); ?>
              <?php echo $form->hiddenField($model,'price'); ?>

              <div class="row buttons">
                    <?php echo CHtml::submitButton(Yii::t('gl','הרשם עכשיו'), array(
                                'id' => 'registerBtn',
                                'class' => 'btn btn-info btn-large')); ?>
              </div>

         <?php $this->endWidget(); ?>
   </div>
   </div>
   <div id="facebookRegister">
         <?php
            $this->renderPartial("/login/facebookLogin",
                    array('btnName' => Yii::t('facebook', 'הרשם עם פייסבוק'),
                                'urlParams' => array(
                                    'scenario' => CustomWebUser::SIGNUP_SCENARIO,
                                    'price_invest' =>'price_invest_val',
                                    'invest_cat' =>'invest_cat_val'
                                )
                    ));
        ?>
   </div>
    <div id="pricePopup" class="regPopup" >
        <div class="mTitle"><?php echo Yii::t('popup','בחר את סכום הכסף אותו היית רוצה להשקיע'); ?></div>
        <?php
        $prices =  Price::model()->getAll();

        echo '<ul id="priceList">';
            foreach ($prices as $price)
            {
                echo '<li class="ease">'. $price->name. '</li>';
            }
            echo '</ul> ';
        ?>
    </div>

    <div id="categoryPopup" class="regPopup"  >
        <div class="mTitle"><?php echo Yii::t('popup','בחר את התחום המועדף עליך ביותר להשקעה'); ?></div>
        <?php
            $categories =  Category::model()->findAll(array(
                                                'select' => 'id, name',
                                                'condition' => 'is_active = 1',
                                                'order' => 'name',
                                            ));
            
            echo '<ul id="categoriesList">';
            foreach ($categories as $cat)
            {
                echo '<li id="cat'. $cat->id .'" class="ease">'. $cat->name . '</li>';
            }
            echo '</ul> ';
        ?>
    </div>
</div>

<script type="text/javascript">
    // Semicolon (;) to ensure closing of earlier scripting
    // Encapsulation
    // $ is assigned to jQuery
    ;(function($) {

        // DOM Ready
        $(function() {

            $('#priceList li').bind('click', function(e) {
                $('#pricePopup').bPopup().close();
                $('#RegisterForm_price').val($(this).text());
                $('#pricePopupBtn').html($(this).text() + ' ₪');
            });

            // Binding a click event
            $('#categoriesList li').bind('click', function(e) {
                $('#categoryPopup').bPopup().close();
                $('#catPopupBtn').html($(this).text());
                var catID =  $(this).attr('id').replace('cat', '');
                $('#RegisterForm_mainCategory').val(catID);
            });

            $('#pricePopupBtn').bind('click', function(e) {
                // Prevents the default action to be triggered.
                e.preventDefault();

                // Triggering bPopup when click event is fired
                $('#pricePopup').bPopup({
                    modalClose: false,
                    opacity: 0.6,
                    positionStyle: 'fixed', //'fixed' or 'absolute'
                    fadeSpeed: 500 //can be a string ('slow'/'fast') or int
                });
            });

            $('#catPopupBtn').bind('click', function(e) {
                // Prevents the default action to be triggered.
                e.preventDefault();

                // Triggering bPopup when click event is fired
                $('#categoryPopup').bPopup({
                    modalClose: false,
                    opacity: 0.6,
                    positionStyle: 'fixed', //'fixed' or 'absolute'
                    fadeSpeed: 500 //can be a string ('slow'/'fast') or int
                });
            });

        });

    })(jQuery);
</script>
