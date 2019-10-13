var myApp = new Framework7({
    modalTitle: "Notification",
    material: true,
    pushState : true,
    cache : false,
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },
});

var $$ = Dom7;
var hnew = "halaman/";
// ---------------- block host penanaman, dll ---------------- 
// var h = 'http://localhost:8080/pemda_kutim/simpeg_android/simpeg-app/simpeg_bkpp/'; //master

//h = 'http://localhost/bahandavid/simpeg-app/simpeg_kutim/'

//var h = 'http://localhost:8080/pemda_kutim/simpeg_android/simpeg-app/simpeg_kutim/'; //master pc hamdi jgn dihapus di comment
// var h = 'http://localhost:280/simpeg-app/simpeg_kutim/'; //master pc thusa jgn dihapus di comment
// var h = 'http://localhost/simpeg-app/simpeg_kutim/'; //master pc thusa jgn dihapus di comment
//var h = "http://172.18.34.166/";
var h = 'http://simaku.bkpp.kutaitimurkab.go.id/';

var host = h + "android_webservice/"; //apk code david
var ws = h + "webservice/"; // memanfaatkan ws yang ada
var hfoto = h + "foto/";

var mainView = myApp.addView('.view-main', {});
if(sesi('username')){
    mainView.router.load({url: 'view/home.html', reload: true, ignoreCache: true});
}
else{
    mainView.router.load({url: 'view/index.html', reload: true, ignoreCache: true});
}

var mySwiper = myApp.swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    pagination:'.swiper-pagination'
});
//localStorage.clear();
var gcmi = "";

//------------------------------------- halaman index -----------------------------------------------------------
myApp.onPageInit('index', function (page) { //start pageinit index
    // console.log('arethusa');
    // console.log(sesi('folder'));
    navbar_folder();
    link_biodata();
    // document.addEventListener('deviceready', function () { //start onesignal
    //     var notificationOpenedCallback = function(jsonData) {
            // console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    //     };
    //     window.plugins.OneSignal
    //     .startInit("44f2c7ae-20be-4969-8534-a7d3760396ec")
    //     .handleNotificationOpened(notificationOpenedCallback)
    //     .endInit();
    // }, false); //end onesignal
    //end tambahan dari awal.
     $$(document).on('click','#btnlogout',function(e){ //start #btnlogout
        e.stopImmediatePropagation();
        myApp.confirm('Yakin ingin keluar?', 'Logout', //start confirm
            function () {
                // $$.post(host + 'login.php', {act: 'logout', user_id: localStorage.iduser , gcm_id : 'status'}, function(data){
                //     if(data == "yeah"){
                //         myApp.closePanel();
                //         myApp.alert('Logout berhasil!' , 'Notification');
                //         l
                //         // mainView.router.loadPage('awal.html');
                //     }else{
                //         myApp.alert(data);
                //     }
                // });     
                localStorage.clear();
                // $$('.sidemenu').hide(500);
                mainView.router.loadPage('index.html');      
            },function () {
                myApp.alert('Logout Canceled' , 'Notification');
            }
        );  //end confirm 
    });  //end #btnlogout 
    //pindah halaman
    var link = "";
    link = link + sesi('page_menu');
    if(link != "undefined") {
        mainView.router.reloadPage(link);
        mainView.router.refreshPage();
      
    }else{
        // mainView.router.loadPage("index.html");
        // mainView.router.loadPage("awal.html");
    }

     
}).trigger(); //end pageinit index
//------------------------------------- halaman login -----------------------------------------------------------
myApp.onPageInit('sign-in', function (page) { //start pageinit sign-in'
    // console.log("page init sign-in");
    navbar_folder();
    $$(document).on('click','#login',function(e){ //start click #login'
        e.stopImmediatePropagation(); 
        // console.log('a');
        var signin_user = $$("#signin_user").val();
        var signin_pwd = $$("#signin_pass").val();

        // window.plugins.OneSignal.getIds(function (ids) {
        //     localStorage.setItem('player_id', ids.userId);
        //     gcmi = ids.userId;
        //     localStorage.gcmid = ids.userId;
        //     $$.post(hostWebservice+'action/Login.php',{usernameGCM:$('#usernameLogin').val(), gcm : ids.userId}, function (result) {
        //     });
        // });
        // var url = host + "action/act_login.php" + signin_pwd + signin_user;
        // console.log(url);
        $$.post(h+'interface/login.php',{act : "login", u : signin_user, p : signin_pwd }, function (response) {
            // console.log(response);
            var arr=JSON.parse(response);
            // alert(arr.sukses);
            if(arr.sukses=='0')
            { 
                dialog('Login gagal, username / password salah!');
            }
            else
            { 
                setSesi('username',arr.username);
                setSesi('level',arr.level);
                setSesi('no_nip',arr.no_nip);
                setSesi('unit_id',arr.unit_id);
                setSesi('token',arr.token);
                setSesi('folder',arr.folder);
                dialog('Login sukses');
                load_page("view/home.html");
            }    
        });
    }); //end click #login'

}); //end pageinit login'

//------------------------------------- halaman home -----------------------------------------------------------
myApp.onPageInit('home', function (page) { //start pageinit home'
    // console.log("page init home");
    navbar_folder();
    nama_menu();

    if(sesi('folder') == 'admin' || sesi('folder') == 'opd'){
        $$('#home_pegawai').hide();
        $$('#home_super').show();
        $$(document).on('deviceready', function () {
            $$.post(host+'action/act_chart.php',{act : "chart"}, function (response) { 

                var arr=JSON.parse(response);
                // console.log(arr);
                
                var chart = anychart.column();

                var series = chart.column(arr);
                series.name("Jumlah Pegawai");
                
                chart.title("Jumlah Pegawai Per Dinas");
                chart.yAxis().title("Total Pegawai");
                chart.xAxis().title(" ");

                chart.xAxis().labels().rotation(-90);

                chart.container("container");
                chart.draw();
                
            });
        });
    }
    else{
        $$('#home_pegawai').show();
        $$('#home_super').hide();
        $$('#link-profile').hide();
        $$('.bio_pegawaiku').on('click',function(){
            load_page("view/menu_pegawai/detail_pns.html");
            setSesi('nip_pns', sesi('username'));
        })
        
    }

    setSesi('page','view/home.html');

});//end pageinit home'1

// myApp.onPageInit('cetak', function (page) {
    
//     $$("#print").on('click', function(){
//         $$(document).on('deviceready', function() {
//             $$.post(host+'action/act_print.php'
//                 ,{ domain : 'android'
//                     , duk_token : sesi('token')
//                     , level : sesi('level')
//                     , duk_unit_id : sesi('username')
//                     , fUnitkerja : ''
//                     , fUnitkerjaSub : ''
//                     , fNIP :''
//                     , fNama : ''
//                     , fEselon : ''
//                     , fJeniskelamin : ''
//                     , fAgama: ''
//                     , fPendidikan : ''
//                     , fPangkat : ''
//                     , fTipePegawai : ''
//                     , fJenisJabatan : ''
//             }, function (response) { 
//               $$('#test').html(response);
//               $$(document).on('deviceready', function() {
//                     $$('#example').html(response);
//                 } );
//             });
//             // window.open(host + "action/act_print.php");
//             // var ref = cordova.InAppBrowser.open(host + "action/act_print.php");
//         });
//     })
// });
myApp.onPageInit('cetak', function (page) {
    cetak_duk();
    navbar_folder();
    nama_menu();
    
});

function cetak_duk(){
    $$(document).on('deviceready', function() {
        // $$('.test').html("loading..");
        // $$('#duk_opd').attr('action', host+'action/duk_pegawai.php');
        var formData = myApp.formToData('#form_duk_opd');
        $$('#duk_opd').attr('href', host+'action/duk_pegawai.php?duk_unit_id='+ sesi('unit_id') + '&fUnitkerja='+ sesi('fUnitkerja') + '&fUnitkerjaSub='+ sesi('fUnitkerjaSub') + '&fNIP='+ sesi('fNIP') +'&fNama='+ sesi('fNama') +'&fEselon='+ sesi('fEselon') +'&fJeniskelamin='+ sesi('fJeniskelamin') +'&fAgama='+ sesi('fAgama') +'&fPendidikan='+ sesi('fPendidikan') +'&fPangkat='+ sesi('fPangkat'));
        $$.post(host+'action/duk_pegawai.php'
                ,{domain : 'android'
                , act: sesi('view_duk')
                , duk_token : sesi('token')                        
                , duk_unit_id : sesi('unit_id')
                , fUnitkerja : sesi('fUnitkerja')
                , fUnitkerjaSub : sesi('fSubUnitkerja')
                , fNIP : sesi('fNip')
                , fNama : sesi('fNama')
                , fEselon : sesi('fEselon')
                , fJeniskelamin : sesi('fJeniskelamin')
                , fAgama: sesi('fAgama')
                , fPendidikan : sesi('fPendidikan')
                , fPangkat : sesi('fPangkat')
                , fBanyakData : '10'
                , fTipePegawai : ''
                , fJenisJabatan : ''}, function (response) { 
                // $$('.test').html("");
                // $$('.judul_duk').html("View DUK " + sesi('view_duk'));
                // var arr = JSON.parse(response);
                // var spliter = arr['isi'].split("@");
                // $$('.test').html(arr['isi']);
                            // window.open(host + url);
                
        });
    });
}

