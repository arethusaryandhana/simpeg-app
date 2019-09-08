function generatelahan(){
    $$.post(host + 'fungsiumum/picker.php', {act: 'lahan' , id_user : localStorage.iduser}, function(data){
        var penampung = data.split("<");
        for (var i = 0; i<penampung.length; i++) {
            var isi = penampung[i].split(";");
            myApp.smartSelectAddOption('#at_lahan', '<option value="'+ isi[0] +'">'+ isi[1] +'</option>');
        }
    });
}

function getBasicJurnal(){
    $$.post(host + 'action/jurnal_tanam.php', {act: 'gethari' }, function(data){
        localStorage.bataspenanaman = data;
    });
}
//------------------------------------- halaman/pegani/addtanam.php -----------------------------------------------------------
//====================================== AWAL ADD TANAM =======================================================================
myApp.onPageInit('addtanam', function (page) { //start pageinit addtanam
    getBasicJurnal();
    generatelahan();

    $$('#at_jenis').on('change', function(){ //start #at_jenis change
        var val = $$(this).val();
        jenispadi(val);
    }); //stop #at_jenis change
    
    $$(document).on('click','#back_addtanam',function(e){ //start #back_addtanam
        e.stopImmediatePropagation();
        e.preventDefault();
        mainView.router.loadPage(hnew + "petani/rencanatanam.php");
    }); //stop #back_addtanam

    $$(".at_foto").hide();
    $$(document).on('click','#at_selfie',function(e){ //start #at_selfie
        e.stopImmediatePropagation();
        e.preventDefault();
        navigator.camera.getPicture(onSuccess, onFail, {
            quality :100,
            destinationType : Camera.DestinationType.DATA_URL,
            targetWidth : 600,
            targetHeight : 600,
            correctOrientation : true,
            cameraDirection : Camera.Direction.BACK   
        });
        function onSuccess(imageData){
            var image = document.getElementById('at_foto');
            image.src = "data:image/jpeg;base64," + imageData;
            $$(".at_foto").show();
        }
        function onFail(message){
            alert('failed coz: ' + message);
        }
    }); //stop #at_selfie

    $$(document).on('click','#at_upfoto',function(e){ //start #at_upfoto
        e.stopImmediatePropagation();
        e.preventDefault();
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality :100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth : 600,
            targetHeight : 600,
            correctOrientation : true,
            cameraDirection : Camera.Direction.BACK   
        }); 
        function onSuccess(imageData){
            var image = document.getElementById('at_foto');
            image.src = "data:image/jpeg;base64," + imageData;
            $$(".at_foto").show();
        }
        function onFail(message){
            alert('upload foto batal.');
            console.log(message);
        }
    }); //stop #at_upfoto

    //-----setting awal-----
    var calendarDateFormata = myApp.calendar({
        input: '#at_mulai',
        dateFormat: 'dd-mm-yyyy',
        onDayClick: function (p, dayContainer, year, month, day) {
            var bulan = parseInt(month) +1;
            if(bulan<10){
                bulan='0'+bulan;
            } 
            if(day<10){
                day='0'+day;
            } 
            var newdate = year + '-' + bulan + "-" + day;
            console.log("List aktivitas :" +day +"-" + bulan + "-" + year);
            $$("#ks-calendar-inline-container").html("");
            farmjournal(newdate +";xx");
        },
    }); 
   
    $('input.coma').keyup(function(event) { //start #input.coma
        // skip for arrow keys-------------
        if(event.which >= 37 && event.which <= 40) return;

        // format number-------------
        $(this).val(function(index, value) {
            return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
    }); //stop #input.coma

    $$(document).on('click','#btn_at_submit',function(e){ //start #btn_at_submit
        e.stopImmediatePropagation();
        e.preventDefault();
        var harga = $$("#at_harga").val();
        harga = harga.replace( /,/g, "" );

        var cekharga = parseInt(harga);
        var tglmulai = $$("#at_mulai").val(); 
        var mix = tglmulai.split("-"); var tglmulaifix = mix[2] +"-" + mix[1] + "-" + mix[0];
        var bandingtanggala = new Date(mix[2],(mix[1]-1),mix[0]);

        var tglselesai = $$("#at_selesai").val();
        var mixb = tglselesai.split("-"); var tglselesaifix = mixb[2] +"-" + mixb[1] + "-" + mixb[0];
        var bandingtanggalb = new Date(mixb[2],(mixb[1]-1),mixb[0]);

        var at_nama = $$("#at_nama").val(); var at_satuan = $$("#at_satuan").val();  var at_luas = $$("#at_luas").val(); 
        var at_hasil = $$("#at_hasil").val(); var at_harga =  $$("#at_harga").val();
        var at_varietas =  $$("#at_varietas").val();
        var imageku = $$("#at_foto").attr("src");

        var at_jenis = $$("#at_jenis").val();
        var at_kadarair = $$("#at_kadarair").val();
        var at_kotoran = $$("#at_kotoran").val();

        var at_bhijau = $$("#at_bhijau").val();
        var at_bkuning = $$("#at_bkuning").val();
        var at_bmerah = $$("#at_bmerah").val();
        var at_lahan = $$("#at_lahan").val();

        if(at_nama == "" || at_mulai == "" || at_selesai == "" || at_satuan == "" || at_hasil == "" || at_harga == "" || at_luas == "" || at_varietas == ""){
            myApp.alert('Mohon isi form dengan lengkap!'); 
        }/*else if(imageku == "img/googleplayicon.png"){
            myApp.alert('Tambah rencana tanam wajib ada foto'); 
        }*/
        else if(cekharga <= 0){
            myApp.alert('Maaf harga tidak boleh kurang dari 0!');
        }else if(bandingtanggala > bandingtanggalb){
            myApp.alert('Tanggal Mulai Tidak Boleh Melebihi Tanggal Selesai!');
        }else{
            $$.post(host + 'dbpetani.php', {act: 'addrencana' , id : localStorage.iduser, nama_tanaman : at_nama, mulai_tanam : tglmulaifix,
                akhir_tanam : tglselesaifix, estimasi_hasil : at_hasil, estimasi_harga : harga, satuan : at_satuan, luas_lahan : at_luas, 
                varietas_estimasi : at_varietas, jenis : at_jenis, kadar_air : at_kadarair, kotoran : at_kotoran, 
                butir_hijau : at_bhijau, butir_kuning : at_bkuning, butir_merah : at_bmerah, id_lahan : at_lahan,
                jenis : at_jenis}, function(data){ //start ajax 6131528
      
                  var json = JSON.parse(data);
                  myApp.alert(json['notif']);
                  var imageURI = $$("#at_foto").attr("src");
                  if (!imageURI) {
                      myApp.alert('Please select an image first.' , 'Notification');
                      return;
                  }else {
                      var imageURI = $$("#at_foto").attr("src");
                      if (!imageURI) {
                          myApp.alert('Please select an image first.' , 'Notification');
                          return;
                      }
                      var options = new FileUploadOptions();
                      options.fileKey="photo";
                      options.fileName= imageURI.substr(imageURI.lastIndexOf('/')+1); 
                      options.mimeType="image/jpeg";
                      options.params = {id_rencana : json['foto'], url : hfoto};

                      var win = function(r) {
                          console.log("Should not be called.");
                      }
                      var fail = function(error) {
                          alert("An error has occurred: Code = " + error.code);
                          console.log("upload error source " + error.source);
                          console.log("upload error target " + error.target);
                      }                  
                      var ft = new FileTransfer();
                      ft.upload(imageURI,encodeURI(host + "fungsiumum/upload_rencanatawar.php"), win, fail, options);  
                  } 
                  if(json['status'] == "yes"){
                      mainView.router.back({
                          url: hnew + "petani/rencanatanam.php",
                          force: true,
                          ignoreCache: true
                      });
                  }
          }); //stop ajax 6131528
        }
    }); //stop #btn_at_submit

}); //stop pageinit addtanam

