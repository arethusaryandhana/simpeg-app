function awalaturarea(){
    var x = localStorage.dataarea;
    var dataku = x.split(";");
    $$("#aa_namalahan").val(dataku[1]);
    $$("#aa_luaslahan").val(dataku[2]);
    if(localStorage.sesiarea == "belum"){
        $$(".li_aa_sub").hide();
    }else{
        $$(".li_aa_sub").show();
    }
}


//------------------------------------- halaman atur_area -----------------------------------------------------------
myApp.onPageInit('atur_area', function (page) { //start pageinit atur_area
    localStorage.koordinat = "";
    localStorage.koordinattam = "";
    localStorage.qtytam = 0;
    localStorage.qty = 0;
    $$.post(host + 'fungsiumum/cek.php', {act: 'cekarea' , id : localStorage.iduser, level : localStorage.ulevel, id_lahan : localStorage.id_lahan}, function(data){
        var a = data;
        var fix = a.split("@");
        localStorage.dataarea = fix[0];
        localStorage.koordavid = fix[1];         
        localStorage.sesiarea = "sudah";
    });

    mapku();/* --- */awalaturarea();/* --- */beginmap();
    $$(".petague").show();

    $$(document).on('click','#back_atur_area',function(e){ //start #back_atur_area
        e.stopImmediatePropagation();
        e.preventDefault();
         mainView.router.loadPage(hnew + "umum/atur_area_before.php?stts=sudah&id=" + localStorage.iduser + "&level=" + localStorage.ulevel);
    }); //stop #back_atur_area

    $$(document).on('click','#jp_tampil',function(e){ //start #jp_tampil
        e.stopImmediatePropagation();
        e.preventDefault();
        $$(".petague").show();
    }); //stop #jp_tampil

    $$(document).on('click','#jp_hide',function(e){ //start #jp_hide
        e.stopImmediatePropagation();
        e.preventDefault();
        $$(".petague").hide();
    }); //stop #jp_hide

    $$('#aa_area').on('change', function(){ //start #aa_area change
        var val = $$(this).val();
        $$(".li_aa_sub").show();
        $$("#aa_subarea").html("")
        var a = "a,b";
        var fix = a.split(",");
        generatesubarea(val);
    }); //stop #aa_area change

    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    $$(document).on('click','#btnlokasi',function(e){ //start #btnlokasi
        e.stopImmediatePropagation();
        e.preventDefault();
        var sad = [];
        var lonpusat ;
        var latpusat;
        var gambarpeta = localStorage.koordinat;
        var z = gambarpeta.split(";");
        var total = z.length;

        for(var i=0; i<total ;i++){
            var loc = z[i].split("<");
            var a = parseFloat(loc[1]);
            var b = parseFloat(loc[0]);
            console.log(i);
            sad.push([a,b]);
            if(i == (z.length-1) ){
                console.log(i);
                var d = z[0].split("<");
                var aa = parseFloat(d[1]);
                var bb = parseFloat(d[0]);
                sad.push([aa,bb]);
            }
        }
        console.log(sad);
        var areaku = parseFloat(0);
        for(var i=0; i<sad.length-1 ;i++){
            var b = i +1;
            areaku = areaku + Math.radians(sad[b][0] - sad[i][0]) * (2 + Math.sin(Math.radians(sad[i][1])) +
            Math.sin(Math.radians(sad[b][1])));
        }
        areaku = Math.abs(areaku * 6378137.0 * 6378137.0 / 2.0);
        var n = areaku.toFixed(2);
        myApp.alert('areaku = ' + n);
        $$("#aa_luaslahan").val(n);
    }); //stop #btnlokasi

    $$(document).on('click','#btnaddkoor',function(e){ //start #btnaddkoor
        e.stopImmediatePropagation();
        e.preventDefault();
        var onSuccessx =function onSuccess (position) {
            var lat = position.coords.latitude.toFixed(6);
            var long = position.coords.longitude.toFixed(6);
            var a = localStorage.koordinat;
            var total = parseInt(localStorage.qty);
            var xd = "";/* --- */var b =1;
            if(total == 0){
                a = a + lat + "<" +long ;
                xd = "nol";
            }else if(total > 0){
                a = a + ";" +lat + "<" +long;
                xd = "lebih";
            }
            var angkabaru = total +1;
            localStorage.koordinat = a;
            localStorage.qty =angkabaru;
            beginmap();  
            console.log(localStorage.koordinat + "  mmtotal = " + localStorage.qty + xd );
        };
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
        var options = {maximumAge: 0, timeout: 80000, enableHighAccuracy:true};
        navigator.geolocation.getCurrentPosition(onSuccessx, onError, options);
    }); //stop #btnaddkoor

    $$(document).on('click','#btnclearkoor',function(e){ //start #btnclearkoor
        e.stopImmediatePropagation();
        e.preventDefault();
        localStorage.koordinat = "";
        localStorage.qty = 0;
        beginmap();
    }); //start #btnclearkoor

    $$(document).on('click','#btnupdatearea',function(e){ //start #btnupdatearea
        e.stopImmediatePropagation();
        e.preventDefault();
        var aa_area = $$("#aa_area").val();
        var aa_namalahan = $$("#aa_namalahan").val(); 
        var aa_subarea = $$("#aa_subarea").val();
        var aa_luaslahan = $$("#aa_luaslahan").val();
        var splitkor = localStorage.koordinat.split(";");
        var koorbaru = localStorage.koordinat + ";" + splitkor[0];
        console.log(localStorage.id_lahan);
        if(aa_area == "pilih" || aa_luaslahan == "pilih" || aa_subarea == "pilih" || aa_namalahan == ""){
            myApp.alert("area dan sub_area tidak boleh kosong!" );
        }else{
            $$.post(host + 'fungsiumum/cek.php', {act: 'simpanarea' , id : localStorage.iduser, id_area : aa_area, id_subarea : aa_subarea, luas_lahan : aa_luaslahan,
            level : localStorage.ulevel, koordinat : koorbaru, total : localStorage.qty, nama : aa_namalahan, id_lahan : localStorage.id_lahan}, function(data){
                if(data == "no"){
                    myApp.alert("Maaf update area gagal");
                }else{
                    $$.post(host + 'fungsiumum/cek.php', {act: 'cekarea', id: localStorage.iduser, level : localStorage.ulevel, id_lahan : localStorage.id_lahan}
                      , function(data){
                        var a = data;
                        var fix = a.split("@");
                        localStorage.dataarea = fix[0];
                        localStorage.koordavid = fix[1];
                        localStorage.sesiarea = "sudah";
                        myApp.alert("Wilayah baru berhasil tersimpan!" );
                        mainView.router.refreshPage();
                    });
                }
            });
        }
    }); //stop #btnupdatearea

}); //stop pageinit atur_area

