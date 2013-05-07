<?php
/**
 * Index controller Home page
 */
class StartupController extends SiteBaseController {

    public $topTitle;
    public $userTeamLeader = true;

    public function actions(){
        return array(
            'uploadedSingle'=>array(
                'class'=>'application.components.UploadAction',
                'savePath'=>Yii::app()->getBasePath().DIRECTORY_SEPARATOR. 'single'.DIRECTORY_SEPARATOR,
            )
        );
    }

    /**
	 * Controller constructor
     */
    public function init()
    {
        Yii::import('bootstrap.widgets.TbAlert');

        if (Yii::app()->user->isGuest)
        {

            if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
            {
                print json_encode(array(
                    'status'=> TbAlert::TYPE_ERROR,
                    'message'=>Yii::t('message','פעולה זו ניתנת רק למשתמש רשום'),
                ));
                die();
            }
            else
            {
                $this->redirect(Yii::app()->createAbsoluteUrl('/login'));
            }
        }

        $this->defaultAction = 'index';

        $this->layout = '/layouts/startup/index';

        parent::init();
    }

    /**
     * @return array action filters
     */
    public function filters()
    {
        return array(
            'accessControl', // perform access control for CRUD operations
        );
    }

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules()
    {
        return array(
            array('allow', // allow authenticated user to perform 'create' and 'update' actions
                 'actions'=>array('index', 'new', 'view', 'usersAutocomplete', 'ajaxUploadImage','follow','unfollow'),
            ),
            array('allow',
                'actions' => array('selectedStartup'),
                'expression' => 'Yii::app()->authManager->checkAccess("op_update_startup", Yii::app()->user->id)',
            ),
            array('allow', // allow authenticated user to perform 'create' and 'update' actions
                'actions'=>array('publish','company', 'team','ajaxDeleteMedia', 'ajaxDeleteTeamMember', 'pitch', 'media', 'ajaxDeleteVideo', 'ajaxUpdateVideo', 'ajaxUpdateTeamMember', 'ajaxAddTeamMember', 'ajaxUploadMediaImage', 'ajaxUpdatePitch', 'ajaxUploadPitchImage','ajaxUpdateMedia'),
                'expression'=>'Yii::app()->getController()->CheckBuildStartup()',
            ),
            array('deny',  // deny all users
                'users'=>array('*'),
            ),
        );
    }

    public function actionView($alias)
    {
        $this->layout = '/layouts/noContainer/index';

        $model = Startup::model()->with('category')->findByAttributes(array('alias' => $alias));
        $nextAlias = "";
        if ($model)
        {
            $nextStartupAlias = Startup::model()->find(array(
                'select' => 'alias',
                'condition' => 'id > ' . $model->id . ' AND t.is_active = 1 AND t.is_visible = 1 AND t.alias != ""',
            ));

            if ($nextStartupAlias)
            {
                $nextAlias = $nextStartupAlias->alias;
            }
            else
            {
                $nextStartupAlias = Startup::model()->find(array(
                    'select' => 'alias',
                    'condition' => 'id < 10 AND t.is_active = 1 AND t.is_visible = 1 AND t.alias != ""',
                ));

                if ($nextStartupAlias)
                {
                    $nextAlias = $nextStartupAlias->alias;
                }
                else
                {
                    $nextAlias = $model->alias;
                }
            }
        }

        $followers = Follower::model()->findAll(array(
            'condition'=> 'startup_id =' . $model->id,
            'limit' => 5,
            'with' => array(
                'user'=> array(
                    'select' => 'id, fbuid, username,first_name, last_name',
                )
            )
        ));

        $this->render('view',array(
            'model'=>$model,
            'followers' => $followers,
            'nextAlias' => $nextAlias,
        ));
    }

