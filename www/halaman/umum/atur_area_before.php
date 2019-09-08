<?php
header('Access-Control-Allow-Origin: *'); 
session_start(); 
?>
<div data-page="atur_area_before" class="page navbar-fixed">
  <div class="navbar" style="background-color:#088378;">
     <div class="navbar-inner">
      <div class="left"><a href="#" class="link icon-only" id="back_atur_area_before"><i class="fa fa-arrow-left"></i></a></div>
      <div class="center"><b>List Lahan</b></div>
      <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
    </div>
  </div>
   <a href="#" class="floating-button color-purple" id="floatlahan">
    <i class="icon icon-plus"></i>
  </a>
 
  <div class="page-content pull-to-refresh-content" data-ptr-distance="55">
    <div class="pull-to-refresh-layer">
    <div class="preloader"></div>
    <div class="pull-to-refresh-arrow"></div>
  </div>

  <style>
  .facebook-card .card-header {
    display: block;
    padding: 5px;

  }
  .facebook-card .facebook-avatar {
    float: right;
  }
  .facebook-card .facebook-name {
     padding-left: 10px;
    font-size: 15px;
    font-weight: 400;
    color: black;
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
    padding: 5px 3px;
    font-weight: 400;
    font-size: 13px;
  }  
  .card {
  box-shadow: 1px 2px 4px 2px rgba(0,0,0,0.2);
   border-radius: 5px;
} 
</style>


        <div class="content-block-title"><i class="fa fa-refresh color-green" aria-hidden="true"></i> Daftar Data Lahan :</div>
        <div class="content-block">
          
   <table style="font-size:13px;color:;">
         <caption id ="cap-rencanajualaasd"><b>List Lahan :</b></caption>

  </table>   
     <div id="isilahan">
          
        </div>

  </div>
      
</div>  
 