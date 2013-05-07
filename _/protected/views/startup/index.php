<div class="pageTitle container">
    <div style="float:right;"> <?php echo Yii::t('startups','בוא לגלות את הסטארטאפים הישראלים'); ?> </div>
    <div id="startupsFilter">
        <?php
            $followActive = "";
            $allActive = "";

            if (isset($_GET['followed']))
            {
                $followActive = 'class="active"';
            }
            else
            {
                $allActive = 'class="active"';
            }

            echo '<a href="' . $this->createUrl('/startup/index') . '" ' . $allActive . '>' . Yii::t('startups','כל הפרויקטים') . '</a>';
            echo '/';
            echo '<a href="' . $this->createUrl('/startup/index', array('followed'=>'')) . '" ' . $followActive  . '>' . Yii::t('startups','פרויקטים שסימנתי') . '</a>';
        ?>
    </div>
</div>
<div class="pageContent container">

    <ul id="startupList" class="initUl row-fluid">
    <?php
        $this->widget('zii.widgets.CListView', array(
        'id' => 'startupList',
        'dataProvider'=>$dataProvider,
        'itemView'=>'_view',
        ));
    ?>
    </ul>

</div>
