<?php
// Set startup id
if (isset($_GET['id']))
{
    $id  = $_GET['id'];
}
?>
<div id="submitStartupMenu">

    <ul id="startupTopMenu" class="wrapper initUl">

        <li id="stBasics" <?php if ($page == 'company' || $page == 'new'|| $page == 'team') echo 'class="selected"';?> >
            <a href="<?php echo (isset($id) ? $this->createUrl('startup/company', array('id' => $id)) : '#');?>">
                <? /* <img src="<?php echo $this->image . 'company.png'; ?>"> */?>
                <span class="number">1</span>
                <div class="startupMenu">
                    <div class="name"> <?php echo Yii::t('startup','Basics')?></div>
                    <div class="desc"> <?php echo Yii::t('startup','About your company')?></div>
                </div>
            </a>
        </li>
        <li id="stPitch" <?php if ($page == 'media' || $page == 'pitch') echo 'class="selected"';?>>
            <a href="<?php echo (isset($id) ? $this->createUrl('startup/media', array('id' => $id)) : '#');?>">
                <? /* <img src="<?php echo $this->image . 'company.png'; ?>"> */?>
                <span class="number">2</span>
                <div class="startupMenu">
                    <div class="name"> <?php echo Yii::t('startup','Pitch')?></div>
                    <div class="desc"> <?php echo Yii::t('startup','Communicate your vision')?></div>
                </div>
            </a>
        </li>
        <li id="stPublish" <?php if ($page == 'submit' ) echo 'class="selected"';?>>
            <a href="<?php echo (isset($id) ? $this->createUrl('startup/publish', array('id' => $id)) : '#');?>">
                <span class="number ">3</span>
                <? /* <img src="<?php echo $this->image . 'company.png'; ?>"> */?>
                <div class="startupMenu">
                    <div class="name"> <?php echo Yii::t('startup','Submit')?></div>
                    <div class="desc"> <?php echo Yii::t('startup','Publish to the Crowd')?></div>
                </div>
            </a>
        </li>

    </ul>

    <ul id="startupBottomMenu" class="wrapper initUl">
        <?php
        if ($page == 'company' ||$page == 'new' || $page == 'team')
        {
            echo '<li ' . ($page == 'company'|| $page == 'new' ? 'class="selected"' : '')  . '>' .
                '<a href=' . (isset($id) ? $this->createUrl('startup/company', array('id' => $id)) : '#') . '>' .
                '<span class="numberBottom">1.1</span>' .
                Yii::t('startup','Company') .
                '</a>'.
                '</li>';
            echo '<li ' . ($page == 'team' ? 'class="selected"' : '' ) . ' >' .
                '<a href=' . (isset($id) ? $this->createUrl('startup/team', array('id' => $id)) : '#') . '>' .
                '<span class="numberBottom">1.2</span>' .
                Yii::t('startup','Team') .
                '</a>'.
                '</li>';
        }
        else if ($page == 'media' || $page == 'pitch')
        {
            echo '<li ' . ($page == 'media' ? 'class="selected"' : ''). '>' .
                '<a href=' . (isset($id) ? $this->createUrl('startup/media', array('id' => $id)) : '#') . '>' .
                '<span class="numberBottom">2.1</span>' .
                Yii::t('startup','Media') .
                '</a>'.
                '</li>';
            echo '<li ' . ($page == 'pitch' ? 'class="selected"' : '') . '>' .
                '<a href=' . (isset($id) ? $this->createUrl('startup/pitch', array('id' => $id)) : '#') . '>' .
                '<span class="numberBottom">2.2</span>' .
                Yii::t('startup','Pitch') .
                '</a>' .
                '</li>';
        }
        ?>
    </ul>
</div>