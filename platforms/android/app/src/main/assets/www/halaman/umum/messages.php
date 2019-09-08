<div data-page="messages" class="page navbar-fixed">
    <div class="navbar" style="background-color:#088378;">
    <div class="navbar-inner ">
    <div class="left sliding">
    <a href="#" class="link icon-only" id="trymes"><i class="icon icon-back"></i></a>
    </div>
    <div class="center"><b><?php echo $rs['nama']; ?> Nama gue</b></div>
    <div class="right"></div>
    </div>
    </div>

  <div class="toolbar messagebar" style="background-color: #088378;">
      <div class="toolbar-inner" >
      <textarea placeholder="Message" ></textarea>
      <a href="#" class="link send-message">Send</a> </div>
  </div>

  <div class="page-content messages-content" style="max-height: 93%;background-color: white;" id="konten">
    
    <input type="hidden" value="<?php echo $idjudul ?>" name="" id="id_receiver" />

  <div class="messages messages-auto-layout">
  <div id="isichat"></div>
  </div>


  </div>
</div>
