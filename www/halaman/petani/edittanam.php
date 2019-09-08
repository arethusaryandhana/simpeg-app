<?php
header('Access-Control-Allow-Origin: *'); 
?>
<div data-page="edittanam" class="page navbar-fixed ">
  <div class="navbar" style="background-color: #088378;">
    <div class="navbar-inner">
        <div class="left sliding"><a href="#" class="back link icon-only" id="back_profile"><i class="fa fa-chevron-left"></i></a></div>
        <div class="center "><b>Edit Penanaman</b></div>
        <div class="right sliding">
          <a href="#" data-panel="left" class="open-panel link icon-only"><i class="fa fa-bars"></i></a> 

        </div>
    </div>
  </div>
  <div class="toolbar tabbar" style="background-color:#088378;height:120px;position:relative;">
    <div class="toolbar-inner ">
      <div class="item-content userprofile hundred-percent" style="height:auto;">
        <div class="item-media" style="padding-left:5%;padding-top: 2%;"><img src="img/aw.jpg" id="imghome" width="50" alt=""/></div>
        <div class="item-inner" style="padding-top:5%;">
          <div class="item-title-row" style="">
            <div class="item-title font-color-light font-standard" id="greeting"></div>
          </div>
          <div class="item-title font-color-light font-standard" id="et_atas">Lokasi : Surabaya<br/>Member sejak Maret 2019</div>
        </div>
         <div class="item-inner" style="width:20%;padding-top:5%;">
            <div class="item-title font-color-light font-standard"><img src="img/menu_icon/icon_create_light.svg" 
            id="et_edit" alt=""/></div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-content">
       <form>
      <div class="list-block" style="margin-top:-10%;">
        <ul>
          <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Nama Tanaman</div>
                <div class="item-input">
                  <input type="text" id="et_nama" placeholder="" style="font-size: 12px;" />
                </div>
              </div>
            </div>
          </li>
          
           <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Jenis</div>
                <div class="item-input">
                  <select id="et_jenis" style="font-size: 12px;">
                    <option value="GKP">GKP (Gabah Kering Panen)</option>
                    <option value="GKS">GKS (Gabah Kering Simpan)</option>
                    <option value="GKG">GKG (Gabah Kering Giling)</option>
                  </select>
                </div>
              </div>
            </div>
          </li>

              <li>
              <a href="#" class="item-link smart-select" data-open-in="picker">
              <select name="fruitssa" id="et_lahan">
              </select>
              <div class="item-content">
              <div class="item-inner">
              <div class="item-title" style="font-size: 13px;">Lahan m<sup>2</sup></div>
              </div>
              </div>

              </a>
              </li>


            <li>
            <div class="item-content">
            <div class="item-inner">
            <div class="item-title  label">Luas Lahan (m2)</div>
            <div class="item-input">
            <input type="number" id="et_luas" placeholder="" style="font-size: 12px;" />
            </div>
            </div>
            </div>
            </li>
         
        <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">Tanggal Mulai</div>
                <div class="item-input">
                 <input type="text" id="et_mulai" readonly placeholder="Masukan tanggal anda ingin memulai penanaman" style="font-size: 12px;" />
                </div>
              </div>
            </div>
        </li>

        <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">Tanggal Selesai</div>
                <div class="item-input">
                 <input type="text" id="et_selesai" readonly placeholder="Masukan estimasi tanggal selesai penanaman" style="font-size: 12px;" />
                </div>
              </div>
            </div>
        </li>
             <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Satuan Hasil</div>
                <div class="item-input">
                  <select id="et_satuan" style="font-size: 12px;">
                    <option value="kg">Kilogram</option>
                    <option value="ton">Ton</option>
                
                  </select>
                </div>
              </div>
            </div>
          </li>
            <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Estimasi Hasil</div>
                <div class="item-input">
                  <input type="number" id="et_hasil" placeholder="Masukan angka" style="font-size: 12px;" />
                </div>
              </div>
            </div>
            </li>
             <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Estimasi Harga (Rupiah)</div>
                <div class="item-input">
                  <input type="text" id="et_harga" class="coma" placeholder="Harga dalam rupiah" style="font-size: 12px;" />
                </div>
              </div>
            </div>
          </li>
          <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Estimasi Varietas</div>
                <div class="item-input">
                  <input type="text" id="et_varietas"  placeholder="Masukan estimasi varietas" style="font-size: 12px;" />
                </div>
              </div>
            </div>
          </li>
           <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label ">Upload Foto Produk (untuk display)</div>
                <div class="item-text">
                 <a href="#" id="et_upfoto"><button style="font-size:12px;color:black;"  >Upload Foto(file)</button></a> 
                 <a href="#" id="et_selfie"><button style="font-size:12px;color:black;"  >Open Camera</button></a></div>
              </div>
            </div>
          </li>
         <li class="et_foto">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-input">
                 <img src="img/googleplayicon.png" style="width: 100%;height: 270px;" id="et_foto" border="1" />
                </div>
              </div>
            </div>
          </li>
         
         
          
        </ul>
      </div>
      </form>
       <div class="content-block">
      <p class="buttons-row">
        <a href="#" class="button button-fill color-cyan" style="font-size: 13px;" id="p_btnupdate"><i class="fa fa-save"></i><b> Simpan</b></a>
      <a href="#" class="button button-fill color-orange" style="font-size: 13px;" id="p_btnpass"> <b>Ubah Password</b></a></p>
    </div>
  </div>
</div>
<?php 
function e($text) {
    echo $text;
}
?>