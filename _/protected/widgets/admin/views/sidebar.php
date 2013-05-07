<?php
// Side bar menu
$this->widget('zii.widgets.CMenu', array(
	'id' => 'main-nav',
    'items' => array(
					// dashboard
        			 array( 
							'label' => Yii::t('adminglobal', 'Dashboard'), 
							'url' => array('index/index'), 
							'linkOptions' => array( 'class' => 'nav-top-item no-submenu' ) 
						  ),
					 // System
					 array( 
							'label' => Yii::t('adminglobal', 'System'), 
							'url' => array('system'),
							'visible' => ( Yii::app()->user->checkAccess('op_settings_view_settings') || Yii::app()->user->checkAccess('op_lang_translate') ),
							'linkOptions' => array( 'class' => 'nav-top-item' ),
							'items' => array(
											array( 
													'label' => Yii::t('adminglobal', 'Manage Settings'), 
													'visible' => Yii::app()->user->checkAccess('op_settings_view_settings'),
													'url' => array('/admin/settings/index'),
												 ),
											array( 
													'label' => Yii::t('adminglobal', 'Manage Languages'), 
													'visible' => Yii::app()->user->checkAccess('op_lang_translate'),
													'url' => array('/admin/languages/index'),
												 ),
                                            array(
                                                'label' => Yii::t('adminglobal', 'Search Tranlation'),
                                                'visible' => Yii::app()->user->checkAccess('op_view_messagesearch'),
                                                'url' => array('/admin/messagesearch'),
                                            ),
                                        ),
					 	 ),
    				 // Management
					 array( 
							'label' => Yii::t('adminglobal', 'Management'), 
							'url' => array('management'), 
							'visible' => ( Yii::app()->user->checkAccess('op_users_add_users') || Yii::app()->user->checkAccess('op_roles_add_auth') || Yii::app()->user->checkAccess('op_sponsor_edit') ),
							'linkOptions' => array( 'class' => 'nav-top-item' ),
							'items' => array(
											array( 
													'label' => Yii::t('adminglobal', 'Manage Members'), 
													'visible' => Yii::app()->user->checkAccess('op_users_add_users'),
													'url' => array('/admin/member/index'),
												 ),
											array( 
													'label' => Yii::t('adminglobal', 'Roles, Tasks & Operations'), 
													'visible' => Yii::app()->user->checkAccess('op_roles_add_auth'),
													'url' => array('/admin/roles/index'),
												 ),
                                            array(
                                                'label' => Yii::t('adminglobal', 'Sponsors'),
                                                'url' => array('/admin/sponsor/manage'),
                                                'visible' => Yii::app()->user->checkAccess('op_sponsor_edit'),
                                            ),
                                        ),
						  ),
                        // Custom Pages
                        array(
                            'label' => Yii::t('adminglobal', 'Startups'),
                            'url' => array('startups'),
                            'visible' => Yii::app()->user->checkAccess('op_startup_manage'),
                            'linkOptions' => array( 'class' => 'nav-top-item' ),
                            'items' => array(
                                array(
                                    'label' => Yii::t('adminglobal', 'Manage Startups'),
                                    'url' => array('/admin/startup/manage'),
                                    'visible' => Yii::app()->user->checkAccess('op_startup_manage'),
                                ),
                                array(
                                    'label' => Yii::t('adminglobal', 'Manage Pitch Quest.'),
                                    'url' => array('/admin/pitchsample/manage'),
                                    'visible' => Yii::app()->user->checkAccess('op_view_pitchsample'),
                                ),
                            ),
                        ),
                        // Categories
                        array(
                            'label' => Yii::t('adminglobal', 'Investment Details'),
                            'url' => array('Investment'),
                            'visible' => ( Yii::app()->user->checkAccess('task_cat_manage') || Yii::app()->user->checkAccess('task_price_manage') ),
                            'linkOptions' => array( 'class' => 'nav-top-item' ),
                            'items' => array(
                                array(
                                    'label' => Yii::t('adminglobal', 'Manage Categories'),
                                    'url' => array('/admin/category/manage'),
                                    'visible' => Yii::app()->user->checkAccess('task_cat_manage'),
                                ),
                                array(
                                    'label' => Yii::t('adminglobal', 'Manage Price Invest'),
                                    'url' => array('/admin/price/manage'),
                                    'visible' => Yii::app()->user->checkAccess('task_price_manage'),
                                ),
                            ),
                    ),
					 // Custom Pages		
					 array( 
									'label' => Yii::t('adminglobal', 'Custom Pages'), 
									'url' => array('custompages'), 
									'visible' => Yii::app()->user->checkAccess('op_doc_edit_docs') || Yii::app()->user->checkAccess('op_view_custompage') || Yii::app()->user->checkAccess('op_view_menu'),
									'linkOptions' => array( 'class' => 'nav-top-item' ),
									'items' => array(
                                        array(
                                        'label' => Yii::t('adminglobal', 'Manage Pages'),
                                        'url' => array('/admin/custompage/manage'),
                                        'visible' => Yii::app()->user->checkAccess('op_view_custompage') ,
                                         ),
                                        array(
                                            'label' => Yii::t('adminglobal', 'ניהול תפריטים'),
                                            'url' => array('/admin/menu/manage'),
                                            'visible' => Yii::app()->user->checkAccess('op_view_menu') ,
                                        ),
                                        array(
                                            'label' => Yii::t('adminglobal', 'ניהול עמודים לתפריט'),
                                            'url' => array('/admin/menupage/manage'),
                                            'visible' => Yii::app()->user->checkAccess('op_doc_edit_docs'),
                                        ),
                                    ),
					 	  ),
					// Newsletter
					 array( 
									'label' => Yii::t('adminglobal', 'Newsletter'), 
									'url' => array('newsletter'), 
									'linkOptions' => array( 'class' => 'nav-top-item' ),
									'items' => array(
													array( 
															'label' => Yii::t('adminglobal', 'Manage Newsletters'), 
															'url' => array('newsletter/index'),
														 ),
													),
					 	  ),
					// Contact Us
					 array( 
									'label' => Yii::t('adminglobal', 'Contact Us') . ' ('. Yii::app()->format->number( Yii::app()->db->createCommand('SELECT COUNT(id) as total FROM {{contactus}} where sread = 0')->queryScalar() ) . ')',
									'url' => array('contactus'), 
									'linkOptions' => array( 'class' => 'nav-top-item' ),
									'items' => array(
													array( 
															'label' => Yii::t('adminglobal', 'Contact Us'), 
															'url' => array('contactus/index'),
														 ),
													),
					 	  ),
					// sharer		
					/*array(
										'label' => Yii::t('adminglobal', 'Sharer'), 
										'url' => array('sharer'), 
										'linkOptions' => array( 'class' => 'nav-top-item' ),
										'items' => array(
														array( 
																'label' => Yii::t('adminglobal', 'Sharer'), 
																'url' => array('sharer/index'),
															 ),
														),
						 	  ),												
					*/
    ),
));
?>