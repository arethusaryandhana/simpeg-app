<?php
  header('Access-Control-Allow-Origin: *'); 
?>
<div data-page="market" class="page navbar-fixed">

  <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner ">
      <div class="left sliding"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
      <div class="center font-standard">FEED PENANAMAN</div>
      <div class="right sliding"> 
          <img id="refnewsfeed" src="img/menu_icon/icon refresh light.svg" width="100%" alt="" style="margin-right: 0.5em;"/>
           <img id="refnewsfeedx" src="img/menu_icon/icon tab tips light.svg" width="100%" alt="" style="margin-right: 0.5em;"/>

        </div>
    </div>
  </div>
   <form data-search-list=".list-block-search" data-search-in=".item-title" class="searchbar searchbar-init" style="background-color:#088378;">
    <div class="searchbar-input">
      <input type="search" placeholder="Search" id="searchlist"><a href="#" class="searchbar-clear"></a>
    </div><a href="#" class="searchbar-cancel">Cancel</a>
  </form>
 
  <!-- Search Bar overlay -->
  <div class="searchbar-overlay"></div>
<!--   <div class="toolbar tabbar" style="background-color:#088378;height:120px;position:relative;">
    <div class="toolbar-inner ">
      <div class="item-content userprofile hundred-percent" style="height:auto;">
        <div class="item-media" style="padding-left:5%;"><img src="img/menu_icon/photo_profile_light.svg" id="imghome" width="50" alt=""/></div>
        <div class="item-inner" style="padding-top:5%;">
          <div class="item-title-row" style="">
            <div class="item-title font-color-light font-standard" id="greeting">Nama Profil</div>
          </div>
          <div class="item-subtitle font-color-light font-standard" id="userlogin">Lokasi : Surabaya<br/>Member sejak Maret 2019</div>
        </div>
         <div class="item-inner" style="width:20%;padding-top:5%;">
            <div class="item-title font-color-light font-standard"><img src="img/menu_icon/icon_create_light.svg" alt=""/></div>
        </div>
      </div>
    </div>
  </div> -->
  <style>
  .facebook-card .card-header {
    display: block;
    padding: 5px;
  }
  .facebook-card .facebook-avatar {
    float: right;
  }
  .facebook-card .facebook-name {
     padding-left: 2px;
    font-size: 14px;
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
  <div class="page-content bg-satu">
<div class="content-block-title"><div id="capmarket">Total Data </div></div>
      <div id="isimarket">
          
        </div>
      
         <div class='pagination' id="pagemarket">
        <a href='#' id='paginginput' data-angka='2' class="active">1</a>
    </div>

    <!--    <div class="card facebook-card" >
          <div class="card-header no-border">
          <div class="facebook-avatar"><img src="img/padi.jpg" width="50" height="50"></div>
          <div class="facebook-name">Padi Gabah Kering (GKG)</div>

          <div class="card-content"> <div class="card-content-inner">keterangan<br/> 21 Maret 2019 - 2093939338 sdsa ini adalah percobaan kalimat ku yang cukup panjang dan memusingkan <br/><a href="#" id="a_popover"> Dokumentasi</a>  </div></div> 
          </div>
          <div class="card-footer">
          <a href="#"> <i class="fa fa-heart-o color-red" aria-hidden="true"></i> Subscribe </a>
          <a href="#" class="link" style="text-align: center;">
            
          </a>
          <a href="#"> Detail </a>
          </div>
          </div>
 -->


 
  
   
    <div class="content-block padding-top-10 padding-bottom-10">
      &nbsp;
    </div>
  </div>
</div>
