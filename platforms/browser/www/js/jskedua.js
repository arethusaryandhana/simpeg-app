// //------------------------------------- awal.html -----------------------------------------------------------
// myApp.onPageInit('awal', function (page) {//start pageinit awal
//     $$(document).on('click','#login1',function(e){
//         e.stopImmediatePropagation();
//         mainView.router.loadPage('halaman/sign-in.php?');
//     });

//     $$(document).on('click','#login2',function(e){
//         e.preventDefault();
//         e.stopImmediatePropagation();
//     });

//     var sheetdaftar = [
//         {
//             text: 'Pilih Jenis User:',
//             label : true,
//         },
//         {
//             text: '<i class="fa fa-user" aria-hidden="true"></i> Pemilik Alat',
//             color : 'green',
//             onClick: function () {
//               mainView.router.loadPage( hnew + "register.php?level=1");
//               localStorage.ulevel = 1;
//             }
//         },
//         {
//             text: '<i class="fa fa-users" aria-hidden="true"></i> Petani / Kelompok',
//             color : 'blue',
//             onClick: function () {
//               localStorage.ulevel = 2;
//                 mainView.router.loadPage(  hnew + "register.php?level=2");
//             }
//         },
//         {
//             text: 'Cancel',
//             onClick: function () {    
//             }
//         },
//     ];

//     $$('#btndaftar2').on('click', function (e) {
//         myApp.actions(sheetdaftar);
//     });
// });//end pageinit awal


//------------------------------------- halaman/bayar.php -----------------------------------------------------------
myApp.onPageInit('bayar', function (page) {//start pageinit bayar
    var b = localStorage.invoice;
    $$("#myiframe").attr('src', b); 
});//end pageinit bayar


//------------------------------------- halaman/sign-in.php -----------------------------------------------------------
myApp.onPageInit('sign-inasd', function (page) { //start pageinit sign-in
    $$(document).on('click','#btnApi1',function(e){ //start #btnApi1 untuk test payment api dulu hehehe
        e.preventDefault();
        e.stopImmediatePropagation();
        $$.post('https://terra-id.com/dbernardi/ptrutan/xen/create_invoice.php', {nominal: '15000', deskripsi: 'coba bayar xendit', email: 'davidbernadi13@gmail.com', ex_id: 'myid_1'}, function(data){
            var hsl = JSON.parse(data);  
            myApp.alert(hsl['invoice_url']);
            localStorage.invoice = hsl['invoice_url'];
        });
    }); //end #btnApi1

    $$(document).on('click','#btnapi2',function(e){ //start #btnapi2
        e.preventDefault();
        e.stopImmediatePropagation();
        mainView.router.loadPage(hnew + 'bayar.php?');
    }); //end #btnapi2

    $$(document).on('click','#btnlogin',function(e){ //start #btnlogin
        e.stopImmediatePropagation();
        var user = $$('#user').val();
        var pass = $$('#pwd').val();
        $$.post(host + 'action/act_login.php', {act: 'login', username: user, pwd: pass}, function(data){
            if(data == 0){
                myApp.alert('Username / Password Salah');
            }else{
                var hsil = JSON.parse(data);  
                //myApp.alert(hsil[0]['nama']);
                // window.plugins.OneSignal.getIds(function (ids) {
                //     localStorage.setItem('player_id', ids.userId);
                //     gcmi = ids.userId;
                //     $$.post(host + 'login.php', {act: 'regisnotif', id_user: user , gcm : ids.userId}, function(data){
                //       localStorage.gcmid = ids.userId;
                //     });
                // });   
                localStorage.unama = hsil[0]['nama'];
                localStorage.ulevel = hsil[0]['sebagai'];
                localStorage.iduser = hsil[0]['id_user'];
                localStorage.foto_profile =  hsil[0]['foto_profile'];
                console.log(localStorage.iduser);
                localStorage.upass = pass;
                localStorage.paging =  hnew + 'home1' +  ".php?id=" + hsil[0]['id_user'] + "&level=" + localStorage.ulevel;
                mainView.router.loadPage(hnew +'home/home1'  + ".php?id=" + hsil[0]['username'] + "&level=" + localStorage.ulevel);
                myApp.alert("Login Berhasil!" , 'Notification');
            }
            
      
               
           
        }); // end post
    }); //end #btnlogin

    var sheetdaftar = [
        {
            text: 'Pilih Jenis User:',
            label : true,
        },
        {
            text: '<i class="fa fa-user" aria-hidden="true"></i> Petani',
            color : 'green',
            onClick: function () {
              mainView.router.loadPage( hnew + "register.php?level=1");
              localStorage.ulevel = 1;
            }
        },
        {
            text: '<i class="fa fa-users" aria-hidden="true"></i> Kelompok Tani',
            color : 'blue',
            onClick: function () {
              localStorage.ulevel = 2;
                mainView.router.loadPage(  hnew + "register.php?level=2");
            }
        },
        {
            text: '<i class="fa fa-shopping-basket" aria-hidden="true"></i> Pemilik Alat / Pedagang',
            color: 'red',
            onClick: function () {
            localStorage.ulevel = 3;
            mainView.router.loadPage( hnew + "register.php?level=3");
            }
        },
        {
            text: 'Cancel',
            onClick: function () {    
            }
        },
    ];

    $$('#btndaftar').on('click', function (e) { //start #btndaftar
        myApp.actions(sheetdaftar);
    }); //end #btndaftar
}); //end pageinit sign-in


