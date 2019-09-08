<?php
header('Access-Control-Allow-Origin: *'); 
session_start(); 
?>
<div data-page="rencanajual" class="page navbar-fixed">
  <div class="navbar" style="background-color: green;">
     <div class="navbar-inner">
      <div class="left"><a href="#" class="link icon-only" id="back_rencanajual"><i class="icon icon-back"></i></a></div>
      <div class="center"><b>Rencana Penjualan</b></div>
      <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
    </div>
  </div>
   <a href="#" class="floating-button color-purple" id="floatrencanajual">
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

        <div class="content-block-title"><i class="fa fa-refresh color-green" aria-hidden="true"></i> Rencana Penjualan Koop / PB :</div>
        <div class="content-block">
   <table style="font-size:13px;color:;">
         <caption id ="cap-rencanajuala"><b>List Rencana Jual</b></caption>

  </table>   
    <div id="tabel-rencanajuala"></div>
          </div>

  </div>
      
</div>  
 