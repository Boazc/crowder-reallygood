<?php

class MenupageController1 extends myAdminBaseController
{

    public function loadModel($id)
    {
        return MenuPage::model()->loadModel($id);
    }

    // ... generate the output for the column
    // Params:
    // $data ... the current row data
    // $row ... the row index
    protected function renderCustomPageCol($data,$row)
    {
        $theCellValue = isset($data->customPage) ?
            "<a href='". Yii::app()->createUrl('admin/custompages/editpage',array('id' =>$data->customPage->id))  . "' title='" . Yii::t('admincustompages', 'Edit this page') . "' class='tooltip' >" . mb_substr($data->customPage->title, 0, 20) . "...</a>"
            :
            "";

        return $theCellValue;
    }
}