//------------------------------------- halaman list_penanaman_detail  -----------------------------------------------------------
myApp.onPageInit('list_penanaman_detail', function (page) { //start pageinit list_penanaman_detail
    $$(document).on('click','#skidip',function(e){ //start #skidip
        var onSuccess = function(position) {
            var lat = position.coords.latitude.toFixed(6);
            var long = position.coords.longitude.toFixed(6);
            myApp.alert(lat + "asd long : " + long);    
        };
      
        function onError(error) {
            myApp.alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true});
    }); //end #skidip

    var ptrContentlpd = $$('.pull-to-refresh-content');
    ptrContentlpd.on('ptr:refresh', function (e) {
        setTimeout(function () {
            tabelhistorytanam("1", localStorage.id_rencana);
            myApp.pullToRefreshDone();
        }, 2000);
    });

    $$(document).on('click','#btnchata', function(e){ //start #btnchata
        e.preventDefault();
        e.stopImmediatePropagation();
        var id_receiver = $$(this).data('receiver');
        var id_rencana = $$(this).data('id_rencana');
        $$.post(host + 'fungsiumum/cek.php', {act: 'cekchat', id: localStorage.iduser, id_kedua: id_receiver, id_produk : id_rencana}, function(data){
            localStorage.id_chat = data;
            mainView.router.loadPage(hnew + 'umum/messages.php');
        });
    }); //end #btnchata

    $$(document).on('click','#btnbooking', function(e){ //start #btnbooking
        e.preventDefault();
        e.stopImmediatePropagation();
        var idt = $$(this).data('idtawar');
        localStorage.id_penawaran = idt;
        var nama = $$(this).data('nama');
        var satuan = $$(this).data('satuan'); 
        var harga = $$(this).data('harga'); 
        myApp.confirm('Apakah anda yakin memesan panen ini?', nama,
            function () {
                localStorage.editpesanan ="no";
                mainView.router.loadPage(host + 'keltani/pesan_penanaman' + ".php?nama=" + nama + "&harga=" + harga +  "&satuan=" + satuan);
            },
            function () {

            }
        );
    }); //end #btnbooking

    tabelhistorytanam("1", localStorage.id_rencana);
    $$(document).on('click','#c_popover',function(e){ //start #c_popover
        e.stopImmediatePropagation();
        e.preventDefault();
        var foto = $$(this).data('foto');
        var fotreplace = hfotoupdate + foto;
        $$("#popfotohistory").attr("src", fotreplace);
    }); //end #c_popover

}); //end pageinit list_penanaman_detail

function tabelhistorytanam(xangka ,idx){
    $$.post(host + 'fungsiumum/isi_tabel.php', {act: "tabelhiskeltani", angka: xangka, id: idx, url: hfotoupdate}, function(data){
        var hasil_json = JSON.parse(data);  
        $$("#tabel-lpd_history").html(hasil_json['tabel']);
        $$("#cap-lpd_history").html(hasil_json['caption']);
    }); 
};


