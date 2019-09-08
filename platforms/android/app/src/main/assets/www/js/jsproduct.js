function begindatetimepicker(){
  var today = new Date();
  var pickerInline = myApp.picker({
        input: '#ks-picker-date',
        container: '#ks-picker-date-container',
        toolbar: false,
        rotateEffect: true,
        value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
        onChange: function (picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }
        },
        formatValue: function (p, values, displayValues) {
            return values[1] +" "  + displayValues[0] + ' ' + values[2] + ' ' + values[3] + ':' + values[4];
        },
        cols: [
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: ('01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31').split(' '),
                width : 50,
                textAlign: 'left'
            },
            // Years
            {
                values: (function () {
                    var arr = [];
                    for (var i = 2018; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })(),
                width : 90,
                textAlign: 'left'
            },
            // Space divider
            {
                divider: true,
                content: '&nbsp;'
            },
            // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
                width : 50,
                textAlign: 'left'
            },
            // Divider
            {
                divider: true,
                content: ':'
            },
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
                width : 50,
                textAlign: 'left'  
            }
        ]
    });

  var pickerInline = myApp.picker({
        input: '#ks-picker-date2',
        container: '#ks-picker-date-container2',
        toolbar: false,
        rotateEffect: true,
        value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
        onChange: function (picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }
        },
        formatValue: function (p, values, displayValues) {
            return values[1] +" "  + displayValues[0] + ' ' + values[2] + ' ' + values[3] + ':' + values[4];
        },
        cols: [
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: ('01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31').split(' '),
                width : 50,
                textAlign: 'left'
            },
            // Years
            {
                values: (function () {
                    var arr = [];
                    for (var i = 2018; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })(),
                width : 90,
                textAlign: 'left'
            },
            // Space divider
            {
                divider: true,
                content: '&nbsp;'
            },
            // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
                width : 50,
                textAlign: 'left'
            },
            // Divider
            {
                divider: true,
                content: ':'
            },
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
                width : 50,
                textAlign: 'left'  
            }
        ]
    });
}

function insertProduk(){
    $$.post(host + 'action/act_produk.php', {act: "terra_insertproduk" , iduser : localStorage.iduser, nama : localStorage.padd_nama, 
        idkomoditas : localStorage.padd_jenis, jenisgabah : localStorage.padd_gabah, varietas : localStorage.padd_var, qty : localStorage.padd_qty, 
        satuan : localStorage.padd_satuan, hargaterendah : localStorage.padd_harga, kelipatanharga : localStorage.padd_bid,
        kategori : localStorage.padd_kategori, started : localStorage.padd_lelangmulai, ended : localStorage.padd_lelangakhir,
        deskripsi : localStorage.padd_deskdb}, function(data){

            console.log(localStorage.padd_lelangmulai);
            console.log(localStorage.padd_bid);
            var json = JSON.parse(data);  
            console.log(json['foto']);
            console.log(json['res']);
            if(json['res'] == "Sukses"){
                 // uploadFotoToServer('fungsiumum/upload_product.php', json['foto']);
                myApp.alert('Tambah Produk Berhasil');
                mainView.router.loadPage(hnew + 'seller/s_produkdaftar' + ".php?");
            }else{
                myApp.alert('maaf tambah produk gagal');
            }
    }); 
}

function terra_getMyProduct(xangka,keywordx){
    clearInterval();
    $$.post(host + 'action/act_produk.php', {act: "terra_getmyproduct", angka: xangka, iduser: localStorage.iduser, url: hfoto, keyword: keywordx}, function(data){
        var json = JSON.parse(data);  
        $$("#isi-produkseller").html(json['tabel']);
        $$("#cap-produkseller").html(json['caption']);  
        $$("#pageprodukseller").html(json['paging']); 
        var time = json['time'];
        var total = parseInt(json['totallelang']);
        var split = time.split(";");
        console.log(json['paging'])           
        for(var i=0; i<total; i++){
            var dataku = split[i].split("@");
            var a = "pro-kategori" + dataku[2];
            console.log(a + ", " + dataku[0] + ", " + dataku[1]+ ", " + dataku[3])
            timerlelang(a, dataku[0] , dataku[1], dataku[3] );
        }
    }); 
}

