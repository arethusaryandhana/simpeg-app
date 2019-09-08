<?php
header('Access-Control-Allow-Origin: *'); 
session_start();
$level = $_GET['level'];
$namalevel = ""; 
if($level==1){$namalevel = "Petani";}
if($level==2){$namalevel = "Kelompok Tani";}
if($level==3){$namalevel = "Pedagang / Pemilik Alat";}
 ?>

<div data-page="register" class="page">
  <div class="navbar header">
    <div class="navbar-inner">
      <div class="left sliding"><a href="#" class="link back icon-only"><i class="fa fa-chevron-left color-black"></i></a></div>
      </div>
  </div>
  <div class="page-content" >
    <div data-pagination=".swiper-pagination" data-paginationHide="true" class="swiper-container largebannerdav  swiper-init">
      
      <div class="swiper-wrapper" style="overflow: auto;">
        <div class="swiper-slide">
          <div class="textblock">
         
            <form>

            <div class="list-block">
              <ul>
                  <div class="list-block-title c1"><i class="fa fa-plus-circle" aria-hidden="true"></i> Pendaftaran Akun <font id="rega"></font></div>

                   <li>
                  <div class="item-content">
                  <div class="item-media"><i class="fa fa-user c1" aria-hidden="true"></i></div>
                  <div class="item-inner">
                  <div class="item-input" style="margin-left: -22px;">
                  <input type="text"  id="rusername" placeholder="Username untuk Login" style="font-size: 13px;" />
                  </div>
                  </div>
                  </div>
                  </li>

                  <li>
                  <div class="item-content">
                  <div class="item-media" ><i class="fa fa-credit-card c1" aria-hidden="true"></i></div>
                  <div class="item-inner">
                  <div class="item-input" style="margin-left: -22px;">
                  <input type="number"  id="rktp" placeholder="Masukan Nomor KTP Anda" style="font-size: 13px;"/>
                  </div>
                  </div>
                  </div>
                  </li>

                  <li>
                  <div class="item-content">
                  <div class="item-media"><i class="fa fa-envelope-o c1" aria-hidden="true"></i></div>
                  <div class="item-inner">
                  <div class="item-input" style="margin-left: -22px;">
                  <input type="email" placeholder="Email"  id="remail" style="font-size: 13px"/>
                  </div>
                  </div>
                  </div>
                  </li>

                      <li>
                      <div class="item-content">
                       <div class="item-media"><i class="fa fa-unlock-alt c1" aria-hidden="true"></i></div> 
                      <div class="item-inner">
                      <div class="item-input" style="margin-left: -22px;">
                      <input type="password" placeholder="Password" id="rpass" style="font-size: 13px"/>
                      </div>
                      </div>
                      </div>
                      </li>

                      <li class="align-top">
                      <div class="item-content">
                        <div class="item-media"><i class="fa fa-unlock-alt c1" aria-hidden="true"></i></div>
                      <div class="item-inner">
                       <div class="item-input" style="margin-left: -22px;">
                      <input type="password" placeholder="Ketik Ulang PASSWORD" id="rpassb" style="font-size: 12px"/>
                      </div>
                      </div>
                      </div>
                      </li>

                         <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title c1" style="font-size: 13px;color: #5BA997;">Upload Foto KTP</div>
                <div class="item-text">
                 <a href="#" id="reg_upfoto"><button style="font-size:12px;color:black;"  >Upload Foto(file)</button></a> 
                 <a href="#" id="reg_upselfie"><button style="font-size:12px;color:black;"  >Open Camera</button></a></div>
              </div>
            </div>
          </li>

          <li class="reg_foto">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-input">
                 <img src="img/googleplayicon.png" style="width: 100%;height: 230px;" id="reg_foto" border="1" />
                </div>
              </div>
            </div>
          </li>

            <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title c1" style="font-size: 13px;color: #5BA997;">Upload Foto Profil</div>
                <div class="item-text">
                 <a href="#" id="reg_upfotopro"><button style="font-size:12px;color:black;"  >Upload Foto(file)</button></a> 
                 <a href="#" id="reg_upselfiepro"><button style="font-size:12px;color:black;"  >Open Camera</button></a></div>
              </div>
            </div>
          </li>

          <li class="reg_fotopro">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-input">
                 <img src="img/googleplayicon.png" style="width: 100%;height: 230px;" id="reg_fotopro" border="1" />
                </div>
              </div>
            </div>
          </li>

                      <div class="content-block">
        <p class="buttons-row"><a href="#" id="btnregis" class="button button-fill color-cyan" style="width: 70%;">Register</a></p>
      </div>

              </ul>
            </div>
          </form>
    
            </div>
            <img src="img/bg3.png" alt="" style="width: 100%;height: 35%;"> </div>

     
      </div>

       
    </div>
    
 
       
   
  
  </div>
</div>