function inittanggalen(a){
    var calendarDateFormat = myApp.calendar({
        input: '#'+a,
        dateFormat: 'yyyy-mm-dd'
    });   
}



//------------------------------------- halaman/pegani/edittanam.php -----------------------------------------------------------
myApp.onPageInit('edittanam', function (page) { //start pageinit edittanam
    generatelahane();
    awaledittanam();
    $$(document).on('click','#et_edit',function(e){ //start #et_edit
        e.preventDefault();
        e.stopImmediatePropagation();
    }); //stop #et_edit

 }); //stop pageinit edittanam

function awaledittanam(){
    $$.post(host + 'action/rencana_tanam.php', {act: "terra_getrencana" , id_perencanaan : localStorage.id_rencana}, function(data){
        console.log(data);
        var json = JSON.parse(data);  
        $$("#et_atas").html(json['namajenis']);
        $$("#et_nama").val(json['inp-nama']);
        $$("#et_jenis").val(json['inp-jenis']).change();
        $$("#et_lahan").val(json['inp-idlahan']).change();
        $$("#et_luas").val(json['inp-luaslahan']);
        $$("#et_mulai").val(json['inp-mulaitanam']);
        $$("#et_selesai").val(json['inp-akhirtanam']);
        $$("#et_satuan").val(json['inp-idlahan']).change();
        $$("#et_hasil").val(json['inp-hasil']);
        $$("#et_harga").val(json['inp-harga']);
        $$("#et_varietas").val(json['inp-varietas']); 
        $$("#et_satuan").val(json['inp-satuan']).change(); 
    }); 
}

