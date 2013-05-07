<?php
/**
 * Created by JetBrains PhpStorm.
 * User: nir
 * Date: 23/07/12
 * Time: 21:52
 * To change this template use File | Settings | File Templates.
 */
// Get All Menu

$menues = Menu::model()->findAll(array(
    'select' => 't.id, t.name',
    'condition' => 't.code_type_id = :code_type_id AND t.is_active = 1',
    'order' => 't.index_id, pages.index_id',
    'params' => array(
        ':code_type_id' =>  Menu::TYPE_ID,
    ),
    'with' => array(
        'pages' => array(
            'select' => 'pages.name, pages.static_page_id, pages.link',
            'condition' => 'pages.is_active = 1',
            'with' => array(
                'customPage' => array(
                    'select' => 'customPage.alias'
                ),
            ),
        ),
    ),
));


    if ($_GET['alias'] == 'index')
    {
        $alias = $this->defualtIndexPage;
    }
    else
    {
        $alias = $_GET['alias'];
    }
    echo '<div id="sideManus">';

    foreach ($menues as $menu)
    {
        echo '<div id="sideManu">';
            echo '<div id="sideTitle">' . Yii::t('menuInfo',$menu->name) . '</div>';

            foreach ($menu->pages as $page)
            {
                if ($page->static_page_id)
                {
                    $url = array('/info/' . $page->customPage->alias);
                }
                else
                {
                    $url = $page->link;
                }

                $info[] = array('label'=> $page->name, 'url'=>$url, 'active' => $page->customPage->alias == $alias ? true : false);
            }

            $this->widget('zii.widgets.CMenu',array(
                'items'=>$info,
                'id' => 'sManu',
                'htmlOptions' => array('class' => 'ease'),
            ));

            $info = null;
        echo '</div>';
    }
echo '</div>';
?>