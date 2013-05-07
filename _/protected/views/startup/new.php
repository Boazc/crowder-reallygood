<?php
    echo $page->content;
    $this->renderPartial('_formCompany', array('model' => $model, 'btn' => Yii::t('gl', 'יצירה ומעבר לחברי הצוות')));
?>


<script type="text/javascript">

    jQuery(function ($) {
        jQuery('body').undelegate('#saveDetail', 'click').delegate('#saveDetail', 'click', function () {
            jQuery.ajax({
                'type': 'POST',
                'url': '<?php echo $this->createUrl('startup/new');?>',
                'cache': false,
                'dataType': 'json',
                'data': jQuery(this).parents("form").serialize(),
                'success': function (response) {
                    if (response && response.status) {
                        switch(response.status) {
                            case 'error':
                                Message.register(response.status, response.message);
                                jQuery("#message").html(response.message + response.error);
                                break;
                            case 'success':
                                Message.register(response.status, response.message);
                                setInterval(function(){
                                    window.location.replace("<?php echo $this->createUrl('/startup/team') ?>/" + response.id);
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