    public function actionIndex()
    {
        $this->layout = '/layouts/index';


        if (isset($_GET['followed']) && !Yii::app()->user->isGuest)
        {
            $dataProvider=new CActiveDataProvider('Startup',array(
                'criteria'=>array(
                    'select' => 't.id, t.short_content, t.main_image, t.image, t.name, t.slogan, t.alias',
                    'order'=>'t.id',
                    'join' => 'inner join tbl_followers on tbl_followers.startup_id = t.id' ,
                    'condition' => 't.is_active = 1 AND t.is_visible = 1 AND tbl_followers.user_id = '. Yii::app()->user->id,
                ),
                'pagination'=>array(
                    'pageSize'=>16,
                ),
            ));
        }
        else
        {
            $dataProvider=new CActiveDataProvider('Startup',array(
                'criteria'=>array(
                    'select' => 'id, short_content, image, main_image, name, slogan, alias',
                    'order'=>'id',
                    'condition' => 'is_active = 1 AND is_visible = 1',
                ),
                'pagination'=>array(
                    'pageSize'=>16,
                ),
            ));
        }

        $this->render('index',array(
            'dataProvider'=>$dataProvider,
        ));
    }

    public function CheckBuildStartup()
    {
        $userID = Yii::app()->user->id;

        // Check Startup in get
        if (isset($_GET['id']))
        {
            $startupID = $_GET['id'];
        }
        else
        {
            throw new CHttpException(408,Yii::t('st','Startup id not set'));
        }

        // Check Startup in get
        if (!Startup::model()->exists('id = ' .$startupID))
        {
            throw new CHttpException(408,Yii::t('st','Startup not exist'),1);
        }

        // Get startup user
        $startUser = Startupuser::model()->findByAttributes(array('startup_id' => $startupID,'user_id' =>$userID));

        // get user Startup
        if ($startUser)
        {
            return true;
        }
        else
        {
            // User create
            if (Startup::model()->findByAttributes(array('id' => $startupID, 'user_created' => $userID), array('select' => 'id')))
            {
                return true;
            }

            // Superuser
            if (Yii::app()->authManager->checkAccess("op_update_startup", $userID))
            {
                return true;
            }

            // has no authority
            return false;
        }
    }


    public function actionSelectedStartup($id)
    {
        // Update setting
        $set =  Settings::model()->findByAttributes(array('settingkey' => 'selected_startup'));
        $set->value = $id;
        $set->update();

        Yii::app()->settings->clearCache();

        Yii::app()->user->setFlash('success', Yii::t('startup', 'מיזם נבחר התעדכן בהצלחה'));
        $this->redirect("/index");
    }

    public function actionUnfollow($id)
    {
        if(isset($id))
        {
            $follow = Follower::model()->findByAttributes(array('user_id' => Yii::app()->user->id, 'startup_id' => $id));

            if ($follow)
            {
                $follow->delete();

                print json_encode(array(
                    'status'=> TbAlert::TYPE_SUCCESS,
                    'message'=>Yii::t('message','המיזם נמחק מרשימת העוקבים'),
                ));
            }
            else
            {
                print json_encode(array(
                    'status'=> TbAlert::TYPE_DANGER,
                    'message'=>Yii::t('message','מיזם לא קיים ברשימת העוקבים שלך'),
                ));
            }

            die();
        }

    }

    /**
     * New action - for new startup sugestion
     */
    public function actionFollow($id)
    {
        if(isset($id))
        {
            $follow = Follower::model()->findByAttributes(array('user_id' => Yii::app()->user->id, 'startup_id' => $id));

            if ($follow)
            {
                print json_encode(array(
                    'status'=> TbAlert::TYPE_WARNING,
                    'message'=>Yii::t('message','המיזם קיים בעוקבים שלך'),
                ));
            }
            else
            {
                $follow = new Follower();
                $follow->startup_id = $id;
                $follow->user_id = Yii::app()->user->id;

                if ($follow->save())
                {
                    print json_encode(array(
                        'status'=> TbAlert::TYPE_SUCCESS,
                        'message'=>Yii::t('message','מיזם התווסף לרשימת העוקבים שלך'),
                    ));
                }
                else
                {
                    print json_encode(array(
                        'status'=> TbAlert::TYPE_ERROR,
                        'message'=>Yii::t('message','אירע שגיאה בעת ששמירה'),
                    ));
                }
            }

            die();
        }

    }


