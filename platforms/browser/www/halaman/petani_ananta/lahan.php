<?php
  header('Access-Control-Allow-Origin: *'); 
?>
<div data-page="lahan" class="page navbar-fixed">
  <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner ">
      <div class="left sliding"><a href="main/home.php" id="back" class="link"><i class="icon icon-back"></i></a></div>
      <div class="center font-standard" style="text-transform:none;">Tambah Lahan</div>
      <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
    </div>
  </div>
  <div class="page-content">
    <div class="content-block">
      <font>Lahan Saya</font>
      <div class="row" id="lahanuser">
       
            

      </div>
      <div class="center content-block error" id="detailLahanUser" style="display:none;">
          <h1 id="lahanJudulDetailSelected">-</h1>
          <p id="lahanDetailSelected">-</p>
          <div id="map-detail" style="width:100%;height:300px;"></div>
      </div>
    </div>
    <form>
      <div class="list-block introtext base-terra" >
        <div id="lahantambah" style="min-height:0px;height:40px;text-align:center;">
          <p>Tambah Lahan</p>
        </div>
        <div id="lahandata" style="display:none;">
          <center>
              <!--- ----Nama lahan---- -->
              <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
                <!-- <div class="item-media" style="min-height:0px;height:40px;">
                  <img src="img/custom/icon_profile_color.svg" width="60%" alt=""> 
                </div> -->
                <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                    <input type="text" style="font-size:12px;" placeholder="Nama Lahan" required="" class="" id="lahannama">
                </div>
              </div>
              <!--- ----Area---- -->
              <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
                <!-- <div class="item-media" style="min-height:0px;height:40px;">
                  <img src="img/custom/icon_profile_color.svg" width="60%" alt=""> 
                </div> -->
                <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                    <input type="text" style="font-size:12px;" placeholder="Area" readonly="" id="lahanarea" class="not-empty-state focus-state">
                </div>
              </div>
              <!--- ----Area---- -->
              <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
                <!-- <div class="item-media" style="min-height:0px;height:40px;">
                  <img src="img/custom/icon_profile_color.svg" width="60%" alt=""> 
                </div> -->
                <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                    <input type="text" style="font-size:12px;" placeholder="Sub Area" readonly="" id="lahansubarea" class="not-empty-state focus-state">
                </div>
              </div>
              <!--- ----Luas lahan---- -->
              <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
                <!-- <div class="item-media" style="min-height:0px;height:40px;">
                  <img src="img/custom/icon_profile_color.svg" width="60%" alt=""> 
                </div> -->
                <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                    <input type="text" style="font-size:12px;" placeholder="Luas Lahan (Dalam satuan hektar)" required="" class="" id="lahanluas" >
                </div>
              </div>
              <!--- ----Button Custom---- -->
              <div class="content-block">
                <p class="buttons-row">
                  <a id="lahanjaditambah" style="background-color:#088378;border-radius:50px;color:white;" class="button button-fill button-raised"> + Koordinat</a>
                  <a id="lahankalkulasikoordinat" style="background-color:#088378;border-radius:50px;color:white;" class="button button-fill button-raised">Kalkulasi Luas</a>
                </p>
              </div>
              <!--- ----Kumpulan koordinat lahan---- -->
              <div id="lahankoordinat">
              </div>
              <!--- ----Foto Lahan---- -->
              <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">  
                <div class="item-inner" style="min-height:0px;height:30px;margin-left:0px;">
                  <a id="lahangantigambar" class=" no-transform my-bold" style="width:100%;background-color:#088378;border-radius:50px;color:white;">Ambil Foto Lahan</a>
                </div>
              </div>
              <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;">
                <div class="item-inner" style="">
                    <img class="full-border-base" id="lahangambar" width="100%" src="img/etc/default_lahan.jpg" alt="">
                </div>
              </div>
              <!--- ----button simpan---- -->
              <div class="content-block">
                <p class="buttons-row">
                  <a id="lahansimpandata" style="background-color:#088378;border-radius:50px;color:white;" class="button button-fill button-raised">Simpan Lahan</a>
                  <a id="lahanbataltambah" style="background-color:#088378;border-radius:50px;color:white;" class="button button-fill button-raised">Batal</a>
                </p>
              </div>

          </center>
        </div>
      </div>
    </form>
    <div class="content-block padding-top-10 padding-bottom-10">
      &nbsp;
    </div>
  </div>
</div>
