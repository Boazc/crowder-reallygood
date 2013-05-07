
<div class="container">
    <div class="pageTitle">
        <?php echo Yii::t('login',"Welcome back! Let's sign in.");?>
    </div>
    <div class="pageContent container-fluid">
        <div id="loginForm" class="form">
            <?php
            $form=$this->beginWidget('CActiveForm', array(
                'id'=>'login-form',
                'enableAjaxValidation'=>false,
                'enableClientValidation'=>true,
                'clientOptions'=>array(
                    'validateOnSubmit'=>true,
                ),
            )); ?>

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

            <div class="row buttons">
                <?php echo CHtml::submitButton(Yii::t('gl','Login'), array('class' => 'btn btn-success btn-large')); ?>
            </div>

            <div class="row buttons">
                <?php echo CHtml::link( Yii::t('login', 'Lost Password?'), array('lostpassword') ); ?>
            </div>

            <?php $this->endWidget(); ?>
        </div>

        <div  id="facebookConnect" class="roundedCorners">
            <?php echo CHtml::link( Yii::t('register', 'Sign Up'), array('/register'), array('class' => 'btn btn-info')); ?>
            <?php
            $this->renderPartial("/login/facebookLogin", array(
                'btnName' => Yii::t('facebook', 'Connect with Facebook'),
                'urlParams' => array(
                    'scenario' => CustomWebUser::LOGIN_SCENARIO,
                )));?>
        </div>
    </div>
</div>