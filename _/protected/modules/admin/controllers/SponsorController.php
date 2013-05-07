<?php

class SponsorController  extends myAdminBaseController
{
    public function loadModel($id)
    {
        return Sponsor::model()->loadModel($id);
    }
}
