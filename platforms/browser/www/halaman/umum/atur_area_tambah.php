  <?php

   
?>
<div data-page="atur_area_tambah" class="page navbar-fixed ">
  <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner">
        <div class="left sliding"><a href="#" class="link icon-only" id="back_atur_area_tambah"><i class="fa fa-chevron-left"></i></a></div>
        <div class="center "><b>Tambah Lahan Baru</b></div>
        <div class="right sliding">
          <a href="#" data-panel="left" class="open-panel link icon-only"><i class="fa fa-bars"></i></a> 

        </div>
    </div>
  </div>
  <div class="page-content hide-bars-on-scroll" >
    

       <form>
      <div class="list-block">
        <ul>
            <li>
      <div class="item-content">
      <div class="item-inner">
      <div class="item-title  label" style="font-size: 13px;">Nama Lahan</div>
      <div class="item-input">
      <input type="text" placeholder="Berikan nama lahan anda"    id="aa_namalahan_tam"/>
      </div>
      </div>
      </div>
      </li>
            <li>
      <!-- Smart select, will be opened in Picker -->
      <a href="#" class="item-link smart-select" data-open-in="picker">
        <select name="fruitssa" id="aa_area_tam">
          
     
        </select>
        <div class="item-content">
          <div class="item-inner">
            <div class="item-title" style="font-size: 13px;">Area</div>
          </div>
        </div>
     
      </a>
    </li>
    <li class="li_aa_sub">
      <!-- Smart select, will be opened in Picker -->
      <a href="#" class="item-link smart-select" data-open-in="picker">
        <select name="fruitsax" id="aa_subarea_tam">
          <option value="pilih">-pilih-</option>
       
        </select>
        <div class="item-content">
          <div class="item-inner">
            <div class="item-title" style="font-size: 13px;">Sub Area</div>
          </div>
        </div>
     
      </a>
    </li>

      <li>
      <div class="item-content">
      <div class="item-inner">
      <div class="item-title  label" style="font-size: 13px;">Luah Lahan (m2)</div>
      <div class="item-input">
      <input type="number" placeholder="Belum ditentukan"  value="" id="aa_luaslahantam"/>
      </div>
      </div>
      </div>
      </li>
                 
        </ul>
      </div>
      </form>

      <div class="content-block-title">Tentukan Koordinat Lahan<Br/>
        <a href="#" id="btnaddkoortam"><button style="font-size:12px;color:black;"  >Tambah Koordinat</button></a> 
          <a href="#" id="btnclearkoortam"><button style="font-size:12px;color:black;"  >Reset</button></a> 
        </div>
    <div class="list-block media-list">
      <ul>
        <div id="isikoordinattam">
        <li>
        <div class="item-content">
        <div class="item-media"><img src="icon/loc.png" width="33" alt=""/></div>
        <div class="item-inner">
        <div class="item-title-row">
        <div class="item-title">Koordinat 1</div>
        </div>
        <div class="item-subtitle">Koordinat 1</div>
        </div>
        </div>
        </li> 

        </div>
        
      
      </ul>
    </div>
      
      <div class="content-block">
               <p class="buttons-row"><a href="#" class=" button  color2 col-100" id="btnupdateareatam">Simpan</a>
               <a href="#" class=" button  color2 col-100" id="btnlokasitam">Hitung Luas</a></p>
      </div>
  </div>
</div>
