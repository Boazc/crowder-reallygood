<div id="videoPitch">
    <div class="stTitle"><?php echo Yii::t('startup', 'Video Pitch') ?></div>
    <div id="videoBox"></div>
    <form id="videoPitchUpload" enctype="multipart/form-data" method="post">
        <div id="videoUp" ><?php echo Yii::t('startup','Copy and Paste your YouTube url ID') ?> </div>
        <div id="videoUpExample" >http://www.youtube.com/watch?v=<b>kyKuX4nYjYU</b></div>

        <input name="Startup[peach_video_url]" style="display: block;" id="Startup_peach_video_url" type="text" maxlength="150" value="">
        <div id="videoIdDelete" class="btn btn-danger"><?php echo Yii::t('stMed', 'Remove Video') ?></div>
        <input id="updateVideo" class="btn btn-success" type="submit" value="<?php echo Yii::t('startup','Save Video') ?>">
    </form>
</div>

<div id="startupMedia" class="settingForm2">

    <div class="stTitle"><?php echo Yii::t('startup', 'הסבר את המיזם בעזרת תמונות') ?></div>

    <div><?php echo Yii::t('startup', 'בנה את רשימת התמונות המתחלפות שיוצגו בעמוד המיזם') ?> </div>

    <?php $form=$this->beginWidget('CActiveForm', array(
    'id'=>'media-form',
    'enableClientValidation'=>true,
    'clientOptions' => array(
        'validateOnSubmit'=>true,
        'validateOnChange'=>true,
        'validateOnType'=>false,
    ),
)); ?>

    <ul id="mediaList"></ul>

    <div id="addMedia" class="btn btn-info btn-medium"><?php echo Yii::t('startup','Add Another Photo') ?> </div>

    <div class="row buttons">
        <input id="saveMedias" class="btn btn-success btn-large" type="submit" value="<?php echo Yii::t('gl', 'שמור ועבור לניהול התכנים') ?>">
        <div id="message"></div>
    </div>

<?php $this->endWidget(); ?>

</div>

    <?php
    // Register ajax XHR uploads
    $this->widget('system.web.my.ext.EAjaxUpload.EAjaxUpload',array('registerOnly' => true));

    // Set all js builder
    $js = '';

    if ($medias)
    {
        foreach ($medias as $med)
        {
            // id, image, title, index_id
            $js .= 'Media.addImage("' . $med->id .'", "' . $med->getMainThumbImage() . '", "' . $med->title. '", "' .$med->index_id . '");';
        }

        $js .= 'Media.addEmptyImage();';

    }
    else
    {
        $js .= 'Media.addEmptyImage();';
        $js .= 'Media.addEmptyImage();';
    }

    // Sett video
    if ($video != "")
    {
        $js .= 'Media.loadVideo("' . $video .'");';
    }
    else
    {
        $js .= 'Media.setEmptyVideo();';
    }

    $cs = Yii::app()->getClientScript();
    $cs->registerScript(__CLASS__.'#imageAdd', $js);
?>