    /**
     *
     * New action - for new startup sugestion
     */
    public function actionNewOld()
    {
        $page = $this->getPage('add_startup');
        $this->renderPartial('/custompages/head',array( 'model' => $page));

        $model = new Startup();

        if(isset($_POST['Startup']))
        {
            $model->attributes=$_POST['Startup'];

            if ($model->site == 'http://')
            {
                $model->site = '';
            }

            if (!$model->validate())
            {
                vModel::printErors($model);
            }
            else
            {
                $model->user_created = Yii::app()->user->id;
                $model->is_active = false;

                // save in DB
                $model->save();

                echo '<div id="success">'. Yii::t('startup', 'Data saved successfuly') . '</div>
                    <script type="text/javascript">
                        $("#startupForm").slideToggle();
                    </script> ';
            }
            die();
        }

        if ($model->site == '')
        {
            $model->site = 'http://';
        }

        $this->render('new', array('model' =>$model,'page' => $page));
    }

    /**
     * New action - for new startup sugestion
     */
    public function actionNew()
    {
        $model = new Startup();

        if(isset($_POST['Startup']))
        {

            $model->attributes=$_POST['Startup'];

            if ($model->site == 'http://')
            {
                $model->site = '';
            }

            if (isset($_POST['Startup']['image']))
            {
                $model->image = $_POST['Startup']['image'];
            }

            if (isset($_POST['Startup']['main_image']))
            {
                $model->main_image = $_POST['Startup']['main_image'];
            }

            $model->user_created = Yii::app()->user->id;
            $model->is_active = false;

            if ($model->save())
            {
                // Add user as Team Leader
                $teamLeader = new Startupuser();
                $teamLeader->user_id = Yii::app()->user->id;
                $teamLeader->is_admin = true;
                $teamLeader->startup_id = $model->id;

                // Save Success
                if ($teamLeader->save())
                {
                    $message = '<div id="success">'. Yii::t('startup', 'Startup was created successfully') . '</div>';
                    echo CJSON::encode(array('status'=> TbAlert::TYPE_SUCCESS, 'message' => $message, 'id' =>$model->id));
                    die();
                }
                else
                {
                    $message = Yii::t('startup', 'Error in saving team leader');
                    $modelErrors = $teamLeader->getMyErrors();
                }
            }
            else
            {
                $message = Yii::t('startup', 'Error in saving startup');
                $modelErrors = $model->getMyErrors();
            }

            // Error in saving
            echo CJSON::encode(array('status'=> TbAlert::TYPE_ERROR, 'message' => $message, 'error' => $modelErrors));
            die();
        }

        $page = $this->getPage('add_startup');
        $this->renderPartial('/custompages/head',array( 'model' => $page,'page' => 'company'));

        if ($model->site == '')
        {
            $model->site = 'http://';
        }

        $this->render('new', array('model' =>$model,'page' => $page));
    }


    /**
     * New action - for new startup sugestion
     */
    public function actionCompany($id)
    {
        $page = $this->getPage('add_startup');
        $this->renderPartial('/custompages/head',array( 'model' => $page,'page' => 'company'));

        $model = Startup::model()->findByPk($id);

        if(isset($_POST['Startup']))
        {
            $model->attributes=$_POST['Startup'];

            if (isset($_POST['Startup']['image']))
            {
                $model->image = $_POST['Startup']['image'];
            }

            if (isset($_POST['Startup']['main_image']))
            {
                $model->main_image = $_POST['Startup']['main_image'];
            }

            if ($model->site == 'http://')
            {
                $model->site = '';
            }

            if ($model->save())
            {
                $message = Yii::t('startup', 'Startup was saved successfully');
                echo CJSON::encode(array('status'=> 'success', 'message' => $message));
            }
            else
            {
                $message = Yii::t('startup', 'Error in saving startup');
                echo CJSON::encode(array('status'=> 'error', 'message' => $message, 'error' => $model->getMyErrors()));
            }
            die();
        }

        if ($model->site == '')
        {
            $model->site = 'http://';
        }

        $this->render('company', array('model' =>$model,'id'=>$id));
    }

