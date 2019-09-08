<?php
  header('Access-Control-Allow-Origin: *'); 
?>
<div data-page="jasa" class="page navbar-fixed">
  <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner ">
      <div class="left sliding"><a href="halaman/home.php" id="back" class="link"><i class="icon icon-back"></i></a></div>
      <div class="center font-standard" style="text-transform:none;">Jasa</div>
      <div class="right"><a href="#" class="open-panel link icon-only"><i class="icon icon-bars"></i></a></div>
    </div>
  </div>
  <div class="page-content">

    <form>
      <div class="list-block introtext base-terra" >
        <div id="jasatambah" style="min-height:0px;height:40px;text-align:center;">
          <p>Tambah Jasa</p>
        </div>
        <div id="jasadata" style="display:none;">
          <center>
              <!--- ----Jenis Jasa---- -->
              <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
                <!-- <div class="item-media" style="min-height:0px;height:40px;">
                  <img src="img/custom/icon_profile_color.svg" width="60%" alt=""> 
                </div> -->
                <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                    <input type="text" style="font-size:12px;" placeholder="Jenis Jasa" readonly="" id="jasasemua" class="not-empty-state focus-state">
                </div>
              </div>
              <!--- ----Sub Jasa---- -->
              <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
                <!-- <div class="item-media" style="min-height:0px;height:40px;">
                  <img src="img/custom/icon_profile_color.svg" width="60%" alt=""> 
                </div> -->
                <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                    <input type="text" style="font-size:12px;" placeholder="Menggunakan" readonly="" id="jasasubjasa" class="not-empty-state focus-state">
                </div>
              </div>
              <div id="jasadetail">

              </div>
              <!--- ----button simpan---- -->
              <div class="content-block">
                <p class="buttons-row">
                  <a id="jasasimpandata" style="background-color:#088378;border-radius:50px;color:white;" class="button button-fill button-raised">Tambah Jasa</a>
                </p>
              </div>
              <!--- ----Button Custom---- -->
              <div class="content-block">
                <p class="buttons-row">
                  <a id="jasabataltambah" style="background-color:#088378;border-radius:50px;color:white;" class="button button-fill button-raised">Batal</a>
                </p>
              </div>

          </center>
        </div>
      </div>
    </form>

    <div class="content-block" id="jasaKonten">
      

    </div>


  </div>
</div>
