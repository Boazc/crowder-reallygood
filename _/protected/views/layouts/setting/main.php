<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml" lang="<?php echo Yii::app()->language; ?>">
    <?php echo $this->renderPartial('/layouts/tagHead'); ?>
<body>
    <?php
    echo $this->renderPartial('/layouts/internal/header');
    echo '<div class="container">';
        echo '<div id="siteContent" >';

            echo '<div class="pageTitle">';
                echo isset($this->topTitle) ? $this->topTitle : "";
            echo '</div>';
            echo '<div class="pageContent container">';
                echo '<div class="row-fluid">';
                if (isset($this->menuRender))
                {
                    echo '<div class="span3">';
                        echo $this->renderPartial($this->menuRender);
                    echo'</div>';
                    echo '<div class="span9">';
                    echo $content;
                    echo'</div>';
                }
                else
                {
                    echo '<div class="span12">';
                    echo $content;
                    echo'</div>';
                }
                echo'</div>';
            echo'</div>';
    echo'</div>';
    echo'</div>';

    echo $this->renderPartial('/layouts/footer');
    ?>
</body>
</html>