//------------------------------------- halaman/umum/atur_area_tambah.php -----------------------------------------------------------
myApp.onPageInit('market', function (page) { //start pageinit market
	localStorage.keyword = "";
	terra_listpenanaman("1", "semua" , localStorage.keyword);

	$$(document).on('keypress','#searchlist',function (e){ //start #searchlist
		if(e.which === 13){
			e.preventDefault();
			e.stopImmediatePropagation();
			var inputtext = $$(this).val();
			localStorage.keyword = inputtext;
			terra_listpenanaman("1", "semua" , localStorage.keyword);
		}
	}); //stop #searchlist

	$$(document).on('click','#subscribe',function(e){ //start #subscribe
		e.stopImmediatePropagation();
		e.preventDefault();
		var idrencana = $$(this).data('id_rencana'); 
		var a = $$("#sub" + idrencana).text();
		var b = "";/* --- */var c = "";

		if(a == "Follow Now"){
			$$("#sub" + idrencana).html('<i class="fa fa-heart color-red" aria-hidden="true"></i> <b>Followed</b>');
			b = "<font style='color:white;'>Anda mengikuti penanaman ini</font>";
			c = "yes";
		}
		if(a == "Followed"){
			$$("#sub" + idrencana).html( '<i class="fa fa-heart-o color-red" aria-hidden="true"></i> Follow Now');
			b = "<font style='color:white;'>Anda telah berhenti mengikuti penanaman ini</font>";
			c = "no";
		}
		console.log(a);
		myApp.showIndicator();
		myApp.addNotification({message: b,});
		setTimeout(function () {
			$$.post(host + 'keltani/db_keltani.php', {act: 'follow',  id_user : localStorage.iduser, id_perencanaan : idrencana, sub : c}, function(data){

			}); 
			myApp.hideIndicator();
		}, 1200);
	});  //stop #subscribe

	$$(document).on('click','#pgnewsfeed',function(e){ //start #pgnewsfeed
		e.preventDefault();
		e.stopImmediatePropagation();
		var angkax = $$(this).data('angka');
	 	terra_listpenanaman(angkax, "semua" , localStorage.keyword);
	});	//stop #pgnewsfeed

	$$(document).on('click','#refnewsfeed',function(e){ //start #refnewsfeed
		e.stopImmediatePropagation();
		e.preventDefault();
		localStorage.keyword = "";
		myApp.showIndicator();
	 	terra_listpenanaman("1", "semua" , localStorage.keyword);
	    setTimeout(function () {
	        myApp.hideIndicator();
	    }, 1000);
	}); //stop #refnewsfeed

	$$(document).on('click','#detailmarket',function(e){ //start #detailmarket
		e.stopImmediatePropagation(); e.preventDefault();
		var idrencana = $$(this).data('id_rencana');
		localStorage.id_rencana = idrencana;
		mainView.router.loadPage(host + 'keltani/list_penanaman_detail' + ".php?id=" 
			+ localStorage.iduser + "&id_perencanaan=" + idrencana + "&url=" + hfoto);
	}); //start #detailmarket
}); //stop pageinit market

function terra_listpenanaman(xangka, area, keywordx){
	$$.post(host + 'action/rencana_tanam.php', {act: "terracardlistpenanaman" , angka : xangka, id_user : localStorage.iduser, url : hfoto, id_area : area,
	 keyword : keywordx  }, function(data){
		var json = JSON.parse(data);  
		$$("#isimarket").html(json['tabel']);
		$$("#capmarket").html(json['caption']);
		$$("#pagemarket").html(json['paging']);
	}); 
}; 


//------------------------------------- halaman/umum/market_real.php -----------------------------------------------------------
myApp.onPageInit('market_real', function (page) { //start pageinit market_real
	console.log('a');
}); //stop pageinit market_real


//------------------------------------- halaman/umum/market_contractor-detail.php -----------------
myApp.onPageInit('market_contractor-detail', function (page) { //start pageinit market_contractor-detail
	console.log('detail');
	terra_detailcontractorservice();
	
	$$(document).on('click','#mcd_chatpenjual', function(e){ //start #mcd_chatpenjual
		e.preventDefault();
		e.stopImmediatePropagation();
		myApp.closeModal();
		//myApp.alert(localStorage.idprofilekontraktor);
		//var id_receiver = $$(this).data('receiver');
		//var id_rencana = $$(this).data('id_rencana');
		terra_chatbegin(localStorage.idpenjual, localStorage.idprofilekontraktor);
	}); //end #mcd_chatpenjual

	$$(document).on('click','#mcd_belijasa', function(e){ //start #btnchata
		e.preventDefault();
		e.stopImmediatePropagation();
		myApp.closeModal();
		mainView.router.loadPage(hnew + 'umum/market_contractor-order.php?');
	}); //end #btnchata


}); //stop pageinit market_contractor-detail