    /**
     * New action - for new startup sugestion
     */
    public function actionPublish($id)
    {
        $page = $this->getPage('add_startup');
        $this->renderPartial('/custompages/head',array( 'model' => $page,'page' => 'company'));

        $model = Startup::model()->findByPk($id);
        $model->isImageAjax = false;
        $model->scenario = 'publish';

        if(isset($_POST['Startup']))
        {
            $model->attributes=$_POST['Startup'];

            if ($model->save())
            {
                // Send mail
                if (!$model->is_mail_sent)
                {
                    $model->is_mail_sent = true;
                    $model->update();

                    $page = Custompage::model()->findByAttributes(array('alias' => 'newStartup'));

                    $subject = Yii::t('mail',$page->name, array('{startupName}' => $model->name));

                    $message = Yii::t('mail',$page->content, array(
                            '{startupName}'=>$model->name,
                            '{link}'=>Yii::app()->createAbsoluteUrl('/startup/view/', array('alias'=>$model->alias)),
                            '{linkManage}'=>Yii::app()->createAbsoluteUrl('/startup/company/', array('id'=>$model->id,'name'=>$model->name)),
                            '{linkApprove}'=>Yii::app()->createAbsoluteUrl('/admin/startup/manage', array('id'=>$model->id)),
                            '{siteName}'=>Yii::app()->name,
                        )
                    );

                    $email = Yii::app()->email;
                    $email->subject = $subject;
                    $email->to = Yii::app()->params['emailin'];
                    $email->from = Yii::app()->params['emailout'];
                    $email->replyTo = Yii::app()->params['emailout'];
                    $email->message = $message;
                    $email->send();

                   $page = Custompage::model()->findByAttributes(array('alias' => 'newStartupForUser'));

                    $subject = Yii::t('mail',$page->name, array('{startupName}' => $model->name));

                    $message = Yii::t('mail',$page->content, array(
                            '{startupName}'=>$model->name,
                            '{link}'=>Yii::app()->createAbsoluteUrl('/startup/view/', array('alias'=>$model->alias)),
                            '{linkManage}'=>Yii::app()->createAbsoluteUrl('/startup/company/', array('id'=>$model->id,'name'=>$model->name)),
                            '{siteName}'=>Yii::app()->name,
                        )
                    );

                    $email = Yii::app()->email;
                    $email->subject = $subject;
                    $email->to = Yii::app()->user->getModel()->email;
                    $email->from = Yii::app()->params['emailout'];
                    $email->replyTo = Yii::app()->params['emailout'];
                    $email->message = $message;
                    $email->send();
                }

                $message = Yii::t('startup', 'Startup was saved');
                echo CJSON::encode(array('status'=> 'success', 'message' => $message,'alias' => $model->alias));
            }
            else
            {
                $message = Yii::t('startup', 'Error in saving startup');
                echo CJSON::encode(array('status'=> 'error', 'message' => $message, 'error' => $model->getMyErrors()));
            }
            die();
        }

        $this->render('publish', array('model' =>$model,'id'=>$id));
    }


    public function actionTeam($id)
    {
        if (isset($id))
        {
           $members = Startupuser::model()->findAllByAttributes(array('startup_id' => $id),array('with' => array('member'=>array('select'=>'id, fbuid,first_name, last_name'))));
        }

        $this->render('team', array('members' => $members, 'id'=>$id));
    }


    public function actionAjaxDeleteMedia($id)
    {
        $deleteSuccess = Startupmedia::model()->deleteAllByAttributes(array('startup_id'=>$id,'id'=> $_GET['imgID']));

        if ($deleteSuccess == 1)
        {
            print json_encode(array('status'=> 'success','message' => Yii::t('startup','Image was removed')));
            return true;
        }
        else
        {
            echo CJSON::encode(array('status'=> 'error', 'message' =>Yii::t('startup','Image not exist')));
            return false;
        }
    }

    public function actionAjaxDeleteTeamMember($id)
    {
        $deleteSuccess = Startupuser::model()->deleteAllByAttributes(array('startup_id'=>$id,'id'=> $_POST['Startupuser']['id']));

        if ($deleteSuccess == 1)
        {
            print json_encode(array('status'=> 'success','id'=> $_POST['Startupuser']['id'],'message' => '<div class="successMessage" >' . Yii::t('startup','Team member was deleted') . '</div>'));
            //echo CJSON::encode(array('id'=> $_POST['Startupuser']['id'],'success' => '<div class="successMessage" >' . Yii::t('startup','Team member was deleted') . '</div>'));
            return true;
        }
        else
        {
            echo CJSON::encode(array('status'=> 'error', 'message' =>'<div class="errorMessage" >' . Yii::t('startup','Team member not exist') . '</div>'));
            return false;
        }
    }

