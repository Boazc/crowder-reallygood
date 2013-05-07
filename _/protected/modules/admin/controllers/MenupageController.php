<?php

class MenupageController extends myAdminBaseController
{

    function init()
    {
        parent::init();

        $this->modelName = 'Menupage';

        // Make sure we have access
        if(  Yii::app()->user->isGuest )
        {
            $this->redirect(Yii::app()->createAbsoluteUrl('/login'));
        }
        if(  Yii::app()->user->role != 'admin' )
        {
            $this->redirect(Yii::app()->createAbsoluteUrl('error/admin'));
        }
    }

    /**
     * Manages all models.
     */
    public function actionManage()
    {
        $modelName = $this->modelName;
        $model=new $modelName('search');

        if (isset($_GET['clear']))
        {
            $model->unsetAttributes();  // clear any default values
        }

        if(isset($_GET[$this->modelName]))
            $model->attributes=$_GET[$this->modelName];

        if (isset($_GET['menu_id']))
        {
            $model->menu_id = $_GET['menu_id'];
        }

        $this->render('manage',array(
            'model'=>$model,
        ));
    }

    public function loadModel($id)
    {
        return Menupage::model()->loadModel($id);
    }

    // ... generate the output for the column
    // Params:
    // $data ... the current row data
    // $row ... the row index
    protected function renderCustomPageCol($data,$row)
    {
        if (isset($data->customPage))
        {
            return
            "<a href='". Yii::app()->createUrl('admin/custompage/update',array('id' =>$data->customPage->id))  . "' title='" . Yii::t('admincustompages', 'Edit this page') . "' class='tooltip' >" . $data->customPage->title . "</a>";        }
        else
        {
            return $data->name;
        }
    }
}