function generatelahane(){
    $$.post(host + 'fungsiumum/picker.php', {act: 'lahan' , id_user : localStorage.iduser}, function(data){
        var penampung = data.split("<");
        for (var i=0; i<penampung.length; i++) {
            var isi = penampung[i].split(";");
            myApp.smartSelectAddOption('#et_lahan', '<option value="'+ isi[0] +'">'+ isi[1] +'</option>');
        }
    });
}

function addReadonly(){

}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function farmjournal(tanggalmulai){
    var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus' , 'September' , 'Oktober', 'November', 'Desember'];
    var calendar = myApp.calendar({ //start var calendar
        container: '#ks-calendar-inline-container',
        value: [new Date()],
        dateFormat: 'dd-mm-yyyy',
        weekHeader: true,
        header: false,
        footer: false,
        dayNamesShort :    ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        toolbarCloseText : "",
        toolbarTemplate: 
            '<div class="toolbar calendar-custom-toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>',
        onOpen: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
                calendar.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
                calendar.nextMonth();
            });
        },
        onMonthYearChangeStart: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +',  ' + p.currentYear);
        },
        onChange: function (p, values, displayValues){
            console.log(values);
        },
        onDayClick: function (p, dayContainer, year, month, day) {
            var bulan = parseInt(month) +1;
            if(bulan<10){
                bulan='0'+bulan;
            } 
            if(day<10){
                day='0'+day;
            } 
            console.log("List aktivitas :" +day +"-" + bulan + "-" + year);
        },
        onMonthAdd: function (calendar, monthContainer) {
            $$(monthContainer).find('.picker-calendar-day').each(function(){
                var day = $$(this);
                var dayDate = day.attr('data-date').split('-'); //will give you array in format ['yyyy','m','d'];
                var penambah = parseInt(localStorage.bataspenanaman) - 1;
                var hehefullbef = (tanggalmulai).split(";");
                var c = new Date(hehefullbef[0]);
                //
                var today = new Date(hehefullbef[0]);
                var ending = new Date(today.getFullYear(), today.getMonth(), today.getDate()+penambah);
                var dayend = parseInt(ending.getDate());
                var bulan = parseInt(ending.getMonth()) +1;
                if(bulan<10){
                    bulan='0'+bulan;
                } 
                if(parseInt(ending.getDate)<10){
                    dayend='0'+ parseInt(ending.getDate);
                } 
                var variable = dayend + "-" + bulan + "-" + ending.getFullYear();
                $$("#at_selesai").val(variable);
                //
                var xday = c.getDate();
                var xmonth = c.getMonth();
                var xyear = c.getFullYear();
                var now = c.setDate(c.getDate() + penambah);
                var hehefull = hehefullbef[0];
                var spliter = hehefull.split("-");
                //
                var tryaa = xday - spliter[2];
                //console.log('tes ' + tryaa);
                var sday = xday -tryaa;
                //
                if(sday <= 0){
                    var newday = daysInMonth((xmonth+1),xyear) + sday;
                    sday = newday;
                    var newmonth = xmonth -1 ;
                    xmonth = newmonth;
                    if(xmonth<=-1){
                        var newmonthb = 12 + xmonth;
                        xmonth = newmonthb;
                        var xyearb = xyear -1;
                        xyear = xyearb;
                    }
                }

                var customd = ""; /* --- */ var sequence = 0;
                for (var d = new Date(xyear, xmonth,sday); d <= ending; d.setDate(d.getDate() + 1)) {
                    var a = d.getFullYear() + "," + d.getMonth() + "," + d.getDate();
                    sequence++;

                    //menanam
                    if(sequence <= 2){
                      customd = "j-tanam";
                    }

                    //hari kosong akhir menanam
                    if( (sequence==3 && sequence <= 5) || (sequence==8 && sequence <= 9) ||  sequence == 15 
                    || (sequence==18 && sequence <= 20) || (sequence==24 && sequence <= 24) || (sequence ==61 && sequence <= 63)
                    || (sequence ==66 && sequence <= 68) || sequence == 71 || (sequence ==72 && sequence <= 73)
                      ){
                        customd = "j-free";
                    } // end hari kosong awal hari pengairan

                    if( (sequence==6 && sequence <= 7) || (sequence==16 && sequence <= 17) || (sequence==21 && sequence <= 22)
                      || (sequence ==59 && sequence <= 60) || (sequence ==64 && sequence <= 65) || (sequence ==69 && sequence <= 70)
                      
                      ){
                        customd = "j-air";
                    }// end hari pengairan awal hari memupuk

                    if(sequence == 10 || (sequence == 13 && sequence <= 14) ){
                        customd = "j-pupuk";
                    }// end hari pemupukan hari airpupuk    

                    if(sequence == 11 && sequence <= 12){
                        customd = "j-airpupuk";
                    }//end air pupuk awal pupukhama

                    if(sequence == 25 || (sequence ==28 && sequence <= 30) ){
                        customd = "j-pupukhama";
                    } //awal airpupukhama

                    if((sequence ==26 && sequence <= 27) ){
                        customd = "j-airpupukhama";
                    } //end pupuk hama awal air hama

                    if(sequence==31 && sequence <= 32){
                        customd = "j-airhama";
                    } //end air hama awal hama

                    if(sequence==33 && sequence <= 35){
                        customd = "j-hama";
                    } //akhirhama awal organisme

                    if((sequence==36 && sequence <= 38) || (sequence ==46 && sequence <= 48) || (sequence ==51 && sequence <= 53)
                      || (sequence ==56 && sequence <= 58) || (sequence ==76 && sequence <= 78) ||(sequence ==81 && sequence <= 83)
                      ||(sequence ==86 && sequence <= 89)){
                        customd = "j-organisme";
                    } //akhir organisme awal airorganisme

                    if(sequence==39  || (sequence==49 && sequence <= 50)|| (sequence==54 && sequence <= 55) 
                      ||(sequence ==74 && sequence <= 75) ||(sequence ==79 && sequence <= 80 ||(sequence ==84 && sequence <= 85))
                     ){
                        customd = "j-airorganisme";
                    }//end air organisme awal airpupukorganisme

                    if( (sequence==40) || (sequence ==44 && sequence <= 45) ){
                        customd = "j-airpupukorganisme";
                    } //end airpupukorganisme awal pupukorganisme

                    if( (sequence ==41 && sequence <= 43) ){
                        customd = "j-pupukorganisme";
                    }
                    if(sequence == 90){
                        customd = "j-organismepanen";
                    }
                    if(sequence == 91 && sequence <= 105){
                        customd = "j-panen"; 
                    }
                    if(dayDate == a){
                        day.html('<div class="'+ customd +' desaincal" data-year="'+
                        d.getFullYear()+'" data-month="'+ d.getMonth() +'" data-day="'+ d.getDate() +'" ' +
                        'class="picker-calendar-day" data-date="'+ d.getFullYear()+'-'+d.getMonth() +'-' +d.getDate() +'"><span class=""><p style="line-height:10px;"><font class="day-aktif">'
                        + d.getDate()+'</font></p></span></div>');
                    }
                }
            });
        }
    }); //stop var calendar
}

