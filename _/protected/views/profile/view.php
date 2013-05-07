<div id="startupTopMain">
    <div class="container">
        <div id="shareSignature">
            <div id="shareTitle">
                <?php echo Yii::t('profile', '{category} is my main ivest category', array('{category}' => $profile->mainCategory->name));?>
            </div>
            <a id="moreInvestor"  href="<?php echo Yii::app()->createAbsoluteUrl('/signature/'. $user->username); ?>"  class="btn btn-large"><?php echo Yii::t('profile', 'For more investors');?></a>
        </div>

    <?php
        echo '<div id="signatureTitle">' .
            $user->getFullName() .
            '</div>';
        echo '<a href="#" id="myProfilePic"  class="roundedCorners" title="'. $user->getFullName() . '">';
            echo '<div class="roundedCorners" >';
                echo '<img  src="' . $user->getProfilePic(true) .'">';
        echo '</div>';
        echo '</a>';

        echo '<div id="signatureMsg" >';
            echo '<div id="soon">' . Yii::t('profile', "I choise to invest {price} ₪ on sturtups", array('{price}' => $profile->price_invest) ). '</div>';
            echo '<div id="favoritesCat">' .  Yii::t('profile', "My favorite invest categories: {categories}", array('{categories}' => $profile->getListCategories(false)) ). '</div>';
         // echo '<a style="margin: 16px 0 0 0;" id="moreInvestor"  href="' . Yii::app()->createAbsoluteUrl('/signature/'. $user->username)  . '"  class="btn">' . Yii::t('profile', 'My Signature Page') . '</a>';
        echo  '</div>';
        ?>
    </div>
</div>
<div id="profileContent" >
    <div class="container">
    <?php /*
    <div id="socialProfile">
        <?php echo '<div id="sideTitle">'. Yii::t('profile', 'Social...') . '</div>' ?>

    </div>
 */ ?>
    <div id="aboutMe">
        <?php

            echo '<div id="sideTitle">'. Yii::t('profile', 'על עצמי') . '</div>';

            echo '<div id="userSite"><span>אתר אינטרנט:</span><a href="'. $profile->website .'">' . $profile->website .'</a>';
        ?>
        <div>
            <?php echo  CHtml::encode( $profile->about_me_update) ?>
        </div>
    </div>

</div>
</div>
