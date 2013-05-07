<?php
/**
 * Created by JetBrains PhpStorm.
 * User: nir
 * Date: 23/07/12
 * Time: 21:52
 * To change this template use File | Settings | File Templates.
 */
echo '<div id="sideManu">';
    echo '<div id="sideTitle">' .Yii::t('sideManuP','Settings') . '</div>';

    $this->widget('zii.widgets.CMenu',array(
        'items'=>array(
            array('label'=>Yii::t('sideManuP','Acount'), 'url'=>array('/setting/acount')),
            array('label'=>Yii::t('sideManuP','Password'), 'url'=>array('/setting/password')),
            array('label'=>Yii::t('sideManuP','Profile'), 'url'=>array('/setting/profile')),
            array('label'=>Yii::t('sideManuP','Notifications'), 'url'=>array('/setting/notification')),
            array('label'=>Yii::t('sideManuP','Social Networks'), 'url'=>array('/setting/social')),
            array('label'=>Yii::t('sideManuP','Investor Certification'), 'url'=>array('/setting/certification')),
        ),
        'id' => 'sManu',
        'htmlOptions' => array('class' => 'ease'),
    ));
echo '</div>';

?>