//------------------------------------- halaman biodatapns -----------------------------------------------------------
myApp.onPageInit('biodata_pns', function (page) { //start pageinit biodatapns
    //setting awalan default
    // console.log("page init biodata_pns");
    navbar_folder();
    nama_menu();
    setSesi('page_menu','view/menu_pegawai/biodata_pns.html');
    setSesi('pagingtabel', '1');
    if(sesi('filter_page') != 'ada'){
        reset_filter_biodata();
        set_awal_filter();
    }
    $$(".preloader-biodatapns").hide();
    act_biodata();
    get_data_table_ws(sesi('fAct'));
    //end awalan default
    if(sesi('folder') == 'opd'){
        
        // $$('#duk_opd').on('click',function(e){ //start #searchlist
        //     // load_page('view/menu_pegawai/cetak.html');
        //     // setSesi('view_duk', 'OPD');
        //     cetak_duk('action/duk_pegawai.php');
                
        // });
        $$('#duk_struktural').hide();
        $$('#duk_fungsional').hide();
        $$('#duk_opd').show();
        
        // $$('#form_duk_opd').attr('action', host+'action/duk_pegawai.php');
        $$('.domain').val('android');
        $$('.duk_token').val(sesi('duk_token'));
        $$('.duk_unit_id').val(sesi('fUnitkerja'));
        $$('.fUnitkerja_duk').val(sesi('fUnitkerja'));
        $$('.fUnitkerjaSub_duk').val(sesi('fUnitkerja'));
        $$('.fNIP_duk').val(sesi('fNIP'));
        $$('.fNama_duk').val(sesi('fNama'));
        $$('.fEselon_duk').val(sesi('fEselon'));
        $$('.fJeniskelamin_duk').val(sesi('fJeniskelamin'));
        $$('.fAgama_duk').val(sesi('fAgama'));
        $$('.fPendidikan_duk').val(sesi('fPendidikan'));
        $$('.fPangkat_duk').val(sesi('fPangkat'));
        $$('.fBanyakData_duk').val('10');
        $$('.fTipePegawai_duk').val('');
        $$('.fJenisJabatan_duk').val('');
        $$('#duk_opd').attr('href', host+'action/duk_pegawai.php?duk_unit_id='+ $$('.duk_unit_id').val() + '&fUnitkerja='+ $$('.fUnitkerja_duk').val() + '&fUnitkerjaSub='+ $$('.fUnitkerjaSub_duk').val() + '&fNIP='+ $$('.fNIP_duk').val() +'&fNama='+  $$('.fNama_duk').val() +'&fEselon='+ $$('.fEselon_duk').val() +'&fJeniskelamin='+ $$('.fJeniskelamin_duk').val() +'&fAgama='+ $$('.fAgama_duk').val() +'&fPendidikan='+ $$('.fPendidikan_duk').val() +'&fPangkat='+ $$('.fPangkat_duk').val() +'&fTipePegawai='+ $$('.fTipePegawai_duk').val() +'&fJenisJabatan='+ $$('.fJenisJabatan_duk').val());

        
        
        // $$('#duk_opd').on('click',function(e){ //start #searchlist
        //     // load_page('view/menu_pegawai/cetak.html');
        //     // setSesi('view_duk', 'OPD');
        //     cetak_duk();
                
        // });
    }
    else if(sesi('folder') == 'admin'){  
        $$('#duk_struktural').show();
        $$('#duk_fungsional').show();
        $$('#duk_opd').hide();
        if(sesi('fUnitkerja') == "undefined"){
            $$('#duk_struktural').show();
            $$('#duk_fungsional').show();
            // $$('#form_duk_struktural').attr('action', host+'action/duk_pegawai_kab_struktural.php');
            // $$('#form_duk_fungsional').attr('action', host+'action/duk_pegawai_kab_fungsional.php');
            $$('#duk_opd').attr('href', host+'action/duk_pegawai_kab_struktural.php?duk_unit_id='+ sesi('unit_id') + '&fUnitkerja='+ sesi('fUnitkerja') + '&fUnitkerjaSub='+ sesi('fUnitkerjaSub') + '&fNIP='+ sesi('fNIP') +'&fNama='+ sesi('fNama') +'&fEselon='+ sesi('fEselon') +'&fJeniskelamin='+ sesi('fJeniskelamin') +'&fAgama='+ sesi('fAgama') +'&fPendidikan='+ sesi('fPendidikan') +'&fPangkat='+ sesi('fPangkat'));
            $$('#duk_opd').attr('href', host+'action/duk_pegawai_kab_fungsional.php?duk_unit_id='+ sesi('unit_id') + '&fUnitkerja='+ sesi('fUnitkerja') + '&fUnitkerjaSub='+ sesi('fUnitkerjaSub') + '&fNIP='+ sesi('fNIP') +'&fNama='+ sesi('fNama') +'&fEselon='+ sesi('fEselon') +'&fJeniskelamin='+ sesi('fJeniskelamin') +'&fAgama='+ sesi('fAgama') +'&fPendidikan='+ sesi('fPendidikan') +'&fPangkat='+ sesi('fPangkat'));
            $$('#duk_opd').hide();
        }
        else if(sesi('fUnitkerja') != ''){
            $$('#duk_struktural').hide();
            $$('#duk_fungsional').hide();
            $$('#duk_opd').show();
            $$('#duk_opd').attr('href', host+'action/duk_pegawai.php?duk_unit_id='+ sesi('unit_id') + '&fUnitkerja='+ sesi('fUnitkerja') + '&fUnitkerjaSub='+ sesi('fUnitkerjaSub') + '&fNIP='+ sesi('fNIP') +'&fNama='+ sesi('fNama') +'&fEselon='+ sesi('fEselon') +'&fJeniskelamin='+ sesi('fJeniskelamin') +'&fAgama='+ sesi('fAgama') +'&fPendidikan='+ sesi('fPendidikan') +'&fPangkat='+ sesi('fPangkat'));
            // $$('.domain').val('android');
            // $$('.duk_token').val(sesi('duk_token'));
            // $$('.duk_unit_id').val(sesi('fUnitkerja'));
            // $$('.fUnitkerja_duk').val(sesi('fUnitkerja'));
            // $$('.fUnitkerjaSub_duk').val(sesi('fUnitkerja'));
            // $$('.fNIP_duk').val(sesi('fNIP'));
            // $$('.fNama_duk').val(sesi('fNama'));
            // $$('.fEselon_duk').val(sesi('fEselon'));
            // $$('.fJeniskelamin_duk').val(sesi('fJeniskelamin'));
            // $$('.fAgama_duk').val(sesi('fAgama'));
            // $$('.fPendidikan_duk').val(sesi('fPendidikan'));
            // $$('.fPangkat_duk').val(sesi('fPangkat'));
            // $$('.fBanyakData_duk').val('10');
            // $$('.fTipePegawai_duk').val('');
            // $$('.fJenisJabatan_duk').val('');
        }
        else{
            $$('#duk_struktural').show();
            $$('#duk_fungsional').show();
            $$('#duk_opd').hide();
            // $$('#form_duk_struktural').attr('action', host+'action/duk_pegawai_kab_struktural.php');
            // $$('#form_duk_fungsional').attr('action', host+'action/duk_pegawai_kab_fungsional.php');
            $$('#duk_opd').attr('href', host+'action/duk_pegawai_kab_struktural.php?duk_unit_id='+ sesi('unit_id') + '&fUnitkerja='+ sesi('fUnitkerja') + '&fUnitkerjaSub='+ sesi('fUnitkerjaSub') + '&fNIP='+ sesi('fNIP') +'&fNama='+ sesi('fNama') +'&fEselon='+ sesi('fEselon') +'&fJeniskelamin='+ sesi('fJeniskelamin') +'&fAgama='+ sesi('fAgama') +'&fPendidikan='+ sesi('fPendidikan') +'&fPangkat='+ sesi('fPangkat'));
            $$('#duk_opd').attr('href', host+'action/duk_pegawai_kab_fungsional.php?duk_unit_id='+ sesi('unit_id') + '&fUnitkerja='+ sesi('fUnitkerja') + '&fUnitkerjaSub='+ sesi('fUnitkerjaSub') + '&fNIP='+ sesi('fNIP') +'&fNama='+ sesi('fNama') +'&fEselon='+ sesi('fEselon') +'&fJeniskelamin='+ sesi('fJeniskelamin') +'&fAgama='+ sesi('fAgama') +'&fPendidikan='+ sesi('fPendidikan') +'&fPangkat='+ sesi('fPangkat'));
            // $$('.domain').val('android');
            // $$('.duk_token').val(sesi('duk_token'));
            // $$('.duk_unit_id').val(sesi('fUnitkerja'));
            // $$('.fUnitkerja_duk').val(sesi('fUnitkerja'));
            // $$('.fUnitkerjaSub_duk').val(sesi('fUnitkerja'));
            // $$('.fNIP_duk').val(sesi('fNIP'));
            // $$('.fNama_duk').val(sesi('fNama'));
            // $$('.fEselon_duk').val(sesi('fEselon'));
            // $$('.fJeniskelamin_duk').val(sesi('fJeniskelamin'));
            // $$('.fAgama_duk').val(sesi('fAgama'));
            // $$('.fPendidikan_duk').val(sesi('fPendidikan'));
            // $$('.fPangkat_duk').val(sesi('fPangkat'));
            // $$('.fBanyakData_duk').val('10');
            // $$('.fTipePegawai_duk').val('');
            // $$('.fJenisJabatan_duk').val('');
        }
        
        // $$('#form_duk_struktural').attr('action', host+'action/duk_pegawai_kab_struktural.php');
        
        // $$('#duk_fungsional').attr('href', host+'action/duk_pegawai_kab_fungsional.php');
        // $$('#duk_fungsional').on('click',function(e){ //start #searchlist
        //     // cetak_duk('action/duk_pegawai_kab_fungsional.php'); 
        //         // $$('.test').html("loading..");
                
        //     //     $$.post(host+'action/duk_pegawai_kab_fungsional.php'
        //     //             ,{ domain : 'android'
        //     //                 , act: sesi('view_duk')
        //     //                 , duk_token : sesi('token')                        
        //     //                 , duk_unit_id : sesi('unit_id')
        //     //                 , fUnitkerja : sesi('fUnitkerja')
        //     //                 , fUnitkerjaSub : sesi('fSubUnitkerja')
        //     //                 , fNIP : sesi('fNip')
        //     //                 , fNama : sesi('fNama')
        //     //                 , fEselon : sesi('fEselon')
        //     //                 , fJeniskelamin : sesi('fJeniskelamin')
        //     //                 , fAgama: sesi('fAgama')
        //     //                 , fPendidikan : sesi('fPendidikan')
        //     //                 , fPangkat : sesi('fPangkat')
        //     //                 , fBanyakData : '10'
        //     //                 , fTipePegawai : ''
        //     //                 , fJenisJabatan : ''
        //     //         }, function (response) { 
        //     //             // $$('.test').html("");
        //     //             // $$('.judul_duk').html("View DUK " + sesi('view_duk'));
        //     //             // var arr = JSON.parse(response);
        //     //             // var spliter = arr['isi'].split("@");
        //     //             // $$('.test').html(arr['isi']);
        //     //                         // window.open(host + url);
                        
        //     //     });
        //     // setSesi('view_duk', 'Fungsional');  
        // });
        // $$('#duk_opd').hide();
    }
    
    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            // console.log(inputtext);  
            setSesi('fNama', inputtext);
            $$('.fNama_duk').val(sesi('fNama'));
            act_biodata();
            get_data_table_ws(sesi("fAct"));
        }
    }); //stop #searchlist

    $$(document).on('click','#biopns_tambahpegawai',function(e){ //start click #biopns_tambahpegawai
        e.stopImmediatePropagation();
        var totaldata = 32;
        var totalhalaman = parseInt(totaldata / 10);
        var a = totaldata%10;
        if(a >0){
            totalhalaman++;
        }
        load_page("view/menu_pegawai/biodata_pns_tambah.html");
        // console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#biopns_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        // console.log('refresh');
        
        reset_filter_biodata();
        if(sesi('folder') == 'opd'){
            $$('#duk_struktural').hide();
            $$('#duk_fungsional').hide();
            $$('#duk_opd').show();
        }
        else if(sesi('folder') == 'admin'){
            if(sesi('fUnitkerja') != ''){
                $$('#duk_struktural').hide();
                $$('#duk_fungsional').hide();
                $$('#duk_opd').show();
            }
            else{
                $$('#duk_struktural').show();
                $$('#duk_fungsional').show();
                $$('#duk_opd').hide();
            }
        }
        
        
        $$('.fNama_duk').val('');
        act_biodata();
        get_data_table_ws(sesi("fAct"));
        
    }); //end click #biopns_refresh

    $$(document).on('click','.detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        // console.log('detaila' + nip);
        setSesi('nip_pns', nip);
        load_page('view/menu_pegawai/detail_pns.html');
    }); //end click #biopns_refresh

    $$(document).on('click','.paging-biodatapns',function(e){ //start #paging-biodatapns
        e.stopImmediatePropagation();
        var angka = $$(this).data('angka');
        var halaman = parseInt(sesi('pagingtabel'));
        var batasatas = parseInt(sesi('totalhalaman'));
        if(angka == "back"){ 
            var halfix = halaman -1;
            // console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            // console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            // console.log(angka); 
        }
        
    });
     

});//end pageinit biodatapns'

