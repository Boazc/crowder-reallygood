    <?php
/**
 * Member controller Home page
 */
class MemberController extends AdminBaseController {
	/**
	 * Number or records to display on a single page
	 */
	const PAGE_SIZE = 50;
	/**
	 * init
	 */
	public function init()
	{
		parent::init();
		
		$this->breadcrumbs[ Yii::t('adminglobal', 'Member') ] = array('Member/index');
		$this->pageTitle[] = Yii::t('adminglobal', 'Member');
	}
	/**
	 * Index action
	 */
    public function actionIndex() 
	{
		// Did we submit the form and selected items?
		if( isset($_POST['bulkoperations']) && $_POST['bulkoperations'] != '' )
		{
			// Perms
			if( !Yii::app()->user->checkAccess('op_users_bulk_users') )
			{
				throw new CHttpException(403, Yii::t('error', 'Sorry, You don\'t have the required permissions to enter this section'));
			}
			
			// Did we choose any values?
			if( isset($_POST['user']) && count($_POST['user']) )
			{
				// What operation we would like to do?
				switch( $_POST['bulkoperations'] )
				{
					case 'bulkdelete':
					
					// Perms
					if( !Yii::app()->user->checkAccess('op_users_delete_users') )
					{
						throw new CHttpException(403, Yii::t('error', 'Sorry, You don\'t have the required permissions to enter this section'));
					}
					
					// Load Member and delete them
					$Member_deleted = Member::model()->deleteByPk(array_keys($_POST['user']));
					// Done
					Yii::app()->user->setFlash('success', Yii::t('adminMember', '{count} users deleted.', array('{count}'=>$Member_deleted)));
					break;
					
					default:
					// Nothing
					break;
				}
			}
		}
		
		
		// Load Member and display
		$criteria = new CDbCriteria;

		$count = Member::model()->count();
		$pages = new CPagination($count);
		$pages->pageSize = self::PAGE_SIZE;
		
		$pages->applyLimit($criteria);
		
		$sort = new CSort('Member');
		$sort->defaultOrder = 'date_created DESC';
		$sort->applyOrder($criteria);

		$sort->attributes = array(
		        'id'=>'ID',
		        'username'=>'username',
		        'date_created'=>'date_created',
		        'email'=>'email',
				'role'=>'role',
		);
		
		$Member = Member::model()->findAll($criteria);
	
        $this->render('index', array( 'count' => $count, 'Member' => $Member, 'pages' => $pages, 'sort' => $sort ) );
    }