function timerlelang(idlelang,mulai,akhir,jenis){
    $$("#" + idlelang).html("");
    if(jenis != "Lelang"){
        clearInterval(x);
        $$("#" + idlelang).hide();
    }else if(jenis == "Lelang"){
        var countDownDate = new Date(akhir).getTime();
        var x = setInterval(function() { // Update the count down every 1 second
            var now = new Date().getTime(); // Get today's date and time
            var distance = countDownDate - now; // Find the distance between now and the count down date

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            $$("#" + idlelang).html( "Lelang <Br/>" + days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

            if (distance < 0) {  // If the count down is over, write some text 
                clearInterval(x);
                $$("#" + idlelang).html("EXPIRED");;
            }

        }, 1000);
    }
}

function buttonPopUp(nama,idproduk){
   var buttons =  [
        {
           text: nama,
            label: true
        },
        {
            text: '<i class="fa fa-check" aria-hidden="true"></i> Konfirmasi Laksanakan Penanaman',
            color : 'blue',
            onClick: function () {
                console.log(idproduk);
            }
        },
        {
            text: '<i class="fa fa-trash color-red" aria-hidden="true"></i> HapusProduk',
            color : 'blue',
            onClick: function () {
                console.log(idproduk);
            }
        },
        {
            text: 'Cancel',
            color: 'red',
            onClick: function () {
                myApp.alert('Cancel clicked');
            }
        },
    ];
    myApp.actions(buttons);
}


//------------------------------------- halaman/seller/s_produkdaftar.php -----------------------------------------------------------
//------------------------------------- AWAL PRODUK DAFTAR -----------------------------------------------------------
myApp.onPageInit('s_produkdaftar', function (page) { //start pageinit s_produkdaftar
    localStorage.keyword = "";
    terra_getMyProduct('1', localStorage.keyword);

    $$(document).on('click','#pgmyproduct',function(e){ //start #pgmyproduct
        e.preventDefault();
        e.stopImmediatePropagation();
        var angkax = $$(this).data('angka');
        terra_getMyProduct(angkax , localStorage.keyword);
    });  //stop #pgmyproduct

    $$(document).on('click','#dp_refreshproduk',function(e){ //start #dp_refreshproduk
        e.stopImmediatePropagation();
        mainView.router.refreshPage();
    }); //stop #dp_refreshproduk

    $$(document).on('keypress', '#searchlistmyproduk' ,function (e) { //start #searchlistmyproduk
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            localStorage.keyword = inputtext;
            terra_getMyProduct('1' , localStorage.keyword);
        }
    }); //stop #searchlistmyproduk

    $$(document).on('click','#pro-action',function(e){ //start #pro-action
        e.stopImmediatePropagation();
        var iproduk = $$(this).data('iproduk');
        var inama = $$(this).data('nama');
        console.log(iproduk);
        buttonPopUp(inama,iproduk);
    }) //stop #pro-action

    $$(document).on('click','#dp_tambahproduk',function(e){ //start #dp_tambahproduk
        e.stopImmediatePropagation(); 
        localStorage.padd_nama = "";/* --- */ localStorage.padd_jenis = "";
        localStorage.padd_kategori = "";/* --- */ localStorage.padd_gabah = "";
        localStorage.imageuri = "";/* --- */ localStorage.padd_desk = ""; 
        localStorage.padd_desktampilan1 = "";/* --- */ localStorage.padd_deskdb = "";
        localStorage.padd_var= "";/* --- */ localStorage.padd_harga = ""; 
        localStorage.padd_hargatampilan = "";/* --- */ localStorage.padd_bid = "";    
        localStorage.padd_bidtampilan = "";/* --- */ localStorage.padd_satuan = "";   
        localStorage.padd_qty = "";/* --- */ localStorage.padd_lelangmulai =""; 
        localStorage.padd_lelangakhir =""; /* --- */ localStorage.padd_lelangmulaidis =""; 
        localStorage.padd_lelangakhirdis =""; /* --- */ localStorage.padd_lelangnote = "";
        mainView.router.loadPage(hnew + 'seller/s_produktambah' + ".php?");
    }); //stop #dp_tambahproduk
}); //stop pageinit s_produkdaftar


