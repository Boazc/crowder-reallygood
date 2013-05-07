<?php
/**
 * Created by JetBrains PhpStorm.
 * User: nir
 * Date: 28/07/12
 * Time: 18:28
 * To change this template use File | Settings | File Templates.
 */
    Yii::app()->clientScript->registerScriptFile( Yii::app()->themeManager->baseUrl . '/script/jquery.hoverIntent.minified.js' , CClientScript::POS_END );

    echo '<div  id="mainTitle">';

    if (isset($category))
    {
        echo Yii::t('funderList', '<span>{amount}</span> funders pledge to invest '. '<span> {sum} </span> in <span>{category}</span>',
                                array('{amount}' =>$category->funders_amount,
                                            '{sum}' => $category->price_sum . ' ₪',
                                            '{category}' => $category->name,
                                ));

        $funders = Member::model()->findAll(array('select' => 'id, fbuid, username,first_name, last_name',
            'with' => array(
                'profile' =>
                    array(
                        'select' => '',
                        'condition' => 'main_cat_id = ' . $category->id,
                    ),
            ),
            'order' => 't.id DESC',
            'limit' => '40',
        ));
    }
    else
    {
   //     $total = Yii::app()->db->createCommand('SELECT SUM(funders_amount) as amount, SUM(price_sum) as sum FROM {{categories}}')->queryRow();

   //     echo Yii::t('funderList', '<span>{amount}</span> funders pledge to invest '. '<span> {sum} </span> in startups',
   //         array('{amount}' =>$total['amount'],
   //             '{sum}' => $total['sum'] . ' ₪',
   //            ));


        $funders = Member::model()->findAll(array('select' => 'id, fbuid, username,first_name, last_name',
            'order' => 't.id DESC',
            'limit' => '40',
        ));
    }

    echo '</div>';
?>

<div id="funderList" class="initUl memberList" >
    <?php
    //        echo '<div>' . count($funders) . '</div>';die();
            foreach ($funders as $fund)
            {
                echo '<li>';
                    echo '<a class="member" rel="tooltip" title="' . $fund->getFullName()  . '" href="' . $this->createUrl('/signature/' . urldecode($fund->username)) . '">';
                        echo '<img src="' . $fund->getProfilePic(false)  . '">';
                    echo '</a>';
                echo '</li>';
            }
    ?>
</div>