	/**
	 * Add user action
	 */
	public function actionadduser()
	{
		// Perms
		if( !Yii::app()->user->checkAccess('op_users_add_users') )
		{
			throw new CHttpException(403, Yii::t('error', 'Sorry, You don\'t have the required permissions to enter this section'));
		}
		
		$model = new Member;
		
		if( isset( $_POST['Member'] ) )
		{
			$model->attributes = $_POST['Member'];
			$model->scenario = 'register';

			if( $model->save() )
			{
				// Loop through the roles and assign them
				$types = array( 'roles', 'tasks', 'operations' );
				$lastID = Yii::app()->db->lastInsertID;
				foreach($types as $type)
				{
					if( isset($_POST[ $type ]) && count( $_POST[ $type ] ) )
					{
						foreach( $_POST[ $type ] as $others )
						{						
							// assign if not assigned yet
							if( !Yii::app()->authManager->isAssigned( $others, $lastID ) )
							{
								$authItem = Yii::app()->authManager->getAuthItem( $others );
								Yii::app()->authManager->assign( $others, $lastID, $authItem->bizrule, $authItem->data );
							}
						}
					}
				}
				
				Yii::app()->user->setFlash('success', Yii::t('adminMember', 'User Added.'));
				$this->redirect(array('Member/viewuser', 'id' => $model->id ));
			}
		}
		
		$temp = Yii::app()->authManager->getAuthItems();
		$items = array( CAuthItem::TYPE_ROLE => array(), CAuthItem::TYPE_TASK => array(), CAuthItem::TYPE_OPERATION => array() );
		if( count($temp) )
		{
			foreach( $temp as $item )
			{
				$items[ $item->type ][ $item->name ] = $item->name;
			}
		}
		
		$items_selected = array();
		$items_selected['roles'] = isset($_POST['roles']) ? $_POST['roles'] : '';
		$items_selected['tasks'] = isset($_POST['tasks']) ? $_POST['tasks'] : '';
		$items_selected['operations'] = isset($_POST['operations']) ? $_POST['operations'] : '';
		
		$this->breadcrumbs[ Yii::t('adminMember', 'Adding User') ] = '';
		$this->pageTitle[] = Yii::t('adminMember', 'Adding User');
		
		// Display form
		$this->render('user_form', array( 'items_selected' => $items_selected, 'items' => $items, 'model' => $model, 'label' => Yii::t('adminMember', 'Adding User') ));
	}
	/**
	 * Update user action
	 */
	public function actionedituser()
	{
		// Perms
		if( !Yii::app()->user->checkAccess('op_users_edit_users') )
		{
			throw new CHttpException(403, Yii::t('error', 'Sorry, You don\'t have the required permissions to enter this section'));
		}
		
		if( isset($_GET['id']) && ($model = Member::model()->findByPk($_GET['id']) ) )
		{
			if( isset( $_POST['Member'] ) )
			{
                $model->attributes = $_POST['Member'];

                $model->scenario = 'update';
				if( $model->save() )
				{
					
					// Loop through the roles and assign them
					$types = array( 'roles', 'tasks', 'operations' );
					$lastID = $model->id;
					$allitems = Yii::app()->authManager->getAuthItems(null, $lastID);
					
					if( count($allitems) )
					{
						foreach( $allitems as $allitem )
						{
							Yii::app()->authManager->revoke( $allitem->name, $lastID );
						}
					}
					
					foreach($types as $type)
					{
						if( isset($_POST[ $type ]) && count( $_POST[ $type ] ) )
						{
							foreach( $_POST[ $type ] as $others )
							{						
								// assign if not assigned yet
								if( !Yii::app()->authManager->isAssigned( $others, $lastID ) )
								{
									$authItem = Yii::app()->authManager->getAuthItem( $others );
									Yii::app()->authManager->assign( $others, $lastID, $authItem->bizrule, $authItem->data );
								}
							}
						}
					}
					
					Yii::app()->user->setFlash('success', Yii::t('adminMember', 'User Updated.'));
					$this->redirect(array('Member/viewuser', 'id'=>$model->id));
				}
			}
			
			$temp = Yii::app()->authManager->getAuthItems();
			$items = array( CAuthItem::TYPE_ROLE => array(), CAuthItem::TYPE_TASK => array(), CAuthItem::TYPE_OPERATION => array() );
			if( count($temp) )
			{
				foreach( $temp as $item )
				{
					$items[ $item->type ][ $item->name ] = $item->name;
				}
			}
			
			// Selected
			$temp_selected = Yii::app()->authManager->getAuthItems(null, $model->id);
			$items_selected = array();
			if( count($temp) )
			{
				foreach( $temp_selected as $item_selected )
				{
					$items_selected[ $item_selected->type ][ $item_selected->name ] = $item_selected->name;
				}
			}
			
			$model->password = '';
			
			$this->breadcrumbs[ Yii::t('adminMember', 'Editing User') ] = '';
			$this->pageTitle[] = Yii::t('adminMember', 'Editing User');

			// Display form
			$this->render('user_form', array( 'items_selected' => $items_selected, 'items' => $items, 'model' => $model, 'label' => Yii::t('adminMember', 'Editing User') ));
		}
		else
		{
			Yii::app()->user->setFlash('error', Yii::t('adminerror', 'Could not find that ID.'));
			$this->redirect(array('Member/index'));
		}
	}
	/**
	 * Delete user action
	 */
	public function actiondeleteuser()
	{
		// Perms
		if( !Yii::app()->user->checkAccess('op_users_delete_users') )
		{
			throw new CHttpException(403, Yii::t('error', 'Sorry, You don\'t have the required permissions to enter this section'));
		}
		
		if( isset($_GET['id']) && ( $model = Member::model()->findByPk($_GET['id']) ) )
		{			
			$model->delete();
			
			Yii::app()->user->setFlash('success', Yii::t('adminMember', 'User Deleted.'));
			$this->redirect(array('index'));
		}
		else
		{
			$this->redirect(array('Member/index'));
		}
	}
	/**
	 * View user action
	 */
	public function actionviewuser()
	{
		if( isset($_GET['id']) && ($model = Member::model()->findByPk($_GET['id']) ) )
		{			
			$this->breadcrumbs[ Yii::t('adminMember', 'Viewing User') ] = '';
			$this->pageTitle[] = Yii::t('adminMember', 'Viewing User');

			// Display
			$this->render('user_view', array( 'model' => $model, 'label' => Yii::t('adminMember', 'Viewing User') ));
		}
		else
		{
			Yii::app()->user->setFlash('error', Yii::t('adminerror', 'Could not find that ID.'));
			$this->redirect(array('Member/index'));
		}
	}
}