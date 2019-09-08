<div data-page="market_contractor-order" class="page navbar-fixed" >
    <div class="navbar" style="background-color:#088378;">
        <div class="navbar-inner ">
            <div class="left sliding">
                <a href="#" class="link icon-only back"><i class="icon icon-close"></i></a>
            </div>
            <div class="center font-standard">Beli Jasa</div>
            <div class="right sliding"> 
              <!--   <img id="mc_tambahproduk" src="img/menu_icon/icon_menu_favourite_light.svg" width="100%" alt="" style="vertical-align:middle;margin-right: 0.5em;"/> -->
            </div>
        </div>
    </div>
     <div class="toolbar toolbar-bottom" style="background-color: #C1E5CC;font-weight: bold;box-shadow: 1px 1px 1px 0px  rgba(0,0,0,0.4);">
    <div class="toolbar-inner">
      <div class="content-block">
          <font style="color: gray;">Total Harga</font><br/>
          <font class="dav-fharga" id="mco_hargabawah">Rp 0</font>
      </div>
      <a href="#" class="link " id="mco_btn-beli"
      style="width: 30%;height: 80%;margin-right: 10px;background-color: #FF4200;font-weight: 420;border-radius: 4px;"> <i class="fa fa-cart-plus"></i> &nbsp;&nbsp;Beli </a>
  </div>
  </div>
    <div class="page-content ">
         <div class="list-block  content-block">

        <div class="card facebook-card" >
          <div class="card-header no-border">
          <div class="facebook-avatar"><img id="mco_foto" src="img/padi.jpg" width="60" height="60"></div>
          <div class="facebook-name" id="mco_nama"> </div>

          <div class="card-content"> <div class="card-content-inner"><font class="dav-fharga" id="mco_harga">Rp 260.000 / ha</font> <br/>
            <font id="mco_kota"></font><br/> </div></div> 
          </div>
        
          </div>
            
            <hr>
            <ul style="margin-top: 0px;">
              <h class="dav-fontorder">Kategori</h3> <Br/>
                <font id="mco_kategori"></font>
              <!-- <div class="chip">
                 <div class="chip-label">Olah Lahan</div>
              </div>
              <i class="fa fa-arrow-right dav-cterra"></i>
              <div class="chip">
                 <div class="chip-label">Mesin Traktor</div>
              </div> -->
            <li>
                <a href="#" class="item-link smart-select" data-open-in="picker">
                <select name="fruits" id="mco_lahan">
                </select>
                <div class="item-content">
                  <div class="item-inner">
                  <div class="item-title">Pilih Lahan Yang Ingin Dikerjakan</div>
                  </div>
                </div>
                </a>
            </li> 

            <h class="dav-fontorder">Alamat Lahan  </h3> 
            <li>
            <div class="item-content">
            <div class="item-inner">
            <div class="item-input">
            <textarea id="mco_alamatlahan" style="font-weight: normal;font-size: 14px;"></textarea>
            </div>
            </div>
            </div>
            </li>


            <hr>
            <h class="dav-fontorder">Luas Lahan Yang akan Dikerjakan (m<sup>2</sup>)</h> 
            <li>
                <div class="item-content">
                <div class="item-inner">
                <div class="item-input">
                <input type="text" class="qty" id="mco_qty" placeholder="Masukan angka">
                </div>
                </div>
                </div>
            </li>

            <li>
              <div class="item-content">
              <div class="item-media">ha</div>
              <div class="item-inner">
              <div class="item-title" style="margin-left: -56px;font-size: 13px;">Hasil Konversi Hektar</div>
              <div class="item-input">
              <input type="text" class="" id="mco_qtykonversi"  readonly="" placeholder="0">
              </div>
              </div>
              </div>
            </li>

            <h class="dav-fontorder">Catatan Ke Penjual  </h3> 
            <li>
            <div class="item-content">
            <div class="item-inner">
            <div class="item-input">
            <textarea id="mco_deskripsi" value="" placeholder="Misal : keterangan alamat (Opsional)" resizeable style="font-weight: normal;"></textarea>
            </div>
            </div>
            </div>
            </li>



            <h class="dav-fontorder"></span><i class="fa fa-calendar-plus-o" aria-hidden="true"></i> Waktu Pemesanan : </h3>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-input">
                <input type="text" placeholder="Date Time" readonly="readonly" id="mco_timepicker"/>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div id="mco_timepicker-container"></div>
            </ul>
        </div>
        
      
        <hr>
    </div>
    <!-- Popover -->
</div>
