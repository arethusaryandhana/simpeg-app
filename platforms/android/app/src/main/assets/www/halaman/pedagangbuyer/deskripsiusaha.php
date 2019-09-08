<?php
  header('Access-Control-Allow-Origin: *'); 
?>
<div data-page="deskripsiusaha" class="page navbar-fixed">

  <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner ">
      <div class="left sliding"><a href="main/home.php" id="back" class="link"><i class="icon icon-back"></i></a></div>
      <div class="center font-standard" style="text-transform:none;">Deskripsi Usaha</div>
      <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
    </div>
  </div>
  <div class="toolbar tabbar" style="background-color:#088378;height:120px;position:relative;">
    <div class="toolbar-inner ">
      <div class="item-content userprofile hundred-percent" style="height:auto;">
        <div class="item-media" style="padding-left:5%;"><img src="img/menu_icon/photo_profile_light.svg" width="50" alt=""/></div>
        <div class="item-inner" style="padding-top:5%;">
          <div class="item-title-row" style="">
            <div class="item-title font-color-light font-standard" id="greeting">Nama Profil</div>
          </div>
          <div class="item-subtitle font-color-light font-standard" id="userlogin">Lokasi Sekarang<br/>Member sejak </div>
        </div>
      </div>
    </div>
  </div>
  <div class="toolbar tabbar" style="background-color:#088378;position:relative;">
        <div class="toolbar-inner"><a href="#tab31" class="button active tab-link">Info</a><a href="#tab32" class="button tab-link">tab ke -2</a><a href="#tab33" class="button tab-link">Tab ke -3</a></div>
    </div>
  <div class="page-content" style="margin-top:-10%;">
    <div class="list-block introtext base-terra" id="deskripsidata" style="display:none;">
        <center>
            <!--- ----Deskripsi---- -->
            <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;">
                  <textarea type="text" style="font-size:12px;" placeholder="Deskripsi Usaha Anda" id="deskripsiusaha"></textarea>
            </div>
            <div id="jasadetail">

            </div>

            <!--- ----Lokasi --- -->
            <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="text" style="font-size:12px;" placeholder="Lokasi"  id="deskripsilokasi" >
              </div>
            </div>

            <!--- ----button simpan---- -->
            <div class="content-block">
              <p class="buttons-row">
                <a id="deskripsijaditambah" style="background-color:#088378;border-radius:50px;color:white;" class="button button-fill button-raised">Update Deskripsi</a>
              </p>
            </div>

            <!--- ----Button Batal---- -->
            <div class="content-block">
              <p class="buttons-row">
                <a id="deksripsibataltambah" style="background-color:#088378;border-radius:50px;color:white;" class="button button-fill button-raised">Batal</a>
              </p>
            </div>

        </center>
    </div>


    <div class="tabs-animated-wrap">
    <div class="tabs">
      <div id="tab31" class=" tab page-content active">
        <div class="content-block">
            <h3 class="">Deskripsi Usaha &nbsp; <i id="deskripsiedit" class="fa fa-edit" aria-hidden="true"></i></h3>
            <div id="isideskripsi">

            </div>
        </div>
      </div>
      <div id="tab32" class="tab page-content">
            Tab ke -2
      </div>
      <div id="tab33" class=" page-content tab">
          Tab ke -3
      </div>
    </div>
  </div>
  </div>
</div>
