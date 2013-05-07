    <div id="footer"  >
    <div class="container" >

        <?php
        /* <a id="fLogo"  href="<?php echo  $this->createUrl('/index'); ?>" > <img  src="<?php echo $this->image . 'logo.png'; ?>"></a> */
        ?>
    <div class="row">
        <div class="span4">
            <a class="footerTitle"  href="<?php echo  $this->createUrl('/index'); ?>"> <?php echo Yii::t('footer','על קראודר') ?></a>
            <?php
            $this->widget('zii.widgets.CMenu',array(
                'items'=>array(
                    array('label'=>Yii::t('mainmanu','מי אנחנו'), 'url'=>array('/info/overview')),
                    array('label'=>Yii::t('mainmanu','כל המיזמים'), 'url'=>array('/startup/index')),
                    array('label'=>Yii::t('mainmanu','Contact'), 'url'=>array('/contactus')),
                    array('label'=>Yii::t('mainmanu','השאר חוות דעת'), 'url'=>array('/contactus')),
                ),
                'id' => 'mfMain',
                'htmlOptions' => array('class' => 'menuFooter'),
            )); ?>

            <div id="shareBtns"   class="roundedCorners" style="margin: 0px;">

                <?php $url = Yii::app()->createAbsoluteUrl('/index');?>

                <div id="facebookShare">
                    <div class="fb-like" data-layout="button_count" data-show-faces="false" data-send="true" data-href="<?php echo $url ?>"></div>
                </div>
                <div id="tweeterShare">
                    <a href="<?php echo $url ?>" class="twitter-share-button">Tweet</a>
                </div>
            </div>
        </div>
        <div class="span4">
            <div class="minMenu">
                <a class="footerTitle"><?php echo Yii::t('mainmanu','תנאי שימוש') ?></a>
                <?php
                    $this->widget('zii.widgets.CMenu',array(
                    'items'=>array(
                        array('label'=>Yii::t('mainmanu','תנאי שימוש'), 'url'=>array('/info/terms')),
                        array('label'=>Yii::t('mainmanu','פרטיות'), 'url'=>array('/info/privacy')),
                    ),
                    'id' => 'mfUniversity',
                    'htmlOptions' => array('class' => 'menuFooter'),
                    ));
                ?>
            </div>
            <div class="minMenu">
                <a class="footerTitle"><?php echo Yii::t('mainmanu','איך זה עובד') ?></a>
                <?php
                $this->widget('zii.widgets.CMenu',array(
                    'items'=>array(
                        array('label'=>Yii::t('mainmanu','חוק מימון חברתי לעסקים'), 'url'=>array('/info/law')),
                        array('label'=>Yii::t('mainmanu','יזמים'), 'url'=>array('/info/how')),
                        array('label'=>Yii::t('mainmanu','משקיעים'), 'url'=>array('/info/how')),
                    ),
                    'id' => 'mfUniversity',
                    'htmlOptions' => array('class' => 'menuFooter'),
                ));
                ?>
            </div>
        </div>
        <div class="span4">
            <div class="minMenu">
                <a class="footerTitle"><?php echo Yii::t('mainmanu','צור קשר') ?></a>

                <?php
                    $faceUrl = "http://www.facebook.com/";
                    $twitUrl = "http://www.twitter.com/";
                    echo '<span id="logof"><a  href="'. $faceUrl .'"></a></span>';
                    echo '<span id="logot"><a  href="'. $twitUrl .'"></a></span>';
                $this->widget('zii.widgets.CMenu',array(
                    'items'=>array(
                        array('label'=>Yii::t('mainmanu','מצאו אותנו ב '), 'url'=>$faceUrl),
                        array('label'=>Yii::t('mainmanu','מצאו אותנו ב '), 'url'=>$twitUrl),
                        array('label'=>Yii::t('mainmanu','רחוב הלל 25, תל אביב'), 'url'=>array('')),
                        array('label'=>Yii::t('mainmanu','03-8665425'), 'url'=>array('')),
                    ),
                    'id' => 'menuFooter',
                    'htmlOptions' => array('class' => 'menuFooter lastMenu'),
                ));
                ?>
            </div>

        </div>
    </div>
    <div id="copyright"><span   >  Copyright &copy; <?php echo date('Y'); ?> by Crowder </span></div>
    <?php
    /*
    <div id="shareBtns" style="float: left;margin-top: 15px;margin-left: 35px;" class="roundedCorners">
        <?php $url = Yii::app()->createAbsoluteUrl("index");?>

        <div id="facebookShare" >
            <div class="fb-like" data-layout="button_count" data-show-faces="false" data-send="true" data-href="<?php echo $url ?>"></div>
        </div>
        <div id="tweeterShare">
            <a href="<?php echo $url ?>" class="twitter-share-button">Tweet</a>
        </div>
    </div>
    */ ?>
</div><!-- footer -->
</div>
<div id="fb-root"></div>
<script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=<?php echo Yii::app()->params['facebookappid']; ?>";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<script type="text/javascript">
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
    document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
    try {
        var pageTracker = _gat._getTracker("UA-15161565-1");
        pageTracker._trackPageview();
    } catch(err) {}
</script>
