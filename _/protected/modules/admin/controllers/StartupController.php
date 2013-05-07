<?php

class StartupController extends myAdminBaseController
{
    public function loadModel($id)
    {
        return Startup::model()->loadModel($id);
    }

    protected function renderUserCol($data,$row)
    {
        if ($data->hasRelated('user'))
        {
            $theCellValue = isset($data->user_created) ?
               "<a href='". Yii::app()->createUrl('admin/Member/viewuser',array('id' =>$data->user_created))  . "' title='" . Yii::t('startups', 'Show created user details') . "' class='tooltip' >" .urldecode($data->user->username) . "</a>"
                :
                "";
        }
        else
        {
            $theCellValue =Yii::t('showuser', 'User was delete');
        }
        return $theCellValue;
    }
}