//------------------------------------- halaman/seller/s_produktambah.php -----------------------------------------------------------
myApp.onPageInit('s_produktambah', function (page) { //start pageinit s_produktambah
    $$(".gabah").hide();
    $("input[name='my-radio']").change(function(){
        var val = $("input[name='my-radio']:checked").val();
        if(val == "3"){
            $$(".gabah").show();
        }else{
            $$(".gabah").hide();
        }
    });

    $$(document).on('click','#pt_next1',function(e){ //start #pt_next1
        e.stopImmediatePropagation(); 
        var namaproduk = $$("#pt_nama").val().trim();
        var kategori = $$("#pt_kategori").val();
        var gabah = $$("#pt_gabah").val();
        var jenisproduk = $("input[name='my-radio']:checked").val();
        if(namaproduk.trim() == ""){
             myApp.alert('Nama Produk Wajib Diisi!'); 
        }else{
            getnamaJenis(jenisproduk);
            localStorage.padd_nama = namaproduk;
            localStorage.padd_jenis = jenisproduk;
            localStorage.padd_kategori = kategori;
            localStorage.padd_gabah = gabah;
            mainView.router.loadPage(hnew + 'seller/s_produktambah2' + ".php?");
        }
        console.log(jenisproduk);
    }); //stop #pt_next1
}).trigger(); //stop pageinit s_produktambah


//------------------------------------- halaman/seller/s_produktambah2.php -----------------------------------------------------------
myApp.onPageInit('s_produktambah2', function (page) { //start pageinit s_produktambah2
    $$(document).on('click','#pt_next2',function(e){
        e.stopImmediatePropagation(); 
        mainView.router.loadPage(hnew + 'seller/s_produktambah3' + ".php?");
    });

    $$(document).on('click','#pt_camera',function(e){ //start #pt_camera
        e.stopImmediatePropagation();
        e.preventDefault();
        selfie('pt_gambar');
    }); //stop #pt_camera

    $$(document).on('click','#pt_upload',function(e){ //start #pt_upload
        e.stopImmediatePropagation();
        e.preventDefault();
        uploadFoto('pt_gambar');
    }); //stop #pt_upload
}); //stop pageinit s_produktambah2


