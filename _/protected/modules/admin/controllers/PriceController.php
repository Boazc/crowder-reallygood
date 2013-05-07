<?php

class PriceController extends myAdminBaseController
{
    public function loadModel($id)
    {
        return Price::model()->loadModel($id);
    }
}
