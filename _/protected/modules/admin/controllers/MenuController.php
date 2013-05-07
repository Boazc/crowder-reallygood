<?php

class MenuController extends myAdminBaseController
{
    public function loadModel($id)
    {
        return Menu::model()->loadModel($id);
    }

    protected function renderNameCol($data,$row)
    {
        return "<a href='". Yii::app()->createUrl('/admin/Menupage/', array('menu_id' => $data->id))  . "' title='" . Yii::t('startups', 'ניהול עמודי התפריט ') . "' class='tooltip' >" . urldecode($data->name). "</a>";
    }

}