    public function actionPitch($id)
    {
        if (isset($id))
        {
            $pitches = Startupmedia::getAllPitch($id);
            $samples = Pitchsample::getAll();
        }

        $this->render('pitch', compact('pitches','samples', 'id'));
    }

    public function actionMedia($id)
    {
        if (isset($id))
        {
            $startup = Startup::model()->findByAttributes(array('id' => $id), array('select'=> 'id, peach_video_url'));
            $video = $startup->peach_video_url;

            $medias = Startupmedia::getAllImage($id);
        }

        $this->render('media', compact('medias', 'video','id'));
    }

    public function actionAjaxDeleteVideo($id)
    {
        $deleteSuccess = Startup::model()->updateByPk($id, array('peach_video_url'=>''));

        if ($deleteSuccess > 0)
        {
            print json_encode(array('status'=> 'success','message' => Yii::t('startup','Video was delete successfully')));
            return true;
        }
        else
        {
            echo CJSON::encode(array('status'=> 'error', 'message' => Yii::t('startup','Video was not saves')));
            return false;
        }
    }

    public function actionAjaxUpdateVideo($id)
    {
        $updateSuccess = Startup::model()->updateByPk($id, array('peach_video_url'=>$_POST['Startup']['peach_video_url']));

        if ($updateSuccess > 0)
        {
            echo CJSON::encode(array('status'=> 'success','message' => Yii::t('startup','Video was updated successfully'), 'video' => $_POST['Startup']['peach_video_url']));
            return true;
        }
        else
        {
            echo CJSON::encode(array('status'=> 'error', 'message' => Yii::t('startup','Video was not saves')));
            return false;
        }
    }

    public function actionAjaxUpdateTeamMember($id)
    {
        // Load model
        $suser = Startupuser::model()->findByAttributes(array('id' => $_POST['Startupuser']['id'], 'startup_id' => $id));

        if ($suser)
        {

            $suser->title = $_POST['Startupuser']['title'];
            $suser->is_admin = $_POST['Startupuser']['is_admin'];

            // if Invitation update name also
            if (!$suser->user_id)
            {
                $suser->full_name= $_POST['Startupuser']['full_name'];
            }

            if ($suser->update())
            {
                print json_encode(array('status'=> 'success','id'=> $_POST['Startupuser']['id'],'message' => '<div class="successMessage" >' . Yii::t('startup','Team member was saved') . '</div>'));
                return true;
            }
        }

        // Update not suceess
        echo CJSON::encode(array('status'=> 'error', 'message' =>'<div class="errorMessage" >' . Yii::t('startup','Team member not updated') . '</div>'));
        return false;
    }

