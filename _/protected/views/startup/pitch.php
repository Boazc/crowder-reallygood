
<div id="startupPitch" class="settingForm1">
    <div  class="stTitle"><?php echo Yii::t('stForm','Build Your Basic Pitch') ?></div>

    <ul id="pitchList"></ul>

    <div  class="stTitle"><?php echo Yii::t('stForm','Add some question!') ?></div>

    <ul id="samplePitchList" class="initUl">
        <?php
            $defPitchQues ='';
            foreach ($samples as $sample)
            {
                if ($sample->is_active)
                {
                    $defPitchQues .= 'Pitch.addNewPitch("' .$sample->name  .'");';
                }
                else
                {
                    echo '<li title="' . Yii::t('startup','Add Question') .'" class="samplePitchAdd">' . $sample->name . '</li>';
                }
            }
        ?>
    </ul>

    <div id="addPitchQuest" class="btn btn-info btn-medium"><?php echo Yii::t('startup','Write your own question') ?> </div>

    <div class="initABtn" onclick="Pitch.saveAllPitch()" >
        <div class="btn  btn-large btn-success" >
            <?php echo Yii::t('st','עבור להפצת המיזם'); ?>
        </div>
    </div>

</div>

<?php
// Register ajax XHR uploads
$this->widget('system.web.my.ext.EAjaxUpload.EAjaxUpload',array('registerOnly' => 'true'));

// Set all js builder
$js = '';

if ($pitches)
{
    foreach ($pitches as $pit)
    {
        $image = $pit->getMainThumbImage(false);
        if ($image == false)
        {
            $image = "";
        }
        // id, image, title, index_id
        $js .= 'Pitch.addPitch("' . $pit->id .'", "' . $image . '", "' . CJavaScript::quote($pit->title) . '", "' . CJavaScript::quote($pit->content) . '", "' . $pit->index_id . '", "' . $pit->image .'");';
    }
}
else
{
    $js .= $defPitchQues;
}

$cs = Yii::app()->getClientScript();
$cs->registerScript(__CLASS__.'#pitchAdd', $js);
?>


