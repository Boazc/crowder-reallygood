<div id="startupTopMain">
    <div class="container">
        <div id="shareSignature">
            <div id="shareTitle">
                <?php echo Yii::t('signature', 'Help us by sharing your support!');?>
            </div>
            <div id="shareBtns"   class="roundedCorners">

                <?php $url = Yii::app()->createAbsoluteUrl('signature/'. $user->username);?>

                <div id="facebookShare">
                    <div class="fb-like" data-layout="button_count" data-show-faces="false" data-send="true" data-href="<?php echo $url ?>"></div>
                </div>
                <div id="tweeterShare">
                    <a href="<?php echo $url ?>" class="twitter-share-button">Tweet</a>
                </div>
            </div>
        </div>
    <?php
        echo '<div id="signatureTitle">' .  Yii::t('signature', "I'll Invest {price} ₪ in a {category}", array('{price}'=> $profile->price_invest, '{category}' => $profile->mainCategory->name)) . '</div>';
        echo '<a href="' . Yii::app()->createAbsoluteUrl('profile/'. $user->username) . '" id="myProfilePic"  class="roundedCorners" title="'. Yii::t('signature', 'To my Profile') . '">';
            echo '<div class="roundedCorners" >';
                echo '<img  src="' .$user->getProfilePic(true) .'">';
        echo '</div>';
        echo '</a>';

        echo '<div id="signatureMsg" >';
            echo '<div id="soon">' . Yii::t('signature', "as soon as it's possible." ). '</div>';
            echo '<div id="moreDetailsSig">' . Yii::t('signature', "{firstName} is celebrating our new right to invest in startup.", array('{firstName}'=> $user->first_name)) . '</div>';
        echo  '</div>';
        ?>
    </div>
</div>

<div class="container">

<?php

    echo '<div id="mainContentBox" class="grayBox">';

            $this->renderPartial('/index/fundersList' , array('category' => $profile->mainCategory));

    echo '</div>';

?>
</div>