    public function actionAjaxAddTeamMember($id)
    {
        // Check if user search for any user in Autocomplete
        if (isset($_POST['Member']['id']))
        {
            // Check if user exist
            $checkMember = Member::model()->findByPk($_POST['Member']['id'], array('select' => 'id, first_name, last_name, fbuid'));

            if ($checkMember)
            {
               // Check if name equals
               if ($checkMember->getFullName() == $_POST['user_autocomplete'])
               {
                   // Check if user exist in Startupuser
                   if (count(Startupuser::model()->findAllByAttributes(array('user_id'=>$checkMember->id, 'startup_id' =>$id))) == 1)
                   {
                       echo CJSON::encode(array('status'=> 'error', 'message' =>'<div class="errorMessage" >' . Yii::t('startup','User already exist') . '</div>'));
                       return false;
                   }
                   else
                   {
                       return $this->addUserToStartup($checkMember,$id);
                   }
               }

            }
        }

        // validate email
        $validator=new CEmailValidator;
        if(!$validator->validateValue($_POST['user_autocomplete']))
        {
            echo CJSON::encode(array('status'=> 'error', 'message' => '<div class="errorMessage" >' . Yii::t('startup','Member not found or email address is not valid.') . '</div>'));
            return false;
        }
        // Check for email invitation
        else
        {
            // Check if user exist via mail
            $checkMember = Member::model()->findByAttributes(array('email' => $_POST['user_autocomplete']), array('select' => 'id, first_name, last_name, fbuid'));

            // Add exist user
            if ($checkMember)
            {
                return $this->addUserToStartup($checkMember,$id, false);
            }

            // Check if invitation already send
            else if (count(Startupuser::model()->findByAttributes(array('startup_id'=>$id, 'email_for_new' => $_POST['user_autocomplete']))) == 1)
            {
                echo CJSON::encode(array('status'=> 'error', 'message' => '<div class="errorMessage" >' . Yii::t('startup','Invitation already sent.') . '</div>'));
                return false;
            }
            // Send Invitiation
            else
            {
                // Build Message
                $message = Yii::t('startupMail', "Hey, Welcome to Crowder,<br /><br />
												    {currUserName} said that you are a part from his Startup!<br />
													You just need to register with this mail,<br />
													and all startup details will show.<br />
													Register from this link: {regLink}<br />
													Enjoy!<br /><br />
													========================<br /><br />
													Regards, the {team} Team.", array(
                    '{currUserName}' => Yii::app()->user->getModel(true)->getFullName(),
                    '{regLink}' => $this->createAbsoluteUrl('/register/index', array('mail'=> $_POST['user_autocomplete']) ),
                    '{team}' => Yii::app()->name,
                ));
                $email = Yii::app()->email;
                $email->subject = Yii::t('startupMail', 'New Invitation from Crowder');
                $email->to =  $_POST['user_autocomplete'];
                $email->from = Yii::app()->params['emailout'];
                $email->replyTo = Yii::app()->user->email;
                $email->message = $message;
                $email->send();

                // Save new user
                $suser = new Startupuser();
                $suser->startup_id = $id;
                $suser->email_for_new = $_POST['user_autocomplete'];

                if ($suser->save())
                {
                    echo CJSON::encode(
                        array(
                            'status'=> 'success',
                            'message' => '<div class="successMessage" >' . Yii::t('startup','Invitation sent!') . '</div>',
                            'id' => $suser->id,
                            'startup_id' => $suser->startup_id,
                            'full_name' => '',
                            'title' => $suser->title,
                            'image' =>  yii::app()->baseUrl . '/uploads/Profiles/default.png',
                            'is_admin' => $suser->is_admin,
                        ));
                    return true;
                }
                else
                {
                    echo $suser->getMyErrors();
                    return true;
                }
            }
        }

        //Startupuser::model()->findAllByPk($id, )
        $members = null;
        if (isset($id))
        {
            $members = Startupuser::model()->findAllByAttributes(array('startup_id' => $id));
        }

