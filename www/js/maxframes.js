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
    mainView.router.load({url: 'view/sign-in.html', reload: true, ignoreCache: true});
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
    console.log('arethusa');
    console.log(sesi('folder'));
    navbar_folder();
    link_biodata();
    // document.addEventListener('deviceready', function () { //start onesignal
    //     var notificationOpenedCallback = function(jsonData) {
    //         console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
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
    console.log("page init sign-in");
    navbar_folder();
    $$(document).on('click','#login',function(e){ //start click #login'
        e.stopImmediatePropagation(); 
        console.log('a');
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
            console.log(response);
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
    console.log("page init home");
    navbar_folder();
    nama_menu();
    
    $$(document).on('deviceready', function () {
        $$.post(host+'action/act_chart.php',{act : "chart"}, function (response) { 

            var arr=JSON.parse(response);
            // // console.log(arr);
            
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


    
    setSesi('page','view/home.html');

});//end pageinit home'1

//------------------------------------- halaman biodatapns -----------------------------------------------------------
myApp.onPageInit('biodata_pns', function (page) { //start pageinit biodatapns
    //setting awalan default
    console.log("page init biodata_pns");
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
    // console.log("Unit:" + sesi('fUnitKerja'));
    //end awalan default

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            console.log(inputtext);  
            setSesi('fNama', inputtext);
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
        console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#biopns_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        console.log('refresh');
        reset_filter_biodata();
        act_biodata();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','.detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        console.log('detaila' + nip);
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
            console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('kenaikan_pangkat_reguler', function (page) { //start pageinit biodatapns
    //setting awalan default
    console.log("page init biodata_pns");
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
            console.log(inputtext);  
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
        console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#kenaikan_pangkat_reguler_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_kenaikan_pangkat_reguler();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        console.log('detaila' + nip);
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
            console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('kenaikan_pangkat_pilihan', function (page) { //start pageinit biodatapns
    //setting awalan default
    console.log("page init biodata_pns");
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
            console.log(inputtext);  
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
        console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#kenaikan_pangkat_pilihan_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_kenaikan_pangkat_pilihan();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        console.log('detaila' + nip);
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
            console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('kenaikan_gaji_berkala', function (page) { //start pageinit biodatapns
    //setting awalan default
    console.log("page init biodata_pns");
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
            console.log(inputtext);  
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
        console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#kenaikan_gaji_berkala_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_kenaikan_gaji_berkala();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        console.log('detaila' + nip);
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
            console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('satyalancana10tahun', function (page) { //start pageinit biodatapns
    //setting awalan default
    console.log("page init biodata_pns");
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
            console.log(inputtext);  
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
        console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#satyalancana10tahun_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_satyalancana10tahun();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        console.log('detaila' + nip);
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
            console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('satyalancana20tahun', function (page) { //start pageinit biodatapns
    //setting awalan default
    console.log("page init biodata_pns");
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
            console.log(inputtext);  
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
        console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#satyalancana20tahun_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_satyalancana20tahun();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        console.log('detaila' + nip);
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
            console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('satyalancana30tahun', function (page) { //start pageinit biodatapns
    //setting awalan default
    console.log("page init biodata_pns");
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
    console.log("fAct: " + sesi('fAct'));
    console.log("page: " + sesi('page'));
    //end awalan default

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            console.log(inputtext);  
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
        console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#satyalancana30tahun_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_satyalancana30tahun();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        console.log('detaila' + nip);
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
            console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('usia_pensiun', function (page) { //start pageinit biodatapns
    //setting awalan default
    console.log("page init biodata_pns");
    
    navbar_folder();
    nama_menu();
    setSesi('page_menu','view/menu_penjagaan/usia_pensiun.html');
    setSesi('pagingtabel', '1');
    
    if(sesi('filter_page') != 'ada'){
        reset_filter_biodata();
        set_awal_filter();
    }
    $$(".preloader-biodatapns").hide();
    
    console.log("fAct: " + sesi('fAct'));
    console.log("page: " + sesi('page'));
    act_penjagaan_usia_pensiun();
    get_data_table_ws(sesi('fAct'));
    //end awalan default

    $$(document).on('keypress','#search_pns',function (e){ //start #searchlist
        if(e.which === 13){
            e.preventDefault();
            e.stopImmediatePropagation();
            var inputtext = $$(this).val();
            //localStorage.keyword = inputtext;
            console.log(inputtext);  
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
        console.log('tambah' + totalhalaman); //coba2doang
    }); //end click #biopns_tambahpegawai

    $$(document).on('click','#usia_pensiun_refresh',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        console.log('refresh');
        reset_filter_biodata();
        act_penjagaan_usia_pensiun();
        get_data_table_ws(sesi("fAct"));
    }); //end click #biopns_refresh

    $$(document).on('click','#detail_biopns',function(e){ //start click #biopns_refresh
        e.stopImmediatePropagation();
        var nip = $$(this).data('nip');
        console.log('detaila' + nip);
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
            console.log(halfix);
            if(halfix<=0){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else if(angka == "forward"){
            var halfix = halaman+1;
            console.log(halfix);
            if(halfix>batasatas){
                return false;
            }else{
                setSesi('pagingtabel',halfix);
                tampilkan_isi_tabel();
            }

        }else{
            setSesi('pagingtabel',angka);
            tampilkan_isi_tabel();
            console.log(angka); 
        }
        
    });

});//end pageinit biodatapns'

myApp.onPageInit('detail_pns', function (page) { //start pageinit biodatapns
    console.log("page init detail_pns" + sesi('nip_pns'));
    navbar_folder();
    nama_menu();
    // setSesi('page','view/menu_pegawai/detail_pns.html');
    setSesi('jenisdata', 'Jabatan');
    detail_pns();

    $$('#detail_pnsdata').on('change', function(e){ //start #pnstam_unitkerja
       e.stopImmediatePropagation();
        var val = $$(this).val();
        console.log(val);
        setSesi('jenisdata', val);
        detail_pns();
    });  //end #pnstam_unitkerja

    
});


function detail_pns(){
    $.ajax({
            url: host+'action/act_biodata_pns.php',
            type: "post",
            data: {act: "detailpns",nip : sesi('nip_pns'), user_level : sesi('level'), jenisdata : sesi('jenisdata') },
            async:false,
            success: function (data) {
               var result = JSON.parse(data);
               console.log('respon=' + data);
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
        console.log(val +"," +text);
        setSesi("unit_id",val );
        $$('#pnstam_unitkerjanama').val(text);
    });  //end #pnstam_unitkerja
    
    $$('#pnstam_lanj').on('click', function(e){ //start #pnstam_lanj
        
        var val = $$("#pnstam_unitkerja").val();
        var text = $("#pnstam_unitkerja :selected").text();
        var valsub = $$("#pnstam_unitkerjasub").val();
        console.log(val +"," +text);
        setSesi("unit_id",val );
        setSesi("unit_idsub",valsub );
        if(val == "pilih"){
            dialog('Harap pilih unit kerja terlebih dahulu');
        }else{
            console.log('ok');
            load_page("view/menu_pegawai/biodata_pns_tambahlanjut.html");
        }
    });  //end #pnstam_lanj
});


myApp.onPageInit('biodata_pns_tambahlanjut', function (page) { //start pageinit biodatapns
    navbar_folder();
    nama_menu();
    console.log('page init pns tambah lanjut' + sesi('unit_id') +"," + sesi('token') +",");
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
                   console.log(data);
                    if(data=="xxxxxxxxxxx")
                    {
                        dialog("token salah atau habis masa berlaku. Silakan login lagi");
                    }
                    else if (data == 'success' || data.includes('success')){ 
                        dialog('Simpan PNS baru berhasil!');
                        load_page("view/menu_pegawai/biodata_pns.html");
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
        console.log('hamdi '+sesi('token'));
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
            //console.log(arr['isi']);
            
            setSesi('isi_biodatapns', arr['isi']);
            tampilkan_isi_tabel();
           

            $$(".total_data").html(arr['jumlah_data']);
            $$(".preloader-biodatapns").hide(); 
        });
    }
    else if(sesi('fAct') == 'kenaikan_pangkat_reguler'){
        console.log('hamdi '+sesi('token'));
        
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
        console.log('hamdi '+sesi('token'));
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
        console.log('hamdi '+sesi('token'));
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
        console.log('hamdi '+sesi('token'));
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
        console.log('hamdi '+sesi('token'));
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
        console.log('hamdi '+sesi('token'));
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
        console.log('hamdi '+sesi('token'));
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

    // if(fAct == 'satyalancana30tahun'){
    //     var isitabel = sesi('isi_satyalancana30tahun');
    //     var spliter = isitabel.split("@");
    //     var halaman = parseInt(sesi('pagingtabel'));
    //     var awal = (halaman - 1) * qty_tampil;
    //     var akhir = halaman *qty_tampil;
    //     var totaldata = spliter.length;

    //     console.log(awal +" l" + akhir);
    //     var a = isitabel.split("@");
    //     for(var i = awal; i < akhir ; i++){
    //         isitabelfix = isitabelfix +   spliter[i];     
    //         if(i == (totaldata-1)){
    //             break;
    //         }    
    //     }
    //     $$(".isi-biodatapns").html(isitabelfix);
    //     //untuk p;aging cuy
        
    //     bikin_paging(totaldata, "page_biodatapns");
    // }
    // else if(fAct == 'usia_pensiun'){
    //     var isitabel = sesi('isi_usia_pensiun');
    //     var spliter = isitabel.split("@");
    //     var halaman = parseInt(sesi('pagingtabel'));
    //     var awal = (halaman - 1) * qty_tampil;
    //     var akhir = halaman *qty_tampil;
    //     var totaldata = spliter.length;

    //     console.log(awal +" l" + akhir);
    //     var a = isitabel.split("@");
    //     for(var i = awal; i < akhir ; i++){
    //         isitabelfix = isitabelfix +   spliter[i];     
    //         if(i == (totaldata-1)){
    //             break;
    //         }    
    //     }
    //     $$(".isi-biodatapns").html(isitabelfix);
    //     //untuk p;aging cuy
        
    //     bikin_paging(totaldata, "page_biodatapns");
    // }
        var isitabel = sesi('isi_biodatapns');
        var spliter = isitabel.split("@");
        var halaman = parseInt(sesi('pagingtabel'));
        var awal = (halaman - 1) * qty_tampil;
        var akhir = halaman *qty_tampil;
        var totaldata = spliter.length;

        console.log(awal +" l" + akhir);
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
    console.log("total halaman" + totalhalaman);
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
            console.log('a' + halamansaatini);
        }else{
            kelas = "";
            console.log('tidakaktif');
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
    console.log(penghitung);
    $$("." + idhtmlpaging).html(hasilpaging);     
} //end fungsi bkin paging

function generate_unitkerja(id){
    console.log(sesi('level'));
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
    console.log(sesi('level'));
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
               console.log(result);
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
     console.log(sesi('level'));
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
     console.log(sesi('level'));
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
     console.log(sesi('level'));
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
     console.log(sesi('level'));
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
        console.log(fJeniskelamin);
        setSesi('fJeniskelamin', fJeniskelamin);
    }); //end #chipfilterjasa

    $$(document).on('click','.chip.chipfilterjasatotal',function(e){ //start #chipfilterjasa
        var fBanyakData = $$(this).data('total');
        $$(".chip.chipfilterjasatotal").removeClass("dav-chipfilter_selected");
        $$("#total" + fBanyakData).addClass("dav-chipfilter_selected");
        if(fBanyakData == undefined || fBanyakData == "" || fBanyakData == "semua"){
            fBanyakData = '2000';
        }
        console.log(fBanyakData);
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
        console.log(sesi('fJeniskelamin'));
        setSesi('filter_page', 'ada');
        setSesi('fNip', $$('#fNIP').val());
        setSesi('fNama', $$('#fNama').val());
        });/* end reset-filter_pns */
}); //end pageinit filter-pns

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
        console.log('a');
    }else if(sesi("fJeniskelamin") == "Laki-laki"){
        $$("#b2").addClass("dav-chipfilter_selected");
        console.log('b');
    }else if(sesi("fJeniskelamin") == "Perempuan"){
        $$("#b3").addClass("dav-chipfilter_selected");
        console.log('c')
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
