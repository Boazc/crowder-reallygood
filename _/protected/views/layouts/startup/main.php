<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml" lang="<?php echo Yii::app()->language; ?>">
    <?php echo $this->renderPartial('/layouts/tagHead'); ?>
<body>
    <?php
    $this->renderPartial('/layouts/internal/header');
    echo '<div id="siteContent" style="background: #212121;">';
       echo '<div class="container">';

            $this->renderPartial('/layouts/startup/buildMenu', array('page' => $this->action->id));
        echo '</div>';
    echo '</div>';
    echo '<div id="mainContentBox" style="margin: 0;padding: 20px 0;">';
        echo '<div class="container">';
            echo $content;
        echo '</div>';
    echo '</div>';

    echo $this->renderPartial('/layouts/footer');
    ?>
</body>
</html>