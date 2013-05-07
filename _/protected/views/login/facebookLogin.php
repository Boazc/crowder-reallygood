<?php
      // Load facebook
      Yii::import('application.extensions.facebook.Facebook');
      $facebook = new Facebook(array(
          'appId' => Yii::app()->params['facebookappid'],
          'secret' => Yii::app()->params['facebookapisecret'],
          'cookie' => true,
          'disableSSLCheck' => false ));

      Facebook::$CURL_OPTS[CURLOPT_CAINFO] = Yii::getPathOfAlias('ext.facebook') . '/fb_ca_chain_bundle.crt';

      if (!isset($urlParams))
      {
          $urlParams = array();
      }
      // Facebook link
      $facebookLink = $facebook->getLoginUrl(array('scope' => 'email, read_stream, publish_stream', 'redirect_uri' => Yii::app()->createAbsoluteUrl('/login/facebooklogin', array_merge(array( 'lang' => false ), $urlParams) ), 'display'=>'popup') );

?>

<div id='facebookBtn' class="roundedCorners">
      <?php echo CHtml::link( "<span class='logoFace'></span>". $btnName ."</span>", 'javascript:void(0);', array( 'title' => $btnName, 'onClick' => "showFaceBookAuth()" ), array('class'=> 'initA') ); ?>
</div>

<script type="text/javascript">
      function showOAuth()
      {
            window.open('<?php echo $this->createUrl( 'login/facebooklogin' ); ?>');
      }
      function showFaceBookAuth() {
         var url = '<?php echo $facebookLink; ?>';
          //var url = 'http://www.facebook.com/connect/uiserver.php?app_id=466243770054307&next=http%3A%2F%2Fsbmi.co.il%2Flogin%2Ffacebooklogin%2Flang&display=popup&cancel_url=http%3A%2F%2Fsbmi.co.il%2Flogin&locale=he_IL&perms=read_stream%2Cemail%2Coffline_access&return_session=1&session_version=3&fbconnect=1&canvas=0&legacy_return=1&method=permissions.request';
          url =  url.replace("price_invest_val", $('#RegisterForm_price').val());
          url =  url.replace("invest_cat_val", $('#RegisterForm_mainCategory').val());
          window.open(url, 'FacebookLogin',"status=1,height=600,width=700");
      }
</script>