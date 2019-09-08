<?php
  header('Access-Control-Allow-Origin: *'); 
?>
<div data-page="home" class="page navbar-fixed">

  <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner ">
      <div class="left sliding"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
      <div class="center font-standard" style="text-transform:none;">Selamat datang</div>
      <div class="right sliding">
          <img id="close-side-panel" src="img/menu_icon/icon_menu_plus_light.svg" width="25%" alt="" style="vertical-align:middle;"/>&nbsp;
          <img id="close-side-panel" src="img/menu_icon/icon_menu_favourite_light.svg" width="25%" alt="" style="vertical-align:middle;"/>&nbsp;
          <img id="close-side-panel" src="img/menu_icon/icon_menu_search_light.svg" width="25%" alt="" style="vertical-align:middle;"/>
        </div>
    </div>
  </div>
  <div class="toolbar tabbar" style="background-color:#088378;height:120px;position:relative;">
    <div class="toolbar-inner ">
      <div class="item-content userprofile hundred-percent" style="height:auto;">
        <div class="item-media" style="padding-left:5%;"><img id="homefotoprofile" src="img/menu_icon/photo_profile_light.svg" width="50" alt=""/></div>
        <div class="item-inner" style="padding-top:5%;">
          <div class="item-title-row" style="">
            <div class="item-title font-color-light font-standard" id="greeting">Nama Profil</div>
          </div>
          <div class="item-subtitle font-color-light font-standard" id="userlogin">Lokasi Sekarang<br/>Member sejak </div>
        </div>
         <div class="item-inner" style="width:20%;padding-top:5%;">
            <div class="item-title font-color-light font-standard"><img src="img/menu_icon/icon_create_light.svg" id="link-profile" alt=""/></div>
        </div>
      </div>
    </div> 
  </div>
  <div class="page-content">

    <div id="home-content">

    </div>
    <div class="content-block padding-top-10 padding-bottom-10">
      &nbsp;
    </div>
  </div>
</div>