function beginmap(){
    $$.post(host + 'json/jsonprofile.php', {act: "koordinat" , isi : localStorage.koordinat , qty : localStorage.qty }, function(data){
        var js = JSON.parse(data);  
        $$("#isikoordinat").html(js['isikoordinat']);
    }); 
}

function generatesubareakedua(a){
    $$.post(host + 'fungsiumum/picker.php', {act: 'subarea' , id_area : a}, function(data){
        var penampung = data.split("<");
        for (var i = 0; i < penampung.length ; i++) {
            var isi = penampung[i].split(";");
            myApp.smartSelectAddOption('#aa_subarea_tam', '<option value="'+ isi[0] +'">'+ isi[1] +'</option>');
        }
    });
}

function beginmaptam(){
    var a = localStorage.koordinattam;
    var b = parseInt(localStorage.qtytam);
    var hehe ="";
    var c = a.split(';');
    for (var i = 0; i<b; i++) {
        var d = c[i].split('<');
        hehe = hehe + ' <li> <div class="item-content"><div class="item-media">' +
           '<img src="icon/loc.png" width="33" alt=""/></div> <div class="item-inner"> <div class="item-title-row">' +
           '<div class="item-title">Koordinat '+ (i+1) +'</div> </div>' +
           '<div class="item-text"> Latitude : '+ d[0]+'<br/> Longitude : '+ d[1]+' </div>'+
           '</div> </div> </li>';
    }
    $$("#isikoordinattam").html(hehe);
    // $$.post(host + 'json/jsonprofile.php', {act: "koordinat" , isi : localStorage.koordinattam , qty : localStorage.qtytam }, function(data){
    //     var js = JSON.parse(data);  
    //     $$("#isikoordinattam").html(js['isikoordinat']);
    // }); 
}
 

