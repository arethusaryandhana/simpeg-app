<?php
header('Access-Control-Allow-Origin: *'); 
session_start(); 

?>
<div data-page="penjualanku" class="page navbar-fixed">
  <div class="navbar" style="background-color: green;">
     <div class="navbar-inner">
      <div class="left"><a href="#" class="link icon-only" id="back_penjualanku"><i class="icon icon-back"></i></a></div>
      <div class="center"><b>Histori Penjualan</b></div>
      <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
    </div>
  </div>
  <div class="toolbar tabbar" style="background-color: green;">
        <div class="toolbar-inner">
          <a href="#tabpen1" class="button active tab-link">List Panen Ditawarkan</a>
          <a href="#tabpen2" class="button tab-link">Penjualanku</a>
         </div>
    </div>
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
    font-weight: 300;
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
    padding: 4px 2px;
  }  
</style>

    <div class="tabs-animated-wrap">
    <div class="tabs">
      <div id="tabpen1" class=" tab page-content active">
          <div class="content-block-title"><i class="fa fa-thumbs-up color-blue" aria-hidden="true"></i>Daftar Hasil Panen yang ditawarkan :</div>
    <div class="list-block media-list">
      <ul>
        <div id="isipenjualan">
        </div>
        
      </ul>
    </div> 
      </div> 
       <!--END TABS 1  -->
       <div id="tabpen2" class="tab page-content">
        <div class="content-block-title"><i class="fa fa-thumbs-up color-blue" aria-hidden="true"></i> History List Pemesan</div>
    <div class="content-block">
      <div style="overflow:auto; height:65%;">
      <table style="font-size:12px;color:;">
         <caption id ="cap-urpenjualan"><b>History Penjualan Hasil Panen :</b></caption>
  </table>
    <div id="tabel-urpenjualan"></div>
</div>
    </div> 
       </div>

    </div>
  </div>
  <!-- END TABS -->
    

 <div class="popover popover-penjualan">
    <div class="popover-angle"></div>
    <div class="popover-inner">
      <div class="content-block">
        
          <div class="col-100 "> <img src="img/logo.png" 
            class="col-100" alt="banner1" id="popfotolistpenjualan" style="width: 100%;max-height: 400px;" border="1"> </div>
        
      </div>
    </div>
  </div>

 <div class="popover popover-penjualanb">
    <div class="popover-angle"></div>
    <div class="popover-inner">
      <div class="content-block">
        
          <div class="col-100 "> <img src="img/home.jpg" 
            class="col-100" alt="banner1" id="popfotolistpenjualanb" style="width: 100%;height: 100%;" border="1"> </div>
        
      </div>
    </div>
  </div>


  </div>
</div>