function getTanggalMulai(){
    $$.post(host + 'action/rencana_tanam.php', {act: "terra_getrencana" , id_perencanaan : localStorage.id_rencana}, function(data){
        console.log(data);
        var json = JSON.parse(data);  
        farmjournalkedua(json['inp-mulaitanam'] + ";a");
    }); 
}

function getHistoryUpload(){
    $$.post(host + 'action/rencana_tanam.php', {act: "terra_getupadterencana" , id_perencanaan : localStorage.id_rencana}, function(data){
        var json = JSON.parse(data);  
        console.log(data);
        localStorage.tglupload = json['tgl'];
        localStorage.totalup= json['total'];
        if(json['res'] == "tidakada"){
            localStorage.tglupload = "";
            localStorage.totalup= 0;
        }
    }); 
}

function farmjournalkedua(tanggalmulai){
    var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus' , 'September' , 'Oktober', 'November', 'Desember'];
    var calendar = myApp.calendar({ //start var calendar
        container: '#ks-calendar-inline-container-update',
        value: [new Date()],
        dateFormat: 'dd-mm-yyyy',
        weekHeader: true,
        header: false,
        footer: false,
        dayNamesShort : ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        toolbarCloseText : "",
        toolbarTemplate: 
          '<div class="toolbar calendar-custom-toolbar">' +
              '<div class="toolbar-inner">' +
                  '<div class="left">' +
                      '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                  '</div>' +
                  '<div class="center"></div>' +
                  '<div class="right">' +
                      '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                  '</div>' +
              '</div>' +
          '</div>',
        onOpen: function (p) {
            $$('.calendar-custom-toolbar .center').text( monthNames[p.currentMonth] +', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
                calendar.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
                calendar.nextMonth();
            });
        },
        onMonthYearChangeStart: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +',  ' + p.currentYear);
        },
        onChange: function (p, values, displayValues){
          console.log(values);
        },
        onDayClick: function (p, dayContainer, year, month, day) {
          var bulan = parseInt(month) +1;
          if(bulan<10){
              bulan='0'+bulan;
          } 
          if(day<10){
              day='0'+day;
          } 
          console.log("List aktivitas :" +day +"-" + bulan + "-" + year);
        },
        onMonthAdd: function (calendar, monthContainer) {
            $$(monthContainer).find('.picker-calendar-day').each(function(){
                var day = $$(this);
                var dayDate = day.attr('data-date').split('-'); //will give you array in format ['yyyy','m','d'];
                var penambah = parseInt(localStorage.bataspenanaman) - 1;
                var hehefullbef = (tanggalmulai).split(";");
                var c = new Date(hehefullbef[0]);
                
                var today = new Date(hehefullbef[0]);
                var ending = new Date(today.getFullYear(), today.getMonth(), today.getDate()+penambah);
                var dayend = parseInt(ending.getDate());
                var bulan = parseInt(ending.getMonth()) +1;
                if(bulan<10){
                    bulan='0'+bulan;
                } 
                if(parseInt(ending.getDate)<10){
                    dayend='0'+ parseInt(ending.getDate);
                } 
         
                var variable = dayend + "-" + bulan + "-" + ending.getFullYear();
                $$("#at_selesai").val(variable);
                
                var xday = c.getDate();
                var xmonth = c.getMonth();
                var xyear = c.getFullYear();
                var now = c.setDate(c.getDate() + penambah);
                var hehefull = hehefullbef[0];
                var spliter = hehefull.split("-");
                
                var tryaa = xday - spliter[2];
                
                var sday = xday -tryaa;
                
                if(sday <= 0){
                    var newday = daysInMonth((xmonth+1),xyear) + sday;
                    sday = newday;

                    var newmonth = xmonth -1 ;
                    xmonth = newmonth;

                    if(xmonth<=-1){
                        var newmonthb = 12 + xmonth;
                        xmonth = newmonthb;

                        var xyearb = xyear -1;
                        xyear = xyearb;
                    }
                }

                var customd = ""; var sequence = 0; 
                var tglupload = localStorage.tglupload; var totalup = parseInt(localStorage.totalup);
                for (var d = new Date(xyear, xmonth,sday); d <= ending; d.setDate(d.getDate() + 1)) {
                    var a = d.getFullYear() + "," + d.getMonth() + "," + d.getDate();
                    var dayendxx = parseInt(d.getDate());
                    var bulanxx = (parseInt(d.getMonth()) +1);  
                    if((parseInt(d.getMonth()) +1)<10){
                        bulanxx='0'+(parseInt(d.getMonth()) +1);
                    } 
                    if(parseInt(d.getDate())<10){
                        dayendxx='0'+ parseInt(d.getDate());
                    } 
         
                    var keg = ""; /* --- */var idklik = "";
                    var splitup = tglupload.split(":");
                    var upsatu = d.getFullYear() + "-" + bulanxx+ "-" + dayendxx;
                    sequence++;
                    //menanam
                    for (var i=0;i<totalup;i++){
                        if(upsatu == splitup[i] ){
                            keg = '<br/><i class="fa fa-check-square-o" aria-hidden="true" style="color:black;margin-right:2px;">';
                            idklik = '<a href="#" data-popover=".popover-gue" class="open-popover" id="cobakal" data-tanggal="'+ upsatu +'">';
                        }
                    }
                    if(sequence <= 2){
                      customd = "j-tanam";
                    }

                    //hari kosong akhir menanam
                    if( (sequence==3 && sequence <= 5) || (sequence==8 && sequence <= 9) ||  sequence == 15 
                    || (sequence==18 && sequence <= 20) || (sequence==24 && sequence <= 24) || (sequence ==61 && sequence <= 63)
                    || (sequence ==66 && sequence <= 68) || sequence == 71 || (sequence ==72 && sequence <= 73)
                      ){
                        customd = "j-free";
                    } // end hari kosong awal hari pengairan

                    if( (sequence==6 && sequence <= 7) || (sequence==16 && sequence <= 17) || (sequence==21 && sequence <= 22)
                      || (sequence ==59 && sequence <= 60) || (sequence ==64 && sequence <= 65) || (sequence ==69 && sequence <= 70)
                      
                      ){
                        customd = "j-air";
                    }
                    // end hari pengairan awal hari memupuk

                    if(sequence == 10 || (sequence == 13 && sequence <= 14) ){
                        customd = "j-pupuk";
                    }// end hari pemupukan hari airpupuk 

                    if(sequence == 11 && sequence <= 12){
                        customd = "j-airpupuk";
                    }//end air pupuk awal pupukhama

                    if(sequence == 25 || (sequence ==28 && sequence <= 30) ){
                        customd = "j-pupukhama";
                    }//awal airpupukhama

                    if((sequence ==26 && sequence <= 27) ){
                        customd = "j-airpupukhama";
                    }//end pupuk hama awal air hama

                    if(sequence==31 && sequence <= 32){
                        customd = "j-airhama";
                    }//end air hama awal hama

                    if(sequence==33 && sequence <= 35){
                        customd = "j-hama";
                    }//akhirhama awal organisme

                    if((sequence==36 && sequence <= 38) || (sequence ==46 && sequence <= 48) || (sequence ==51 && sequence <= 53)
                      || (sequence ==56 && sequence <= 58) || (sequence ==76 && sequence <= 78) ||(sequence ==81 && sequence <= 83)
                      ||(sequence ==86 && sequence <= 89)){
                        customd = "j-organisme";
                    }//akhir organisme awal airorganisme

                    if(sequence==39  || (sequence==49 && sequence <= 50)|| (sequence==54 && sequence <= 55) 
                      ||(sequence ==74 && sequence <= 75) ||(sequence ==79 && sequence <= 80 ||(sequence ==84 && sequence <= 85))
                     ){
                        customd = "j-airorganisme";
                    }//end air organisme awal airpupukorganisme

                    if( (sequence==40) || (sequence ==44 && sequence <= 45) ){
                        customd = "j-airpupukorganisme";
                    }//end airpupukorganisme awal pupukorganisme

                    if( (sequence ==41 && sequence <= 43) ){
                        customd = "j-pupukorganisme";
                    }

                    if(sequence == 90){
                        customd = "j-organismepanen";
                    }

                    if(sequence == 91 && sequence <= 105){
                        customd = "j-panen"; 
                    }

                    if(dayDate == a){
                        day.html('<div class="'+ customd +' desaincal" data-year="'+
                        d.getFullYear()+'" data-y="hehe" data-month="'+ d.getMonth() +'" data-day="'+ d.getDate() +'" ' +
                        'class="picker-calendar-day" data-date="'+ d.getFullYear()+'-'+d.getMonth() +'-' +d.getDate() +'"><span class=""><p style="line-height:10px;">'+idklik+'<font class="day-aktif">' 
                        + d.getDate()+ keg +' </i></font></a></p></span></div>');
                    }
                }
            });
          }
      });//stop var calendar
}