myApp.onPageInit('kenaikan_pangkat_reguler', function (page) { //start pageinit biodatapns
    //setting awalan default
    // console.log("page init biodata_pns");
    navbar_folder();
    nama_menu();
    setSesi('page_menu','view/menu_penjagaan/kenaikan_pangkat_reguler.html');
    setSesi('pagingtabel', '1');
    if(sesi('filter_page') != 'ada'){
        reset_filter_biodata();
        set_awal_filter();
    }
    $$(".preloader-biodatapns").hide();
    act_penjagaan_kenaikan_pangkat_reguler();
    get_data_table_ws(sesi('fAct'));
    //end awalan default
    // console.log("unit kerja: " + sesi('fUnitKerja'));

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            // console.log(inputtext);  
            setSesi('fNama', inputtext);
            act_penjagaan_kenaikan_pangkat_reguler();
            get_data_table_ws(sesi("fAct"));
        }
    }); //stop #searchlist

    $$(document).on('click','#biopns_tambahpegawai',function(e){ //start click #biopns_tambahpegawai
        e.stopImmediatePropagation();
        var totaldata = 32;
        var totalhalaman = parseInt(totaldata / 10);
        var a = totaldata%10;
        if(a >0){
            totalhalaman++;
        }
        load_page("view/menu_pegawai/biodata_pns_tambah.html");
        // console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#kenaikan_pangkat_reguler_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        // console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_kenaikan_pangkat_reguler();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        // console.log('detaila' + nip);
        setSesi('nip_pns', nip);
        load_page('view/menu_pegawai/detail_pns.html');
    }); //end click #biopns_refresh

    $$(document).on('click','#paging-biodatapns',function(e){ //start #paging-biodatapns
        e.stopImmediatePropagation();
        var angka = $$(this).data('angka');
        var halaman = parseInt(sesi('pagingtabel'));
        var batasatas = parseInt(sesi('totalhalaman'));
        if(angka == "back"){ 
            var halfix = halaman -1;
            // console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            // console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            // console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('kenaikan_pangkat_pilihan', function (page) { //start pageinit biodatapns
    //setting awalan default
    // console.log("page init biodata_pns");
    navbar_folder();
    nama_menu();
    setSesi('page_menu','view/menu_penjagaan/kenaikan_pangkat_pilihan.html');
    setSesi('pagingtabel', '1');
    if(sesi('filter_page') != 'ada'){
        reset_filter_biodata();
        set_awal_filter();
    }
    $$(".preloader-biodatapns").hide();
    act_penjagaan_kenaikan_pangkat_pilihan();
    get_data_table_ws(sesi('fAct'));
    //end awalan default

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            // console.log(inputtext);  
            setSesi('fNama', inputtext);
            act_penjagaan_kenaikan_pangkat_pilihan();
            get_data_table_ws(sesi("fAct"));
        }
    }); //stop #searchlist

    $$(document).on('click','#biopns_tambahpegawai',function(e){ //start click #biopns_tambahpegawai
        e.stopImmediatePropagation();
        var totaldata = 32;
        var totalhalaman = parseInt(totaldata / 10);
        var a = totaldata%10;
        if(a >0){
            totalhalaman++;
        }
        load_page("view/menu_pegawai/biodata_pns_tambah.html");
        // console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#kenaikan_pangkat_pilihan_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        // console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_kenaikan_pangkat_pilihan();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        // console.log('detaila' + nip);
        setSesi('nip_pns', nip);
        load_page('view/menu_pegawai/detail_pns.html');
    }); //end click #biopns_refresh

    $$(document).on('click','#paging-biodatapns',function(e){ //start #paging-biodatapns
        e.stopImmediatePropagation();
        var angka = $$(this).data('angka');
        var halaman = parseInt(sesi('pagingtabel'));
        var batasatas = parseInt(sesi('totalhalaman'));
        if(angka == "back"){ 
            var halfix = halaman -1;
            // console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            // console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            // console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('kenaikan_gaji_berkala', function (page) { //start pageinit biodatapns
    //setting awalan default
    // console.log("page init biodata_pns");
    navbar_folder();
    nama_menu();
    setSesi('page_menu','view/menu_penjagaan/kenaikan_gaji_berkala.html');
    setSesi('pagingtabel', '1');
    if(sesi('filter_page') != 'ada'){
        reset_filter_biodata();
        set_awal_filter();
    }
    $$(".preloader-biodatapns").hide();
    act_penjagaan_kenaikan_gaji_berkala();
    get_data_table_ws(sesi('fAct'));
    //end awalan default

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            // console.log(inputtext);  
            setSesi('fNama', inputtext);
            act_penjagaan_kenaikan_gaji_berkala();
            get_data_table_ws(sesi("fAct"));
        }
    }); //stop #searchlist

    $$(document).on('click','#biopns_tambahpegawai',function(e){ //start click #biopns_tambahpegawai
        e.stopImmediatePropagation();
        var totaldata = 32;
        var totalhalaman = parseInt(totaldata / 10);
        var a = totaldata%10;
        if(a >0){
            totalhalaman++;
        }
        load_page("view/menu_pegawai/biodata_pns_tambah.html");
        // console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#kenaikan_gaji_berkala_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        // console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_kenaikan_gaji_berkala();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        // console.log('detaila' + nip);
        setSesi('nip_pns', nip);
        load_page('view/menu_pegawai/detail_pns.html');
    }); //end click #biopns_refresh

    $$(document).on('click','#paging-biodatapns',function(e){ //start #paging-biodatapns
        e.stopImmediatePropagation();
        var angka = $$(this).data('angka');
        var halaman = parseInt(sesi('pagingtabel'));
        var batasatas = parseInt(sesi('totalhalaman'));
        if(angka == "back"){ 
            var halfix = halaman -1;
            // console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            // console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            // console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('satyalancana10tahun', function (page) { //start pageinit biodatapns
    //setting awalan default
    // console.log("page init biodata_pns");
    navbar_folder();
    nama_menu();
    setSesi('page_menu','view/menu_penjagaan/satyalancana10tahun.html');
    setSesi('pagingtabel', '1');
    if(sesi('filter_page') != 'ada'){
        reset_filter_biodata();
        set_awal_filter();
    }
    $$(".preloader-biodatapns").hide();
    act_penjagaan_satyalancana10tahun();
    get_data_table_ws(sesi('fAct'));
    //end awalan default

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            // console.log(inputtext);  
            setSesi('fNama', inputtext);
            act_penjagaan_satyalancana10tahun();
            get_data_table_ws(sesi("fAct"));
        }
    }); //stop #searchlist

    $$(document).on('click','#biopns_tambahpegawai',function(e){ //start click #biopns_tambahpegawai
        e.stopImmediatePropagation();
        var totaldata = 32;
        var totalhalaman = parseInt(totaldata / 10);
        var a = totaldata%10;
        if(a >0){
            totalhalaman++;
        }
        load_page("view/menu_pegawai/biodata_pns_tambah.html");
        // console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#satyalancana10tahun_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        // console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_satyalancana10tahun();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        // console.log('detaila' + nip);
        setSesi('nip_pns', nip);
        load_page('view/menu_pegawai/detail_pns.html');
    }); //end click #biopns_refresh

    $$(document).on('click','#paging-biodatapns',function(e){ //start #paging-biodatapns
        e.stopImmediatePropagation();
        var angka = $$(this).data('angka');
        var halaman = parseInt(sesi('pagingtabel'));
        var batasatas = parseInt(sesi('totalhalaman'));
        if(angka == "back"){ 
            var halfix = halaman -1;
            // console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            // console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            // console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('satyalancana20tahun', function (page) { //start pageinit biodatapns
    //setting awalan default
    // console.log("page init biodata_pns");
    navbar_folder();
    nama_menu();
    setSesi('page_menu','view/menu_penjagaan/satyalancana20tahun.html');
    setSesi('pagingtabel', '1');
    if(sesi('filter_page') != 'ada'){
        reset_filter_biodata();
        set_awal_filter();
    }
    $$(".preloader-biodatapns").hide();
    act_penjagaan_satyalancana20tahun();
    get_data_table_ws(sesi('fAct'));
    //end awalan default

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            // console.log(inputtext);  
            setSesi('fNama', inputtext);
            act_penjagaan_satyalancana20tahun();
            get_data_table_ws(sesi("fAct"));
        }
    }); //stop #searchlist

    $$(document).on('click','#biopns_tambahpegawai',function(e){ //start click #biopns_tambahpegawai
        e.stopImmediatePropagation();
        var totaldata = 32;
        var totalhalaman = parseInt(totaldata / 10);
        var a = totaldata%10;
        if(a >0){
            totalhalaman++;
        }
        load_page("view/menu_pegawai/biodata_pns_tambah.html");
        // console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#satyalancana20tahun_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        // console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_satyalancana20tahun();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        // console.log('detaila' + nip);
        setSesi('nip_pns', nip);
        load_page('view/menu_pegawai/detail_pns.html');
    }); //end click #biopns_refresh

    $$(document).on('click','#paging-biodatapns',function(e){ //start #paging-biodatapns
        e.stopImmediatePropagation();
        var angka = $$(this).data('angka');
        var halaman = parseInt(sesi('pagingtabel'));
        var batasatas = parseInt(sesi('totalhalaman'));
        if(angka == "back"){ 
            var halfix = halaman -1;
            // console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            // console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            // console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('satyalancana30tahun', function (page) { //start pageinit biodatapns
    //setting awalan default
    // console.log("page init biodata_pns");
    navbar_folder();
    nama_menu();
    setSesi('page_menu','view/menu_penjagaan/satyalancana30tahun.html');
    setSesi('pagingtabel', '1');
    if(sesi('filter_page') != 'ada'){
        reset_filter_biodata();
        set_awal_filter();
    }
    $$(".preloader-biodatapns").hide();
    act_penjagaan_satyalancana30tahun();
    get_data_table_ws(sesi('fAct'));
    // console.log("fAct: " + sesi('fAct'));
    // console.log("page: " + sesi('page'));
    //end awalan default

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            // console.log(inputtext);  
            setSesi('fNama', inputtext);
            act_penjagaan_satyalancana30tahun();
            get_data_table_ws(sesi("fAct"));
        }
    }); //stop #searchlist

    $$(document).on('click','#biopns_tambahpegawai',function(e){ //start click #biopns_tambahpegawai
        e.stopImmediatePropagation();
        var totaldata = 32;
        var totalhalaman = parseInt(totaldata / 10);
        var a = totaldata%10;
        if(a >0){
            totalhalaman++;
        }
        load_page("view/menu_pegawai/biodata_pns_tambah.html");
        // console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#satyalancana30tahun_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        // console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_satyalancana30tahun();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        // console.log('detaila' + nip);
        setSesi('nip_pns', nip);
        load_page('view/menu_pegawai/detail_pns.html');
    }); //end click #biopns_refresh

    $$(document).on('click','.paging-biodatapns',function(e){ //start #paging-biodatapns
        e.stopImmediatePropagation();
        var angka = $$(this).data('angka');
        var halaman = parseInt(sesi('pagingtabel'));
        var batasatas = parseInt(sesi('totalhalaman'));
        if(angka == "back"){ 
            var halfix = halaman -1;
            // console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            // console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            // console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('usia_pensiun', function (page) { //start pageinit biodatapns
    //setting awalan default
    // console.log("page init biodata_pns");
    
    navbar_folder();
    nama_menu();
    setSesi('page_menu','view/menu_penjagaan/usia_pensiun.html');
    setSesi('pagingtabel', '1');
    
    if(sesi('filter_page') != 'ada'){
        reset_filter_biodata();
        set_awal_filter();
    }
    $$(".preloader-biodatapns").hide();
    
    // console.log("fAct: " + sesi('fAct'));
    // console.log("page: " + sesi('page'));
    act_penjagaan_usia_pensiun();
    get_data_table_ws(sesi('fAct'));
    //end awalan default

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            // console.log(inputtext);  
            setSesi('fNama', inputtext);
            act_penjagaan_usia_pensiun();
            get_data_table_ws(sesi("fAct"));
        }
    }); //stop #searchlist

    $$(document).on('click','#biopns_tambahpegawai',function(e){ //start click #biopns_tambahpegawai
        e.stopImmediatePropagation();
        var totaldata = 32;
        var totalhalaman = parseInt(totaldata / 10);
        var a = totaldata%10;
        if(a >0){
            totalhalaman++;
        }
        load_page("view/menu_pegawai/biodata_pns_tambah.html");
        // console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#usia_pensiun_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        // console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_usia_pensiun();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        // console.log('detaila' + nip);
        setSesi('nip_pns', nip);
        load_page('view/menu_pegawai/detail_pns.html');
    }); //end click #biopns_refresh

    $$(document).on('click','.paging-biodatapns',function(e){ //start #paging-biodatapns
        e.stopImmediatePropagation();
        var angka = $$(this).data('angka');
        var halaman = parseInt(sesi('pagingtabel'));
        var batasatas = parseInt(sesi('totalhalaman'));
        if(angka == "back"){ 
            var halfix = halaman -1;
            // console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            // console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            // console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('detail_pns', function (page) { //start pageinit biodatapns
    // console.log('#'+sesi('nip_pns')+'_f_sumpah_pns');
    navbar_folder();
    nama_menu();
    // setSesi('page','view/menu_pegawai/detail_pns.html');
    setSesi('jenisdata', "0");   

    detail_pns();

    back_detail
    $$('#back_detail').on('click', function(e){
        setSesi('jenisdata', "0");
    });

    $$('#detail_pnsdata').on('change', function(e){ //start #pnstam_unitkerja
       e.stopImmediatePropagation();
        var val = $$(this).val();
        // console.log(val);
        setSesi('jenisdata', val);

        detail_pns();

        if(sesi('folder') == 'pegawai'){
            $$('.edit_bio').hide();
        }

        $$('#edit_bio_1').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_1').hide();
           $$('#simpan_bio_1').show();
           $$('.form_simpan').show();
        }); 

        $$('#simpan_bio_1').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           var unit_kerja = $$('#f_unit_kerja_'+sesi('nip_pns')).val(); 
            var unit_kerja_sub = $$('#f_unit_kerja_sub_'+sesi('nip_pns')).val(); 
            var eselon = $$('#f_eselon_'+sesi('nip_pns')).val();
            var pejabat_penetap_jabatan = $$('#f_pejabat_penetap_jabatan_'+sesi('nip_pns')).val(); 
            var nosk_jabatan = $$('#f_nosk_jabatan_'+sesi('nip_pns')).val(); 
            var tglsk_jabatan = $$('#f_tglsk_jabatan_'+sesi('nip_pns')).val();
            var jenis_jabatan = $$('#f_jenis_jabatan_'+sesi('nip_pns')).val(); 
            var jabatan = $$('#f_jabatan_'+sesi('nip_pns')).val(); 
            var tmt_jabatan = $$('#f_tmt_jabatan_'+sesi('nip_pns')).val(); 
            var sumpah_jabatan = $$('#f_sumpah_jabatan_'+sesi('nip_pns')).val();  
            var skpelantikan_no = $$('#f_skpelantikan_no_'+sesi('nip_pns')).val(); 
            var skpelantikan_tgl = $$('#f_skpelantikan_tgl_'+sesi('nip_pns')).val(); 

            var tipe_pegawai = $$('#f_tipe_pegawai_'+sesi('nip_pns')).val(); 

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_1.php', { 
                token: sesi('token') 
                , nip: sesi('nip_pns') 
                , unit_kerja: unit_kerja 
                , unit_kerja_sub: unit_kerja_sub 
                , eselon: eselon 
                , pejabat_penetap_jabatan: pejabat_penetap_jabatan 
                , nosk_jabatan: nosk_jabatan 
                , tglsk_jabatan: tglsk_jabatan 
                , jenis_jabatan: jenis_jabatan 
                , jabatan: jabatan 
                , tmt_jabatan: tmt_jabatan  
                , sumpah_jabatan: sumpah_jabatan 
                , skpelantikan_no: skpelantikan_no 
                , skpelantikan_tgl: skpelantikan_tgl  

                , tipe_pegawai: tipe_pegawai   
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 1 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('#simpan_bio_1').hide();
                $$('.form_simpan').hide();
                $$('.form_edit').show();
                $$('#edit_bio_1').show();
            });
        }); 

        $$('#edit_bio_2').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_2').hide();
           $$('#simpan_bio_2').show();
           $$('.form_simpan').show();           
        }); 

        $$('#simpan_bio_2').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           
           var nip_awal = $$('#'+sesi('nip_pns')+'_f_nip_awal').val(); 
            var nip = $$('#'+sesi('nip_pns')+'_f_nip').val(); 
            var gelar_depan = $$('#'+sesi('nip_pns')+'_f_gelar_depan').val(); 
            var nama = $$('#'+sesi('nip_pns')+'_f_nama').val();
            var gelar_belakang = $$('#'+sesi('nip_pns')+'_f_gelar_belakang').val(); 
            var tempat_lahir = $$('#'+sesi('nip_pns')+'_f_tempat_lahir').val(); 
            var kota_lahir = $$('#'+sesi('nip_pns')+'_f_kota_lahir').val();
            var propinsi_lahir = $$('#'+sesi('nip_pns')+'_f_propinsi_lahir').val(); 
            var tgl_lahir = $$('#'+sesi('nip_pns')+'_f_tgl_lahir').val(); 
            var alamat = $$('#'+sesi('nip_pns')+'_f_alamat').val(); 
            var kota = $$('#'+sesi('nip_pns')+'_f_kota').val();  
            var propinsi = $$('#'+sesi('nip_pns')+'_f_propinsi').val(); 
            var jenis_kelamin = $$('#'+sesi('nip_pns')+'_f_jenis_kelamin').val();  
            var agama = $$('#'+sesi('nip_pns')+'_f_agama').val();  
            var status_perkawinan = $$('#'+sesi('nip_pns')+'_f_status_perkawinan').val(); 
            var gol_darah = $$('#'+sesi('nip_pns')+'_f_gol_darah').val(); 

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_2.php', { 
                token: sesi('token') 
                , nip_awal: nip_awal 
                , nip: nip
                , gelar_depan: gelar_depan 
                , nama: nama 
                , gelar_belakang: gelar_belakang 
                , tempat_lahir: tempat_lahir 
                , kota_lahir: kota_lahir 
                , propinsi_lahir: propinsi_lahir 
                , tgl_lahir: tgl_lahir 
                , alamat: alamat 
                , kota: kota  
                , propinsi: propinsi 
                , jenis_kelamin: jenis_kelamin 
                , agama: agama 
                , status_perkawinan: status_perkawinan
                , gol_darah: gol_darah  
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 2 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('.form_edit').show();
               $$('#edit_bio_2').show();
               $$('#simpan_bio_2').hide();
               $$('.form_simpan').hide();
            });
        }); 

        $$('#edit_bio_3').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_3').hide();
           $$('#simpan_bio_3').show();
           $$('.form_simpan').show();           
        }); 

        $$('#simpan_bio_3').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           
           var pendidikan = $$('#'+sesi('nip_pns')+'_f_pendidikan').val(); 
            var jurusan = $$('#'+sesi('nip_pns')+'_f_jurusan').val(); 
            var tgl_lulus = $$('#'+sesi('nip_pns')+'_f_tgl_lulus').val(); 

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_3.php', { 
                token: sesi('token') 
                , nip: sesi('nip_pns')  
                , pendidikan: pendidikan 
                , jurusan: jurusan 
                , tgl_lulus: tgl_lulus    
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 3 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('.form_edit').show();
               $$('#edit_bio_3').show();
               $$('#simpan_bio_3').hide();
               $$('.form_simpan').hide();
            });
        }); 

        $$('#edit_bio_4').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_4').hide();
           $$('#simpan_bio_4').show();
           $$('.form_simpan').show();           
        }); 

        $$('#simpan_bio_4').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           
           var statpeg = $$('#'+sesi('nip_pns')+'_f_statpeg').val(); 
            var no_karpeg = $$('#'+sesi('nip_pns')+'_f_no_karpeg').val(); 
            var no_taspen = $$('#'+sesi('nip_pns')+'_f_no_taspen').val();
            var no_npwp = $$('#'+sesi('nip_pns')+'_f_no_npwp').val(); 
            var no_askes = $$('#'+sesi('nip_pns')+'_f_no_askes').val(); 
            var no_kariskarsu = $$('#'+sesi('nip_pns')+'_f_no_kariskarsu').val(); 

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_4.php', { 
                token: sesi('token') 
                , nip: sesi('nip_pns')  
                , statpeg: statpeg 
                , no_karpeg: no_karpeg 
                , no_taspen: no_taspen  
                , no_npwp: no_npwp 
                , no_askes: no_askes 
                , no_kariskarsu: no_kariskarsu   
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 4 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('.form_edit').show();
               $$('#edit_bio_4').show();
               $$('#simpan_bio_4').hide();
               $$('.form_simpan').hide();
            });
        }); 

        $$('#edit_bio_5').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_5').hide();
           $$('#simpan_bio_5').show();
           $$('.form_simpan').show();           
        }); 

        $$('#simpan_bio_5').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           
           var nobkn_cpns = $$('#'+sesi('nip_pns')+'_f_nobkn_cpns').val(); 
            var tglbkn_cpns = $$('#'+sesi('nip_pns')+'_f_tglbkn_cpns').val(); 
            var pejabat_penetap_cpns = $$('#'+sesi('nip_pns')+'_f_pejabat_penetap_cpns').val();
            var pangkat_cpns = $$('#'+sesi('nip_pns')+'_f_pangkat_cpns').val(); 
            var nosk_cpns = $$('#'+sesi('nip_pns')+'_f_nosk_cpns').val(); 
            var tglsk_cpns = $$('#'+sesi('nip_pns')+'_f_tglsk_cpns').val();  
            var tmt_cpns = $$('#'+sesi('nip_pns')+'_f_tmt_cpns').val();  

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_5.php', { 
                token: sesi('token') 
                , nip: sesi('nip_pns')  
                , nobkn_cpns: nobkn_cpns 
                , tglbkn_cpns: tglbkn_cpns 
                , pejabat_penetap_cpns: pejabat_penetap_cpns  
                , pangkat_cpns: pangkat_cpns 
                , nosk_cpns: nosk_cpns 
                , tglsk_cpns: tglsk_cpns  
                , tmt_cpns: tmt_cpns  
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 5 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('.form_edit').show();
               $$('#edit_bio_5').show();
               $$('#simpan_bio_5').hide();
               $$('.form_simpan').hide();
            });
        });

        $$('#edit_bio_6').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_6').hide();
           $$('#simpan_bio_6').show();
           $$('.form_simpan').show();           
        }); 

        $$('#simpan_bio_6').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           
           var nosk_pns = $$('#'+sesi('nip_pns') +'_f_nosk_pns').val(); 
            var pejabat_penetap_pns = $$('#'+sesi('nip_pns') +'_f_pejabat_penetap_pns').val(); 
            var pangkat_pns = $$('#'+sesi('nip_pns') +'_f_pangkat_pns').val();
            var tglsk_pns = $$('#'+sesi('nip_pns') +'_f_tglsk_pns').val(); 
            var tmt_pns = $$('#'+sesi('nip_pns') +'_f_tmt_pns').val(); 
            var sumpah_pns = $$('#'+sesi('nip_pns') +'_f_sumpah_pns').val();  

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_6.php', { 
                token: sesi('token') 
                , nip: sesi('nip_pns')  
                , nosk_pns: nosk_pns 
                , pejabat_penetap_pns: pejabat_penetap_pns 
                , pangkat_pns: pangkat_pns  
                , tglsk_pns: tglsk_pns 
                , tmt_pns: tmt_pns 
                , sumpah_pns: sumpah_pns
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 6 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('.form_edit').show();
               $$('#edit_bio_6').show();
               $$('#simpan_bio_6').hide();
               $$('.form_simpan').hide();
            });
        });

        $$('#edit_bio_7').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_7').hide();
           $$('#simpan_bio_7').show();
           $$('.form_simpan').show();           
        }); 

        $$('#simpan_bio_7').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           
           var nosk_pangkat = $$('#'+sesi('nip_pns')+'_f_nosk_pangkat').val(); 
            var pejabat_penetap_pangkat = $$('#'+sesi('nip_pns')+'_f_pejabat_penetap_pangkat').val(); 
            var pangkat = $$('#'+sesi('nip_pns')+'_f_pangkat').val(); 
            var masakerja_tahun = $$('#'+sesi('nip_pns')+'_f_masakerja_tahun').val(); 
            var masakerja_bulan = $$('#'+sesi('nip_pns')+'_f_masakerja_bulan').val(); 
            var tglsk_pangkat = $$('#'+sesi('nip_pns')+'_f_tglsk_pangkat').val();
            var tmt_pangkat = $$('#'+sesi('nip_pns')+'_f_tmt_pangkat').val(); 

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_7.php', { 
                token: sesi('token') 
                , nip: sesi('nip_pns')  
                , nosk_pangkat: nosk_pangkat 
                , pejabat_penetap_pangkat: pejabat_penetap_pangkat 
                , pangkat: pangkat  
                , masakerja_tahun: masakerja_tahun 
                , masakerja_bulan: masakerja_bulan 
                , tglsk_pangkat: tglsk_pangkat 
                , tmt_pangkat: tmt_pangkat 
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 7 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('.form_edit').show();
               $$('#edit_bio_7').show();
               $$('#simpan_bio_7').hide();
               $$('.form_simpan').hide();
            });
        });

        $$('#edit_bio_8').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_8').hide();
           $$('#simpan_bio_8').show();
           $$('.form_simpan').show();           
        }); 

        $$('#simpan_bio_8').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           
           var skgaji_no = $$('#'+sesi('nip_pns')+'_f_skgaji_no').val(); 
            var pejabat_penetap_gaji = $$('#'+sesi('nip_pns')+'_f_pejabat_penetap_gaji').val(); 
            var skgaji_masakerja = $$('#'+sesi('nip_pns')+'_f_skgaji_masakerja').val(); 
            var skgaji_tgl = $$('#'+sesi('nip_pns')+'_f_skgaji_tgl').val(); 
            var tmt_kgb = $$('#'+sesi('nip_pns')+'_f_tmt_kgb').val();

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_8.php', { 
                token: sesi('token') 
                , nip: sesi('nip_pns')  
                , skgaji_no: skgaji_no 
                , pejabat_penetap_gaji: pejabat_penetap_gaji 
                , skgaji_masakerja: skgaji_masakerja  
                , skgaji_tgl: skgaji_tgl 
                , tmt_kgb: tmt_kgb
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 8 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('.form_edit').show();
               $$('#edit_bio_8').show();
               $$('#simpan_bio_8').hide();
               $$('.form_simpan').hide();
            });
        });

        $$('#edit_bio_9').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_9').hide();
           $$('#simpan_bio_9').show();
           $$('.form_simpan').show();           
        }); 

        $$('#simpan_bio_9').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           
           var ayah_nama = $$('#'+sesi('nip_pns')+'_f_ayah_nama').val(); 
            var ayah_tempat_lahir = $$('#'+sesi('nip_pns')+'_f_ayah_tempat_lahir').val(); 
            var ayah_tgl_lahir = $$('#'+sesi('nip_pns')+'_f_ayah_tgl_lahir').val();
            var ayah_pekerjaan = $$('#'+sesi('nip_pns')+'_f_ayah_pekerjaan').val(); 
            var ayah_alamat = $$('#'+sesi('nip_pns')+'_f_ayah_alamat').val(); 
            var ayah_kabupaten = $$('#'+sesi('nip_pns')+'_f_ayah_kabupaten').val();  
            var ayah_propinsi = $$('#'+sesi('nip_pns')+'_f_ayah_propinsi').val(); 
            var ibu_nama = $$('#'+sesi('nip_pns')+'_f_ibu_nama').val(); 
            var ibu_tempat_lahir = $$('#'+sesi('nip_pns')+'_f_ibu_tempat_lahir').val(); 
            var ibu_tgl_lahir = $$('#'+sesi('nip_pns')+'_f_ibu_tgl_lahir').val();
            var ibu_pekerjaan = $$('#'+sesi('nip_pns')+'_f_ibu_pekerjaan').val(); 
            var ibu_alamat = $$('#'+sesi('nip_pns')+'_f_ibu_alamat').val(); 
            var ibu_kabupaten = $$('#'+sesi('nip_pns')+'_f_ibu_kabupaten').val();  
            var ibu_propinsi = $$('#'+sesi('nip_pns')+'_f_ibu_propinsi').val(); 

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_9.php', { 
                token: sesi('token') 
                , nip: sesi('nip_pns')  
                , ayah_nama: ayah_nama 
                , ayah_tempat_lahir: ayah_tempat_lahir 
                , ayah_tgl_lahir: ayah_tgl_lahir  
                , ayah_pekerjaan: ayah_pekerjaan 
                , ayah_alamat: ayah_alamat 
                , ayah_kabupaten: ayah_kabupaten 
                , ayah_propinsi: ayah_propinsi   
                , ibu_nama: ibu_nama 
                , ibu_tempat_lahir: ibu_tempat_lahir 
                , ibu_tgl_lahir: ibu_tgl_lahir  
                , ibu_pekerjaan: ibu_pekerjaan 
                , ibu_alamat: ibu_alamat 
                , ibu_kabupaten: ibu_kabupaten 
                , ibu_propinsi: ibu_propinsi 
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 9 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('.form_edit').show();
               $$('#edit_bio_9').show();
               $$('#simpan_bio_9').hide();
               $$('.form_simpan').hide();
            });
        });

        $$('#edit_bio_10').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           $$('.form_edit').hide();
           $$('#edit_bio_10').hide();
           $$('#simpan_bio_10').show();
           $$('.form_simpan').show();           
        }); 

        $$('#simpan_bio_10').on('click', function(e){ //start #pnstam_unitkerja
           e.stopImmediatePropagation();
           
           var pasangan_nip = $$('#'+sesi('nip_pns')+'_f_pasangan_sesi_nip').val(); 
            var pasangan_nama = $$('#'+sesi('nip_pns')+'_f_pasangan_nama').val(); 
            var pasangan_tempat_lahir = $$('#'+sesi('nip_pns')+'_f_pasangan_tempat_lahir').val(); 
            var pasangan_tgl_lahir = $$('#'+sesi('nip_pns')+'_f_pasangan_tgl_lahir').val();
            var pasangan_pendidikan = $$('#'+sesi('nip_pns')+'_f_pasangan_pendidikan').val(); 
            var pasangan_pekerjaan = $$('#'+sesi('nip_pns')+'_f_pasangan_pekerjaan').val(); 
            var tgl_kawin = $$('#'+sesi('nip_pns')+'_f_tgl_kawin').val();  
            var pasangan_status_tunjangan = $$('#'+sesi('nip_pns')+'_f_pasangan_status_tunjangan').val(); 

            $$.post(h+'/webservice/ws_simpan_data_edit_pns_bag_10.php', { 
                token: sesi('token') 
                , nip: sesi('nip_pns')  
                , pasangan_nip: pasangan_nip
                , pasangan_nama: pasangan_nama 
                , pasangan_tempat_lahir: pasangan_tempat_lahir 
                , pasangan_tgl_lahir: pasangan_tgl_lahir  
                , pasangan_pendidikan: pasangan_pendidikan 
                , pasangan_pekerjaan: pasangan_pekerjaan 
                , tgl_kawin: tgl_kawin 
                , pasangan_status_tunjangan: pasangan_status_tunjangan
            }, 
            function (data) {    
                // alert("hamdi " + data);
                // console.log(data);
                if(data=="xxxxxxxxxxx")
                {
                    dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    load_page("view/sign-in.html");
                }
                else if (data == 'success'){ 
                    
                    dialog('Data Bagian 10 berhasil tersimpan!');
                    refresh();
                }
                else 
                {
                    dialog('warning: ' + data);
                }
                $$('.form_edit').show();
               $$('#edit_bio_10').show();
               $$('#simpan_bio_10').hide();
               $$('.form_simpan').hide();
            });
        });

        if($$('#'+sesi('nip_pns')+'_f_sumpah_pns').val() == 'PNS'){
            $$("#f_pasangan_nip").show();
            $$("#f_pasangan_pekerjaan").hide();
        }
        else{
            $$("#f_pasangan_nip").hide();
            $$("#f_pasangan_pekerjaan").show();
        }

        $$('#'+sesi('nip_pns')+'_f_sumpah_pns').on('change', function(e){
            if($$(this).val() == 'PNS'){
                $$("#f_pasangan_nip").show();
                $$("#f_pasangan_pekerjaan").hide();
            }
            else{
                $$("#f_pasangan_nip").hide();
                $$("#f_pasangan_pekerjaan").show();
            }
        });
    });  //end #pnstam_unitkerja

    $$('.edit_bio').on('click', function(e){ //start #pnstam_unitkerja
       e.stopImmediatePropagation();
       $$('.form_edit').hide();
       $$('.edit_bio').hide();
       $$('.simpan_bio').show();
       $$('.form_simpan').show();
    }); 

    $$('.simpan_bio').on('click', function(e){ //start #pnstam_unitkerja
       e.stopImmediatePropagation();
       $$('.form_edit').show();
       $$('.edit_bio').show();
       $$('.simpan_bio').hide();
       $$('.form_simpan').hide();
    }); 

    
});