//------fungsi untuk dapatkan  contractor service
function terra_detailcontractorservice(){
	$$.post(host + 'action/act_market.php', {act: "terra_detailcontractorservice" ,  
		idprofilekontraktor : localStorage.idprofilekontraktor,  url : host }, function(data){
		var result = JSON.parse(data);
		localStorage.detailProduk = data;
		//console.log(result['namaKota']);
		$$("#mcd_nama").html(result['namaProduk']); 
		$$("#mcd_harga").html(result['harga']);
		$$("#mcd_rating").html(result['rating']);
		$$("#mcd_keterangan").html(result['keterangan']);
		$$("#mcd_penjual").html(result['kontakpenjual']);
		$$('#mcd_foto').attr('src',result['foto']);
	}); 
}
//------FUNGSI untuk init chat jika belum pernah ada history percakapan antara kedua user
function terra_chatbegin(idpenerima, idproduk){
	$$.post(host + 'action/act_chat.php', {act: 'terra_checkchat', id: localStorage.iduser, id_kedua: idpenerima, id_produk : idproduk}, function(data){
            var result = JSON.parse(data);
            console.log(result['chatid']);
            localStorage.id_receiver = idpenerima;
            localStorage.id_chat = result['chatid'];
            mainView.router.loadPage(hnew + 'umum/messages.php?');
        });
}

//------------------------------------- halaman/umum/market_contractor-order.php --------------------------------
myApp.onPageInit('market_contractor-order', function (page) { //start pageinit market_contractor-order
	//setting awalan	
	terra_beginorder();
	begin_time_order('#mco_timepicker', '#mco_timepicker-container');
	$('input.qty').keyup(function(event) { //start #input.qty
        // skip for arrow keys-------------
        if(event.which >= 37 && event.which <= 40) return;
        // format number-------------
        $(this).val(function(index, value) {
            return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");    
        });
        //hitung nilai hektar bro        
        var nilai =  $$(this).val();
        var nilai_meter =  nilai.replace(/[^a-z\d\s]+/gi, "");
       	var harga_satuan = localStorage.harga;
        var nilai_hektar = parseFloat(nilai_meter) / 10000;
    	var hitungharga = Math.round(parseFloat(harga_satuan) * nilai_hektar);
        if(isNaN(nilai_hektar)){
        	hitungharga = 0;
        	nilai_hektar = 0; 
        }
        console.log(nilai_meter + ", "+nilai_hektar + 'harga = ' + hitungharga);
        localStorage.harganota = hitungharga;
        //untuk tampilan harga bawah
        $$("#mco_qtykonversi").val(nilai_hektar);
       	var harga_tampilan = getNumberWithCommas(localStorage.harganota);
		$$("#mco_hargabawah").html("Rp " + harga_tampilan);
        //
    }); //stop #input. qty

	$$('#mco_lahan').on('change', function(){ //start #mco_lahan change
        var val = $$(this).val();
        var alamat = val.split("@");
    	$$("#mco_alamatlahan").val(alamat[0]);
    }); //end #mco_lahan change

    $$(document).on('click','#mco_btn-beli', function(e){ //start #mco_btn-beli
		e.stopImmediatePropagation();
		var jumlah = $$("#mco_qty").val();
		jumlah.replace(/[^a-z\d\s]+/gi, "");
		var jumlahfix = parseInt(jumlah);
		console.log(jumlahfix + " , " + localStorage.harganota);
		
		//pengecekan waktu lelang
		var mulai = $$("#mco_timepicker").val();
        var splitmulai = mulai.split(' ');
        var valbulan =  getValBulan(splitmulai[1]);
        var mulaidb = splitmulai[2] + "-" + valbulan + "-" + splitmulai[0] + " " +splitmulai[3] +":00";
        var a = new Date(mulaidb);
        var c = new Date();
        //bagian deskripsi
        var deskripsi = $$("#mco_deskripsi").val().trim(); 
        var desreal= "";/* --- */var desdisplay = "";
        var id_lahan = $$("#mco_lahan").val();
        var id_lahanfix = id_lahan.split("@");
        var b = deskripsi.split("\n");
        for(var i=0; i<b.length ;i++){
        	if(i == 0){
        		desreal = desreal + b[i];
        	}else{
        		desreal = desreal +"<br/>"  + b[i]; 
        	}
                
                desdisplay = desdisplay + b[i] + "\n";

            }
        console.log(b.length);    
        if(deskripsi.trim() == ""){
            desreal = ""; /*-- */ desdisplay = "";
        }
		//end deskripsi
		if(isNaN(jumlahfix) || jumlahfix<1){
			myApp.alert('Luas Lahan Harus Diisi!');
		}
		else if(a <= c){
            myApp.alert("Waktu Mulai harus lebih dari waktu saat ini!");
		}else{
			localStorage.deskripsi = desreal;
			localStorage.waktupesan = mulaidb;
			localStorage.qtypesan = jumlah;
			localStorage.id_lahan = id_lahanfix[1];
			console.log('ok');
			console.log(desreal +";disply:" + desdisplay + localStorage.id_lahan);
			mainView.router.loadPage(hnew + 'umum/market_contractor-order_confirmation.php?');
		}

	}); //end #mco_btn-beli
}); //stop pageinit market_contractor-order