//------------------------------------- halaman/keltani/pesananku.php  -----------------------------------------------------------
myApp.onPageInit('pesananku', function (page) { //start pageinit pesananku
    var ptrContenta = $$('.pull-to-refresh-content');
    ptrContenta.on('ptr:refresh', function (e) {
        setTimeout(function () {
            listpesanan('1');
            myApp.pullToRefreshDone();
        }, 2000);
    });

    $$(document).on('click','#back_pesananku',function(e){ //start #back_pesananku
        e.stopImmediatePropagation();
        e.preventDefault();
        mainView.router.loadPage(hnew +'home/home1' + ".php?id=" + localStorage.iduser + "&level=" + localStorage.ulevel);
    }); //end #back_pesananku

    listpesanan('1');
    $$(document).on('click','#pesanan_popover',function(e){ //start #pesanan_popover
        e.stopImmediatePropagation();
        e.preventDefault();
        var foto = $$(this).data('foto');
        $$("#popfotolistpesanan").attr("src", foto);
    }); //end #pesanan_popover

    $$(document).on('click','#bayarinvo',function(e){ //start #bayarinvo
        e.stopImmediatePropagation();
        e.preventDefault();
        var invoice = $$(this).data('invoice');
        myApp.alert(invoice);
        localStorage.invoice = invoice;
        mainView.router.loadPage( hnew + 'bayar.php?');   
    }); //end #bayarinvo

    $$(document).on('click','#actpemesanan_det',function(e){ //start #actpemesanan_det
        e.stopImmediatePropagation();
        e.preventDefault();
        var idpenawaran = $$(this).data('idpenawaran');
        var idpemesanan = $$(this).data('id_pemesanan');
        if(idpenawaran == null || idpenawaran == ""){
            myApp.alert(idpemesanan);
        }else{
            mainView.router.loadPage(host + 'keltani/list_penanaman_detail' + ".php?id=" + localStorage.iduser + "&id_penawaran=" + idpenawaran + "&url=" + hfoto);
        }
    }); //end #actpemesanan_det

    $$(document).on('click','#actpemesanan',function(e){ //start #actpemesanan
        e.stopImmediatePropagation();
        e.preventDefault();
        var nama = $$(this).data('nama');
        var idpemesanan = $$(this).data('id_pemesanan');
        var id_rencana = $$(this).data('id_rencana');
        var qty = $$(this).data('qty');
        var idpenawaran = $$(this).data('idpenawaran');
        var sheetpesanan = [
            {
                text: 'Pemesanan : ' + nama,
                label : true,
            },
            {
                text: '<i class="fa fa-check" aria-hidden="true"></i> Konfirmasi Booking Selesai',
                color : 'green',
                  onClick: function () {
                      myApp.confirm('Apakah anda mengkonfirmasi transaksi ini sudah selesai?', nama, /*start confirm*/
                          function () {
                              $$.post(host + 'keltani/db_keltani.php', {act: 'konfirmasibook', id_penawaran: idpenawaran, id: localStorage.iduser, id_perencanaan : id_rencana, qty_pembelian : qty, id_pemesanan: idpemesanan }, function(data){
                                  if(data == "yeah"){
                                  myApp.alert('Konfirmasi booking panen ' + nama  + ' berhasil!');

                                  mainView.router.refreshPage();
                                  }else{
                                  myApp.alert(data);
                                  }
                              });              
                          },
                          function () {

                          }
                      );/* end confirm */
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
    }); //end #actpemesanan

    $$(document).on('click','#actpemesanandua',function(e){ //start #actpemesanandua
        e.stopImmediatePropagation();
        e.preventDefault();
        var nama = $$(this).data('nama');
        var idpemesanan = $$(this).data('id_pemesanan');
        var id_rencana = $$(this).data('id_rencana');
        var qty = $$(this).data('qty');
        var idpenawaran = $$(this).data('idpenawaran'); 
        var idpenjualan = $$(this).data('id_penjualan'); 
        var harga = $$(this).data('harga'); 
        var satuan = $$(this).data('satuan'); 
        localStorage.id_penawaran = idpenawaran;
        var sheetpesanan = [
            {
                text: 'Pemesanan : ' + nama,
                label : true,
            },
            {
                text: '<font class="fontku"><i class="fa fa-money" aria-hidden="true"></i> Buat Penawaran Baru </font>',
                color : 'blue',
                onClick: function (){
                    if(idpenawaran == null || idpenawaran == ""){
                        localStorage.id_penjualan = idpenjualan;
                        localStorage.id_pemesananh = idpemesanan;
                        localStorage.tipe = "yes";
                        mainView.router.loadPage(host + 'petani/addtanam_pesanan' + ".php?idjual=" + idpenjualan + "&id_user=" + localStorage.iduser);
                    }else{
                        localStorage.editpesanan = "yes"; localStorage.id_pemesananh = idpemesanan;
                        mainView.router.loadPage(host + 'keltani/pesan_penanaman' + ".php?nama=" + nama + "&harga=" + harga +  "&satuan=" + satuan);
                    } 
                }
            },
            {
                text: '<font class="fontku"><i class="fa fa-ban" aria-hidden="true"></i> Tolak Pesanan</font>',
                color : 'red',
                onClick: function (){
                  myApp.confirm('Anda yakin membatalkan Pesanan ini?', '<font style="font-size:12px;">Pesanan : ' +nama  + "</font>", 
                      function () {
                          if(idpenawaran == null || idpenawaran == ""){
                              $$.post(host + 'dbpetani.php', {act: 'pesananrencana', id_pemesanan: idpemesanan, status: '99' }, function(data){
                                  if(data == "yeah"){
                                      myApp.alert('Batalkan pesanan berhasil!');
                                      listpesanan('1');
                                  }else{
                                      myApp.alert(data);
                                  }
                              }); 
                          }else{
                            $$.post(host + 'dbpetani.php', {act: 'pesanan', id_pemesanan: idpemesanan, status: '99'}, function(data){
                                if(data == "yeah"){
                                    myApp.alert('Batalkan pesanan berhasil!');
                                    listpesanan('1');
                                }else{
                                    myApp.alert(data);
                                }
                            });     
                          }
                      },
                      function () {

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
    });  //end #actpemesanandua

}); //end pageinit pesananku


function listpesanan(angkax){
    $$.post(host + 'keltani/db_keltani.php', {act: 'tampilpesanan', id: localStorage.iduser, angka: angkax, url: hfoto}, function(data){
        var hasil_json = JSON.parse(data);  
        $$("#isipesanan").html(hasil_json['tabel']);
    }); 
}

function tabelhispenjualan(xangka ,idx){
    $$.post(host + 'fungsiumum/isi_tabel.php', {act: "tabelhispenjualan", angka: xangka, id: idx, url: hfoto }, function(data){
        var hasil_json = JSON.parse(data);  
        $$("#tabel-urpenjualan").html(hasil_json['tabel']);
        $$("#cap-urpenjualan").html(hasil_json['caption']);
    }); 
};


//------------------------------------- halaman/keltani/pesananku.php  -----------------------------------------------------------
myApp.onPageInit('penjualanku', function (page) { //start pageinit penjualanku
    var ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('ptr:refresh', function (e) {
        setTimeout(function () {
            tabelhispenjualan('1', localStorage.iduser)
            listpenjualan('1');
            myApp.pullToRefreshDone();
        }, 2000);
    });

    $$(document).on('click','#back_penjualanku',function(e){ //start #back_penjualanku
        e.stopImmediatePropagation();
        e.preventDefault();
        mainView.router.loadPage(hnew + 'home/home1' + ".php?id=" + localStorage.iduser + "&level=" + localStorage.ulevel);
    }); //end #back_penjualanku

    tabelhispenjualan('1', localStorage.iduser);
    listpenjualan('1');

    $$(document).on('click','#penjualan_popover',function(e){ //start #penjualan_popover
        e.stopImmediatePropagation();
        e.preventDefault();
        var foto = $$(this).data('foto');
        $$("#popfotolistpenjualan").attr("src", foto);
    }); //end #penjualan_popover

    $$(document).on('click','#penjualanb_popover',function(e){ //start #penjualanb_popover
        e.stopImmediatePropagation();
        e.preventDefault();
        var foto = $$(this).data('foto');
        $$("#popfotolistpenjualanb").attr("src", foto);
    }); //end #penjualanb_popover

    $$(document).on('click','#actpenjualan',function(e){ //start #actpenjualan
        e.stopImmediatePropagation();
        e.preventDefault();
        var idtawar = $$(this).data('id');
        var nama = $$(this).data('nama');
        myApp.confirm('Anda yakin konfirmasi hasil panen telah dikirim?', nama,  //start confirm
            function () {
                $$.post(host + 'dbpetani.php', {act: 'kirimpanen', id_pemesanan : idtawar }, function(data){
                    if(data == "yeah"){
                        myApp.alert('Konfirmasi pengiriman berhasil, sekarang anda tinggal menunggu pihak pemesan untuk konfirmasi penerimaan hasil panen.');
                        tabelhispenjualan('1', localStorage.iduser);
                        listpenjualan('1');
                    }else{
                        myApp.alert(data);
                    }
                });   
            },
            function () {

            }
        ); //end confirm
    }); //end #actpenjualan

    $$(document).on('click','#act_penjualan',function(e){ //start #a
        e.stopImmediatePropagation();
        e.preventDefault();
        var nama = $$(this).data('nama');
        var id_rencana = $$(this).data('id_rencana');
        var qty = $$(this).data('qty');
        var idpenawaran = $$(this).data('idpenawaran');
        var sheetpesanan = [
            {
                text: 'Penawaran : ' + nama,
                label : true,
            },
            {
                text: '<font class="fontku"><i class="fa fa-refresh" aria-hidden="true"></i> Update Data </font>',
                color : 'blue',
                onClick: function (){
                    myApp.alert(idpenawaran);
                }
            },
            {
                text: '<font class="fontku"><i class="fa fa-file-text" aria-hidden="true"></i> Lihat Detail</font>',
                color : 'green',
                onClick: function (){
                    myApp.alert(idpenawaran);
                }
            },
            {
                text: '<font class="fontku"><i class="fa fa-trash" aria-hidden="true"></i> Hapus dari penawaran </font>',
                color : 'red',
                onClick: function (){
                    myApp.confirm('Apakah anda yakin ingin menghapus hasil panen ini dari list penawaran?', nama, //start confirm
                        function () {
                            $$.post(host + 'dbpetani.php', {act: 'hapuspenawaran', id_penawaran : idpenawaran }, function(data){
                                if(data == "yeah"){
                                    myApp.alert('Hapus hasil panen dari ' + nama  + ' berhasil!');
                                    mainView.router.refreshPage();
                                }else{
                                    myApp.alert(data);
                                }
                            });   
                        },
                        function () {}
                    ); //end confirm
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
    }); //end #act_penjualan

    $$(document).on('click','#actpenjualandua',function(e){ //start #actpenjualandua
        e.stopImmediatePropagation();
        e.preventDefault();
        var nama = $$(this).data('nama');
        var idpemesanan = $$(this).data('id');
        var qty = $$(this).data('qty');
        var harga = $$(this).data('harga');
        var xsatuan = $$(this).data('satuan');
        var hargax = $$(this).data('hargax'); 
        var ttl = hargax * qty;
        var sheetpesanan = [
            {
                text:  '<font class="fontku">Pesanan : ' +nama + " (Rp. " + harga + "/" + xsatuan + ")</font>" ,
                label : true,
            },
            {
                text: '<font class="fontku"><i class="fa fa-check-circle" aria-hidden="true"></i> Setujui Harga </font>',
                color : 'blue',
                onClick: function (){
                    myApp.confirm('Anda yakin konfirmasi menerima pesanan ini?', '<font style="font-size:12px;">Pesanan : ' +nama + " (Rp. " + harga + "/" + xsatuan + ")</font>", 
                        function () {
                              $$.post(host + 'dbpetani.php', {act: 'pesanan', id_pemesanan : idpemesanan, status : '0', total : ttl, user : 'petani', nama_notif : localStorage.unama }, function(data){
                                  var hsl = JSON.parse(data); 
                                  if(hsl['status'] == "yeah"){    
                                      myApp.alert('Konfirmasi penerimaan pesanan berhasil, anda dapat konfirmasi pengiriman hasil panen jika penanaman telah selesai.');
                                      tabelhispenjualan('1', localStorage.iduser);
                                      listpenjualan('1');  
                                  }else{
                                      myApp.alert(hsl['status']);
                                  }
                              });   
                        },
                        function () {
                        }
                    );
                }
            },
            {
                text: '<font class="fontku"><i class="fa fa-ban" aria-hidden="true"></i> Tolak Pesanan</font>',
                color : 'red',
                onClick: function (){
                    myApp.confirm('Anda yakin menolak menerima pesanan ini?', '<font style="font-size:12px;">Pesanan : ' +nama + " (Rp. " + harga + "/" + xsatuan + ")</font>", 
                        function () {
                            $$.post(host + 'dbpetani.php', {act: 'pesanan', id_pemesanan: idpemesanan, status: '7' }, function(data){
                                if(data == "yeah"){
                                    myApp.alert('Tolak Pesanan Berhasil, sekarang anda tinggal menunggu apakah pemesan akan menawarkan harga baru atau membatalkan pesanannya');
                                    tabelhispenjualan('1', localStorage.iduser)
                                    listpenjualan('1');
                                }else{
                                    myApp.alert(data);
                                }
                            });   
                        },
                        function () {

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
    });  //end #actpenjualandua
}); //end pageinit penjualanku

function listpenjualan(angkax){
    $$.post(host + 'dbpetani.php', {act: 'tampilpenjualan',  id: localStorage.iduser, angka : angkax, url : hfoto}, function(data){
        var hasil_json = JSON.parse(data);  
        $$("#isipenjualan").html(hasil_json['tabel']);  
    }); 
};


//------------------------------------- halaman/keltani/pesananku.php  -----------------------------------------------------------
myApp.onPageInit('pesan_penanaman', function (page) { //start pageinit pesan_penanaman
    $('input.compp').keyup(function(event) { //start input.compp keyup
        if(event.which >= 37 && event.which <= 40) return;
        $(this).val(function(index, value) {
            return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
    }); //end input.compp keyup

    $$(document).on('click','#btn_kt_pesan',function(e){ //start #btn_kt_pesan
        e.stopImmediatePropagation();
        e.preventDefault();
        var pp_qty = $$('#pp_qty').val();
        var nama = $$('#pp_nama').val();
        var pp_harga = $$('#pp_harga').val();
        var cekharga = $$('#pp_harga').val();

        pp_harga = pp_harga.replace( /,/g, "" );

       if(cekharga == "" || pp_qty == "" || pp_qty == "0"){
            myApp.alert('Mohon isi form dengan lengkap!' + localStorage.editpesanan) ;
       }else{
            $$.post(host + 'keltani/db_keltani.php', {act: 'bookingtawarfix', id_penawaran: localStorage.id_penawaran, id: localStorage.iduser, id_rencana: localStorage.id_rencana, qty: pp_qty, harga_deal: pp_harga, tipe: localStorage.editpesanan, idhapus: localStorage.id_pemesananh, user : localStorage.iduser }, function(data){
                if(data == "yeah"){
                    myApp.alert('Booking hasil panen ' + nama  + ' berhasil!');
                    mainView.router.back({
                        url:host + 'keltani/list_penanaman_detail' + ".php?id=" + localStorage.iduser + "&id_penawaran=" + localStorage.id_penawaran + "&url=" + hfoto,
                        force: true,
                        ignoreCache: true
                    });
                }else{
                    myApp.alert(data);
                }
            });
       }
     }); //end #btn_kt_pesan
}); //end pageinit pesan_penanaman

function tabelisichat(xangka ,idx){
       console.log(localStorage.where);
        $$.post(host + 'action/act_chat.php', {act: "terra_chatrealtime" , angka : xangka, id : idx, id_user : localStorage.iduser, where : localStorage.where, url : hfoto }, function(data){
            var hasil_json = JSON.parse(data);  
            var b = localStorage.isichat;
            var a = hasil_json['tabel'];
            localStorage.listid =  hasil_json['listid'];
            localStorage.total =  hasil_json['total'];
            var where ="";
            var isi = hasil_json['listid'].split(";");   
            for(var i = 0; i < localStorage.total ; i++){
                if(i == 0){
                    where = where + "and id != " + isi[i];
                }else if(i != 0){
                    where = where + " and id !=" + isi[i];
                }               
            }
            localStorage.where = where;
            if(b != a){
                $$("#isichat").append(hasil_json['tabelb']);
                localStorage.isichat = a;
                var myMessages = myApp.messages('.messages');
                var myMessagebar = myApp.messagebar('.messagebar');   
            }
    }); 
};

function tabelisichatfirst(xangka ,idx){
    $$.post(host + 'action/act_chat.php', {act: "terra_firstchatdisplay" , angka : xangka, id : idx, id_user : localStorage.iduser,
     url : hfoto }, function(data){
        //console.log(data);
        var hasil_json = JSON.parse(data); 
        if(hasil_json['check'] == "ada"){
            $$("#isichat").html(hasil_json['tabel']);
            localStorage.isichat = hasil_json['tabel'];
            localStorage.listid =  hasil_json['listid'];
            localStorage.total =  hasil_json['total'];
            var where ="";
            var isi = hasil_json['listid'].split(";");   
                for (var i = 0; i < localStorage.total ; i++) {
                    if(i == 0){
                        where = where + "and id != " + isi[i];
                    }else if(i != 0){
                        where = where + " and id !=" + isi[i];
                    }
                }
            localStorage.where = where;
        } 
        

    }); 
};

function sendchat(idx,isi, waktu ){
    var idrec = localStorage.id_receiver;
    var statuschat = "biasa";
        $$.post(host + 'fungsiumum/chat.php', {act: "send", id_chat : localStorage.id_chat , id_sender : idx, nama_sender : localStorage.unama,
         id_receiver : idrec,  pesan : isi, waktu_kirim : waktu, status_chat : statuschat }, function(data){
            console.log(statuschat);
            if(data =="yes"){
               tabelisichat(1,localStorage.id_chat);
               console.log('berhasil');
            }else{
                tabelisichat(1,localStorage.id_chat);
            }
        }); 

    // var variable2 = isi.substring(0, 4);
    // var var3 = isi.substring(0, 3);
    // var coba = isi.split(" ");
    // $$.post(host + 'fungsiumum/chat.php', {act: "checkbot" , id_chat : localStorage.id_chat }, function(data){
    //   //myApp.alert(coba[1]);
    //     if(isi === "BATAL"){
    //         statuschat = 'batal';
    //     }else if(data == 'pasif' && variable2.toLowerCase() == 'deal' && !isNaN(coba[1])){
    //         statuschat = 'tahap1';
    //     }else if(data == 'aktif' && isi.match(/^\d+$/)){
    //         statuschat = 'tahap2';
    //     }else if(data == 'pasif' && variable2 != 'deal' || data == 'pasif' && variable2.toLowerCase() == 'deal' && isNaN(coba[1])  ){
    //         statuschat = 'biasa';
    //     }else if(data == 'aktif' && !(isi.match(/^\d+$/)) && var3.toLowerCase() != 'qty'){
    //         statuschat = 'biasa2';
    //     }else if(data == 'deal' && isi.toLowerCase() == 'yes'){
    //         statuschat = 'acc';
    //     }else if(data != 'deal' &&  data == 'aktif' && var3.toLowerCase() == 'qty' && !isNaN(coba[1])  ){
    //         statuschat = 'qty';
    //     }else{
    //         statuschat = 'biasa';
    //     }
    //     $$.post(host + 'fungsiumum/chat.php', {act: "send", id_chat : localStorage.id_chat , id_sender : idx, nama_sender : localStorage.unama,
    //      id_receiver : idrec,  pesan : isi, waktu_kirim : waktu, status_chat : statuschat }, function(data){
    //         console.log(statuschat);
    //         if(data =="yes"){
    //             tabelisichat(1,localStorage.id_chat);
    //         }else{
    //             tabelisichat(1,localStorage.id_chat);
    //         }
    //     }); 
    // }); 
};


//------------------------------------- halaman messages  -----------------------------------------------------------
myApp.onPageInit('messages', function (page) { //start pageinit messages
    localStorage.bot = 0;
    tabelisichatfirst(1,localStorage.id_chat);

   var tid = setInterval(mycode, 3000);

    function mycode() {
        tabelisichat(1,localStorage.id_chat);
    }

    function abortTimer() { 
        clearInterval(tid);
    }

    $$(document).on('click','#trymes',function(e){ //start #trymes
        //menghentikan onlinechat
        e.stopImmediatePropagation();
        e.preventDefault(); 
        clearInterval(tid);
        mainView.router.back();
        isihomechat(localStorage.iduser);
    }); //stop #trymes

    var answerTimeout, isFocused; // Initialize Messages
    var myMessages = myApp.messages('.messages'); // Initialize Messagebar
    var myMessagebar = myApp.messagebar('.messagebar');    

    $$('.messagebar a.send-message').on('touchstart mousedown', function () {
        isFocused = document.activeElement && document.activeElement === myMessagebar.textarea[0];
    });

    $$('.messagebar a.send-message').on('click', function (e) {
        // Keep focused messagebar's textarea if it was in focus before
        var messageText = myMessagebar.value();     
        if (isFocused) {
            myMessagebar.textarea[0].focus();
            e.preventDefault();
        }
        var messageText = myMessagebar.value();
        if (messageText.length === 0) {
            return;
        }
        var d = new Date();
        var th = d.getFullYear();/* --- */var mt =d.getMonth()+1;/* --- */var day = d.getDate();
        var hour = d.getHours();/* --- */var min = d.getMinutes();/* --- */var sec = d.getSeconds(); 

        if(parseInt(hour) < 10){ hour = '0' + hour;} 
        if(parseInt(min) < 10){ min = '0' + min;}
        if(parseInt(sec) < 10){ sec = '0' + sec;}
        if(parseInt(mt) < 10){ mt = '0' + mt;}
        if(parseInt(day) < 10){ day = '0' + day;}
        var waktuku =  th + "-"  +   mt + "-" + day + " " + hour + ":" + min + ":" + sec;

        sendchat(localStorage.iduser, messageText, waktuku);
        myMessagebar.clear();
    });
}); //stop pageinit messages 


//------------------------------------- halaman/umum/messages_home.php  -----------------------------------------------------------
myApp.onPageInit('messages_home', function (page) {
    isihomechat(localStorage.iduser);
    $$(document).on('click','#lihatchat',function(e){ //start #lihatchat
        e.stopImmediatePropagation();
        e.preventDefault();
        var idchat = $$(this).data('idchat'); 
        var idreceiver = $$(this).data('idreceiver'); 
        localStorage.id_chat = idchat;
        localStorage.id_receiver = idreceiver;

        mainView.router.loadPage(hnew + 'umum/messages.php?');
    }); //stop #lihatchat

    $$(document).on('click','#deletechat',function(e){ //start #deletechat
        e.stopImmediatePropagation();
        e.preventDefault();
        var idchat = $$(this).data('idchat'); 
        myApp.confirm('Anda yakin ingin menghapus pesan ini? (Pesan yang sudah dihapus tidak bisa dikembalikan!)',  //start confirm
            function () {
                $$.post(host + 'fungsiumum/chat.php', {act: 'hapuschat', id : idchat}, function(data){
                    if(data == "yeah"){
                        myApp.alert('Chat berhasil terhapus.');
                        isihomechat(localStorage.iduser);
                    }else{
                        myApp.alert(data);
                    }
                });   
            },
            function () {

            }
        ); //stop confirm
    }); //stop#deletechat
});

function isihomechat(idx){
    $$.post(host + 'action/act_chat.php', {act: "terra_firstchatmenu" ,  id_user : idx, foto : hfoto, angka : "1" }, function(data){
        
        var hasil_json = JSON.parse(data);  
        console.log(hasil_json['check']);
        $$("#isihomem").html(hasil_json['tabel']);
    }); 
};