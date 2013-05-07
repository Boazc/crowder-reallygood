
<div id="startupForm" class="settingForm">
    <?php
    if (Yii::app()->authManager->checkAccess("op_update_startup", Yii::app()->user->id))
    {
        ?>
        <a class="initABtn" href="<?php echo $this->createUrl('/startup/selectedStartup', array('id'=>$model->id)); ?>">
            <div class="btn  btn-large btn-info pull-right">
                <?php echo Yii::t('st','בחר כמיזם נבחר'); ?>
            </div>
        </a>
        <?php
    }
    ?>

    <?php $form=$this->beginWidget('CActiveForm', array(
    'id'=>'startup-form',
    'enableClientValidation'=>true,
    'clientOptions' => array(
        'validateOnSubmit'=>true,
        'validateOnChange'=>true,
        'validateOnType'=>false,
    ),
)); ?>

    <div id="companyDetails" class="stForm">
        <div  class="stTitle"><?php echo Yii::t('stForm','Build your company profile') ?></div>
        <div class="stFormInput">
            <div style="float:right; display: table; width: 390px;">
                <div class="row">
                    <?php echo $form->labelEx($model,'name'); ?>
                    <?php echo $form->textField($model,'name'); ?>
                    <?php echo $form->error($model,'name'); ?>
                </div>

                <div class="row">
                    <?php echo $form->labelEx($model,'slogan'); ?>
                    <?php echo $form->textField($model,'slogan'); ?>
                    <?php echo $form->error($model,'slogan'); ?>
                </div>

                <div class="row">
                    <?php echo $form->labelEx($model,'site'); ?>
                    <?php echo $form->textField($model,'site', array('style' => 'direction: ltr;')); ?>
                    <?php echo $form->error($model,'site'); ?>
                </div>
            </div>


            <div >
                <?php echo $form->labelEx($model,'short_content'); ?>
                <?php echo $form->textArea($model,'short_content', array('style' => 'width: 360px;height: 110px;')); ?>
                <?php echo $form->error($model,'short_content'); ?>
            </div>
        </div>
    </div>


    <div id="companyDetails" class="stForm">
        <div  class="stTitle"><?php echo Yii::t('stForm','Contact Info') ?></div>
        <div class="stFormInput">
            <div class="row">
                <?php echo $form->labelEx($model,'address'); ?>
                <?php echo $form->textField($model,'address'); ?>
                <?php echo $form->error($model,'address'); ?>
            </div>
            <div class="row">
                <?php echo $form->labelEx($model,'city'); ?>
                <?php echo $form->textField($model,'city'); ?>
                <?php echo $form->error($model,'city'); ?>
            </div>
            <div class="row">
                <?php echo $form->labelEx($model,'phone'); ?>
                <?php echo $form->textField($model,'phone'); ?>
                <?php echo $form->error($model,'phone'); ?>
            </div>

        </div>
    </div>
    <div class="imgUp">
        <div  class="stTitle"><?php echo Yii::t('stForm','Company Logo') ?></div>

        <?php
        $this->widget('system.web.my.ext.EAjaxUpload.EAjaxUpload',
            array(
                'id'=>'uploadFile',
                'config'=>array(
                    'action'=>Yii::app()->createUrl('startup/ajaxUploadImage'),
                    'allowedExtensions'=>array("jpg", "jpeg","png"),//array("jpg","jpeg","gif","exe","mov" and etc...
                    'sizeLimit'=>1*1024*1024,// maximum file size in bytes
                    'minSizeLimit' => 0*1024*1024,// minimum file size in bytes
                    'onComplete'=>"js:function(id, fileName, responseJSON)
                    { $('#Startup_image').val(responseJSON.filename); $('#attachAgain').show();
                      addImage(responseJSON.baseUrl + responseJSON.filename);
                      $('ul.qq-upload-list').html('');
                    }",
                    //'messages'=>array(
                    //                  'typeError'=>"{file} has invalid extension. Only {extensions} are allowed.",
                    //                  'sizeError'=>"{file} is too large, maximum file size is {sizeLimit}.",
                    //                  'minSizeError'=>"{file} is too small, minimum file size is {minSizeLimit}.",
                    //                  'emptyError'=>"{file} is empty, please select files again without it.",
                    //                  'onLeave'=>"The files are being uploaded, if you leave now the upload will be cancelled."
                    //                 ),
                    //'showMessage'=>"js:function(message){ alert(message); }"
                ),
            ));

        echo $form->hiddenField($model,'image');
        if ($model->image)
        {
            $cs = Yii::app()->getClientScript();
            $cs->registerScript(__CLASS__.'#imageAdd', 'addImage("' . $model->getMainThumbImage() .'");');
        }
        ?>
        <div id="uplodedImg" ></div>
    </div>
    <div class="imgUp">

        <div  class="stTitle "><?php echo Yii::t('stForm','תמונה ראשית לתצוגה') ?></div>

        <?php
        $this->widget('system.web.my.ext.EAjaxUpload.EAjaxUpload',
            array(
                'id'=>'uploadFile2',
                'config'=>array(
                    'action'=>Yii::app()->createUrl('startup/ajaxUploadImage'),
                    'allowedExtensions'=>array("jpg", "jpeg","png"),//array("jpg","jpeg","gif","exe","mov" and etc...
                    'sizeLimit'=>1*1024*1024,// maximum file size in bytes
                    'minSizeLimit' => 0*1024*1024,// minimum file size in bytes
                    'onComplete'=>"js:function(id, fileName, responseJSON)
                    { $('#Startup_main_image').val(responseJSON.filename); $('#attachAgain').show();
                      addImage2(responseJSON.baseUrl + responseJSON.filename);
                      $('ul.qq-upload-list').html('');
                    }",
                    //'messages'=>array(
                    //                  'typeError'=>"{file} has invalid extension. Only {extensions} are allowed.",
                    //                  'sizeError'=>"{file} is too large, maximum file size is {sizeLimit}.",
                    //                  'minSizeError'=>"{file} is too small, minimum file size is {minSizeLimit}.",
                    //                  'emptyError'=>"{file} is empty, please select files again without it.",
                    //                  'onLeave'=>"The files are being uploaded, if you leave now the upload will be cancelled."
                    //                 ),
                    //'showMessage'=>"js:function(message){ alert(message); }"
                ),
            ));

        echo $form->hiddenField($model,'main_image');
        if ($model->main_image)
        {
            $model->image = $model->main_image;
            $cs = Yii::app()->getClientScript();
            $cs->registerScript(__CLASS__.'#imageAdd2', 'addImage2("' . $model->getMainThumbImage() .'");');
        }
        ?>
        <div id="uplodedImg2" ></div>
    </div>

    <div class="row buttons">
        <input id="saveDetail" class="btn btn-large btn-success" type="submit" name="editCompay" value="<?php echo $btn ?>">
    </div>
    <?php $this->endWidget(); ?>
</div>
<div id="message"></div>

<script type="text/javascript">
    function addImage(url) {
        $('#uplodedImg').append('<img id=\"logoStManage\"  style=\"max-height: 100px;\" src=\"' + url + '\" >');
    }
    function addImage2(url) {
        $('#uplodedImg2').append('<img id=\"logoStManage\"  style=\"max-height: 100px;\" src=\"' + url + '\" >');
    }
</script>