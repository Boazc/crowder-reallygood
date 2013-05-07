<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml" lang="<?php echo Yii::app()->language; ?>">
<?php  $this->renderPartial('/layouts/tagHead'); ?>
<body>
<div id="header">
    <?php $this->renderPartial('/layouts/topManu'); ?>
</div>

<?php
    echo '<div id="siteContent" >';

        echo $content;
    echo '</div>';

    echo $this->renderPartial('/layouts/footer');
?>
</body>
</html>