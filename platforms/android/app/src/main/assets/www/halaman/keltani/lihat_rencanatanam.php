<?php
header('Access-Control-Allow-Origin: *'); 
session_start(); 
 ?>
<div data-page="lihat_rencanatanam" class="page navbar-fixed ">
  <div class="navbar" style="background-color: green;">
    <div class="navbar-inner">
        <div class="left sliding"><a href="#" class="link back icon-only" ><i class="fa fa-chevron-left"></i></a></div>
        <div class="center "><B>Lihat Detail Penanaman</B></div>
        <div class="right sliding"></div>
    </div>
  </div>

  <div class="page-content" >
    <style>
  .facebook-card .card-header {
    display: block;
    padding: 10px;
  }
  .facebook-card .facebook-avatar {
    float: left;
  }
  .facebook-card .facebook-name {
    margin-left: 44px;
    font-size: 14px;
    font-weight: 500;
  }
  .facebook-card .facebook-date {
    margin-left: 44px;
    font-size: 13px;
    color: #8e8e93;
  }
  .facebook-card .card-footer {
    background: #fafafa;
  }
  .facebook-card .card-footer a {
    color: #81848b;
    font-weight: 500;
  }
  .facebook-card .card-content img {
    display: block;
  }
  .facebook-card .card-content-inner {
    padding: 15px 10px;
  }  
</style>
   
     
      
      <div class="content-block-title"><i class="fa fa-thumbs-up color-blue" aria-hidden="true"></i> History Update Perkembangan</div>
    <div class="content-block">
      <table style="font-size:12px;color:;">
         <caption id ="cap-urhiskoop"><b>Total History : 0 update.</b></caption>
  </table>
   <div id="tabel-urhiskoop"></div>
    </div> 
          
       
     
    
 
        <!-- About popover -->
  <div class="popover popover-about">
    <div class="popover-angle"></div>
    <div class="popover-inner">
      <div class="content-block">
        
          <div class="col-100 "> <img src="img/home.jpg" 
            class="col-100" alt="banner1" id="popfotohistorykoop" style="width: 100%;height: 100%;" border="1"> </div>
        
      </div>
    </div>
  </div>
  <!-- About popover -->
  </div> <!-- pagecontent -->
</div>