function detail_pns(){
    $$.ajax({
            url: host+'action/act_biodata_pns.php',
            type: "post",
            data: {act: "detailpns",nip : sesi('nip_pns'), user_level : sesi('level'), jenisdata : sesi('jenisdata') },
            async:false,
            success: function (data) {
               var result = JSON.parse(data);
               $$("#main_detail").html(result['isi']);
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
    });
}

myApp.onPageInit('biodata_pns_tambah', function (page) { //start pageinit biodatapns
    navbar_folder();
    nama_menu();
    generate_unitkerja('pnstam_unitkerja');

    $$('#pnstam_unitkerja').on('change', function(e){ //start #pnstam_unitkerja
       
        var val = $$(this).val();
        var text = $("#pnstam_unitkerja :selected").text();
        // console.log(val +"," +text);
        setSesi("unit_id",val );
        $$('#pnstam_unitkerjanama').val(text);
    });  //end #pnstam_unitkerja
    
    $$('#pnstam_lanj').on('click', function(e){ //start #pnstam_lanj
        
        var val = $$("#pnstam_unitkerja").val();
        var text = $("#pnstam_unitkerja :selected").text();
        var valsub = $$("#pnstam_unitkerjasub").val();
        // console.log(val +"," +text);
        setSesi("unit_id",val );
        setSesi("unit_idsub",valsub );
        if(val == "pilih"){
            dialog('Harap pilih unit kerja terlebih dahulu');
        }else{
            // console.log('ok');
            load_page("view/menu_pegawai/biodata_pns_tambahlanjut.html");
        }
    });  //end #pnstam_lanj
});


myApp.onPageInit('biodata_pns_tambahlanjut', function (page) { //start pageinit biodatapns
    navbar_folder();
    nama_menu();
    // console.log('page init pns tambah lanjut' + sesi('unit_id') +"," + sesi('token') +",");
    calendarpicker('tmb_tgl_lahir');

    $$('#pnstam_lanjsimp').on('click', function(e){ //start #pnstam_lanjsimp
        var nip = $('#tmb_nip').val(); 
            var nip_lama = $('#tmb_nip_lama').val(); 
            var gelar_depan = $('#tmb_gelar_depan').val(); 
            var nama = $('#tmb_nama').val();
            var gelar_belakang = $('#tmb_gelar_belakang').val(); 
            var tempat_lahir = $('#tmb_tempat_lahir').val(); 
            var kota_lahir = $('#tmb_kota_lahir').val();
            var propinsi_lahir = $('#tmb_propinsi_lahir').val(); 
            var tgl_lahir = $('#tmb_tgl_lahir').val(); 
            var alamat = $('#tmb_alamat').val(); 
            var kota = $('#tmb_kota').val();  
            var propinsi = $('#tmb_propinsi').val(); 
            var jenis_kelamin = $('#tmb_jenis_kelamin').val();  
            var agama = $('#tmb_agama').val();  
            var status_perkawinan = $('#tmb_status_perkawinan').val(); 
            var gol_darah = $('#tmb_gol_darah').val(); 

            if(tgl_lahir == ''){
                tgl_lahir = '2019-01-01';
            }
            if(nip == '' || nip == null || nip == undefined){
                dialog('NIP tidak boleh kosong');
            } else if(nama == '' || nama == null || nama == undefined){
                dialog( 'Nama tidak boleh kosong');
            } else {  
                $.post(host+'action/act_biodata_pns.php', { 
                    token: sesi('token') 
                    , act : 'simpanpns' 
                    , unit_id: sesi('unit_id') 
                    , nip: nip 
                    , nip_lama: nip_lama 
                    , gelar_depan: gelar_depan 
                    , nama: nama 
                    , gelar_belakang: gelar_belakang 
                    , tempat_lahir: tempat_lahir 
                    , kota_lahir: kota_lahir 
                    , propinsi_lahir: propinsi_lahir 
                    , tgl_lahir: tgl_lahir 
                    , alamat: alamat 
                    , kota: kota  
                    , propinsi: propinsi 
                    , jenis_kelamin: jenis_kelamin 
                    , agama: agama 
                    , status_perkawinan: status_perkawinan
                    , gol_darah: gol_darah
                }, 
                function (data) {    
                    // alert("hamdi " + data);
                   // console.log(data);
                    if(data=="xxxxxxxxxxx")
                    {
                        dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    }
                    else if (data == 'success' || data.includes('success')){ 
                        dialog('Simpan PNS baru berhasil!');
                        refresh();
                    }
                    else 
                    {
                        dialog( data);
                    }
                });
            }
    });  //end #pnstam_lanjsimp

}); 

function calendarpicker(id){
    var calendarDateFormata = myApp.calendar({
        input: '#' + id,
        dateFormat: 'yyyy-mm-dd',
        onDayClick: function (p, dayContainer, year, month, day) {
            
        },
    });
}

//seluruh fungsi2 dibawah aj deh =====================

function get_data_table_ws(_fUnitkerja=''
                , _fUnitkerjaSub=''
                , _fNIP =''
                , _fNama=''
                , _fEselon=''
                , _fJeniskelamin=''
                , _fAgama=''
                , _fPendidikan=''
                , _fPangkat=''
                , _fBanyakData='10'
                , _fTipePegawai=''
                , _fJenisJabatan='' 
                , f_act){
    
    unitkerja();
    if(sesi('fAct') == 'biodatapns'){
        // console.log('hamdi '+sesi('token'));
        $$(".preloader-biodatapns").show();
        $$.post(host+'action/act_biodata_pns.php'
            ,{act : sesi("fAct")
            
                , domain : 'android'
                , a_username : sesi('username')
                , a_level : sesi('level')
                , a_token : sesi('token')

                , fUnitkerja : sesi('fUnitkerja')
                , fUnitkerjaSub : sesi('fSubUnitkerja')
                , fNIP : sesi('fNip')
                , fNama : sesi('fNama')
                , fEselon : sesi('fEselon')
                , fJeniskelamin : sesi('fJeniskelamin')
                , fAgama: sesi('fAgama')
                , fPendidikan : sesi('fPendidikan')
                , fPangkat : sesi('fPangkat')
                , fBanyakData : sesi('fBanyakData')
                , fTipePegawai : _fTipePegawai
                , fJenisJabatan : _fJenisJabatan
                , linkfoto : hfoto
        }, function (response) { 
          var arr=JSON.parse(response);
            // console.log(arr['isi']);
            
            setSesi('isi_biodatapns', arr['isi']);
            tampilkan_isi_tabel();
           

            $$(".total_data").html(arr['jumlah_data']);
            $$(".preloader-biodatapns").hide(); 
        });
    }
    else if(sesi('fAct') == 'kenaikan_pangkat_reguler'){
        // console.log('hamdi '+sesi('token'));
        
        $$(".preloader-biodatapns").show();
        $$.post(host+'action/act_penjagaan.php'
            ,{act : sesi("fAct")
            
                , domain : 'android'
                , a_username : sesi('username')
                , a_level : sesi('level')
                , a_token : sesi('token')

                , fUnitkerja : sesi('fUnitkerja')
                , fUnitkerjaSub : sesi('fSubUnitkerja')
                , fNIP : sesi('fNip')
                , fNama : sesi('fNama')
                , fEselon : sesi('fEselon')
                , fJeniskelamin : sesi('fJeniskelamin')
                , fAgama: sesi('fAgama')
                , fPendidikan : sesi('fPendidikan')
                , fPangkat : sesi('fPangkat')
                , fBanyakData : sesi('fBanyakData')
                , fTipePegawai : _fTipePegawai
                , fJenisJabatan : _fJenisJabatan
                , linkfoto : hfoto
        }, function (response) { 
            var arr=JSON.parse(response);
            // console.log(arr);
            
            setSesi('isi_biodatapns', arr['isi']);
            tampilkan_isi_tabel();
           

            $$(".total_data").html(arr['jumlah_data']);
            $$(".preloader-biodatapns").hide(); 
        });
    }
    else if(sesi('fAct') == 'kenaikan_pangkat_pilihan'){
        // console.log('hamdi '+sesi('token'));
        // dialog(sesi('fUnitkerja'));
        $$(".preloader-biodatapns").show();
        $$.post(host+'action/act_penjagaan.php'
            ,{act : sesi("fAct")
            
                , domain : 'android'
                , a_username : sesi('username')
                , a_level : sesi('level')
                , a_token : sesi('token')

                , fUnitkerja : sesi('fUnitkerja')
                , fUnitkerjaSub : sesi('fSubUnitkerja')
                , fNIP : sesi('fNip')
                , fNama : sesi('fNama')
                , fEselon : sesi('fEselon')
                , fJeniskelamin : sesi('fJeniskelamin')
                , fAgama: sesi('fAgama')
                , fPendidikan : sesi('fPendidikan')
                , fPangkat : sesi('fPangkat')
                , fBanyakData : sesi('fBanyakData')
                , fTipePegawai : _fTipePegawai
                , fJenisJabatan : _fJenisJabatan
                , linkfoto : hfoto
        }, function (response) { 
            var arr=JSON.parse(response);
            // console.log(arr);
            
            setSesi('isi_biodatapns', arr['isi']);
            tampilkan_isi_tabel();
           

            $$(".total_data").html(arr['jumlah_data']);
            $$(".preloader-biodatapns").hide(); 
        });
    }
    else if(sesi('fAct') == 'kenaikan_gaji_berkala'){
        // console.log('hamdi '+sesi('token'));
        $$(".preloader-biodatapns").show();
        $$.post(host+'action/act_penjagaan.php'
            ,{act : sesi("fAct")
            
                , domain : 'android'
                , a_username : sesi('username')
                , a_level : sesi('level')
                , a_token : sesi('token')

                , fUnitkerja : sesi('fUnitkerja')
                , fUnitkerjaSub : sesi('fSubUnitkerja')
                , fNIP : sesi('fNip')
                , fNama : sesi('fNama')
                , fEselon : sesi('fEselon')
                , fJeniskelamin : sesi('fJeniskelamin')
                , fAgama: sesi('fAgama')
                , fPendidikan : sesi('fPendidikan')
                , fPangkat : sesi('fPangkat')
                , fBanyakData : sesi('fBanyakData')
                , fTipePegawai : _fTipePegawai
                , fJenisJabatan : _fJenisJabatan
                , linkfoto : hfoto
        }, function (response) { 
            var arr=JSON.parse(response);
            // console.log(arr);
            
            setSesi('isi_biodatapns', arr['isi']);
            tampilkan_isi_tabel();
           

            $$(".total_data").html(arr['jumlah_data']);
            $$(".preloader-biodatapns").hide(); 
        });
    }
    else if(sesi('fAct') == 'satyalancana10tahun'){
        // console.log('hamdi '+sesi('token'));
        $$(".preloader-biodatapns").show();
        
        $$.post(host+'action/act_penjagaan.php'
            ,{act : sesi("fAct")
            
                , domain : 'android'
                , a_username : sesi('username')
                , a_level : sesi('level')
                , a_token : sesi('token')

                , fUnitkerja : sesi('fUnitkerja')
                , fUnitkerjaSub : sesi('fSubUnitkerja')
                , fNIP : sesi('fNip')
                , fNama : sesi('fNama')
                , fEselon : sesi('fEselon')
                , fJeniskelamin : sesi('fJeniskelamin')
                , fAgama: sesi('fAgama')
                , fPendidikan : sesi('fPendidikan')
                , fPangkat : sesi('fPangkat')
                , fBanyakData : sesi('fBanyakData')
                , fTipePegawai : _fTipePegawai
                , fJenisJabatan : _fJenisJabatan
                , linkfoto : hfoto
        }, function (response) { 
            var arr=JSON.parse(response);
            // console.log(arr);
            
            setSesi('isi_biodatapns', arr['isi']);
            tampilkan_isi_tabel();
           

            $$(".total_data").html(arr['jumlah_data']);
            $$(".preloader-biodatapns").hide(); 
        });
    }
    else if(sesi('fAct') == 'satyalancana20tahun'){
        // console.log('hamdi '+sesi('token'));
        $$(".preloader-biodatapns").show();
        $$.post(host+'action/act_penjagaan.php'
            ,{act : sesi("fAct")
            
                , domain : 'android'
                , a_username : sesi('username')
                , a_level : sesi('level')
                , a_token : sesi('token')

                , fUnitkerja : sesi('fUnitkerja')
                , fUnitkerjaSub : sesi('fSubUnitkerja')
                , fNIP : sesi('fNip')
                , fNama : sesi('fNama')
                , fEselon : sesi('fEselon')
                , fJeniskelamin : sesi('fJeniskelamin')
                , fAgama: sesi('fAgama')
                , fPendidikan : sesi('fPendidikan')
                , fPangkat : sesi('fPangkat')
                , fBanyakData : sesi('fBanyakData')
                , fTipePegawai : _fTipePegawai
                , fJenisJabatan : _fJenisJabatan
                , linkfoto : hfoto
        }, function (response) { 
            var arr=JSON.parse(response);
            // console.log(arr);
            
            setSesi('isi_biodatapns', arr['isi']);
            tampilkan_isi_tabel();
           

            $$(".total_data").html(arr['jumlah_data']);
            $$(".preloader-biodatapns").hide(); 
        });
    }
    else if(sesi('fAct') == 'satyalancana30tahun'){
        // console.log('hamdi '+sesi('token'));
        $$(".preloader-biodatapns").show();
        $$.post(host+'action/act_penjagaan.php'
            ,{act : sesi("fAct")
            
                , domain : 'android'
                , a_username : sesi('username')
                , a_level : sesi('level')
                , a_token : sesi('token')

                , fUnitkerja : sesi('fUnitkerja')
                , fUnitkerjaSub : sesi('fSubUnitkerja')
                , fNIP : sesi('fNip')
                , fNama : sesi('fNama')
                , fEselon : sesi('fEselon')
                , fJeniskelamin : sesi('fJeniskelamin')
                , fAgama: sesi('fAgama')
                , fPendidikan : sesi('fPendidikan')
                , fPangkat : sesi('fPangkat')
                , fBanyakData : sesi('fBanyakData')
                , fTipePegawai : _fTipePegawai
                , fJenisJabatan : _fJenisJabatan
                , linkfoto : hfoto
        }, function (response) { 
            var arr=JSON.parse(response);
            // console.log(arr);
            
            setSesi('isi_biodatapns', arr['isi']);
            tampilkan_isi_tabel(sesi('fAct'));
           

            $$(".total_data").html(arr['jumlah_data']);
            $$(".preloader-biodatapns").hide(); 
        });
    }
    else if(sesi('fAct') == 'usia_pensiun'){
        // console.log('hamdi '+sesi('token'));
        $$(".preloader-biodatapns").show();
        $$.post(host+'action/act_penjagaan.php'
            ,{act : sesi("fAct")
            
                , domain : 'android'
                , a_username : sesi('username')
                , a_level : sesi('level')
                , a_token : sesi('token')

                , fUnitkerja : sesi('fUnitkerja')
                , fUnitkerjaSub : sesi('fSubUnitkerja')
                , fNIP : sesi('fNip')
                , fNama : sesi('fNama')
                , fEselon : sesi('fEselon')
                , fJeniskelamin : sesi('fJeniskelamin')
                , fAgama: sesi('fAgama')
                , fPendidikan : sesi('fPendidikan')
                , fPangkat : sesi('fPangkat')
                , fBanyakData : sesi('fBanyakData')
                , fTipePegawai : _fTipePegawai
                , fJenisJabatan : _fJenisJabatan
                , linkfoto : hfoto
        }, function (response) { 
            var arr=JSON.parse(response);
            // console.log(arr);
            
            setSesi('isi_biodatapns', arr['isi']);
            tampilkan_isi_tabel(sesi('fAct'));
           

            $$(".total_data").html(arr['jumlah_data']);
            $$(".preloader-biodatapns").hide(); 
        });
    }

    
}
function tampilkan_isi_tabel(fAct){
    var qty_tampil = 10;
    var isitabelfix = "";
    var isitabel = sesi('isi_biodatapns');
    var spliter = isitabel.split("@");
    var halaman = parseInt(sesi('pagingtabel'));
    var awal = (halaman - 1) * qty_tampil;
    var akhir = halaman *qty_tampil;
    var totaldata = spliter.length;

    // console.log(awal +" l" + akhir);
    var a = isitabel.split("@");
    for(var i = awal; i < akhir ; i++){
        isitabelfix = isitabelfix +   spliter[i];     
        if(i == (totaldata-1)){
            break;
        }    
    }
    $$(".isi-biodatapns").html(isitabelfix);
    //untuk p;aging cuy
    
    bikin_paging(totaldata, "page_biodatapns");
    
    //
}

function bikin_paging(totaldata,idhtmlpaging){
    var qty_tampil = 10;
    var totalhalaman = parseInt(totaldata / qty_tampil);
    var a = totaldata%qty_tampil;
    if(a >0){
        totalhalaman++;
    }
    setSesi('totalhalaman', totalhalaman);
    var halamansaatini = parseInt(sesi('pagingtabel'));
    var mulai =1;
    var penghitung = 0;
    if(totalhalaman<=5){
        penghitung = totalhalaman;
    }
    if(totalhalaman>5){
            penghitung = 7;
    }
    $$("." + idhtmlpaging).html("");
    var hasilpaging ="";
    // console.log("total halaman" + totalhalaman);
    var kelas = "";
    var angkapaging = 1;
    var penghitungdua = halamansaatini + 3;
    var angkapagingdua = totalhalaman - 4;

    var angkapaging3= halamansaatini -1;
    //mengisi paging 
    hasilpaging += "<a href='#' class='paging-biodatapns' data-angka='back'><i class='fa fa-arrow-circle-left dav-cterra'></i></a>";    
    for(var i = mulai; i <= penghitung ; i++){
        if(halamansaatini == angkapaging){
            kelas= "class='active'";
            // console.log('a' + halamansaatini);
        }else{
            kelas = "";
            // console.log('tidakaktif');
        }
        if(totalhalaman<=5){ //awal if totalhalaman<=5
            
            hasilpaging += "<a href='#' class='paging-biodatapns' "+ kelas +" data-angka='"+ angkapaging +"'>"+ angkapaging +"</a>";
            angkapaging++;
        }//end if totalhalaman<=5

        else if(totalhalaman>5 && halamansaatini <5){ // awal else if(totalhalaman>5 && halamansaatini <5){
            if(  i <=5){
                hasilpaging += "<a href='#' class='paging-biodatapns' "+ kelas +" data-angka='"+ angkapaging +"'>"+ angkapaging +"</a>";
                angkapaging++;
            }
            else if(i == 6){
                hasilpaging += "<a href='#' class='paging-biodatapns' disabled>...</a>";
                angkapaging++;
            }
            else if(i == 7){
                hasilpaging += "<a href='#' class='paging-biodatapns' "+ kelas +" data-angka='"+ totalhalaman +"'>"+ totalhalaman +"</a>";
                angkapaging++;
            }
        } //end else if(totalhalaman>5 && halamansaatini <5){ 
        else if(totalhalaman > 5 && penghitungdua >= totalhalaman){  //awal else if c
            if(i == 1){
                hasilpaging += "<a href='#' class='paging-biodatapns' "+ kelas +" data-angka='"+ angkapaging +"'>"+ angkapaging +"</a>";
            }
            else if(i == 2){
                hasilpaging += "<a href='#' class='paging-biodatapns' disabled>...</a>";
            }
            else if(i>2){
                if(halamansaatini == angkapagingdua){
                    kelas= "class='active'";
                }
                hasilpaging += "<a href='#' class='paging-biodatapns' "+ kelas +" data-angka='"+ angkapagingdua +"'>"+ angkapagingdua +"</a>";
                angkapagingdua++;
            }
        } //end else if c    
        else if(totalhalaman > 5 && penghitungdua < totalhalaman){  //awal else if d
            if(i == 1){
                hasilpaging += "<a href='#' class='paging-biodatapns' "+ kelas +" data-angka='"+ angkapaging +"'>"+ angkapaging +"</a>";
            }
            else if(i == 2){
                hasilpaging += "<a href='#' class='paging-biodatapns' disabled>...</a>";
            }
            else if(i > 2 && i <= 5){
                if(halamansaatini == angkapaging3){
                    kelas= "class='active'";
                }
                hasilpaging += "<a href='#' class='paging-biodatapns' "+ kelas +" data-angka='"+ angkapaging3 +"'>"+ angkapaging3 +"</a>";
                angkapaging3++;
            }
            else if(i == 6){
                hasilpaging += "<a href='#' class='paging-biodatapns' disabled>...</a>";
            }else if(i == 7){
                hasilpaging += "<a href='#' class='paging-biodatapns' "+ kelas +" data-angka='"+ totalhalaman +"'>"+ totalhalaman +"</a>";
            }
        } //end else if d
    }//end for
    hasilpaging += "<a href='#' class='paging-biodatapns' data-angka='forward'><i class='fa fa-arrow-circle-right dav-cterra'></i></a>";
    //selesai isi paging
    // console.log(penghitung);
    $$("." + idhtmlpaging).html(hasilpaging);     
} //end fungsi bkin paging

function generate_unitkerja(id){
    // console.log(sesi('level'));
    $$("#" + id).html("");
    setSesi('fUnitkerja', '');
     $.ajax({
            url: host+'action/act_get_data.php',
            type: "post",
            data: {act: "get_unit_kerja",username : sesi('username'), level : sesi('level'), unit_id: sesi('unit_id')},
            async:false,
            success: function (data) {
               var result = JSON.parse(data);
               // console.log(result);
                // var penampung = result['isi'].split(">");
                if(sesi('folder') == 'admin'){
                    myApp.smartSelectAddOption('#'+ id, '<option value="">SEMUA UNIT KERJA</option>');
                }
                
                for (var i = 0; i < result.length ; i++) {
                    // var isi = penampung[i].split(">");
                        setSesi('fUnitkerja', $$("#" + id).val());
                        myApp.smartSelectAddOption('#'+ id, '<option value="'+ result[i]['unit_id'] +'">'+ result[i]['isi'] +'</option>');
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
}

function generate_subunitkerja(id, unit_id_change){
    // console.log(sesi('level'));
    $$("#" + id).html("");
    myApp.smartSelectAddOption('#'+ id, '<option value="">SEMUA SUB UNIT KERJA</option>');
    if(unit_id_change == ''){
        setSesi('fSubUnitkerja', '');
    }
    else{
        $.ajax({
            url: host+'action/act_get_data.php',
            type: "post",
            data: {act: "get_sub_unit_kerja", unit_id_atasan: unit_id_change},
            async:false,
            success: function (data) {
               var result = JSON.parse(data);
               // console.log(result);
                // var penampung = result['isi'].split(">");
                
                for (var i = 0; i < result.length ; i++) {
                    // var isi = penampung[i].split(">");
                        setSesi('fSubUnitkerja', $$("#" + id).val());

                        myApp.smartSelectAddOption('#'+ id, '<option value="'+ result[i]['unit_id'] +'">'+ result[i]['isi'] +'</option>');
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
     
}

function generate_eselon(id){
     // console.log(sesi('level'));
    $$("#" + id).html("");
    setSesi('fEselon', '');
     $.ajax({
            url: host+'action/act_get_data.php',
            type: "post",
            data: {act: "get_eselon"},
            async:false,
            success: function (data) {
               var result = JSON.parse(data);
               // console.log(result);
                // var penampung = result['isi'].split(">");
                myApp.smartSelectAddOption('#'+ id, '<option value="">SEMUA ESELON</option>');
                for (var i = 0; i < result.length ; i++) {
                    // var isi = penampung[i].split(">");
                        setSesi('fEselon', $$("#" + id).val());
                        myApp.smartSelectAddOption('#'+ id, '<option value="'+ result[i]['isi'] +'">'+ result[i]['isi'] +'</option>');
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
}

function generate_agama(id){
     // console.log(sesi('level'));
    $$("#" + id).html("");
    setSesi('fAgama', '');
     $.ajax({
            url: host+'action/act_get_data.php',
            type: "post",
            data: {act: "get_agama"},
            async:false,
            success: function (data) {
               var result = JSON.parse(data);
               // console.log(result);
                // var penampung = result['isi'].split(">");
                myApp.smartSelectAddOption('#'+ id, '<option value="">SEMUA AGAMA</option>');
                for (var i = 0; i < result.length ; i++) {
                    // var isi = penampung[i].split(">");
                        setSesi('fAgama', $$("#" + id).val());
                        myApp.smartSelectAddOption('#'+ id, '<option value="'+ result[i]['isi'] +'">'+ result[i]['isi'] +'</option>');
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
}

function generate_pendidikan(id){
     // console.log(sesi('level'));
    $$("#" + id).html("");
    setSesi('fPendidikan', '');
     $.ajax({
            url: host+'action/act_get_data.php',
            type: "post",
            data: {act: "get_pendidikan"},
            async:false,
            success: function (data) {
               var result = JSON.parse(data);
               // console.log(result);
                // var penampung = result['isi'].split(">");
                myApp.smartSelectAddOption('#'+ id, '<option value="">SEMUA PENDIDIKAN</option>');
                for (var i = 0; i < result.length ; i++) {
                    // var isi = penampung[i].split(">");
                        setSesi('fPendidikan', $$("#" + id).val());
                        myApp.smartSelectAddOption('#'+ id, '<option value="'+ result[i]['isi'] +'">'+ result[i]['isi'] +'</option>');
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
}

function generate_pangkat(id){
     // console.log(sesi('level'));
    $$("#" + id).html("");
    setSesi('fPangkat', '');
     $.ajax({
            url: host+'action/act_get_data.php',
            type: "post",
            data: {act: "get_pangkat"},
            async:false,
            success: function (data) {
               var result = JSON.parse(data);
               // console.log(result);
                // var penampung = result['isi'].split(">");
                myApp.smartSelectAddOption('#'+ id, '<option value="">SEMUA PANGKAT</option>');
                for (var i = 0; i < result.length ; i++) {
                    // var isi = penampung[i].split(">");
                        setSesi('fPangkat', $$("#" + id).val());
                        myApp.smartSelectAddOption('#'+ id, '<option value="'+ result[i]['kode'] +'">'+ result[i]['isi'] +'</option>');
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
}

//------------------------------------- view/menu_pegawai/filter-pns.html -----------------------
myApp.onPageInit('filter-pns', function (page) { //start pageinit filter-pns
    set_awal_filter();
    // dialog($$('#fSubUnitkerja').val());

    $$(document).on('click','.chip.chipfilterjasa',function(e){ //start #chipfilterjasa
        var idchip = $$(this).data('urut');
        var fJeniskelamin = $$(this).data('fJeniskelamin');
        $$(".chip.chipfilterjasa").removeClass("dav-chipfilter_selected");
        $$("#" + idchip).addClass("dav-chipfilter_selected");
        if(fJeniskelamin == undefined || fJeniskelamin == ""){
            fJeniskelamin = '';
        }
        // console.log(fJeniskelamin);
        setSesi('fJeniskelamin', fJeniskelamin);
    }); //end #chipfilterjasa

    $$(document).on('click','.chip.chipfilterjasatotal',function(e){ //start #chipfilterjasa
        var fBanyakData = $$(this).data('total');
        $$(".chip.chipfilterjasatotal").removeClass("dav-chipfilter_selected");
        $$("#total" + fBanyakData).addClass("dav-chipfilter_selected");
        if(fBanyakData == undefined || fBanyakData == "" || fBanyakData == "semua"){
            fBanyakData = '2000';
        }
        // console.log(fBanyakData);
        setSesi('fBanyakData', fBanyakData);
    }); //end #chipfilterjasa
    
    $$('#fUnitkerja').on('change', function(){ //start #aa_area_tam change
        var val = $$(this).val();
        // console.log(val);

        setSesi('fUnitkerja', val);
        generate_subunitkerja('fSubUnitkerja', val);
        // fUnitkerja
    }); //stop #aa_area_tam change

    $$('#fSubUnitkerja').on('change', function(){ //start #aa_area_tam change
        var val = $$(this).val();
        // console.log(val);

        setSesi('fSubUnitkerja', val);
        // generate_subunitkerja('fSubUnitkerja', $$('#fUnitkerja').val());
        // fUnitkerja
    });

    $$('#fAgama').on('change', function(){ //start #aa_area_tam change
        var val = $$(this).val();
        // console.log(val);

        setSesi('fAgama', val);
        // generate_subunitkerja('fSubUnitkerja', $$('#fUnitkerja').val());
        // fUnitkerja
    });

    $$('#fEselon').on('change', function(){ //start #aa_area_tam change
        var val = $$(this).val();
        // console.log(val);

        setSesi('fEselon', val);
        // generate_subunitkerja('fSubUnitkerja', $$('#fUnitkerja').val());
        // fUnitkerja
    });

    $$('#fPendidikan').on('change', function(){ //start #aa_area_tam change
        var val = $$(this).val();
        // console.log(val);

        setSesi('fPendidikan', val);
        // generate_subunitkerja('fSubUnitkerja', $$('#fUnitkerja').val());
        // fUnitkerja
    });

    $$('#fPangkat').on('change', function(){ //start #aa_area_tam change
        var val = $$(this).val();
        // console.log(val);

        setSesi('fPangkat', val);
        // generate_subunitkerja('fSubUnitkerja', $$('#fUnitkerja').val());
        // fUnitkerja
    });
  
    $$(document).on('click','#reset-filter_pns',function(e){ //start #reset-filter_pns
        e.stopImmediatePropagation();
        reset_filter_biodata();
        // act_biodata();
        // setSesi('fAct', sesi('fAct'));
        get_data_table_ws(sesi("fAct"));
        dialog('Filter Telah Direset');
        refresh();

        });/* end reset-filter_pns */

    $$(document).on('click','#back',function(e){ //start #reset-filter_pns
        e.stopImmediatePropagation();
        reset_filter_biodata();
        // act_biodata();
        // setSesi('fAct', sesi('fAct'));
        get_data_table_ws(sesi("fAct"));
        refresh();

        });

    $$(document).on('click','#apply-filter_pns',function(e){ //start #reset-filter_pns
        e.stopImmediatePropagation();
        // act_biodata();
        // act_penjagaan_usia_pensiun();
        // setSesi('fAct', sesi('fAct'));
        get_data_table_ws(sesi('fAct'));
        load_page(sesi('page_menu'));
        // back();
        // console.log(sesi('fJeniskelamin'));
        setSesi('filter_page', 'ada');
        setSesi('fNip', $$('#fNIP').val());
        setSesi('fNama', $$('#fNama').val());
        });/* end reset-filter_pns */
}); //end pageinit filter-pns

function act_view_duk(){
    setSesi('fAct', "view");
}

function act_biodata(){
    setSesi('fAct', "biodatapns");
}

function act_penjagaan_kenaikan_pangkat_reguler(){

    setSesi('fAct', "kenaikan_pangkat_reguler");
}

function act_penjagaan_kenaikan_pangkat_pilihan(){
    setSesi('fAct', "kenaikan_pangkat_pilihan");
}

function act_penjagaan_kenaikan_gaji_berkala(){
    setSesi('fAct', "kenaikan_gaji_berkala");
}

function act_penjagaan_satyalancana10tahun(){
    setSesi('fAct', "satyalancana10tahun");
}

function act_penjagaan_satyalancana20tahun(){
    setSesi('fAct', "satyalancana20tahun");
}

function act_penjagaan_satyalancana30tahun(){
    localStorage.removeItem('fAct');
    setSesi('fAct', "satyalancana30tahun");
}

function act_penjagaan_usia_pensiun(){
    localStorage.removeItem('fAct');
    setSesi('fAct', "usia_pensiun");
}

function reset_filter_biodata(){
    setSesi('fUnitkerja', '');
    setSesi('fSubUnitkerja', '');
    setSesi('fJeniskelamin', '');
    setSesi('fBanyakData', '20');
    setSesi('fNama', '');    
    setSesi('fNip', '');    
    setSesi('fEselon', '');    
    setSesi('fAgama', '');    
    setSesi('fPendidikan', '');    
    setSesi('fPangkat', '');    
    setSesi('fAct', '');
}

function set_awal_filter(){
    sesi('fAct');
    if(sesi('filter_page') == 'login'){
        reset_filter_biodata();
    }
    var mySwiper3 = myApp.swiper('.swiper-3', {
        pagination:'.swiper-3 .swiper-pagination',
        spaceBetween: 20,
        slidesPerView: 3
        });

    var mySwiper3 = myApp.swiper('.swiper-totaldata', {
        pagination:'.swiper-3 .swiper-pagination',
        spaceBetween: 0,
        slidesPerView: 3
        });

    $$(".chip.chipfilterjasa").removeClass("dav-chipfilter_selected");
    
    if(sesi("fJeniskelamin") == ""){
        $$("#b1").addClass("dav-chipfilter_selected");
        // console.log('a');
    }else if(sesi("fJeniskelamin") == "Laki-laki"){
        $$("#b2").addClass("dav-chipfilter_selected");
        // console.log('b');
    }else if(sesi("fJeniskelamin") == "Perempuan"){
        $$("#b3").addClass("dav-chipfilter_selected");
        // console.log('c')
    }
    //set default
    var bnykdata =sesi("fBanyakData"); $$("#total"+bnykdata).addClass("dav-chipfilter_selected");

generate_unitkerja('fUnitkerja');
generate_subunitkerja('fSubUnitkerja', sesi('fUnitkerja'));
generate_eselon('fEselon');
generate_agama('fAgama');
generate_pendidikan('fPendidikan');
generate_pangkat('fPangkat');
    //

}
// ============================================= FUNGSI2 ========================================================
function refresh(){
    mainView.router.refreshPage();
}
function back(){
    // mainView.router.loadPage(urlP);
    mainView.router.back();
}
function load_page(url){
    mainView.router.loadPage(url);
}
function loadUrl(urlP){
    mainView.router.load({url: urlP, reload: false, ignoreCache: false});
}
function setSesi(nama,value){
    localStorage.setItem(nama, value);
}
function sesi(keyname){
    value = localStorage.getItem(keyname);
    return value;
}
function dialog(isi){
    myApp.alert(isi)
}

function selfie(idfoto){
    navigator.camera.getPicture(onSuccess, onFail, { 
        quality :100,
        destinationType : Camera.DestinationType.DATA_URL,
        targetWidth : 600,
        targetHeight : 600,
        correctOrientation : true,
        cameraDirection : Camera.Direction.BACK   
    }); 
    function onSuccess(imageData){
        var image = document.getElementById(idfoto);
        image.src = "data:image/jpeg;base64," + imageData;
        $$("." + idfoto).show();
        localStorage.imageuri = "data:image/jpeg;base64," + imageData;
    }
    function onFail(message){
        alert('failed coz: ' + message);
    }
}

function uploadFoto(idfoto){
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
        var image = document.getElementById(idfoto);
        image.src = "data:image/jpeg;base64," + imageData;
        $$("." + idfoto).show();
        localStorage.imageuri = "data:image/jpeg;base64," + imageData;
    }
    function onFail(message){
        alert('upload foto batal.');
        console.log(message);
    }
}

function uploadFotoToServer(url,namafoto){
    var imageURI = localStorage.imageuri;
    if (!imageURI) {
        myApp.alert('Please select an image first.' , 'Notification');
        return;
    }else {
        var options = new FileUploadOptions();
        options.fileKey="photo";
        options.fileName= imageURI.substr(imageURI.lastIndexOf('/')+1); 
        options.mimeType="image/jpeg";
        options.params = {id_user: localStorage.iduser, nama : namafoto};

        var win = function(r) {
            console.log("Should not be called.");
        }
        var fail = function(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        var ft = new FileTransfer();
        ft.upload(imageURI,encodeURI(host + url), win, fail, options);
    }
}

//menyimpan halaman sesi halaman yang dibuka terakhir kali
function setStoragePaging(url){
    localStorage.paging = url;
}

function unitkerja(){
    if(sesi('folder') == 'opd'){
        setSesi('fUnitkerja', sesi('unit_id'));
    }
}

function navbar_folder(){
    if(sesi('folder') == 'pegawai'){
        $$('#nav_penjagaan').hide();
        $$('#nav_proses').hide();
        $$('#nav_masterdata').hide();
    }
    else if(sesi('folder') == 'opd'){
        $$('#nav_masterdata').hide();
    }
    else{
        $$('#nav_penjagaan').show();
        $$('#nav_proses').show();
        $$('#nav_masterdata').show();
    }
}

function link_biodata(){
    $$('#link-bio').on('click', function(){
        if(sesi('folder') == 'admin' || sesi('folder') == 'opd'){
            load_page("view/menu_pegawai/biodata_pns.html");
        }
        else if(sesi('folder') == 'pegawai'){
            load_page("view/menu_pegawai/detail_pns.html");
            setSesi('nip_pns', sesi('username'));
        }
    })
    
}

function nama_menu(){
    $$.post(h+'android_webservice/action/act_login.php',{act : "index", username: sesi('username')}, function (response) {
        // console.log(response);
        var arr=JSON.parse(response);
        // console.log(arr[0]);
        setSesi('nama', arr[0]['nama'])
        if(sesi('folder') == 'admin'){
            $$("#home-font1").html(sesi('username'));
            $$("#home-font2").html(sesi('no_nip'));


            $$("#greeting2").html(sesi('username'));
            $$("#userlogin").html(sesi('no_nip'));
        }
        else if(sesi('folder') == 'opd'){
            $$("#home-font1").html(arr[0]['username']);
            $$("#home-font2").html(sesi('no_nip'));


            $$("#greeting2").html(arr[0]['username']);
            $$("#userlogin").html(sesi('no_nip'));
        }
        else{
            $$("#home-font1").html(sesi('nama'));
            $$("#home-font2").html(sesi('no_nip'));


            $$("#greeting2").html(sesi('nama'));
            $$("#userlogin").html(sesi('no_nip'));
        }
    });
}
/*
$$.post(h+'interface/testabelhamdi.php'
        ,{act : "biodatapns"
            , domain : 'android'
            , a_username : sesi('username')
            , a_level : sesi('level')
            , a_token : sesi('token')

            , fUnitkerja : _fUnitkerja
            , fUnitkerja : _fUnitkerja
            , fUnitkerjaSub : _fUnitkerjaSub
            , fNIP : _fNIP
            , fNama : _fNama
            , fEselon : _fEselon
            , fJeniskelamin : sesi('fJeniskelamin')
            , fAgama: _fAgama
            , fPendidikan : _fPendidikan
            , fPangkat : _fPangkat
            , fBanyakData : 20
            , fTipePegawai : _fTipePegawai
            , fJenisJabatan : _fJenisJabatan
            , linkfoto : hfoto
    }, function (response) { 
        $$('#testabelhamdi').html(response);
    });
    */