//------------------------------------- halaman/petani/update_rencanatanam.php -----------------------------------------------------------
//------------------------------------- INI KODINGAN UNTUK UPDATE PENANAMAN ---------------------------------------
myApp.onPageInit('update_rencanatanam', function (page) { //start pageinit update_rencanatanam
    getBasicJurnal();
    inittanggalin("ur_tanggal");
    getHistoryUpload();
    getTanggalMulai();
    tabelhistoryrencana('1', localStorage.id_rencana);
    $$(document).on('click','#refjournal',function(e){ //start #refjournal
        e.stopImmediatePropagation();
        myApp.showIndicator();
        tabelhistoryrencana("1", localStorage.id_rencana);
        setTimeout(function () {
            myApp.hideIndicator();
        }, 1000);
    }); //stop #refjournal


    $$(document).on('click','#cobakal',function(e){ //start #cobakal
        e.stopImmediatePropagation();
        var tgl = $$(this).data('tanggal');
        getDetailJurnal(tgl);
    }); //stop #cobakal

    $$(document).on('click','#a_popover',function(e){ //start #a_popover
        e.stopImmediatePropagation();
        e.preventDefault();
        var foto = $$(this).data('foto');
        var fotreplace = hfotoupdate + foto;
        $$("#popfotohistory").attr("src", fotreplace);
    }); //stop #a_popover

    $$(document).on('click','#ur_selfie',function(e){ //start #ur_selfie
        e.stopImmediatePropagation();
        e.preventDefault();
        navigator.camera.getPicture(onSuccess, onFail, {
            quality :100,
            destinationType : Camera.DestinationType.DATA_URL,
            targetWidth : 600,
            targetHeight : 600,
            correctOrientation : true,
            cameraDirection : Camera.Direction.BACK   
        }); 
        function onSuccess(imageData){
            var image = document.getElementById('ur_foto');
            image.src = "data:image/jpeg;base64," + imageData;
            $$(".ur_foto").show();
        }
        function onFail(message){
            alert('failed coz: ' + message);
        }
    }); //stop #ur_selfie

    $$(document).on('click','#ur_upfoto',function(e){ //start #ur_upfoto
        e.stopImmediatePropagation();
        e.preventDefault();
        navigator.camera.getPicture(onSuccess, onFail, {
            quality :100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth : 600,
            targetHeight : 600,
            correctOrientation : true,
            cameraDirection : Camera.Direction.BACK   
        }); 
        function onSuccess(imageData){
            var image = document.getElementById('ur_foto');
            image.src = "data:image/jpeg;base64," + imageData;
            $$(".ur_foto").show();
        }
        function onFail(message){
            alert('upload foto batal.');
            console.log(message);
        }
    }); //stop #ur_upfoto
   
    $$(document).on('click','#btn_ur_rencanatanam',function(e){ //start #btn_ur_rencanatanam
        e.stopImmediatePropagation();
        e.preventDefault();
        var imageku = $$("#ur_foto").attr("src"); 
        var ur_keterangan = $$("#ur_keterangan").val();
        var ur_tanggal = $$("#ur_tanggal").val();
        if(ur_keterangan == "" || ur_tanggal == ""){
            myApp.alert("Harap Isi Form Dengan Lengkap!");
        }/*else if(imageku == "img/googleplayicon.png"){
            myApp.alert("Update perkembangan wajib ada gambar!");
        }*/else{ //start else 854215
            var imageURI = $$("#ur_foto").attr("src");
            if (!imageURI) {
              myApp.alert('Please select an image first.' , 'Notification');
              return;
            }else { //start else 3164858
                var imageURI = $$("#ur_foto").attr("src");
                if (!imageURI) {
                    myApp.alert('Please select an image first.' , 'Notification');
                    return;
                }
                var options = new FileUploadOptions();
                options.fileKey="photo";
                options.fileName= imageURI.substr(imageURI.lastIndexOf('/')+1); 
                options.mimeType="image/jpeg";
                options.params = {id_rencana : localStorage.id_rencana};

                var win = function(r) {
                    console.log("Should not be called.");
                }
                var fail = function(error) {
                    alert("An error has occurred: Code = " + error.code);
                    console.log("upload error source " + error.source);
                    console.log("upload error target " + error.target);
                }
                $$.post(host + 'dbpetani.php', {act: 'updaterencana', id_rencana : localStorage.id_rencana , keterangan : ur_keterangan,
                    tanggal_realisasi : ur_tanggal }, function(data){
                    if(data == "yeah"){
                        var ft = new FileTransfer();
                        ft.upload(imageURI,encodeURI(host + "fungsiumum/upload_rencanatanam.php"), win, fail, options);
                        myApp.alert('Update Perkembangan Penanaman Berhasil!' , 'Notification');
                        tabelhistoryrencana('1', localStorage.id_rencana); 
                        mainView.router.refreshPage();
                    }else{
                        myApp.alert(data);
                    }
                });
            } //stop else 3164858
        } //stop else 854215
    }); //stop #btn_ur_rencanatanam
}); //stop pageinit update_rencanatanam

