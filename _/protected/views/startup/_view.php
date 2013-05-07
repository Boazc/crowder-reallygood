<?php /** @var $data Startup */

if ($data->main_image <> "")
{
    $data->image = $data->main_image;
}
?>
<li class="startup" >
    <div>
        <a class="startupImg" title="<?php echo 'בעבור אל ' . $data->name ?>" href="<?php echo Yii::app()->createUrl('/startup/view', array('alias'=>$data->alias)) ?>">
            <img src="<?php echo $data->getMainImage();?>">
        </a>
    </div>
    <div class="startupName"><?php echo $data->name ?></div>
    <div class="muted FontSmall sloganSt"><?php echo $data->slogan?></div>

    <div class="startupDetail">
        <?php echo $data->short_content ?>
    </div>
    <div class="startupBoxBottom">
        <a href="<?php echo $this->createUrl('/startup/view', array('alias' => $data->alias)); ?>"  class="view-startup btn btn-success btn-small pull-left" ><i class="icon-search"></i><?php echo Yii::t('startup','לדף המיזם'); ?></a>
        <div class="btn-toolbar follow_view">
            <?php $this->widget('bootstrap.widgets.TbButtonGroup', array(
            'type'=>'info', // '', 'primary', 'info', 'success', 'warning', 'danger' or 'inverse'
            'size' => 'small',
            'buttons'=>array(
                array(
                    'buttonType' => 'ajaxButton',
                    'icon' =>  'icon-plus-sign',
                    'ajaxOptions' => array(
                        'type'=>'get',
                        'dataType'=>'json',
                        'success'=>'js:function(data){ Message.register(data.status,data.message);}',
                    ),
                    'label'=>'עקוב אחריי', 'url'=>$this->createUrl('/startup/follow', array('id'=> $data->id))),
                array('items'=>array(
                    array(
                        'label'=>'הסר ממעקב',
                        'icon' =>  'icon-minus-sign',
                        'url'=>$this->createUrl('/startup/unfollow', array('id'=> $data->id)),
                        'ajaxOptions' => array(
                            'type'=>'get',
                            'dataType'=>'json',
                            'success'=>'js:function(data){ Message.register(data.status,data.message);}',
                        ),
                    ),
                )),
            ),
        )); ?>
        </div>
    </div>
    <small class="count-follow follow_view_count muted"> <?php echo $data->getFollowersCount(); ?> </small>
</li>
