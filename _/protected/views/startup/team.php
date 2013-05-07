<div id="startupTeam" class="settingForm2">

<?php

    if ($members)
    {
        $js = '';
        $defPic = yii::app()->baseUrl . '/uploads/Profiles/default.png';

        foreach ($members as &$mem)
        {

            // there is user
            if (isset($mem->member))
            {
                $js .= 'Team.addMember("' . $mem->id .'", "' . $id . '", "' . $mem->member->getFullName() . '", "' .$mem->title . '", "' . $mem->member->getProfilePic(). '", "' . $mem->is_admin . '");';
            }
            else
            {
                $js .= 'Team.addMember("' . $mem->id .'", "' . $id  . '", "' . $mem->full_name . '", "' .$mem->title . '", "' . $defPic . '", "' . $mem->is_admin . '");';
            }
        }

        $cs = Yii::app()->getClientScript();
        $cs->registerScript(__CLASS__.'#teamAdd', $js);
    }

?>
    <div  class="stTitle"><?php echo Yii::t('stForm','Add team member') ?></div>
    <div  ><?php echo Yii::t('stForm','Search team member in site or type mail and invite him!') ?></div>

    <div id="addNewTeamMember">
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

    <?php
        $this->widget('userAutoComplete', array(
            'model'=>new Member(),
            'attribute'=>'id',
            'name'=>'user_autocomplete',
            'source'=>$this->createUrl('/startup/usersAutoComplete'),  // Controller/Action path for action we created in step 4.
            // additional javascript options for the autocomplete plugin
            'options'=>array(
                'minLength'=>'0',
            ),
            'htmlOptions'=>array(
                'style'=>'height:20px;',
            ),
        ));
    ?>
    <div id="addTeamSubmit" class="btn btn-large btn-info clear"><?php echo Yii::t('startup','Add Member or Send Invitation') ?> </div>
    <div id="message"></div>
<?php $this->endWidget(); ?>

    </div>

    <div  class="stTitle"><?php echo Yii::t('stForm','Your Team') ?></div>

    <ul id="teamList"></ul>
</div>
<a class="initABtn" href="<?php echo $this->createUrl('/startup/media', array('id'=>$id)); ?>">
    <div class="btn  btn-large btn-success">
        <?php echo Yii::t('st','עבור להוספת מדיה'); ?>
    </div>
</a>
<script type="text/javascript">
    var csrfValid =  "&PHPSESSID=" + encodeURIComponent('<?php echo session_id() ?>') +
            "&YII_CSRF_TOKEN=" + encodeURIComponent('<?php echo Yii::app()->request->csrfToken ?>');
    jQuery(function ($) {
        jQuery('body').undelegate('#addTeamSubmit', 'click').delegate('#addTeamSubmit', 'click', function () {
            jQuery.ajax({
                'type': 'POST',
                'url': '<?php echo $this->createUrl('ajaxAddTeamMember', array('id'=> $id)); ?>',
                'cache': false,
                'dataType': 'json',
                'data': jQuery(this).parents("form").serialize() + csrfValid,
                'success': function (response) {
                    if (response && response.status) {
                        switch(response.status) {
                            case 'error':
                                Message.register(response.status, response.message);
                                break;
                            case 'success':
                                //Message.register(response.status, response.message);
                                Team.addMember(response.id, response.startup_id,response.full_name, response.title, response.image,response.is_admin);
                                goToByScroll("teamM" + response.id);
                                break;
                        }
                    }
                }
            });
            return false;
        });

        jQuery('body').undelegate('.deleteTeamMember', 'click').delegate('.deleteTeamMember', 'click', function () {
            jQuery.ajax({
                'type': 'POST',
                'url': '<?php echo $this->createUrl('ajaxDeleteTeamMember', array('id'=> $id)); ?>',
                'cache': false,
                'dataType': 'json',
                'data': jQuery(this).parents("form").serialize() + csrfValid,
                'success': function (response) {
                    if (response && response.status) {
                        switch(response.status) {
                            case 'error':
                                Message.register(response.status, response.message);
                                break;
                            case 'success':
                                Message.register(response.status, response.message);
                                jQuery("#teamM" + response.id).slideToggle('normal', function() {
                                    jQuery("#teamM" + response.id).remove();
                                });
                                break;
                        }
                    }
                }
            });
            return false;
        });

        jQuery('body').undelegate('.updateTeamMember', 'click').delegate('.updateTeamMember', 'click', function () {
            jQuery.ajax({
                'type': 'POST',
                'url': '<?php echo $this->createUrl('ajaxUpdateTeamMember', array('id'=> $id)); ?>',
                'cache': false,
                'dataType': 'json',
                'data': jQuery(this).parents("form").serialize() + csrfValid,
                'success': function (response) {
                    if (response && response.status) {
                        switch(response.status) {
                            case 'error':
                                Message.register(response.status, response.message);
                                break;
                            case 'success':
                                Message.register(response.status, response.message);
                                break;
                        }
                    }
                }
            });
            return false;
        });
    });

    var Team = new function() {
        this.addMember = function(id,startup_id, full_name, title, image, is_admin) {
            jQuery("#teamList").append(
        '<li class="teamMember" id="teamM' + id + '" style="display:none;"  >' +
            '<form enctype="multipart/form-data" method="post">' +
                '<input id="" class="deleteTeamMember seleteBtn" type="submit" name="deleteTeamMember" value="X"></div>' +
                '<img  src="' + image + '" >' +
                '<div style="display:none"><input type="hidden" value="' + id + '" name="Startupuser[id]"></div>' +
                '<div class="teamMemDetails">' +
                    '<div class="row buttons">' +
                        '<label for="Startup_full_name' + id + '"><?php echo Yii::t('teamMember', 'Name') ?></label>'+
                        '<input name="Startupuser[full_name]" id="Startup_full_name' + id + '" type="text" maxlength="40" value="' + full_name + '">' +
                    '</div>' +
                    '<div class="row buttons">' +
                        '<label for="Startup_title' + id + '"><?php echo Yii::t('teamMember', 'Title'); ?></label>'+
                        '<input name="Startupuser[title]" id="Startup_title' + id + '"  type="text" maxlength="125" value="' + title + '">' +
                    '</div>' +
                    '<div class="row buttons">' +
                        '<label for="Startupuser_is_admin_' + id + '"><?php echo Yii::t('teamMember', 'הרשאות'); ?></label>'+
                '<select class="select-input" name="Startupuser[is_admin]" id="Startupuser_is_admin_' + id + '" value="' + is_admin + '">' +
                            '<option value="0"><?php echo Yii::t('startup','Team Member'); ?></option>' +
                            '<option value="1"><?php echo Yii::t('startup','Team Leader'); ?></option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="row buttons">' +
                    '<input class="btn btn-medium btn-info updateTeamMember" type="submit" name="editTeamMember" value="<?php echo Yii::t('gl', 'עדכן חבר קבוצה') ?>">' +
                '</div>' +
            '</form>' +
        '</li>');
            jQuery("#Startupuser_is_admin_" + id).val(is_admin);
            jQuery("#teamM" + id).fadeIn();
        };

    }

</script>