//------------------------------------- halaman/seller/s_produktambah3.php -----------------------------------------------------------
myApp.onPageInit('s_produktambah3', function (page) { //start pageinit s_produktambah3
    getPreProductData();

    $$(document).on('click','#pt_next3',function(e){ //start #pt_next3
        e.stopImmediatePropagation(); 
        var value = localStorage.imageuri;
    });  //stop #pt_next3
    
    $$(document).on('click','#pt_camera',function(e){ //start #pt_camera
        e.stopImmediatePropagation();
        e.preventDefault();
        selfie('pt_gambar');
    }); //stop #pt_camera

    $$(document).on('click','#pt_upload',function(e){ //start #pt_upload
        e.stopImmediatePropagation();
        e.preventDefault();
        uploadFoto('pt_gambar');
    }); //stop #pt_upload

    $$(document).on('click','#edit_fproduk',function(e){ //start #edit_fproduk
        e.stopImmediatePropagation(); 
        var a = $$(this).data('kat');
        if(a == "produk-jenis"){
            mainView.router.loadPage(hnew + 'seller/s_produkzedit_jenis.php?');
        }
        if(a == "produk-nama"){
            mainView.router.loadPage(hnew + 'seller/s_produkzedit_nama.php?');
        }
        if(a == "produk-varietas"){
            mainView.router.loadPage(hnew + 'seller/s_produkzedit_varietas.php?');
        }
        if(a == "produk-desk"){
            mainView.router.loadPage(hnew + 'seller/s_produkzedit_deskripsi.php?');
        }
        if(a == "produk-harga"){
            mainView.router.loadPage(hnew + 'seller/s_produkzedit_harga.php?');
        }
        if(a == "produk-satqty"){
            mainView.router.loadPage(hnew + 'seller/s_produkzedit_satuan.php?');
        }
        if(a == "produk-waktu"){
            mainView.router.loadPage(hnew + 'seller/s_produkzedit_masalelang.php?');
        }
    }); //stop #edit_fproduk

    $$(document).on('click','#pt_final',function(e){ //start #pt_final
        e.stopImmediatePropagation(); 
        if(localStorage.padd_nama == "" || localStorage.padd_jenis == ""){
          myApp.addNotification({message: 'a',});
        }else if(localStorage.padd_deskdb == "" ){
          miniAlert('Deskripsi wajib diisi!');
        }else if(localStorage.padd_harga == "" || (localStorage.padd_bid == "" && localStorage.padd_kategori == "Lelang")){
          miniAlert('Harga dan Kelipatan Bid Wajib Diisi!');
        }else if(localStorage.padd_qty == "" || localStorage.padd_satuan == ""){
          miniAlert('Kuantitas Dan Satuan Wajib Diisi!');
        }else if(localStorage.padd_lelangmulai == "" || localStorage.padd_lelangakhir == ""){
          miniAlert('Masa Lelang Wajib Diisi!');
        }else{
          insertProduk();
        }
    }); //stop #pt_final
}).trigger(); //stop pageinit s_produktambah3

function miniAlert(a){
    myApp.addNotification({
        message: "<font style='color:red;'>" +a + "</font>",
        additionalClass : "warn", 
        button : {
            text: 'tutup',
            color: 'red',
            close: true
        }
    });
}

function getPreProductData(){
    $$("#f_kategoripr").text(" ("+ localStorage.padd_kategori +")");
    $$("#f_nama").text(localStorage.padd_nama);
    $$("#fvarietas").text(localStorage.padd_var);
    $$("#f_namajenis").text(localStorage.padd_namajenis);
    $$("#fdeskripsi").text(localStorage.padd_desktampilan1);
    if(localStorage.padd_desktampilan1 != ""){
        $$("#notedesk").text(""); 
        $$("#fdeskripsi").text(localStorage.padd_desktampilan1);
    }
    if(localStorage.padd_harga != ""){
       $$("#noteharga").text("Kelipatan bidding Rp. " + localStorage.padd_bidtampilan);
       $$("#fharga").text("Rp. " + localStorage.padd_hargatampilan);
    }
    if(localStorage.padd_satuan != ""){
        $$("#notesatuan").text("");
        $$("#fsatqty").text(localStorage.padd_qty + " " + localStorage.padd_satuan);  
    }
    if(localStorage.padd_lelangmulai != ""){
        $$("#fwaktu").text(localStorage.padd_lelangnote);
        $$("#notewaktu").html('<font style="font-size: 15px;color:#088378;">Mulai : '+ 
        '<i class="fa fa-calendar-plus-o" aria-hidden="true"></i>' +
        ' '+ localStorage.padd_lelangmulaidis  +'<br/>Berakhir : '+  
        ' <i class="fa fa-calendar-check-o" aria-hidden="true"></i> '+ localStorage.padd_lelangakhirdis +' </font>');
    }
}

function getnamaJenis(value){
    if(value == "1"){
      localStorage.padd_namajenis  = "Beras";
    }
    if(value == "2"){
      localStorage.padd_namajenis  = "Beras Broken";
    }
    if(value == "3"){
      localStorage.padd_namajenis  = "Gabah" + " (" + localStorage.padd_gabah + ")";
    }
    if(value == "4"){
      localStorage.padd_namajenis  = "Katul";
    }
    if(value == "5"){
      localStorage.padd_namajenis  = "Lainnya";
    }
}