<script type="text/javascript">
var Pitch = new function() {
    var numImage = 0;


    var csrfValid =  "&PHPSESSID=" + encodeURIComponent('<?php echo session_id() ?>') +
            "&YII_CSRF_TOKEN=" + encodeURIComponent('<?php echo Yii::app()->request->csrfToken ?>');

    this.saveAllPitch = function() {
        $(".updatePitch").each(function(a) {
            var message = Pitch.updatePitch(this, false);
        });

        Message.register('success', 'הסבר נשמר בהצלחה, כבר מסיימים!');
        document.location.hash = "publish";
        setInterval(function(){
            window.location.replace("<?php echo $this->createUrl('/startup/publish', array('id'=>$id)); ?>");
        },2000);
    }

    this.updatePitch = function(btn, show) {
        if (show === "")
        {
            show = true;
        }
        jQuery.ajax({
            'type': 'POST',
            'url': '<?php echo $this->createUrl('ajaxUpdatePitch', array('id'=> $id)); ?>',
            'cache': false,
            'dataType': 'json',
            'data': jQuery(btn).parents("form").serialize() + csrfValid,
            'success': function (response) {
                if (response && response.status) {
                    switch(response.status) {
                        case 'error':
                            Message.register(response.status, response.message);
                            break;
                        case 'success':
                            jQuery("#Startupmedia_id_" + response.div_num).val(response.pitch_id);
                            if (show === true)
                            {
                                Message.register(response.status, response.message);
                            }
                                else
                            {
                                return response.message;
                            }
                            break;
                    }
                }
            }
        });
    }

    this.addNewPitch = function(title) {
        this.addPitch('','',title,'','','');
    }

    this.addPitch = function(id, imageUrl, title, content, index_id, image) {
        numImage++;
        jQuery("#pitchList").append('<li id="pitch' + numImage + '" style="display:none;" class="pitchBox" >' +
                '<form enctype="multipart/form-data" method="post">' +
                '<div class="pitchHead">' +
                '<div onclick="Pitch.delPitch(' + numImage +');" id="deleteMedia_'+ numImage + '" class="deleteMedia btn btn-danger" >X</div>' +
                '<input name="Startupmedia[' + numImage + '][title]" class="pitchTitle" id="Startupmedia_title_'+ numImage +'" type="text" maxlength="125" value="' + title +'">' +
                '</div>' +
                '<textarea name="Startupmedia[' + numImage + '][content]" class="pitchContent" id="Startupmedia_content_'+ numImage +'" type="" maxlength="500"></textarea>' +
                '<input name="Startupmedia[' + numImage + '][id]" id="Startupmedia_id_'+ numImage +'" type="hidden" value="' + id +'" >' +
                '<input name="Startupmedia[' + numImage + '][index_id]" id="Startupmedia_index_id_'+ numImage +'" type="hidden" value="' + index_id +'" >' +
                '<div class="pitchUpload" id="uploaderImg' + numImage + '"></div>' +

                '<div class="buttons">' +
                '<input class="btn btn-success btn-medium updatePitch" type="submit" value="<?php echo Yii::t('gl', 'Save') ?>"></div>' +

                '</form>' +
                '</li>');
        $("textarea#Startupmedia_content_" + numImage).val(content);

        if (imageUrl == "")
        {
            Pitch.ajaxUploadBtm(numImage);
        }
        else
        {
            Pitch.printImage(numImage,imageUrl, image);
        }

        jQuery("#pitch" + numImage).fadeIn();

    };

    this.ajaxUploadBtm= function(divNum) {
        $('#uploaderImg' + divNum).html('');

        new qq.FileUploader({
            'element':document.getElementById("uploaderImg" + divNum),
            'debug':false,
            'multiple':false,
            'action':'<?php echo $this->createUrl('/startup/ajaxUploadPitchImage/', array('id' =>$id)); ?>?numImg=' + divNum,
            'allowedExtensions':['jpg','jpeg','png'],
            'sizeLimit':1048576,
            'minSizeLimit':0,
            'onComplete':function(id, fileName, responseJSON)
            {
                $('#Startupmedia_image_' + responseJSON.imageNum).val(responseJSON.filename);
                Pitch.printImage(responseJSON.imageNum,responseJSON.baseUrl + responseJSON.filename, responseJSON.filename);
            },
            'params':{'PHPSESSID':'<?php echo session_id() ?>','YII_CSRF_TOKEN':'<?php echo Yii::app()->request->csrfToken; ?>'}
        });
    }
    this.printImage = function(divNum, url, imageName) {
        $('#uploaderImg' + divNum).html(
            '<div class="pitchUploadImagaeBox">'+
                '<div title="ההסר תמונה" onclick="Pitch.ajaxUploadBtm(' + divNum + ')" >X</div>' +
                '<input name="Startupmedia[' + divNum + '][image]" id="Startupmedia_image_'+ divNum +'" type="hidden" value="' + imageName +'" >' +
                '<img src="' + url + '" >' +
            '</div>'
        );
    }

    this.delPitch = function(imageID) {
        var mediaID = $('#Startupmedia_id_'+ imageID).val();
        if (mediaID == '')
        {
            jQuery("#pitch" + imageID).slideToggle('normal', function() {
                jQuery("#pitch" + imageID).remove();
            });
        }
        else
        {
            jQuery.ajax({
                'type': 'GET',
                'url': '<?php echo $this->createUrl('ajaxDeleteMedia', array('id'=> $id)); ?>?imgID=' +  mediaID,
                'cache': false,
                'dataType': 'json',
                'success': function (response) {
                    if (response && response.status) {
                        switch(response.status) {
                            case 'success':
                                Message.register(response.status, response.message);
                                jQuery("#pitch" + imageID).slideToggle('normal', function() {
                                    jQuery("#pitch" + imageID).remove();
                                });
                                break;
                            case 'error':
                                Message.register(response.status, response.message);
                                break;
                        }
                    }
                }
            });
        }
    }

}

jQuery(function ($) {

    jQuery('body').undelegate('.updatePitch', 'click').delegate('.updatePitch', 'click', function () {
        Pitch.updatePitch(this,"");
        return false;
    });

    jQuery('body').undelegate('#addPitchQuest', 'click').delegate('#addPitchQuest', 'click', function () {
        Pitch.addNewPitch("");
        return false;
    });

    jQuery('body').undelegate('.samplePitchAdd', 'click').delegate('.samplePitchAdd', 'click', function () {
        Pitch.addNewPitch($(this).html());
        return false;
    });
});


</script>
