<?php
  header('Access-Control-Allow-Origin: *'); 
?>
<div data-page="profile" class="page navbar-fixed">
  <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner ">
      <div class="left sliding"><a href="halaman/home.php" id="back" class="link"><i class="icon icon-back"></i></a></div>
      <div class="center font-standard" style="text-transform:none;">Profil</div>
      <div class="right" style="padding-right:5%;" id="profilesimpan" ><i class="fa fa-check" aria-hidden="true"></i></div>
    </div>
  </div>
  <div class="toolbar tabbar" style="background-color:#088378;position:relative;">
      <div class="toolbar-inner">
        <a href="#tab31" id="1" class="button tab-link " style="text-transform: none;">Info User</a>
        <a href="#tab32" id="2" class="button tab-link " style="text-transform: none;">Info Pribadi</a>
        <a href="#tab33" id="3" class="button tab-link " style="text-transform: none;">Info Foto</a>
      </div>
  </div>

  <div class="page-content logins own-profile no-padding" style="padding-top:0;">
    <div class="tabs-animated-wrap">
      <div class="tabs">
        <!-- ------------------------- Tab Info User ---------------------------- -->
        <div id="tab31" class=" tab page-content  list-block introtext" >
          <center>
            <div class="logo main col12"  style="background-color:none;">
                <img class="full-border-base my-radius-50" id="profilefoto" width="120" src="img/menu_icon/blank_profile.png" alt="">
            </div>

            <!--- ----Ganti Foto Profile---- -->
            <center><p id="profilegantifoto" style="color:#088378;" class="my-bold">Ganti Foto Profil</p></center>

            <!--- ----Username---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon_profile_color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profileusername">Username</font>
              </div>
            </div>
            <!--- ----AlamatEmail---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon_email_color.svg" width="40%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black edit-profile" id="profileemail" judul="Alamat Email">Alamat Email</font>
              </div>
            </div>
            <!--- ----Sebagai---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon account type color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilesebagai">Ingin Mendaftar Sebagai</font>
              </div>
            </div>
            <!--- ----Tanggal Buat---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon date color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profiletanggalbuat">Tanggal Buat</font>
              </div>
            </div>
          </center>
        </div>

        <!-- ------------------------- Tab Info Pribadi ---------------------------- -->
        <div id="tab32" class="tab page-content active" style="padding-bottom:10%;">
          <center>
          <div class="content-block list-block ">
            <!--- ----NamaPengguna---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img title="Nama Lengkap Anda" src="img/menu_icon/icon_name_color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilenama" judul="Nama Lengkap">Nama Lengkap </font>
              </div>
            </div>

            <!--- ----NIK---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon_NIK_color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divnik" judul="Nomor KTP" tips="text" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilenik" judul="Nomor KTP">Nomor KTP</font>
              </div>
            </div>
            <!--- ----Tempat Lahir---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon place birthday color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divtempatlahir" judul="Tempat Lahir" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profiletempatlahir" judul="Tempat Lahir">Tempat Lahir</font>
              </div>
            </div>
            <!--- ----Tanggal Lahir---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon date birthday color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" id="divtanggallahir" judul="Tanggal Lahir" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="text" style="font-size:12px;" judul="Tanggal Lahir"  placeholder="Tanggal Lahir" readonly="" id="profiletanggallahir" class="not-empty-state focus-state my-capitalize">
              </div>
            </div>
            <!--- ----Jenis Kelamin---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon gender color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="text" style="font-size:12px;" placeholder="Jenis Kelamin" judul="Jenis Kelamin" readonly="" id="profilejeniskelamin" class="not-empty-state focus-state my-capitalize">
              </div>
            </div>
            <!--- ----Alamat---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon address color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divalamat" judul="Alamat" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilealamat" judul="Alamat">Alamat</font>
              </div>
            </div>
            <!--- ----RTRW---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon RT-RW color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divrtrw" judul="RT/RW" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilertrw" judul="RT/RW">RT/RW</font>
              </div>
            </div>
            <!--- ----Keluaran---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon kelurahan color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divkelurahan" judul="Kelurahan" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilekelurahan" judul="Kelurahan">Kelurahan</font>
              </div>
            </div>
            <!--- ----Desa---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon village color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divdesa" judul="Desa" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profiledesa" judul="Desa">Desa</font>
              </div>
            </div>
            <!--- ----Kecamatan---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon kecamatan color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divkecamatan" judul="Kecamatan" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilekecamatan" judul="Kecamatan">Kecamatan</font>
              </div>
            </div>
            <!--- ----Kode Pos---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon post code color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divkodepos" judul="Kode Pos" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilekodepos" judul="Kode Pos">Kode Pos</font>
              </div>
            </div>
            <!--- ----Agama---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;display:none;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon religion color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="text" style="font-size:12px;" placeholder="Agama" readonly="" id="profileagama" class="not-empty-state focus-state my-capitalize">
              </div>
            </div>
            <!--- ----NoHandphone---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon_phone_color.svg" width="40%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divnohp" judul="Nomor Handphone/Selular" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilenohp" judul="Nomor Handphone/Selular">Nomor Handphone/Selular</font>
              </div>
            </div>
            <!--- ----NPWP---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon NPWP color.svg" width="40%" alt=""> 
              </div>
              <div class="item-inner edit-profile" id="divnpwp" judul="NPWP" style="min-height:0px;height:40px;margin-left:0px;">
                  <font class="my-capitalize font-12 font-black" id="profilenpwp" judul="NPWP">NPWP</font>
              </div>
            </div>

            <div class="item-content ninety-percent margin-20" >
              
            </div>
          </div>
          </center>
        </div>

        <!-- ------------------------- Tab Info Foto ---------------------------- -->
        <div id="tab33" class="tab page-content list-block introtext" style="max-height:1000px;">
          <center>
            <!--- ----Foto KTP---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon_nik_photo_color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:30px;margin-left:0px;">
                <a id="profilegantifotoktp" class=" no-transform my-bold" style="width:50%;background-color:#088378;border-radius:50px;color:white;">Ganti Foto KTP</a>
              </div>
            </div>
            <div class="item-content ninety-percent margin-5" >
              <div class="item-inner" style="">
                  <img class="full-border-base" id="profilektp" width="100%" src="img/etc/ktp.jpg" alt="">
              </div>
            </div>
            <!--- ----Selfie KTP---- -->
            <div class="item-content ninety-percent margin-5" style="border-bottom:1px solid #088378;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/menu_icon/icon photo user color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                <a id="profilegantifotoselfiektp" class=" no-transform my-bold" style="width:50%;background-color:#088378;border-radius:50px;color:white;">Ganti Foto</a> &nbsp;
                <a id="profileopenselfiektp" class=" no-transform my-bold" style="width:40%;background-color:#088378;border-radius:50px;color:white;">Selfie</a>
              </div>
            </div>
            <div class="item-content ninety-percent margin-5">
              <div class="item-inner" style="">
                  <img class="full-border-base" id="profileselfiektp" width="100%" src="img/etc/ktp.jpg" alt="">
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  </div>

</div>
