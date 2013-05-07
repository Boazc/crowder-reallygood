<?php

class MessagesearchController extends myAdminBaseController
{
    public function loadModel($id)
    {
        return Messagesearch::model()->findByPk(array('id' => $id, 'language' => $_GET['lang'] ));
    }


}