//------FUNGSI untuk tampilan data awal ketika order
function terra_beginorder(){
	var jsonproduk = localStorage.detailProduk;
	var result = JSON.parse(jsonproduk);
	$$("#mco_kategori").html(result['kategori']);
	$$("#mco_nama").html(result['namaProduk']);
	$$('#mco_foto').attr('src',result['foto']);
	$$("#mco_kota").text(result['namaKota']);
	$$("#mco_harga").html(result['harga']);
	localStorage.harga = result['hargaorder'];
	//myApp.alert(result['kategori']);
	//console.log(result['namaKota']);
	$$("#mco_lahan").html("");
	$$.post(host + 'action/act_lahan.php', {act: "terra_listlahan" , id_user : localStorage.iduser  }, function(data){
		console.log(data);
		var json = JSON.parse(data);  
		var penampung = json['isioption'].split("<");
        for (var i = 0; i<penampung.length; i++) {
            var isi = penampung[i].split(";");
            myApp.smartSelectAddOption('#mco_lahan', '<option value="'+ isi[0] +'">'+ isi[1] +'</option>');
            if(i == 0){
            	var alamat = isi[0].split("@");
            	$$("#mco_alamatlahan").val(alamat[0]);
            }
        }
	}); 
}

function getNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function begin_time_order(idpicker='', container=''){
  var today = new Date();
  var pickerInline = myApp.picker({
        input: idpicker,
        container: container,
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

//------------------------------------- halaman/umum/market_contractor-order_confirmation.php -----------------------
myApp.onPageInit('market_contractor-order_confirmation', function (page) { //start pageinit market_contractor-order_confirmation
	begin_terra_order_confirmation();

	$$(document).on('click','#oc_konfirmasi',function(e){ //start #oc_konfirmasi
		e.stopImmediatePropagation();
		e.preventDefault();
		myApp.confirm('Apakah anda yakin semua data orderan sudah terinput dengan benar?', 'Konfirmasi Pesanan', /*start confirm*/
			function () {
	        	terra_create_order_jasa();
			},
			function () {
				//do nothing
			}
		);/* end confirm */

	}); //end #oc_konfirmasi
});// end pageinit market_contractor-order_confirmation

function begin_terra_order_confirmation(){
	console.log('a');
	console.log(localStorage.qtypesan);
	var jsonproduk = localStorage.detailProduk;
	var result = JSON.parse(jsonproduk);
	$$("#mco_catatan").html(localStorage.deskripsi);
	$$("#oc_nama").html(result['namaProduk']);
	$$('#oc_foto').attr('src',result['foto']);
	$$("#oc_kota").text(result['namaKota']);
	$$("#oc_harga").html(result['harga']);
	var nilai_meter =  (localStorage.qtypesan).replace(/[^a-z\d\s]+/gi, "");
	var nilai_hektar = parseFloat(nilai_meter) / 10000;
	var harga_tampilan = getNumberWithCommas(localStorage.harganota);
	$$("#oc_infolahan").html(localStorage.qtypesan + ' m<sup>2</sup> ('+ nilai_hektar +' ha) * Rp 1.200.000/ha');
	$$("#oc_hargabawah").html("Total Biaya : Rp " + harga_tampilan);
}

function terra_create_order_jasa(){
	$$.post(host + 'action/act_market.php', {act: "terra_create_order_jasa" , id_seller : localStorage.idpenjual, 
		id_buyer : localStorage.iduser, id_produk : localStorage.idprofilekontraktor, qty : localStorage.qtypesan,
		waktu_pesan : localStorage.waktupesan, harga_pesan : localStorage.harganota,
		 catatan : localStorage.deskripsi,	 id_lahan : localStorage.id_lahan}, function(data){
		if(data.toLowerCase().includes("sukses")){
			myApp.alert('Pesan Jasa Kontraktor Berhasil! Status pesanan anda saat ini menunggu konfirmasi pemilik alat.');
		}else{
			myApp.alert('Maaf input data gagal, coba beberapa saat lagi atau hubungi admin');
		}
	}); 
}; 


//------------------------------------- halaman/umum/market_contractor-filter.php -----------------------
myApp.onPageInit('market_contractor-filter', function (page) { //start pageinit market_contractor-filter
	console.log('a');
	localStorage.filter_jasa="";
	localStorage.filter_subjasa="";
	localStorage.filter_harga="";
	option_filter();
	$$(document).on('click','.chip.chipfilterjasa',function(e){ //start #chipfilterjasa
		var idchip = $$(this).data('urut');
		var idjasa = $$(this).data('idjasa');
		$$(".chip.chipfilterjasa").removeClass("dav-chipfilter_selected");
		$$("#" + idchip).addClass("dav-chipfilter_selected");
		console.log(idjasa);
		if(idjasa == "8"){
			console.log('a');
			$$("#mc-filter").html("");
			localStorage.filter_jasa=""; /*===*/localStorage.filter_subjasa="";
			myApp.smartSelectAddOption('#mc-filter', '<option value="semua">semua</option>');
		}
		else{
			localStorage.filter_jasa = " and pk.idjasa = " + idjasa +" ";
			option_subjasaonchange(idjasa);
		}
	}); //end #chipfilterjasa

	$$(document).on('click','#mf_action',function(e){ //start #mf_action
		e.stopImmediatePropagation();
		var filterfix = "";
		filterfix = filterfix + localStorage.filter_jasa + localStorage.filter_subjasa + localStorage.filter_harga;
	    localStorage.filter = filterfix;
	    console.log(localStorage.filter);
	    terra_listcontractorservice(1, "", localStorage.keyword);
	    mainView.router.back();

		});/* end mf_action */

	$$('#mc-filter').on('change', function(){ //start #mco_lahan change
        var val = $$(this).val();
        if(val.toLowerCase() == "semua"){
        	localStorage.filter_subjasa = "";
        }else{
        	localStorage.filter_subjasa = " and pk.idsubjasa = " + val + " ";
        }
    }); //end #mco_lahan change
	
}).trigger(); //end pageinit market_contractor-filter
//------------------------------------- halaman/umum/market_contractor-filter.php -----------------------
function option_filter(){
	
	myApp.smartSelectAddOption('#mc-filter', '<option value="semua">semua</option>');
	$$("#preloader-filter").hide();	
	var mySwiper3 = myApp.swiper('.swiper-3', {
		pagination:'.swiper-3 .swiper-pagination',
		spaceBetween: 10,
		slidesPerView: 3
		});
};

function option_subjasaonchange(d_idjasa=''){
		$$("#preloader-filter").show();
		$$("#mc-filter").html("");
		myApp.smartSelectAddOption('#mc-filter', '<option value="semua">semua</option>');
		$$.post(host + 'action/act_market.php', {act: "terra_optionfilter", idjasa :d_idjasa }, function(data){
			console.log(data);
			var json = JSON.parse(data);  
			var penampung = json['isioption'].split("<");
			for (var i = 0; i<penampung.length; i++) {
			var isi = penampung[i].split(";");
			myApp.smartSelectAddOption('#mc-filter', '<option value="'+ isi[0] +'">'+ isi[1] +'</option>');
			}
			//$$("#percobaan").html(json['slider']);
			$$("#preloader-filter").hide();
		}); 
}


