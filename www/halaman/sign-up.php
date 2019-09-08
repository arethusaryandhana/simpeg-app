<div data-page="sign-up" class="page">
  <div class="navbar header">
    <div class="navbar-inner">
      <!-- <div class="left sliding"><a href="index.html" class="link icon-only"><i class="fa fa-chevron-left"></i></a></div> -->
    </div>
  </div>
  <div class="page-content logins hide-bars-on-scroll own-signup" style="background-color:#eae8e8;background-image: linear-gradient(#eae8e8, white 5%,#eae8e8 95%);">
    <center>
      <div class="logo main col12"  style="background-color:none;">
          <img src="img/icon/logo_TERRA_full_color.svg" alt="">
      </div>
      <div class="clear"></div>
      <form>
        <div class="list-block introtext base-terra" >
          <p> PENDAFTARAN AKUN</p>
          <center>
            <!--- ----NamaPengguna---- -->
            <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/icon/icon_name_color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="text" style="font-size:12px;" placeholder="Nama Lengkap Anda" required="" class="" id="signupnama">
              </div>
            </div>
            <!--- ----NoHandphone---- -->
            <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/icon/icon_phone_color.svg" width="40%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="text" style="font-size:12px;" placeholder="Nomor Handphone/Selular" required="" class="" id="signupnohp">
              </div>
            </div>
            <!--- ----AlamatEmail---- -->
            <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/icon/icon_email_color.svg" width="40%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="text" style="font-size:12px;" placeholder="Alamat Email" required="" class="" id="signupemail">
              </div>
            </div>
            <!--- ----Sebagai---- -->
            <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/icon/icon_account_type_color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="text" style="font-size:12px;" placeholder="Ingin Mendaftar Sebagai" readonly="" id="signupsebagai" class="not-empty-state focus-state">
              </div>
            </div>
            <!--- ----Username---- -->
            <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/icon/icon_profile_color.svg" width="60%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="text" style="font-size:12px;" placeholder="Username" required="" class="" id="signupusername">
              </div>
            </div>
            <!--- ----Password---- -->
            <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/icon/icon_secure_color.svg" width="40%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="password" data-toggle="tooltip" data-placement="top" title="Gunakan kombinasi huruf besar, huruf kecil, angka, karakter special, dan minimal 8 karakter" style="font-size:12px;" placeholder="Password Keamanan" required="" class="" id="signuppassword">
              </div>
            </div>
            <!--- ----VerifPassword---- -->
            <div class="item-content ninety-percent margin-5" style="border:2px solid #088378;border-radius:10px;min-height:0px;height:40px;">
              <div class="item-media" style="min-height:0px;height:40px;">
                <img src="img/icon/icon_verify_color.svg" width="40%" alt=""> 
              </div>
              <div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">
                  <input type="password" style="font-size:12px;" placeholder="Verifikasi Password" required="" class="" id="signupverifpassword">
              </div>
            </div>
            <!--- KTP --->
            <div id="signupfotoktp" class="ninety-percent margin-5" style="line-height: 35px;border:2px solid #088378;border-radius:10px;min-height:0px;background-color:#088378;text-align:center;">
                <a class=" no-transform my-bold" style="color:white;text-align:center;">Tambah Foto KTP</a>
            </div>
            <div class="item-content ninety-percent margin-5" >
              <div class="item-inner" style="">
                  <img class="full-border-base" id="signupktp" width="100%" src="img/etc/default_ktp.jpg" alt="">
              </div>
            </div>
            <!--- ----ButtonDaftar---- -->
            <div class="" style="padding-top:10%;" >
              <center> 
                <a id="signupstepone" class="button button-fill button-raised no-transform my-bold" style="width:50%;background-color:#088378;border-radius:50px;color:white;">Daftar Sekarang</a>
              </center>
            </div>

          </center>
        </div>
      </form>
      <div class="my-bottom main row">
            <div class="button col-50 no-transform" style="font-size:70%;text-align:left;"></div>
            <a id="redirect-sign-in" class="button col-50 no-transform" style="font-size:70%;text-align:right;color:black;">Login masuk&nbsp;&nbsp;&nbsp;&nbsp;</a>
      </div>
    </center>
  </div>
</div>
