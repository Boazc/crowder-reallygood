<?php

class PitchsampleController extends myAdminBaseController
{
    public function loadModel($id)
    {
        return Pitchsample::model()->loadModel($id);
    }
}
