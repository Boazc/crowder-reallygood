<?php

class CategoryController extends myAdminBaseController
{

    function init()
    {
        parent::init();

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

    public function loadModel($id)
    {
        return Category::model()->loadModel($id);
    }

    public  function modify($model)
    {
        $model->attributes=$_POST[$this->modelName];

        if($model->isNewRecord)
        {
            $model->price_sum =0;
            $model->funders_amount =0;
        }
        if($model->save())
        {
            $this->redirect($this->createUrl(strtolower($this->modelName) .'/manage'));
        }
    }

}