function tabelhistoryrencana(xangka ,idx){
    $$.post(host + 'fungsiumum/isi_tabel.php', {act: "tabelhisrencana" , angka : xangka, id : idx, url : hfotoupdate }, function(data){
        var hasil_json = JSON.parse(data);  
        $$("#card-tabelurhis").html(hasil_json['tabel']);
        $$("#cap-urhis").html(hasil_json['caption']);
    }); 
};

function tabelhistoryrencanabb(xangka ,idx){
    $$.post(host + 'fungsiumum/isi_tabel.php', {act: "tabelhisrencana" , angka : xangka, id : idx, url : hfotoupdate }, function(data){
        var hasil_json = JSON.parse(data);  
        $$("#card-tabelurhisdav").html(hasil_json['tabel']);
        $$("#cap-urhisdav").html(hasil_json['caption']);
    }); 
};

function inittanggalin(a){
    var calendarDateFormat = myApp.calendar({
        input: '#'+a,
        dateFormat: 'dd-mm-yyyy'
    });   
    $$(".ur_foto").hide();
}

function getDetailJurnal(tanggal){
    $$.post(host + 'action/rencana_tanam.php', {act: "terra_getdetailjurnal" , id_perencanaan : localStorage.id_rencana, tanggal_realisasi : tanggal, url : hfoto}, function(data){
        var json = JSON.parse(data);  
        $$("#jurnal_detail").html(json['popover'])
    }); 
}