        $this->render('team', array('members' => $members));
    }

    public function addUserToStartup($member, $startupID, $isAdmin = false) {
        $suser = new Startupuser();
        $suser->startup_id = $startupID;
        $suser->user_id  = $member->id;
        $suser->is_admin = $isAdmin;

        if ($suser->save())
        {
            echo CJSON::encode(
              array('status'=> 'success',
                  'message' => '<div class="successMessage" >' . Yii::t('startup','User added!') . '</div>',
                  'id' => $suser->id,
                  'startup_id' => $suser->startup_id,
                  'full_name' => $member->getFullName(),
                  'title' => $suser->title,
                  'image' =>  $member->getProfilePic(),
                  'is_admin' => $suser->is_admin
            ));
            return true;
        }
        else
        {
            echo CJSON::encode(array('status'=> 'error', 'message' => $suser->getMyErrors()));
            return false;
        }
    }

    public function actionUsersAutocomplete() {
        $term = trim($_GET['term']);

        if($term !='') {
            // Note: Users::usersAutoComplete is the function you created in Step 2
            $users =  Member::usersAutoComplete($term);
            echo CJSON::encode($users);
            Yii::app()->end();
        }
    }


    public function actionAjaxUploadImage()
    {
        Yii::import("system.web.my.ext.EAjaxUpload.qqFileUploader");

        $folder=Yii::app()->basePath . '/../uploads/' . $this->modelName . 's/';// folder for uploaded files

        // init directory
        if (!is_dir($folder))
        {
            mkdir($folder);
            mkdir($folder . 'thumbs/');
        }

        $allowedExtensions = array("jpg", "jpeg","png");//array("doc", "docx", "ppt", "pptx","xlsx","xls", "xlt","pdf" ,"tiff")
        $sizeLimit = 1 * 1024 * 1024;// maximum file size in bytes
        $uploader = new qqFileUploader($allowedExtensions, $sizeLimit);
        $result = $uploader->handleUpload($folder);

        if (isset($result['error']))
        {
            $return = htmlspecialchars(json_encode($result),ENT_NOQUOTES);
        }
        else
        {
            // resize Image
            $image = Yii::app()->image->load($folder . $result['filename']);
            $image->resize(800, 600);
            $image->save();
            $image->resize(400, 100)->quality(75)->sharpen(30);
            $image->save($folder . '/thumbs/' . $result['filename']);

            $return = htmlspecialchars(json_encode(array_merge($result, array(
                'baseUrl' => Yii::app()->baseUrl . '/uploads/' . $this->modelName . 's/thumbs/',
            ))), ENT_NOQUOTES);
        }
        echo $return;// it's array
    }

    public function actionAjaxUploadMediaImage($id)
    {
        Yii::import("system.web.my.ext.EAjaxUpload.qqFileUploader");

        $model = new Startupmedia();

        $folder = Yii::app()->basePath . '/../uploads/' . $model->modelNameEn . 's/';// folder for uploaded files

        // init directory
        if (!is_dir($folder))
        {
            mkdir($folder);
            mkdir($folder . 'thumbs/');
        }

        $allowedExtensions = array("jpg", "jpeg","png");//array("doc", "docx", "ppt", "pptx","xlsx","xls", "xlt","pdf" ,"tiff")
        $sizeLimit = 1 * 1024 * 1024;// maximum file size in bytes
        $uploader = new qqFileUploader($allowedExtensions, $sizeLimit);
        $result = $uploader->handleUpload($folder);

        if (isset($result['error']))
        {
            $return = htmlspecialchars(json_encode($result),ENT_NOQUOTES);
        }
        else
        {
            // Save in DB
            $model->startup_id = $id;
            $model->image = $result['filename'];
            $model->media_type_id = Startupmedia::MEDIA_IMAGE;

            $model->save();

            // resize Image
            $image = Yii::app()->image->load($folder . $result['filename']);
            $image->resize(800, 600);
            $image->save();
            $image->resize(400, 100)->quality(75)->sharpen(30);
            $image->save($folder . '/thumbs/' . $result['filename']);


            $return = htmlspecialchars(json_encode(array_merge($result, array(
                'id' => $model->id,
                'imageNum' => $_GET['numImg'],
                'baseUrl' => Yii::app()->baseUrl . '/uploads/' . $model->modelNameEn . 's/thumbs/',
            ))), ENT_NOQUOTES);
        }

        echo $return;// it's array
    }

    public function actionAjaxUpdatePitch($id)
    {
        if(isset($_POST['Startupmedia']))
        {
            // Only 1 in Startupmedia
            foreach($_POST['Startupmedia'] as $i=>$media)
            {
                // Update scnario
                if (isset($_POST['Startupmedia'][$i]['id']) && $_POST['Startupmedia'][$i]['id'] != "")
                {
                    if (Startupmedia::model()->findByPk($_POST['Startupmedia'][$i]['id']))
                    {
                         // if image load
                        if (isset($_POST['Startupmedia'][$i]['image']))
                        {
                            $image = $_POST['Startupmedia'][$i]['image'];
                        }
                        else
                        {
                            $image = "";
                        }

                        Startupmedia::model()->updateByPk(
                            $_POST['Startupmedia'][$i]['id'],
                            array(
                                'title'=>$_POST['Startupmedia'][$i]['title'],
                                'content'=>$_POST['Startupmedia'][$i]['content'],
                                'image' => $image,
                            ),
                            array('condition' => 'startup_id = '. $id)
                        );

                        echo CJSON::encode(array('status'=> 'success','message' => Yii::t('startup','Pitch updated successfully!')));
                    }
                    else
                    {
                        echo CJSON::encode(array('status'=> 'error', 'message' => Yii::t('startup','Pitch was not found')));
                    }
                }
                else // new Pitch
                {
                    $pitch = new Startupmedia();
                    $pitch->media_type_id = Startupmedia::MEDIA_PITCH;
                    $pitch->startup_id = $id;
                    $pitch->title = $_POST['Startupmedia'][$i]['title'];
                    $pitch->content = $_POST['Startupmedia'][$i]['content'];
                    $pitch->image = isset($_POST['Startupmedia'][$i]['image']) ? $_POST['Startupmedia'][$i]['image'] : '';

                    if ($pitch->save())
                    {
                        echo CJSON::encode(array('pitc_id'=>$pitch->id, 'div_num' => $i, 'status'=> 'success','message' => Yii::t('startup','New Pitch saved successfully!')));
                    }
                    else
                    {
                        echo CJSON::encode(array('status'=> 'error', 'message' =>  $pitch->getMyErrors()));
                    }
                }
            }
        }
        else
        {
            echo CJSON::encode(array('status'=> 'error', 'message' => Yii::t('startup','Data can not be resolved')));
        }
        die();
    }

    public function actionAjaxUploadPitchImage($id)
    {
        Yii::import("system.web.my.ext.EAjaxUpload.qqFileUploader");

        $model = new Startupmedia();

        $folder = Yii::app()->basePath . '/../uploads/' . $model->modelNameEn . 's/';// folder for uploaded files

        // init directory
        if (!is_dir($folder))
        {
            mkdir($folder);
            mkdir($folder . 'thumbs/');
        }

        $allowedExtensions = array("jpg", "jpeg","png");//array("doc", "docx", "ppt", "pptx","xlsx","xls", "xlt","pdf" ,"tiff")
        $sizeLimit = 1 * 1024 * 1024;// maximum file size in bytes
        $uploader = new qqFileUploader($allowedExtensions, $sizeLimit);
        $result = $uploader->handleUpload($folder);

        if (isset($result['error']))
        {
            $return = htmlspecialchars(json_encode($result),ENT_NOQUOTES);
        }
        else
        {
            // resize Image
            $image = Yii::app()->image->load($folder . $result['filename']);
            $image->resize(800, 600);
            $image->save();
            $image->resize(400, 100)->quality(75)->sharpen(30);
            $image->save($folder . '/thumbs/' . $result['filename']);

            $return = htmlspecialchars(json_encode(array_merge($result, array(
                'imageNum' => $_GET['numImg'],
                'baseUrl' => Yii::app()->baseUrl . '/uploads/' . $model->modelNameEn . 's/thumbs/',
            ))), ENT_NOQUOTES);
        }

        echo $return;// it's array
    }

    public function actionAjaxUpdateMedia($id)
    {
        if(isset($_POST['Startupmedia']))
        {
            $notValid=0;
            foreach($_POST['Startupmedia'] as $i=>$media)
            {
                if (isset($_POST['Startupmedia'][$i]['id']))
                {
                    if (Startupmedia::model()->exists($_POST['Startupmedia'][$i]['id']))
                    {
                        Startupmedia::model()->updateByPk($_POST['Startupmedia'][$i]['id'],array('title'=>$_POST['Startupmedia'][$i]['title']), array('condition' => 'startup_id = '. $id));
                    }
                    else
                    {
                        $notValid++;
                    }
                }
            }

            if($notValid == 0)
            {
                echo CJSON::encode(array('status'=> 'success','message' => Yii::t('startup','All media saved!')));
            }
            else
            {
                echo CJSON::encode(array('status'=> 'error', 'message' => $notValid .' '. Yii::t('startup','Video was not updated')));
            }
        }
        else
        {
            echo CJSON::encode(array('status'=> 'error', 'message' => Yii::t('startup','There is no Media')));
        }
        die();
    }

}
?>