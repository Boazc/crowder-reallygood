<head>
    <meta http-equiv="Content-Type" content="text/html; charset=<?php echo Yii::app()->charset; ?>">

    <meta name="google-site-verification" content="hg9AUxRqyk32CF675HLq6Wo0Mmb0rHOGCNSvXNUV6G4" />
    <title><?php echo ( count( $this->pageTitle ) ) ? implode( ' - ', array_reverse( $this->pageTitle ) ) : $this->pageTitle; ?></title>

    <!--[if lt IE 7]>
    <style type="text/css">@import "<?php echo Yii::app()->themeManager->baseUrl; ?>/style/ie.css";</style>
    <script src="<?php echo Yii::app()->themeManager->baseUrl; ?>/script/DD_belatedPNG.js" type="text/javascript"></script>
    <script type="text/javascript">
        DD_belatedPNG.fix('#logo span, #intro, #menuslide li, #texttestimonial, .icon1, .icon2, .icon3, .icon4, .icon5, .icon6, .icon7, .icon8, .icon9, .icon10, .icon11, .icon12, .icon13, .icon14, .icon15, .icon16, .icon17, .icon18, .icon19, #placepriceslide li, .ribbon1, .ribbon2, .ribbon3, #placemainmenu, .iconmini1, .iconmini2, #menupopup li div, #placemainmenu ul li ul li, #menupopup li div a.linkpopupdownload, #menupopup li div a.linkpopuprelease, #contentbottom, #placetwitter, img');
    </script>
    <![endif]-->
    <!--[if IE 7]><style type="text/css">@import "<?php echo Yii::app()->themeManager->baseUrl; ?>/style/ie7.css";</style>
<script src="<?php echo Yii::app()->themeManager->baseUrl; ?>/script/DD_belatedPNG.js" type="text/javascript"></script>
<script type="text/javascript">
    DD_belatedPNG.fix('#menupopup li div');
</script>
    <![endif]-->

    <?php
        $cs = Yii::app()->getClientScript();

        $cs->registerCoreScript('jquery');

        $cs->registerScriptFile( Yii::app()->themeManager->baseUrl . '/script/global.js' , CClientScript::POS_END );
        $cs->registerScriptFile( Yii::app()->themeManager->baseUrl . '/script/message.js' , CClientScript::POS_END );
        //Yii::app()->clientScript->registerScriptFile( Yii::app()->themeManager->baseUrl . '/script/ui_tabs.js' , CClientScript::POS_END );
        //Yii::app()->clientScript->registerScriptFile( Yii::app()->themeManager->baseUrl . '/script/lightbox.js' , CClientScript::POS_END );
        //Yii::app()->clientScript->registerScriptFile( Yii::app()->themeManager->baseUrl . '/script/bubblepopup.js' , CClientScript::POS_END );

        $cs->registerCssFile( Yii::app()->themeManager->baseUrl . '/style/style.css', '' );

        if( Yii::app()->locale->getOrientation() == 'rtl' )
        {
            $cs->registerCssFile( Yii::app()->themeManager->baseUrl . '/style/rtl.css', 'screen' );
        }

        // Messages
        $js = '';
        if( Yii::app()->user->hasFlash('error') )
        {
            $js .= 'Message.error("'. Yii::app()->user->getFlash('error'). '");';
        }
        if( Yii::app()->user->hasFlash('success') )
        {
            $js .= 'Message.success("'. Yii::app()->user->getFlash('success'). '");';
        }

        $cs->registerScript('#messages', $js, CClientScript::POS_END);

    ?>
    <meta property="og:image" content="<?php echo yii::app()->createAbsoluteUrl('themes/site/images/logoFacebookSmal.png'); ?>"/>

    <?php Yii::app()->bootstrap->register(); ?>

</head>