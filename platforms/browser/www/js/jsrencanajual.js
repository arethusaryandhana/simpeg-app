//------------------------------------- halaman/keltani/rencanajual.php -----------------------------------------------------------
myApp.onPageInit('rencanajual', function (page) { //start pageinit rencanajual
    var ptrContentlpd = $$('.pull-to-refresh-content');
    ptrContentlpd.on('ptr:refresh', function (e) {
        setTimeout(function () {
            listrencanajual('1','0');
            myApp.pullToRefreshDone();
        }, 2000);
    });  

    listrencanajual('1','0');
    var actionSheetButtons = [
        [
            {
                text: 'Action',
                label: true
            },
            {
                text: '<i class="fa fa-plus-circle" aria-hidden="true"></i> Tambah Rencana Penjualan',
                color: 'blue',
                onClick: function () {
                    mainView.router.loadPage(hnew + 'keltani/addjual' + ".php?");
                }
            },
        ],
        [
            {
                text: 'Cancel',
                color : 'red',
            }
        ]
    ];

    $$(document).on('click','#back_rencanajual',function(e){ //start #back_rencanajual
        e.stopImmediatePropagation();
        e.preventDefault();
        mainView.router.loadPage(hnew + 'home/home1' + ".php?id=" + localStorage.iduser + "&level=" + localStorage.ulevel);
    }); //stop #back_rencanajual

    $$(document).on('click','#konfirmasirencanapenjul',function(e){ //start #konfirmasirencanapenjul
        e.stopImmediatePropagation();
        e.preventDefault();
        var idpemesanan = $$(this).data('id_pemesanan');
        var nama = $$(this).data('nama');
        myApp.confirm('Anda yakin konfirmasi orderan ini telah selesai?', '<font style="font-size:12px;">Nama Tanaman : ' +nama +  "</font>", 
            function () {
                $$.post(host + 'keltani/db_keltani.php', {act: 'konfirmorder', id_pemesanan : idpemesanan, status : '1' }, function(data){
                    if(data == "yeah"){
                        myApp.alert('Konfirmasi Order telah selesai berhasil!.');
                        listrencanajual('1','0');
                    }else{
                        myApp.alert(data);
                    }
                });   
            },
            function () {

            }
        );
    }); //stop #konfirmasirencanapenjul

    $$('#floatrencanajual').on('click', function (e) { //start #floatrencanajual
        myApp.actions(actionSheetButtons);
    }); //stop #floatrencanajual
  
    $$(document).on('click','#actrencanajual_det',function(e){ //start #actrencanajual_det
        e.stopImmediatePropagation();
        e.preventDefault();
        var idpenjualan = $$(this).data('idpenjualan');
        localStorage.id_penjualan = idpenjualan;
        mainView.router.loadPage(host + 'keltani/list_penjualan_detail' + ".php?id=" + idpenjualan);
    }); //stop #actrencanajual_det
}); //stop pageinit rencanajual

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}