//------------------------------------- halaman/umum/atur_area_tambah.php -----------------------------------------------------------
myApp.onPageInit('atur_area_tambah', function (page) { //start pageinit atur_area_tambah
    localStorage.koordinat = "";
    localStorage.koordinattam = "";
    localStorage.qtytam = 0;
    localStorage.qty = 0;
    beginmaptam();
    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    $$(document).on('click','#back_atur_area_tambah',function(e){ //start #back_atur_area_tambah
        e.stopImmediatePropagation();
        e.preventDefault();
        mainView.router.loadPage(hnew + "umum/atur_area_before.php?stts=sudah&id=" + localStorage.iduser + "&level=" + localStorage.ulevel);
    }); //stop #back_atur_area_tambah

    $$.post(host + 'fungsiumum/picker.php', {act: 'area' }, function(data){
        var penampung = data.split("<");
        for (var i = 0; i<penampung.length; i++) {
            var isi = penampung[i].split(";");
            myApp.smartSelectAddOption('#aa_area_tam', '<option value="'+ isi[0] +'">'+ isi[1] +'</option>');
        }
    });


    $$('#aa_area_tam').on('change', function(){ //start #aa_area_tam change
        var val = $$(this).val();
        $$("#aa_subarea_tam").html("");
        generatesubareakedua(val);
    }); //stop #aa_area_tam change

    $$(document).on('click','#btnaddkoortam',function(e){ //start #btnaddkoortam
        e.stopImmediatePropagation();
        e.preventDefault();
        var onSuccess = function(position) {
            var lat = position.coords.latitude.toFixed(6);
            var long = position.coords.longitude.toFixed(6);
            var a = localStorage.koordinattam;
            var total = parseInt(localStorage.qtytam);
            var xd = ""; var b =1;
            if(total == 0){
                a = a + lat + "<" +long ;
                xd = "nol";
            }else if(total > 0){
                a = a + ";" +lat + "<" +long;
                xd = "lebih";
            }
            var angkabaru = total +1;
            localStorage.koordinattam = a;
            localStorage.qtytam =angkabaru;
            beginmaptam();  
            console.log(localStorage.koordinattam + "  mmtotal = " + localStorage.qtytam + xd );
        };
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
        var options = {maximumAge: 0, timeout: 80000, enableHighAccuracy:true};
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }); //stop #btnaddkoortam

    $$(document).on('click','#btnlokasitam',function(e){ //start #btnlokasitam
        e.stopImmediatePropagation();
        e.preventDefault();
        var sad = []; //array berisikan koordinat longitude latitude
        var lonpusat ;
        var latpusat;
        var gambarpeta = localStorage.koordinattam;


        var z = gambarpeta.split(";");
        var total = z.length;
        console.log(sad);

        var areaku = parseFloat(0);
        
        for(var i=0; i<sad.length-1 ;i++){
        var b = i +1;
        areaku = areaku + Math.radians(sad[b][0] - sad[i][0]) * (2 + Math.sin(Math.radians(sad[i][1])) +
         Math.sin(Math.radians(sad[b][1])));
        }
        areaku = Math.abs(areaku * 6378137.0 * 6378137.0 / 2.0);
        var n = areaku.toFixed(2)
        myApp.alert('areaku = ' + n);
        $$("#aa_luaslahantam").val(n);
    }); //start #btnlokasitam

    $$(document).on('click','#btnclearkoortam',function(e){ //start #btnclearkoortam
        e.stopImmediatePropagation();
        e.preventDefault();
        localStorage.koordinattam = "";
        localStorage.qtytam = 0;
        beginmaptam();
    }); //stop #btnclearkoortam

    $$(document).on('click','#btnupdateareatam',function(e){ //start #btnupdateareatam
        e.stopImmediatePropagation();
        e.preventDefault();
        var aa_area = $$("#aa_area_tam").val(); 
        var aa_namalahan = $$("#aa_namalahan_tam").val(); 
        var aa_subarea = $$("#aa_subarea_tam").val();
        var aa_luaslahan = $$("#aa_luaslahantam").val();
        var splitkor = localStorage.koordinattam.split(";");
        var koorbaru = localStorage.koordinattam + ";" + splitkor[0];

        if(aa_area == "pilih" || aa_luaslahan == "pilih" || aa_subarea == "pilih" || aa_namalahan == ""){
            myApp.alert("area dan sub_area tidak boleh kosong!" );
        }else{
            $$.post(host + 'fungsiumum/cek.php', {act: 'simpanareabaru' , id : localStorage.iduser, id_area : aa_area, id_subarea : aa_subarea, luas_lahan : aa_luaslahan,level : localStorage.ulevel, koordinat : koorbaru, total : localStorage.qtytam, nama : aa_namalahan}, function(data){
                if(data == "yes"){
                    localStorage.koordinattam = ""; localStorage.qtytam = 0;
                    mainView.router.loadPage(hnew + "umum/atur_area_before.php?stts=sudah&id=" + localStorage.iduser + "&level=" + localStorage.ulevel);
                    myApp.alert('Tambah lahan baru berhasil');
                }else {
                    myApp.alert(data);
                }
            });
        }
    }); //stop #btnupdateareatam

}); //stop pageinit atur_area_tambah