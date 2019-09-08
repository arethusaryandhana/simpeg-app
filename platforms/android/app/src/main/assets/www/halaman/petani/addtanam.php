<?php
header('ccess-Control-Allow-Origin: *'); 
session_start(); 
 ?>
<div data-page="addtanam" class="page navbar-fixed ">
      <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner">
        <div class="left sliding"><a href="#" class="link icon-only" id="back_addtanam"><i class="fa fa-chevron-left"></i></a></div>
        <div class="center "><B>Tambah Rencana Tanam</B></div>
        <div class="right sliding"></div>
    </div>
  </div>
  <div class="page-content" >
     
       <form>
      <div class="list-block">
        <ul>
          <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Nama Tanaman</div>
                <div class="item-input">
                  <input type="text" id="at_nama" placeholder="" style="font-size: 12px;" />
                </div>
              </div>
            </div>
          </li>
          
           <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Jenis</div>
                <div class="item-input">
                  <select id="at_jenis" style="font-size: 12px;">
                    <option value="GKP">GKP (Gabah Kering Panen)</option>
                    <option value="GKS">GKS (Gabah Kering Simpan)</option>
                    <option value="GKG">GKG (Gabah Kering Giling)</option>
                  </select>
                </div>
              </div>
            </div>
          </li>

          <li style="display: none;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Kadar Air <font class='at_kadarair'>(Maks. 25%, Min. 18%)</font></div>
                <div class="item-input">
                  <input type="number" id="at_kadarair" value="25" placeholder="" style="font-size: 12px;"  step="0.1" max="25" min="18" />
                </div>
              </div>
            </div>
          </li>

            <li style="display: none;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Kotoran <font class='at_kotoran'>(Maks. 10%, Min. 6%)</font></div>
                <div class="item-input">
                  <input type="number" id="at_kotoran" value="10" placeholder="" style="font-size: 12px;"  step="0.1" max="10" min="6" />
                </div>
              </div>
            </div>
          </li>

            <li style="display: none;">
            <div class="item-content">
            <div class="item-inner">
            <div class="item-title  label">Butir Hijau <font class='at_bhijau'>(Maks. 10%, Min. 7%)</font></div>
            <div class="item-input">
            <input type="number" id="at_bhijau" value="10" placeholder="" style="font-size: 12px;"  step="0.1" max="10" min="7" />
            </div>
            </div>
            </div>
            </li>

            <li style="display: none;">
            <div class="item-content">
            <div class="item-inner">
            <div class="item-title  label">Butir Kuning (Maks. 3%) </div>
            <div class="item-input">
            <input type="number" id="at_bkuning" value="3" placeholder="" style="font-size: 12px;"  step="0.1" max="3" min="0" />
            </div>
            </div>
            </div>
            </li>

            <li style="display: none;">
            <div class="item-content">
            <div class="item-inner">
            <div class="item-title  label">Butir Merah (Maks. 3%)</div>
            <div class="item-input">
            <input type="number" id="at_bmerah" value="3" placeholder="" style="font-size: 12px;"  step="0.1" max="3" min="0" />
            </div>
            </div>
            </div>
            </li>

              <li>
              <a href="#" class="item-link smart-select" data-open-in="picker">
              <select name="fruitssa" id="at_lahan">
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
            <input type="number" id="at_luas" placeholder="" style="font-size: 12px;" />
            </div>
            </div>
            </div>
            </li>

        <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">Tanggal Mulai</div>
                <div class="item-input">
                 <input type="text" id="at_mulai" readonly placeholder="Masukan tanggal anda ingin memulai penanaman" style="font-size: 12px;" />
                </div>
              </div>
            </div>
        </li>
    
        <li class="accordion-item"><a href="#" class="item-content item-link">
        <div class="item-inner">
        <div class="item-title" style="font-size: 13px">Kalender Jurnal Tanam</div>
        </div></a>
        <div class="accordion-item-content">
        <div class="content-block">
           <div id="ks-calendar-inline-container" class="theme-red" style="border: 1px solid;">Tentukan tanggal terlebih dahulu</div> 
         
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

        </div>
        </div>
        </li>



        </li>
        <li style="margin-top: 20px">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">Tanggal Selesai</div>
                <div class="item-input">
                 <input type="text" id="at_selesai" readonly placeholder="Masukan estimasi tanggal selesai penanaman" style="font-size: 12px;" />
                </div>
              </div>
            </div>
        </li>
             <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Satuan Hasil</div>
                <div class="item-input">
                  <select id="at_satuan" style="font-size: 12px;">
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
                  <input type="number" id="at_hasil" placeholder="Masukan angka" style="font-size: 12px;" />
                </div>
              </div>
            </div>
            </li>
             <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Estimasi Harga (Rupiah)</div>
                <div class="item-input">
                  <input type="text" id="at_harga" class="coma" placeholder="Harga dalam rupiah" style="font-size: 12px;" />
                </div>
              </div>
            </div>
          </li>
          <li style="font-size: 12px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title  label">Estimasi Varietas</div>
                <div class="item-input">
                  <input type="text" id="at_varietas"  placeholder="Masukan estimasi varietas" style="font-size: 12px;" />
                </div>
              </div>
            </div>
          </li>
           <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label ">Upload Foto Produk (untuk display)</div>
                <div class="item-text">
                 <a href="#" id="at_upfoto"><button style="font-size:12px;color:black;"  >Upload Foto(file)</button></a> 
                 <a href="#" id="at_selfie"><button style="font-size:12px;color:black;"  >Open Camera</button></a></div>
              </div>
            </div>
          </li>
         <li class="at_foto">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-input">
                 <img src="img/googleplayicon.png" style="width: 100%;height: 270px;" id="at_foto" border="1" />
                </div>
              </div>
            </div>
          </li>
         
         
          
        </ul>
      </div>
      </form>
      <div class="content-block">
            <a href="#" id="btn_at_submit" class=" button  color2 col-100">Submit</a>
      </div>
  </div>
</div>
