<?php
header('Access-Control-Allow-Origin: *'); 
?>
<div data-page="pesananku" class="page navbar-fixed">
  <div class="navbar" style="background-color: green;">
     <div class="navbar-inner">
      <div class="left"><a href="#" class="link icon-only" id="back_pesananku"><i class="icon icon-back"></i></a></div>
      <div class="center"><b>Histori Pemesanan</b></div>
      <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
    </div>
  </div>
  
    <div class="page-content hide-bars-on-scroll pull-to-refresh-content" data-ptr-distance="55">
    <div class="pull-to-refresh-layer">
    <div class="preloader"></div>
    <div class="pull-to-refresh-arrow"></div>
  </div>
      <div class="content-block-title"><i class="fa fa-thumbs-up color-blue" aria-hidden="true"></i>Histori Pemesanan Penanaman</div>
    <div class="list-block media-list">
      <ul>
        <div id="isipesanan">
          
        </div>
        
      </ul>
    </div> 

 <div class="popover popover-pesanan">
    <div class="popover-angle"></div>
    <div class="popover-inner">
      <div class="content-block">
        
          <div class="col-100 "> <img src="img/logo.png" 
            class="col-100" alt="banner1" id="popfotolistpesanan" style="width: 100%;max-height: 400px;" border="1"> </div>
        
      </div>
    </div>
  </div>
  </div>
</div>