//------------------------------------- halaman/keltani/addjual.php -----------------------------------------------------------
myApp.onPageInit('addjual', function (page) { //start pageinit addjual
    $$(".at_fotoju").hide();

    $$(document).on('click','#at_selfieju',function(e){ //start #at_selfieju
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
            var image = document.getElementById('at_fotoju');
            image.src = "data:image/jpeg;base64," + imageData;
            $$(".at_fotoju").show();
        }
        function onFail(message){
            alert('failed coz: ' + message);
        }
    }); //stop #at_selfieju

    $$(document).on('click','#at_upfotoju',function(e){ //start #at_upfotoju
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
            var image = document.getElementById('at_fotoju');
            image.src = "data:image/jpeg;base64," + imageData;
            $$(".at_fotoju").show();
        }
        function onFail(message){
            alert('upload foto batal.');
            console.log(message);
        }
    }); //stop #at_upfotoju

    $('input.comj').keyup(function(event) {
        if(event.which >= 37 && event.which <= 40) return;
        $(this).val(function(index, value) {
            return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
    });

    var calendarDateFormata = myApp.calendar({
        input: '#aj_tanggal',
        dateFormat: 'dd-mm-yyyy',
        onClose: function (p) {
            var a = $$("#aj_tanggal").val();
            var pembanding = a.split("-");
            var tglsec = pembanding[1]+ "/" + pembanding[0] +"/"+ pembanding[2];

            var d = new Date();
            var strDate = (d.getMonth()+1) + "/" + d.getDate() + "/"  +  d.getFullYear() ;
            var jarak = datediff(parseDate(strDate), parseDate(tglsec));
            $$("#durasi").text('(H - '+ jarak +' hari)');
        }
    }); 
       
    $$(document).on('click','#btn_aj_submit',function(e){ //start #btn_aj_submit
        e.stopImmediatePropagation();
        e.preventDefault();
        var aj_nama = $$("#aj_nama").val();
        var aj_satuan = $$("#aj_satuan").val(); 
        var aj_kapasitas = $$("#aj_kapasitas").val();

        var harga = $$("#aj_harga").val();
        harga = harga.replace( /,/g, "" );
        var cekharga = parseInt(harga);

        var aj_varietas =  $$("#aj_varietas").val();  
        var tglkeb = $$("#aj_tanggal").val(); 
        var mix = tglkeb.split("-");
        var tglfix = mix[2] +"-" + mix[1] + "-" + mix[0];

        var imageku = $$("#at_fotoju").attr("src");

        if(aj_nama == "" || aj_satuan == "" || aj_kapasitas == "" || harga == "" || aj_varietas == "" || aj_kapasitas == "0" || tglkeb == ""){
            myApp.alert('Mohon isi form dengan lengkap!' +imageku); 
        }else if(cekharga <= 0){
            myApp.alert('Maaf harga tidak boleh kurang dari 0!');
        }else{
            $$.post(host + 'keltani/db_keltani.php', {act: 'addrencanajual' ,  kapasitas : aj_kapasitas, harga_jual : harga, satuan : aj_satuan, varietas : aj_varietas, 
                   nama_tanaman : aj_nama, id_user : localStorage.iduser , tanggal_kebutuhan : tglfix}, function(data){
                
                var json = JSON.parse(data);
                myApp.alert(json['notif']);
                var imageURI = $$("#at_fotoju").attr("src");

                if(imageku != "img/padi.jpg"){ //koding untuk upload foto
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
                        url:hnew + 'keltani/rencanajual.php?id=' + localStorage.iduser + "&level=" + localStorage.ulevel + "&url=" + hfoto,
                        force: true,
                        ignoreCache: true
                    });
                }
            });
        }
    }); //stop #btn_aj_submit

}); //stop pageinit addjual
  
function listrencanajual(angkax, jenisx){
    $$.post(host + 'keltani/db_keltani.php', {act: 'tabelhisrencanajual',  id: localStorage.iduser, angka : angkax, jenis : jenisx}, function(data){
        var hasil_json = JSON.parse(data);  
        if(jenisx == 0){
            $$("#tabel-rencanajuala").html(hasil_json['tabel']);
            $$("#cap-rencanajuala").html(hasil_json['caption']);
        }else if (jenisx == 1){
            $$("#tabel-rencanajualb").html(hasil_json['tabel']);
            $$("#cap-rencanajualb").html(hasil_json['caption']);
        }
    }); 
}


//------------------------------------- halaman listpenawaran_penanaman -----------------------------------------------------------
myApp.onPageInit('listpenawaran_penanaman', function (page) { //start pageinit listpenawaran_penanaman
    petani_penawaranpenanaman('1', 'semua');

    $$(document).on('click','#back_listpenanamantawar',function(e){ //start #back_listpenanamantawar
        e.stopImmediatePropagation();
        e.preventDefault();
        mainView.router.loadPage(hnew + 'home/home1' + ".php?id=" + localStorage.iduser + "&level=" + localStorage.ulevel);
    }); //stop #back_listpenanamantawar

    $$(document).on('click','#lpp_btnlihat',function(e){ //start #lpp_btnlihat
        e.stopImmediatePropagation();
        e.preventDefault();
        var idpenjualan = $$(this).data('id_penjualan');
        localStorage.id_penjualan = idpenjualan;
        mainView.router.loadPage(host + 'petani/listpenawaran_penanaman_detail' + ".php?id=" + localStorage.iduser + "&id_penjualan=" + localStorage.id_penjualan + "&url=" + hfoto);
    }); //stop #lpp_btnlihat
       
    $$(document).on('click','#listp_popoverpena',function(e){ //start #listp_popoverpena
        e.stopImmediatePropagation();
        e.preventDefault();
        var foto = $$(this).data('foto');
        $$("#popfotolistpenanaman").attr("src", foto);
    }); //stop #listp_popoverpena  
}); //stop pageinit listpenawaran_penanaman