//------------------------------------- halaman/umum/s_produkzedit_nama.php -----------------------------------------------------------
myApp.onPageInit('s_produkzedit_nama', function (page) { //start pageinit s_produkzedit_nama
    $$("#zpt_nama").val(localStorage.padd_nama);
    $$("#zpt_nama").focus();

    $$(document).on('click','#pt_simpannama',function(e){ //start #pt_simpannama
        e.stopImmediatePropagation(); 
        var a = $$("#zpt_nama").val();
        if(a.trim() == ""){
            myApp.alert('Nama tidak boleh kosong');
        }else{
            localStorage.padd_nama = a;
            $$("#f_nama").text(localStorage.padd_nama);
            mainView.router.back();
        }
    }); //stop #pt_simpannama
}); //stop pageinit s_produkzedit_nama


//------------------------------------- halaman/umum/s_produkzedit_jenis.php -----------------------------------------------------------
myApp.onPageInit('s_produkzedit_jenis', function (page) { //start pageinit s_produkzedit_jenis
    if(localStorage.padd_jenis != "3"){
        $$(".zgabah").hide();
    }

    $$("#zpt_gabah").val(localStorage.padd_gabah).change();
    var jenisgabah = $('input:radio[name=zmy-radio]');
    jenisgabah.filter('[value='+ localStorage.padd_jenis +']').prop('checked', true);

    $("input[name='zmy-radio']").change(function(){
        var val = $("input[name='zmy-radio']:checked").val();
        if(val == "3"){
            $$(".zgabah").show();
        }else{
            $$(".zgabah").hide();
        }
    });

    $$(document).on('click','#pt_simpanjenis',function(e){ //start #pt_simpanjenis
        e.stopImmediatePropagation(); 
        var gabah = $$("#zpt_gabah").val();
        localStorage.padd_gabah = gabah;

        var jenisproduk = $("input[name='zmy-radio']:checked").val();
        localStorage.padd_jenis = jenisproduk;

        getnamaJenis(jenisproduk); $$("#f_namajenis").text(localStorage.padd_namajenis);
        mainView.router.back();
    }); //stop #pt_simpanjenis
}); //stop pageinit s_produkzedit_jenis


//------------------------------------- halaman/umum/s_produkzedit_deskripsi.php -----------------------------------------------------------
myApp.onPageInit('s_produkzedit_deskripsi', function (page) { //start pageinit s_produkzedit_deskripsi
    $$("#zpt_deksripsi").focus();
    $$("#zpt_deksripsi").val(localStorage.padd_desk);

    $$(document).on('click','#pt_simpandesk',function(e){ //start #pt_simpandesk
        e.stopImmediatePropagation(); 
        var deskripsi = $$("#zpt_deksripsi").val(); 
        if(deskripsi.trim() == ""){
            myApp.alert("Deskripsi Tidak Boleh Kosong");
        }else{
            var desreal= "";/* --- */var desdisplay = "";/* --- */var destampilan ="";
            var b = deskripsi.split("\n");
            deskripsi.replace("\n", '<br/>');
            for(var i=0; i<b.length ;i++){
                desreal = desreal + b[i] + "<br/>";
                desdisplay = desdisplay + b[i] + "\n";
            }
            localStorage.padd_desk = desdisplay;
            localStorage.padd_deskdb = desreal;
            localStorage.padd_desktampilan1 = desdisplay;

            var penghitungkarakter = desdisplay.length;
            if(penghitungkarakter >15){
                var variable2 = desdisplay.substring(0, 15);
                variable2 = variable2 + "...";
                localStorage.padd_desktampilan1 = variable2;
                $$("#fdeskripsi").text(localStorage.padd_desktampilan1);
            }
            if(penghitungkarakter <= 15){
                $$("#fdeskripsi").text(localStorage.padd_desktampilan1);
            }
            $$("#notedesk").text("");
            mainView.router.back();
        }
    });  //stop #pt_simpandesk
});  //stop pageinit s_produkzedit_deskripsi


