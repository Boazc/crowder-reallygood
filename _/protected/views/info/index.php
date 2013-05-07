<?php
/**
 * Created by JetBrains PhpStorm.
 * User: nir
 * Date: 28/07/12
 * Time: 22:52
 * To change this template use File | Settings | File Templates.
 *
 *  @property CustomPages $model;
 */

$cs = Yii::app()->getClientScript();

echo '<div class="infoTitle">' . $model->name . '</div>';
echo '<div class="infoContent">' . $model->content. '</div>';