function petani_penawaranpenanaman(xangka, area){
    $$.post(host + 'dbpetani.php', {act: "cardlistpenawaranjual" , angka : xangka, id : localStorage.iduser, url : hfoto, id_area : area  }, function(data){
        var hasil_json = JSON.parse(data);  
        console.log(hasil_json['tabel']);
        $$("#testjual").html(hasil_json['tabel']);
    }); 
}; 


//------------------------------------- halaman listpenawaran_penanaman_detail -----------------------------------------------------------
myApp.onPageInit('listpenawaran_penanaman_detail', function (page) { //start pageinit listpenawaran_penanaman_detail
    $$(document).on('click','#btnbookingrencana',function(e){ //start #btnbookingrencana
        e.preventDefault();
        e.stopImmediatePropagation();
        var idjual = $$(this).data('idjual');
        localStorage.id_penjualan = idjual;
        localStorage.tipe = "no";
        mainView.router.loadPage(host + 'petani/addtanam_pesanan' + ".php?idjual=" + idjual + "&id_user=" + localStorage.iduser);
    }); //stop #btnbookingrencana

    tabelhistoripemesan('1', localStorage.id_penjualan);


    $$(document).on('click','#btnchatb',function(e){ //start #btnchatb
        e.preventDefault();
        e.stopImmediatePropagation();
        var id_receiver = $$(this).data('receiver');
        $$.post(host + 'fungsiumum/cek.php', {act: 'cekchat' , id : localStorage.iduser, id_kedua : id_receiver}, function(data){
            localStorage.id_chat = data;
            mainView.router.loadPage(host + 'umum/messages.php?id=' + localStorage.iduser + "&id_chat=" + data);
        });
    }); //stop #btnchatb 
}); //stop pageinit listpenawaran_penanaman_detail

function tabelhistoripemesan(xangka ,idx){
    $$.post(host + 'fungsiumum/isi_tabel.php', {act: "tabelhispemesan" , angka : xangka, id : idx, url : hfotoupdate }, function(data){
        var hasil_json = JSON.parse(data);  
        $$("#tabel-urhis").html(hasil_json['tabel']);
        $$("#cap-urhis").html(hasil_json['caption']);
    }); 
};


