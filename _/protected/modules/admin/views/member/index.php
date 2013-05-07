<div class='floatleft'>
	<?php echo CHtml::link(Yii::t('adminMember', 'Add User'), array('Member/adduser'), array( 'class' => 'button' )); ?>
</div>

<div class="content-box"><!-- Start Content Box -->
	
	<div class="content-box-header">
		<h3><?php echo Yii::t('adminMember', 'Users'); ?> (<?php echo Yii::app()->format->number($count); ?>)</h3>
	</div> <!-- End .content-box-header -->
	
	<div class="content-box-content">
			<?php echo CHtml::form(); ?>
			<table>
				<thead>
					<tr>
					   <th style='width: 5%;'><input class="check-all" type="checkbox" /></th>
					   <th style='width: 5%'>&nbsp;</th>
					   <th style='width: 20%;'><?php echo $sort->link('username', Yii::t('adminMember', 'Username'), array( 'class' => 'tooltip', 'title' => Yii::t('adminMember', 'Sort user list by username') ) ); ?></th>
					   <th style='width: 25%;'><?php echo $sort->link('email', Yii::t('adminMember', 'Email'), array( 'class' => 'tooltip', 'title' => Yii::t('adminMember', 'Sort user list by email') ) ); ?></th>
					   <th style='width: 10%;'><?php echo $sort->link('role', Yii::t('adminMember', 'Role'), array( 'class' => 'tooltip', 'title' => Yii::t('adminMember', 'Sort user list by role') ) ); ?></th>
					   <th style='width: 20%;'><?php echo $sort->link('joined', Yii::t('adminMember', 'Joined'), array( 'class' => 'tooltip', 'title' => Yii::t('adminMember', 'Sort user list by joined date') ) ); ?></th>
					   <th style='width: 15%;'><?php echo Yii::t('adminMember', 'Options'); ?></th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td colspan="7">	
							<div class="bulk-actions align-left">
								<select name="bulkoperations">
									<option value=""><?php echo Yii::t('global', '-- Choose Action --'); ?></option>
									<option value="bulkdelete"><?php echo Yii::t('global', 'Delete Selected'); ?></option>
								</select>
								<?php echo CHtml::submitButton( Yii::t('global', 'Apply'), array( 'confirm' => Yii::t('adminMember', 'Are you sure you would like to perform a bulk operation?'), 'class'=>'button')); ?>
							</div>
													
							<?php $this->widget('widgets.admin.pager', array( 'pages' => $pages )); ?>
							<div class="clear"></div>
						</td>
					</tr>
				</tfoot>
				<tbody>
				<?php if ( count($Member) ): ?>
					
					<?php foreach ($Member as $row): ?>
						<tr>
							<td><?php echo CHtml::checkbox( 'user[' . $row->id.']' ); ?></td>
							<td><?php echo  '<img class="userPicSmall" src="' .$row->getProfilePic() .'">' ?></td>
							<td><a href="<?php echo $this->createUrl('Member/viewuser', array( 'id' => $row->id )); ?>" title="<?php echo Yii::t('adminMember', 'View User'); ?>" class='tooltip'><?php echo CHtml::encode(urldecode($row->username)); ?></a></td>
							<td><?php echo CHtml::encode($row->email); ?></td>
							<td><?php echo CHtml::encode($row->role); ?></td>
							<td class='tooltip' title='<?php echo Yii::t('adminMember', 'Joined Date'); ?>'><?php echo Yii::app()->dateFormatter->formatDateTime($row->joined, 'short', 'short'); ?></td>
							<td>
								<!-- Icons -->
								 <a href="<?php echo $this->createUrl('Member/edituser', array( 'id' => $row->id )); ?>" title="<?php echo Yii::t('adminMember', 'Edit this member'); ?>" class='tooltip'><img src="<?php echo Yii::app()->themeManager->baseUrl; ?>/images/icons/pencil.png" alt="Edit" /></a>
								 <a href="<?php echo $this->createUrl('Member/deleteuser', array( 'id' => $row->id )); ?>" title="<?php echo Yii::t('adminMember', 'Delete this member!'); ?> "class='tooltip deletelink'><img src="<?php echo Yii::app()->themeManager->baseUrl; ?>/images/icons/cross.png" alt="Delete" /></a>
							</td>
						</tr>
					<?php endforeach ?>
					
				<?php else: ?>	
					<tr>
						<td colspan='6' style='text-align:center;'><?php echo Yii::t('adminMember', 'No Member Found.'); ?></td>
					</tr>
				<?php endif; ?>
				</tbody>
			</table>
		<?php echo CHtml::endForm(); ?>
	</div> <!-- End .content-box-content -->
	
</div> <!-- End .content-box -->