//------------------------------------- halaman/umum/s_produkzedit_harga.php -----------------------------------------------------------
myApp.onPageInit('s_produkzedit_harga', function (page) { //start pageinit s_produkzedit_harga
    $$("#zpt_harga").val(localStorage.padd_hargatampilan);
    $$("#zpt_bid").val(localStorage.padd_bidtampilan);
    $('input.comi').keyup(function(event) {
        if(event.which >= 37 && event.which <= 40) return;
        $(this).val(function(index, value) {
            return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
    });
  
    $$(document).on('click','#pt_simpanharga',function(e){ //start #pt_simpanharga
        e.stopImmediatePropagation(); 
        var harga = $$("#zpt_harga").val();
        var hargafix = harga.replace( /,/g, "" );
        var cekharga = parseInt(hargafix);

        var bid = $$("#zpt_bid").val();
        var bidfix = bid.replace( /,/g, "" );
        var cekbid = parseInt(bidfix);
        console.log(cekbid+ " @ " + cekharga);

        if(cekharga <= 0 || harga == ""){
            myApp.alert("Harga harus lebih dari 0");
        }else if(cekbid <= 0 || bid == ""){
            myApp.alert("Kelipatan untuk bidding harus lebih dari 0");
        }else if(localStorage.padd_kategori == "Lelang" && cekbid < 1000){
            myApp.alert("Kelipatan bid minimal Rp. 1000 rupiah");
        }else{
            localStorage.padd_harga = hargafix;
            localStorage.padd_hargatampilan =  cekharga.toLocaleString();

            localStorage.padd_bid = bidfix;
            localStorage.padd_bidtampilan = cekbid.toLocaleString();
            //
            $$("#noteharga").text("Kelipatan bidding Rp. " + localStorage.padd_bidtampilan);
            $$("#fharga").text(  "Rp. " + localStorage.padd_hargatampilan);
            mainView.router.back();
        }
    }); //stop #pt_simpanharga
});  //stop pageinit s_produkzedit_harga
 

//------------------------------------- halaman/umum/s_produkzedit_varietas.php -----------------------------------------------------------
myApp.onPageInit('s_produkzedit_varietas', function (page) { //start pageinit s_produkzedit_varietas
    $$("#zpt_varietas").val(localStorage.padd_var);
    $$("#zpt_varietas").focus();

    $$(document).on('click','#pt_simpanvarietas',function(e){ //start #pt_simpanvarietas
        e.stopImmediatePropagation(); 
        var a = $$("#zpt_varietas").val();
        if(a.trim() == ""){
            myApp.alert('Nama tidak boleh kosong');
        }else{
            localStorage.padd_var = a;
            $$("#fvarietas").text(localStorage.padd_var);
            mainView.router.back();
        }
    });  //stop #pt_simpanvarietas

}); //stop pageinit s_produkzedit_varietas


//------------------------------------- halaman/umum/s_produkzedit_satuan.php -----------------------------------------------------------
myApp.onPageInit('s_produkzedit_satuan', function (page) { //start pageinit s_produkzedit_satuan
    $$("#zpt_satuan").val(localStorage.padd_satuan).change();
    $$("#zpt_qty").val(localStorage.padd_qty);
    //
    $$(document).on('click','#pt_simpansatuan',function(e){ //start #pt_simpansatuan
        e.stopImmediatePropagation(); 
        var satuan = $$("#zpt_satuan").val();
        var qty = $$("#zpt_qty").val();
        var qtyfix = parseInt(qty);

        if(satuan == "" || qty == ""){
            myApp.alert('Satuan dan Kuantitas Harap diisi!');
        }else if(qtyfix <= 0 ){
            myApp.alert("Kuantitas harus lebih dari 0!")
        }else{
            localStorage.padd_satuan = satuan;
            localStorage.padd_qty = qtyfix;
            $$("#notesatuan").text("");
            $$("#fsatqty").text(localStorage.padd_qty + " " + localStorage.padd_satuan);
            mainView.router.back();
        }
    }); //stop #pt_simpansatuan
}); //stop pageinit s_produkzedit_satuan


//------------------------------------- halaman/umum/s_produkzedit_masalelang.php -----------------------------------------------------------
myApp.onPageInit('s_produkzedit_masalelang', function (page) { //start pageinit s_produkzedit_masalelang
    begindatetimepicker();
    if(localStorage.padd_lelangmulaidis != ""){
        $$("#ks-picker-date").val(localStorage.padd_lelangmulaidis);
        $$("#ks-picker-date2").val(localStorage.padd_lelangakhirdis);
    }


    $$(document).on('click','#pt_simpanwaktu',function(e){ //start #pt_simpanwaktu
        e.stopImmediatePropagation(); 
        var mulai = $$("#ks-picker-date").val();
        var splitmulai = mulai.split(' ');
        var valbulan =  getValBulan(splitmulai[1]);
        var mulaidb = splitmulai[2] + "-" + valbulan + "-" + splitmulai[0] + " " +splitmulai[3] +":00";

        var akhir = $$("#ks-picker-date2").val();
        var splitakhir = akhir.split(' ');
        var valbulanakhir =  getValBulan(splitakhir[1]);
        var akhirdb = splitakhir[2] + "-" + valbulanakhir + "-" + splitakhir[0] + " " +splitakhir[3] +":00";

        var a = new Date(mulaidb);
        var b = new Date(akhirdb);
        var selisih = (b -a) / 1000 / 60 ;
        var c = new Date();
        if(a <= c){
            miniAlert("Waktu Mulai harus lebih dari waktu saat ini!");  
        }else if(mulai == "" || akhir == ""){
            miniAlert("Waktu Mulai dan Waktu Selesai Wajib Diisi!");
        }else if(a >= b){
            miniAlert("Waktu Berakhir Lelang harus lebih dari Waktu Mulai");
        // console.log("ini sama or lebih");
        }else if(selisih <30){
            miniAlert("Durasi lelang minimal 30 menit!"); 
        }else{
            var durasi = getSelisihWaktu(selisih);
            localStorage.padd_lelangmulai = mulaidb; localStorage.padd_lelangmulaidis = mulai;
            localStorage.padd_lelangakhir = akhirdb;  localStorage.padd_lelangakhirdis = akhir;
            localStorage.padd_lelangnote = durasi;

            $$("#fwaktu").text(localStorage.padd_lelangnote);
            $$("#notewaktu").html('<font style="font-size: 15px;color:#088378;">Mulai : '+ 
            '<i class="fa fa-calendar-plus-o" aria-hidden="true"></i>' +
            ' '+ localStorage.padd_lelangmulaidis  +'<br/>Berakhir : '+  
            ' <i class="fa fa-calendar-check-o" aria-hidden="true"></i> '+ localStorage.padd_lelangakhirdis +' </font>');
            mainView.router.back();
            console.log(durasi);
        }
    }); //stop #pt_simpanwaktu
}).trigger(); //stop pageinit s_produkzedit_masalelang

function getValBulan(s){
    var number = "0";
    if(s == "Januari"){number = "01";}
    if(s == "Februari"){number = "02";}
    if(s == "Maret"){number = "03";}
    if(s == "April"){number = "04";}
    if(s == "Mei"){number = "05";}
    if(s == "Juni"){number = "06";}
    if(s == "Juli"){number = "07";}
    if(s == "Agustus"){number = "08";}
    if(s == "September"){number = "09";}
    if(s == "Oktober"){number = "10";}
    if(s == "November"){number = "11";}
    if(s == "Desember"){number = "12";}
    return number;
}

function getSelisihWaktu(selisih){
    var str = "";
    var hari = parseInt(selisih/1440);
    var sisamenit = selisih%1440; 
    var jam = parseInt(sisamenit/60);
    var menit = sisamenit%60;
    str = hari + " hari, " + jam + " jam "+ menit + " menit.";
    return str;
}