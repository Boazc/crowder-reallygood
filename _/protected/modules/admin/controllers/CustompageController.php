<?php

class CustomPageController extends myAdminBaseController
{
    public function loadModel($id)
    {
        return CustomPage::model()->loadModel($id);
    }

    /**
     * Creates a new model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     */
    public function actionCreate()
    {
        $modelName = $this->modelName;

        $model = new $modelName();

        // Uncomment the following line if AJAX validation is needed
        $this->performAjaxValidation($model);

        if(isset($_POST[$this->modelName]))
        {
            $this->modify($model, $this->modelName . ' ' . Yii::t('message', 'was created succeffuly.'));
        }

        // Set default active for create scenario
        if ($model->hasAttribute('is_active'))
        {
            $model->is_active = true;
        }

        $roles = AuthItem::model()->findAll(array('order'=>'type DESC, name ASC'));
        $_roles = array();
        if( count($roles) )
        {
            foreach($roles as $role)
            {
                $_roles[ AuthItem::model()->types[ $role->type ] ][ $role->name ] = $role->name;
            }
        }

        $this->render('create',array(
            'model'=>$model,
            'roles' => $_roles,
        ));
    }

    public  function modify(myActiveRecord $model, $message ='')
    {
        $model->attributes=$_POST[$this->modelName];

        if($model->save())
        {
            if ($message)
            {
                Yii::app()->user->setFlash('success', $message);
            }
            $this->redirect($this->createUrl(strtolower($this->modelName) .'/manage'));
        }
        else
        {
            Yii::app()->user->setFlash('error', $model->getMyErrors());
        }
    }


    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id the ID of the model to be updated
     */
    public function actionUpdate($id)
    {
        $model= $this->loadModel($id);

        // Uncomment the following line if AJAX validation is needed
         $this->performAjaxValidation($model);

        if(isset($_POST[$this->modelName]))
        {
            $this->modify($model, $this->modelName . ' ' . Yii::t('message', 'was updated succeffuly.'));
        }

        $roles = AuthItem::model()->findAll(array('order'=>'type DESC, name ASC'));
        $_roles = array();
        if( count($roles) )
        {
            foreach($roles as $role)
            {
                $_roles[ AuthItem::model()->types[ $role->type ] ][ $role->name ] = $role->name;
            }
        }

        $this->render('update',array(
            'model'=>$model,
            'roles' => $_roles,
        ));
    }



}

?>