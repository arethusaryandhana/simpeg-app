<?php
header('Access-Control-Allow-Origin: *'); 
session_start(); 
 ?>
<div data-page="update_rencanatanam" class="page navbar-fixed ">
  <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner">
        <div class="left sliding"><a href="#" class="link back icon-only" ><i class="fa fa-chevron-left"></i></a></div>
        <div class="center "><B>Tambah Rencana Tanam</B></div>
        <div class="right sliding">
          <div class="right sliding"> 
          <img id="refjournal" 
          src="img/menu_icon/icon refresh light.svg" alt="" style="margin-right: 1em;width: 100%;"/>
        

        </div>
        </div>
    </div>
  </div>
  <div class="toolbar tabbar" style="background-color:#088378;">
        <div class="toolbar-inner">
          <a href="#tabup1" class="button active tab-link">Tambah</a>
          <a href="#tabup2" class="button tab-link">History</a>
         </div>
    </div>
   <div class="page-content">
  

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
    font-weight: 500;
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
    padding: 15px 10px;
  }  
    .popover {
      width: 70%;
    }
</style>

     <div class="tabs-animated-wrap">
    <div class="tabs">
      <div id="tabup1" class=" tab page-content active">
        <div class="content-block-title"><font id="fontnamaurt"></font> <Br/><i class="fa fa-refresh color-green" aria-hidden="true"></i> Tambah Update Baru</div>

        <form>
      <div class="list-block">
        <ul>
        <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">Tanggal Realisasi</div>
                <div class="item-input">
                 <input type="text" id="ur_tanggal" readonly placeholder="Masukan tanggal realisasi" style="font-size: 12px;" />
                </div>
              </div>
            </div>
        </li>
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">Keterangan</div>
                <div class="item-input">
              <textarea class="resizable"  id="ur_keterangan" placeholder="Masukan Keterangan Update / Perkembangan" style="font-size: 12px;"></textarea>
                   
                </div>
              </div>
            </div>
          </li>
         <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label ">Upload Foto Perkembangan</div>
                <div class="item-text">
                 <a href="#" id="ur_upfoto"><button style="font-size:12px;color:black;"  >Upload Foto(file)</button></a> 
                 <a href="#" id="ur_selfie"><button style="font-size:12px;color:black;"  >Open Camera</button></a></div>
              </div>
            </div>
          </li>

          <li class="ur_foto">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-input">
                 <img src="img/googleplayicon.png" style="width: 100%;height: 270px;" id="ur_foto" border="1" />
                </div>
              </div>
            </div>
          </li>
         
          
        </ul>
      </div>
      </form>
      <div class="content-block">
            <a href="#" id="btn_ur_rencanatanam" class=" button  color2 col-100">Submit</a>
      </div>
          
      </div>
      <div id="tabup2" class="tab page-content">

        <!-- awal kalender -->
              <div id="ks-calendar-inline-container-update" class="theme-red" style="border: 1px solid;"></div> 
         
           <div class="card facebook-card" style="width: 100%;margin: 0px auto;margin-top: 3%;">
          <div class="card-header no-border">
          <div class="facebook-avatar"></div>
          <div class="card-content"> <div class="card-content-inner">Keterangan Warna:<br/>
          <i class="fa fa-square" aria-hidden="true" style="color:#9BBB59;"></i> : Masa Penanaman<br/>
          <i class="fa fa-square" aria-hidden="true" style="color:#8DB4E2;"></i> : Masa Pengairan<br/>
          <i class="fa fa-square" aria-hidden="true" style="color:#FCD5B4;"></i> : Masa Pemupukan<br/>
          <i class="fa fa-square" aria-hidden="true" style="color:#E26B0A;"></i> : Masa Rawan Hama / Penyakit Tanaman<br/>
          <i class="fa fa-square" aria-hidden="true" style="color:#FF0000;"></i> : Masa Rawan Organisme Pengganggu Tanaman<br/>
          <i class="fa fa-square" aria-hidden="true" style="color:#D8E4BC;"></i> : Masa Panen<br/>
      </div></div> 
          </div>
        
          </div>
        <!-- end kalender -->
    <div class="content-block-title"><i class="fa fa-thumbs-up color-blue" aria-hidden="true"></i>History Update Perkembangan</div>
    <div class="content-block">
      <table style="font-size:12px;color:;">
         <caption id ="cap-urhis"><b>Total History : 0 update.</b></caption>
    <tbody id="tabel-urhis"></tbody>
  </table>
<div id="card-tabelurhis"></div>



    </div> 
          
        </div>
     
    </div>
  </div>
        <!-- About popover -->
  <div class="popover popover-about">
    <div class="popover-angle"></div>
    <div class="popover-inner">
      <div class="content-block">
        
          <div class="col-100 "> <img src="img/home.jpg" 
            class="col-100" alt="banner1" id="popfotohistory" style="width: 100%;height: 100%;" border="1"> </div>
        
      </div>
    </div>
  </div>
  <!-- About popover -->
   <!-- Abouthehehehe popover -->
  <div class="popover popover-gue">
    <div class="popover-angle"></div>
    <div class="popover-inner">
    <div id="jurnal_detail"></div>
<!-- <div class="card demo-card-header-pic">
  <div style="background-image:url(http://172.18.33.68/ptrutan/foto/rencana_tanam/FOT02042019050113.jpg)" valign="bottom" class="card-header color-white no-border"></div>
  <div class="card-content">
    <div class="card-content-inner">
      <p id="j_tanggal" class="color-gray">Posted on January 21, 2015</p>
      <p id="j_keterangan">Quisque eget vestibulum nulla mencoba menanam padi namuntak kunjung kering jadi pake combine deh</p>
    </div>
  </div>
</div> -->
    </div>
  </div>
  <!-- About hehehehepopover -->
  </div> <!-- pagecontent -->
</div>