<script type="text/javascript">
    jQuery(function ($) {


        $('#Startup_peach_video_url').bind('change',function (){
            var v = getVideoVar()["v"];
            if (v != "")
            {
                $('#Startup_peach_video_url').val(v);
            }
        });

        function getVideoVar() {
            var vars = {};
            var youtube = $('#Startup_peach_video_url').val();
            var parts = youtube.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }

            jQuery('body').undelegate('#addMedia', 'click').delegate('#addMedia', 'click', function () {
            Media.addEmptyImage();
        });

        jQuery('body').undelegate('#updateVideo', 'click').delegate('#updateVideo', 'click', function () {
            Media.updateVideo(this);
            return false;
        });

        jQuery('body').undelegate('#addMedia', 'click').delegate('#addMedia', 'click', function () {
            Media.addEmptyImage();
        });

        jQuery('body').undelegate('#videoIdDelete', 'click').delegate('#videoIdDelete', 'click', function () {
            Media.removeVideo(this);
            return false;
        });

        jQuery('body').undelegate('#saveMedias', 'click').delegate('#saveMedias', 'click', function () {
            Media.updateMedia(this);
            return false;
        });
    });

    var numImage = 0;

    var csrfValid =  "&PHPSESSID=" + encodeURIComponent('<?php echo session_id() ?>') +
            "&YII_CSRF_TOKEN=" + encodeURIComponent('<?php echo Yii::app()->request->csrfToken ?>');

    var Media = new function() {
        this.updateMedia = function (btn) {
            jQuery.ajax({
                'type': 'POST',
                'url': '<?php echo $this->createUrl('ajaxUpdateMedia', array('id'=> $id)); ?>',
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
                                Message.register(response.status, response.message);
                                //jQuery("#message").html(response.message);
                                setInterval(function(){
                                    window.location.replace("<?php echo $this->createUrl('/startup/pitch', array('id'=>$id)); ?>");
                                },2000);
                                break;
                        }
                    }
                }
            });
        }
        this.updateVideo = function (btn) {
            jQuery(btn).parents("form").serialize();
            jQuery.ajax({
                'type': 'POST',
                'url': '<?php echo $this->createUrl('ajaxUpdateVideo', array('id'=> $id)); ?>',
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
                                Message.register(response.status, response.message);
                                Media.loadVideo(response.video);
                                break;
                        }
                    }
                }
            });
        }

        this.removeVideo = function (btn) {
            jQuery.ajax({
                'type': 'GET',
                'url': '<?php echo $this->createUrl('ajaxDeleteVideo', array('id'=> $id)); ?>',
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
                                Message.register(response.status, response.message);
                                Media.setEmptyVideo();
                                break;
                        }
                    }
                }
            });
        };

        this.setEmptyVideo = function() {
            jQuery("#Startup_peach_video_url").val('');
            jQuery("#videoBox").html('<div id="noVideoPitch"><?php echo Yii::t('startup', 'No Video Uploaded') ?></div>');
        }

        this.loadVideo = function(videoID) {
            var newvid = '<iframe width="600" height="250" src="http://www.youtube.com/embed/'+videoID+'" frameborder="0" allowfullscreen></iframe>'
            jQuery('#videoBox').html(newvid);
            $("#Startup_peach_video_url").val(videoID);
            return true;
        };

        this.addEmptyImage = function() {
            numImage++;
            jQuery("#mediaList").append('<li id="imageUp' + numImage + '" style="display:none;"  >' +
                    '<div onclick="Media.delImage(' + numImage +');" id="deleteMedia_'+ numImage + '" class="deleteMedia btn btn-danger" >X</div>' +
                    '<label ><?php echo Yii::t('startup', 'Title') ;?></label>' +
                    '<input name="Startupmedia[' + numImage + '][title]" id="Startup_title_'+ numImage +'" type="text" maxlength="125" value="">' +
                    '<input name="Startupmedia[' + numImage + '][id]" id="Startupmedia_id_'+ numImage +'" type="hidden" value="" >' +
                    '<input name="Startupmedia[' + numImage + '][image]" id="Startupmedia_image_'+ numImage +'" type="hidden" value="" >' +
                    '<div id="uploaderImg' + numImage + '"></div>' +

                    '</li>');

            new qq.FileUploader({
                    'element':document.getElementById("uploaderImg" + numImage),
                    'debug':false,
                    'multiple':false,
                    'action':'<?php echo $this->createUrl('/startup/ajaxUploadMediaImage/', array('id' =>$id)); ?>?numImg=' + numImage,
                    'allowedExtensions':['jpg','jpeg','png'],
                    'sizeLimit':1048576,
                    'minSizeLimit':0,
                    'onComplete':function(id, fileName, responseJSON)
                    {
                        $('#Startupmedia_image_' + responseJSON.imageNum).val(responseJSON.filename);
                        $('#Startupmedia_id_' + responseJSON.imageNum).val(responseJSON.id);
                        $('#uploaderImg' + responseJSON.imageNum).html('<img id="logoStManage" style="max-height: 100px;" src="' + responseJSON.baseUrl + responseJSON.filename + '" >');
                    },
                    'params':{'PHPSESSID':'<?php echo session_id() ?>','YII_CSRF_TOKEN':'<?php echo CJavaScript::quote(Yii::app()->request->csrfToken) ?>'}
                });
            jQuery("#imageUp" + numImage).fadeIn();
        };

        this.addImage = function(id, imageUrl, title, index_id) {
            numImage++;
            jQuery("#mediaList").append('<li id="imageUp' + numImage + '" style="display:none;"  >' +
                    '<div onclick="Media.delImage(' + numImage +');" id="deleteMedia_'+ numImage + '" class="deleteMedia btn btn-danger" >X</div>' +
                    '<label ><?php echo Yii::t('startup', 'Title') ;?></label>' +
                    '<input name="Startupmedia[' + numImage + '][title]" id="Startupmedia_title_'+ numImage +'" type="text" maxlength="125" value="' + title +'">' +
                    '<input name="Startupmedia[' + numImage + '][id]" id="Startupmedia_id_'+ numImage +'" type="hidden" value="' + id +'" >' +
                    '<input name="Startupmedia[' + numImage + '][index_id]" id="Startupmedia_index_id_'+ numImage +'" type="hidden" value="' + index_id +'" >' +
                    '<div id="uploaderImg' + numImage + '"></div>' +
                    '</li>');

            $('#uploaderImg' + numImage).html('<img id="logoStManage" style="max-height: 100px;" src="' + imageUrl + '" >');
            jQuery("#imageUp" + numImage).fadeIn();
        };

        this.delImage = function(imageID) {
            var mediaID = $('#Startupmedia_id_'+ imageID).val();
            if (mediaID == '')
            {
                jQuery("#imageUp" + imageID).slideToggle('normal', function() {
                    jQuery("#imageUp" + imageID).remove();
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
                                    jQuery("#imageUp" + imageID).slideToggle('normal', function() {
                                        jQuery("#imageUp" + imageID).remove();
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

        this.saveImage = function(imageID) {
            var imageeID = $('#Startupmedia_id_'+ imageID).val();
            jQuery.ajax({
                'type': 'GET',
                'url': '<?php echo $this->createUrl('ajaxDeleteMedia', array('id'=> $id)); ?>?imgID=' +  imageID,
                'cache': false,
                'dataType': 'json',
                'success': function (response) {
                    if (response && response.status) {
                        switch(response.status) {
                            case 'error':
                                jQuery("#message").html(response.message);
                                jQuery("#imageUp" + imageID).slideToggle('normal', function() {
                                    jQuery("#teamM" + response.id).remove();
                                });
                                break;
                            case 'success':
                                jQuery("#message").html(response.message);
                                break;
                        }
                    }
                }
            });
        }
    }
</script>
