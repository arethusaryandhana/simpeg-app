<?php
header('Access-Control-Allow-Origin: *'); 
session_start(); 
 ?>
<div data-page="addjual" class="page navbar-fixed ">
  <div class="navbar" style="background-color: green;">
    <div class="navbar-inner">
        <div class="left sliding"><a href="#" class="link back icon-only" ><i class="fa fa-chevron-left"></i></a></div>
        <div class="center "><B>Tambah Rencana Penjualan</B></div>
        <div class="right sliding"></div>
    </div>
  </div>
  <div class="page-content hide-bars-on-scroll" >
    
       <form>
      <div class="list-block">
        <ul>
          <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Nama Tanaman</div>
                <div class="item-input">
                  <input type="text" id="aj_nama" placeholder="Masukan nama tanaman" style="font-size: 12px;"  />
                </div>
              </div>
            </div>
          </li>
             <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Satuan Hasil</div>
                <div class="item-input">
                  <select id="aj_satuan" style="font-size: 12px;">
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
                <div class="item-title  label">Kapasitas</div>
                <div class="item-input">
                  <input type="number" id="aj_kapasitas" placeholder="Masukan angka kapasitas" style="font-size: 12px;" />
                </div>
              </div>
            </div>
            </li>
             <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Harga Jual</div>
                <div class="item-input">
                  <input type="text" id="aj_harga" class="comj" placeholder="Harga dalam rupiah" style="font-size: 12px;" />
                </div>
              </div>
            </div>
          </li>
          <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Varietas</div>
                <div class="item-input">
                  <input type="text" id="aj_varietas"  placeholder="Masukan varietas keinginan" style="font-size: 12px;" />
                </div>
              </div>
            </div>
          </li>
       
         
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">Tanggal Kebutuhan <font id="durasi">(H - 0 hari)</font></div>
                <div class="item-input">
                 <input type="text" id="aj_tanggal" readonly placeholder="Masukan tanggal kebutuhan hasil panen dikirimkan" style="font-size: 12px;" />
                </div>
              </div>
            </div>
        </li>
          
        <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label ">Upload Foto Produk (untuk display)</div>
                <div class="item-text">
                 <a href="#" id="at_upfotoju"><button style="font-size:12px;color:black;"  >Upload Foto(file)</button></a> 
                 <a href="#" id="at_selfieju"><button style="font-size:12px;color:black;"  >Open Camera</button></a></div>
              </div>
            </div>
          </li>
         <li class="at_fotoju">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-input">
                 <img src="img/padi.jpg" style="width: 100%;height: 180px;border-radius: 20%;" id="at_fotoju" border="1" />
                </div>
              </div>
            </div>
          </li>
            
        </ul>
      </div>
      </form>
      <div class="content-block">
            <a href="#" id="btn_aj_submit" class=" button  color2 col-100">Submit</a>
      </div>
  </div>
</div>