//------------------------------------- halaman addtanam_pesanan -----------------------------------------------------------
myApp.onPageInit('addtanam_pesanan', function (page) { //start pageinit addtanam_pesanan
    $('input.akmj').keyup(function(event) {
        if(event.which >= 37 && event.which <= 40) return;
        $(this).val(function(index, value) {
            return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
    });

    inittanggalin("atp_mulai"); inittanggalin("atp_selesai"); 

    $$(document).on('click','#btn_atp_submit',function(e){ //start #btn_atp_submit
        e.preventDefault();
        e.stopImmediatePropagation();
        var atp_nama = $$("#atp_nama").val();           
        var atp_luas = $$("#atp_luas").val();
        var atp_mulai = $$("#atp_mulai").val();
        var mix = atp_mulai.split("-"); var tglmulaifix = mix[2] +"-" + mix[1] + "-" + mix[0];

        var atp_selesai = $$("#atp_selesai").val();
        var mixb = atp_selesai.split("-"); var tglselesaifix = mixb[2] +"-" + mixb[1] + "-" + mixb[0];

        var harga = $$("#atp_hargax").val();

        harga = harga.replace( /,/g, "" );
        var cekharga = parseInt(harga);

        var atp_satuan = $$("#atp_satuan").val();
        var atp_kapasitas = $$("#atp_kapasitas").val();
        var atp_harga = $$("#atp_harga").val();
        var atp_varietas = $$("#atp_varietas").val();
        var kapasitasreal = $$("#kapasitasreal").val();
        var stokbaru = kapasitasreal - atp_kapasitas;
        atp_kapasitas = parseInt(atp_kapasitas);  kapasitasreal = parseInt(kapasitasreal);
        
        if(atp_nama == "" ||  atp_luas == "" || atp_mulai == "" || atp_selesai == "" ||
            atp_satuan == "" ||  atp_kapasitas == "" || atp_harga == "" || atp_varietas == "" || atp_kapasitas == "0" || harga == "0" || harga == ""){
            myApp.alert("Mohon isi form dengan lengkap!");
        }else if(atp_kapasitas > kapasitasreal){
            myApp.alert("Jumlah booking tidak boleh melebihi kapasitas");
        }else{
            $$.post(host + 'dbpetani.php', {act: 'addrencanatanampesan' , id_user : localStorage.iduser, id_penjualan : localStorage.id_penjualan,
                nama_tanaman : atp_nama, mulai_tanam : tglmulaifix, akhir_tanam : tglselesaifix, hasil_panen : atp_kapasitas,
                harga_jual : harga, satuan : atp_satuan, luas_lahan : atp_luas,  varietas_hasil : atp_varietas, 
                newkapasitas : stokbaru, tipe : localStorage.tipe, idhapus : localStorage.id_pemesananh}, function(data){
                    var json = JSON.parse(data);
                    myApp.alert(json['notif']);
                    if(json['status'] == "yesaxx"){
                        mainView.router.back({
                            url: host + 'petani/listpenawaran_penanaman_detail' + ".php?id=" + localStorage.iduser + "&id_penjualan=" + localStorage.id_penjualan + "&url=" + hfoto,
                            force: true,
                            ignoreCache: true
                        });
                    }
            });
        }
    });  //stop #btn_atp_submit
}); //stop pageinit addtanam_pesanan
 
function awaldetail(){
    var a = $$("#aj_tanggalb").text();
    var pembanding = a.split("-");
    var tglsec = pembanding[1]+ "/" + pembanding[0] +"/"+ pembanding[2];

    var d = new Date();
    var strDate = (d.getMonth()+1) + "/" + d.getDate() + "/"  +  d.getFullYear() ;
    var jarak = datediff(parseDate(strDate), parseDate(tglsec));
    $$("#durasib").text('(H '+ jarak +' hari)');
};

function tabeldaftarbooker(xangka ,idx){
    $$.post(host + 'fungsiumum/isi_tabel.php', {act: "tabeldaftarbooker" , angka : xangka, id : idx, url : hfotoupdate }, function(data){
        var hasil_json = JSON.parse(data);  
        $$("#tabel-listjualdet").html(hasil_json['tabel']);
        $$("#cap-listjualdet").html(hasil_json['caption']);
    }); 
};


//------------------------------------- halaman addtanam_pesanan -----------------------------------------------------------
myApp.onPageInit('list_penjualan_detail', function (page) { //start pageinit list_penjualan_detail
    tabeldaftarbooker("1" , localStorage.id_penjualan);
    var ptrContentlpd = $$('.pull-to-refresh-content');
    ptrContentlpd.on('ptr:refresh', function (e) {
        setTimeout(function () {
              tabeldaftarbooker("1" , localStorage.id_penjualan);
            myApp.pullToRefreshDone();
        }, 2000);
    });  

    $$(document).on('click','#actpenjualankoop',function(e){ //start #actpenjualankoop
        e.stopImmediatePropagation();
        e.preventDefault();
        var nama = $$(this).data('nama');
        var idpemesanan = $$(this).data('id'); var qty = $$(this).data('qty');
        var harga = $$(this).data('harga'); var xsatuan = $$(this).data('satuan');
        var sheetpesanan = [
            {
                text:  '<font class="fontku">Pesanan : ' +nama + " (Rp. " + harga + "/" + xsatuan + ")</font>" ,
                label : true,
            },
            {
                text: '<font class="fontku"><i class="fa fa-check-circle" aria-hidden="true"></i> Setujui Harga </font>',
                color : 'blue',
                onClick: function (){
                    myApp.confirm('Anda yakin konfirmasi menerima pesanan ini?', '<font style="font-size:12px;">Pesanan : ' +nama + " (Rp. " + harga + "/" + xsatuan + ")</font>"
                        ,function () {
                            $$.post(host + 'dbpetani.php', {act: 'pesanan', id_pemesanan : idpemesanan, status : '0', nama : localStorage.unama }, function(data){
                                if(data == "yeah"){
                                    myApp.alert('Konfirmasi penerimaan pesanan berhasil, anda dapat konfirmasi penerimaan hasil panen jika penanaman telah selesai.');
                                    tabeldaftarbooker("1" , localStorage.id_penjualan);
                                }else{
                                    myApp.alert(data);
                                }
                            });   
                        },function () {

                        }
                    );
                }
            },
            {
                text: '<font class="fontku"><i class="fa fa-ban" aria-hidden="true"></i> Tolak Pesanan</font>',
                color : 'red',
                onClick: function (){
                    myApp.confirm('Anda yakin menolak menerima pesanan ini?', '<font style="font-size:12px;">Pesanan : ' +nama + " (Rp. " + harga + "/" + xsatuan + ")</font>"
                        ,function () {
                            $$.post(host + 'dbpetani.php', {act: 'pesanan', id_pemesanan : idpemesanan, status : '7' , koop :'yea' }, function(data){
                                if(data == "yeah"){
                                    myApp.alert('Tolak Pesanan Berhasil, sekarang anda tinggal menunggu apakah pemesan akan menawarkan harga baru atau tidak');
                                    tabeldaftarbooker("1" , localStorage.id_penjualan);
                                }else{
                                    myApp.alert(data);
                                }
                            });   
                        },function () {

                        }
                    );
                }
            },
            {
                text: 'Cancel',
                color : 'red',
                onClick: function () {

                }
            },
        ]; 
        myApp.actions(sheetpesanan);
    }); //stop #actpenjualankoop

    awaldetail();

    $$(document).on('click','#actpenjualkoopterima',function(e){ //start #actpenjualkoopterima
        e.stopImmediatePropagation();
        e.preventDefault();
        var nama = $$(this).data('nama');
        var idpemesanan = $$(this).data('id'); 
        myApp.confirm('Apakah anda yakin ingin konfirmasi hasil panen "' + nama +'" telah diterima?', 'Notification'
            , function () {
                $$.post(host + 'dbpetani.php', {act: 'konfirmasipemesanan', id : idpemesanan , status : 1 }, function(data){
                    if(data == "yeah"){
                    myApp.alert('Konfirmasi penerimaan hasil panen berhasil, transaksi selesai!' , 'Notification');
                        awaldetail();
                        tabeldaftarbooker("1" , localStorage.id_penjualan);          
                    }else{
                      myApp.alert(data);
                    }
                });
            },function () {

            }
        );
    }); //stop #actpenjualkoopterima

    $$(document).on('click','#lihatdetailkoop',function(e){ //start #lihatdetailkoop
        e.stopImmediatePropagation();
        e.preventDefault();
        var idpemesanan = $$(this).data('id');
        var id_perencanaan = $$(this).data('id_perencanaan');
        localStorage.id_perencanaan = id_perencanaan;
        mainView.router.loadPage(hnew + 'keltani/lihat_rencanatanam' + ".php?");
    }); //stop #lihatdetailkoop

}); //stop pageinit list_penjualan_detail


//------------------------------------- halaman/keltani/lihat_rencanatanam.php -----------------------------------------------------------
myApp.onPageInit('lihat_rencanatanam', function (page) { //start pageinit lihat_rencanatanam
    tabeldetailrencana('1', localStorage.id_perencanaan);

    $$(document).on('click','#a_popover',function(e){ //start #a_popover
        e.stopImmediatePropagation();
        e.preventDefault();
        var foto = $$(this).data('foto');
        var fotreplace = hfotoupdate + foto;
        $$("#popfotohistorykoop").attr("src", fotreplace);
    }); //stop #a_popover

}); //stop pageinit lihat_rencanatanam

function tabeldetailrencana(xangka ,idx){
    $$.post(host + 'fungsiumum/isi_tabel.php', {act: "tabelhisrencana" , angka : xangka, id : idx, url : hfotoupdate }, function(data){
        var hasil_json = JSON.parse(data);  
        $$("#tabel-urhiskoop").html(hasil_json['tabel']);
        $$("#cap-urhiskoop").html(hasil_json['caption']);
    }); 
};