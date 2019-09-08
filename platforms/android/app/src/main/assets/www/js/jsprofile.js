//------------------------ Function & variable global ------------------------
var bulanString=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
function getBulan(namaBulan){
    var indexBulan=0;
    if(namaBulan=='Januari' || namaBulan=='Jan' || namaBulan=='January'){
        indexBulan='01';
    }
    if(namaBulan=='Februari' || namaBulan=='Feb' || namaBulan=='February'){
        indexBulan='02';
    }
    if(namaBulan=='Marer' || namaBulan=='Mar' || namaBulan=='March'){
        indexBulan='03';
    }
    if(namaBulan=='April' || namaBulan=='Apr'){
        indexBulan='04';
    }
    if(namaBulan=='Mei' || namaBulan=='Mei' || namaBulan=='May'){
        indexBulan='05';
    }
    if(namaBulan=='Juni' || namaBulan=='Jun' || namaBulan=='June'){
        indexBulan='06';
    }
    if(namaBulan=='Juli' || namaBulan=='Jul' || namaBulan=='July'){
        indexBulan='07';
    }
    if(namaBulan=='Agustus' || namaBulan=='Agu' || namaBulan=='August'){
        indexBulan='08';
    }
    if(namaBulan=='September' || namaBulan=='Sep' || namaBulan=='September'){
        indexBulan='09';
    }
    if(namaBulan=='Oktober' || namaBulan=='Okt' || namaBulan=='October'){
        indexBulan='10';
    }
    if(namaBulan=='November' || namaBulan=='Nov'){
        indexBulan='11';
    }
    if(namaBulan=='Desember' || namaBulan=='Des'){
        indexBulan='12';
    }
    return indexBulan;
}
function appAlert(message){
    myApp.alert('<center>'+message+'</center>');
}
function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sliderActive(){
    var mySwiper = myApp.swiper('.swiper-container', {
        speed: 200,
        spaceBetween: 10,
        pagination:'.swiper-scrollbar'
    });
}

var selectedShape;
function clearSelection() {
    if (selectedShape) {
        selectedShape.setEditable(false);
        selectedShape = null;
    }
}

function setSelection(shape) {
    clearSelection();
    selectedShape = shape;
    shape.setEditable(true);
    google.maps.event.addListener(shape.getPath(), 'set_at', calcar);
    google.maps.event.addListener(shape.getPath(), 'insert_at', calcar);
}

function calcar() {
    if(selectedShape ==null){
        myApp.alert('Pilih area yang ingin dihitung terlebih dahulu');
    }else{
        var area = google.maps.geometry.spherical.computeArea(selectedShape.getPath());
        myApp.alert('Luas Area : ±'+parseInt(area)+' m²');
        // document.getElementById("area").innerHTML = "Area =" + area;
    }
}

function deleteSelectedShape() {
    if(selectedShape){
        selectedShape.setMap(null);
    }
}

function setSelectedShapeColor(color) {
    if(selectedShape){
        if(selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
            selectedShape.set('strokeColor', color);
        }else{
            selectedShape.set('fillColor', color);
        }
    }
}

function makeColorButton(color) {
    var button = document.createElement('span');
    button.className = 'color-button';
    button.style.backgroundColor = color;
    google.maps.event.addDomListener(button, 'click', function() {
        setSelectedShapeColor(color);
    });

    return button;
}

//------------------------ Function regex inputan  ------------------------
function isEmail(EmailAddress) {
    var Regex = /^([A-Za-z][A-Za-z0-9\-\.\_]*)\@([A-Za-z][A-Za-z0-9\-\_]*)(\.[A-Za-z][A-Za-z0-9\-\_]*)+$/ ;
    return Regex.test(EmailAddress) ;
}
function isPassword(Password) {
    var Regex = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*/;
    return Regex.test(Password) ;
}


//------------------------------------- halaman/detail_kendaraan.php -----------------------------------------------------------
myApp.onPageInit('detail_kendaraan', function (page) { //start pageinit detail_kendaraan
    getMenu();
    //-----------Block mematikan animasi loading saat request perpindahan map-----------
    $$(document).on('ajaxStart', function (e) {
        myApp.hideIndicator();
    });

    // -----------Block Realtime Update-----------
    var device_id=localStorage.deviceID; 
    var longi = '';
    var lati = '';
    var gmarkers = [];
    $("#pic_product").attr("src", localStorage.devicePic);
    $("#device-name").html(localStorage.deviceName);

    $$.post(hostWebservice+'action/History.php',{kendaraan:localStorage.deviceID}, function (result) {
        $('#history-content').append(result);
        sliderActive();
    });

    $$(document).on('click','#ambilDetailHariIni',function(e){ //start #ambilDetailHariIni
        $$.post(hostWebservice+'action/History.php',{idkendaraanselected:localStorage.deviceID,tanggalFix:$$(this).attr('tanggal')}, function (result) {//tambah menu berdasarakan user login
            var hasil = result.split("koordinat");
            $$('#kontenDetail').html('');
            $$('#kontenDetail').html(hasil[0]);
        });
        $('#TanggalDimaksud').html('<center>Detail <br> '+$$(this).attr('tanggal'));
        $("#kontenDetailKendaraan").slideUp();
        $("#kontenDetailKendaraan").slideDown();
        $('#bottom').html('<div style="height:150px;"></div>');
    }); //end #ambilDetailHariIni

    $$.post(hostWebservice+'action/History.php',{idKendaraan:localStorage.deviceID}, function (result) {
        var hasil = result.split(";");  
        lati=hasil[0];
        longi=hasil[1];
        var lokasi=hasil[2];
        $$('#detailAlamat').html(lokasi);
        var myLatLng = new google.maps.LatLng(parseFloat(lati), parseFloat(longi));
        var mapDetailKendaraan = new google.maps.Map(document.getElementById('map-realtime'), {
            zoom: 18,
            center: myLatLng,
            mapTypeId: 'terrain',
            disableDefaultUI: true,
            mapTypeControl: true,
            optimized: false, 
            zoomControl: true
        });
        addMarkers(parseFloat(longi),parseFloat(lati));

        var get_started = setInterval(function() {
            $$.post(hostWebservice+'action/History.php',{idKendaraan:localStorage.deviceID}, function (result) {
                var hasilRealTime = result.split(";");  
                if(hasilRealTime[1]==longi || hasilRealTime[0]==lati){
                    //nothing happend
                }else{
                    removeMarkers();
                    longi=hasilRealTime[1];
                    lati=hasilRealTime[0];
                    addMarkers(parseFloat(longi),parseFloat(lati));    
                }
            });
        }, 60000); 
        function addMarkers(longi,lati){
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(lati), parseFloat(longi)),
                icon: "img/icon-cars.png",
                map:mapDetailKendaraan
            });
            gmarkers.push(marker);
        }
        function removeMarkers(){
            for(var i=0; i<gmarkers.length; i++){
                gmarkers[i].setMap(null);
            }
        }
        function clearTimer(){
            clearInterval(get_started);
        }
        $$(document).on('click','#back',function(e){
            clearTimer();
        });
    });
    
    $$(document).on('click','#halaman_history',function(e){ //start #halaman_history
        e.preventDefault();
        e.stopImmediatePropagation();
        mainView.router.loadPage('halaman/halaman_history.php');
    }); //end #halaman_history
}); //end pageinit detail_kendaraan


//------------------------------------- halaman/halaman_history.php -----------------------------------------------------------
myApp.onPageInit('halaman_history', function (page) { //start pageinit halaman_history
    getMenu();
    var koordinatMap = [];
    $("#judul-riwayat").html('Detail Riwayat ' +localStorage.deviceName);

    var calendarDateFormatAwal = myApp.calendar({
        input: '#awal',
        dateFormat: 'dd MM yyyy'
    });    
    var calendarDateFormatAkhir = myApp.calendar({
        input: '#akhir',
        dateFormat: 'dd MM yyyy'
    });    

    $$(document).on('click','#ambilRiwayat',function(e){ //start #ambilRiwayat
        var bulantxt = $('#akhir').val().split(" "); alert(bulantxt);
        var indexBulan = getBulan(bulantxt[1]);
        var bulanFix = bulantxt[2]+"-"+indexBulan+"-"+bulantxt[0]; 
        $$.post(hostWebservice+'action/History.php',{idkendaraanselected:localStorage.deviceID,tanggalFix:bulanFix}, function (result) {//tambah menu berdasarakan user login
            var hasil = result.split("koordinat");
            $$('#kontenHistory').html('');
            $$('#kontenHistory').html(hasil[0]);
            var objlongitudeMap = JSON.parse(hasil[1]);
            var objlatitudeMap = JSON.parse(hasil[2]);
            var stringArraynya = '';
            for(var i=0; i<objlongitudeMap.length; i++){
                if(objlongitudeMap[i]=='stop'){
                    stringArraynya = stringArraynya + objlatitudeMap[i]+","+ objlongitudeMap[i] +";";
                }else{
                    stringArraynya = stringArraynya + parseFloat(objlatitudeMap[i])+","+ parseFloat(objlongitudeMap[i]) +";";
                }
            }
            koordinatMap = stringArraynya.split("stop,stop;");
            initialize(koordinatMap);
            // mainView.router.refreshPage();
        });

        $('#HistoryTanggalDimaksud').html('<center>Detail <br> '+$('#akhir').val());
        $$('#kontenAmbilRiwayat').removeClass('content-hide-first');
        $$('#kontenAmbilRiwayat').addClass('content-show-first');
    }); //end #ambilRiwayat
    
    $$(document).on('click','#calculate',function(e){ //start #calculate
        e.stopImmediatePropagation();
        calcar();
    }); //end #calculate

    // -----------Block Function Map Baru-----------
    function initialize(koordinatMap) {
        var drawingManagerHistory ='';
        var koordinatTengah = parseInt(koordinatMap.length/2);
        var korrdinatCenter = koordinatMap[koordinatTengah].split(",");

        var mapHistory = new google.maps.Map(document.getElementById('map-drawing'), {
            zoom: 18,
            mapTypeId: 'terrain',
            center: {lat: parseFloat(korrdinatCenter[0]),lng: parseFloat(korrdinatCenter[1])},
            disableDefaultUI: true,
            mapTypeControl:true,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.BOTTOM_LEFT
             },
            optimized: false, 
            zoomControl: true
        });
        
        var polyOptions = {
            strokeWeight: 0,
            fillOpacity: 0.45,
            editable: true
        };

        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.
        drawingManagerHistory = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon']
            },
            polygonOptions: polyOptions,
            map: mapHistory
        });

        google.maps.event.addListener(drawingManagerHistory, 'overlaycomplete', function(e) {
            if (e.type != google.maps.drawing.OverlayType.MARKER) {
                // Switch back to non-drawing mode after drawing a shape.
                drawingManagerHistory.setDrawingMode(null);

                // Add an event listener that selects the newly-drawn shape when the user
                // mouses down on it.
                var newShape = e.overlay;
                newShape.type = e.type;
                google.maps.event.addListener(newShape, 'click', function() {
                    setSelection(newShape);
                });
                var area = google.maps.geometry.spherical.computeArea(newShape.getPath());
                // document.getElementById("area").innerHTML = "Area =" + area;
                setSelection(newShape);
            }
        });
        
        // //----------------ini untuk draw map dengan area seperti segitiga bermuda
        // // var bermudaTriangle = new google.maps.Polygon({
        // //   paths: [koordinatMap, innerCoords],
        // //   strokeColor: '#FF0000',
        // //   strokeOpacity: 0.8,
        // //   strokeWeight: 2,
        // //   fillColor: '#FF0000',
        // //   fillOpacity: 0.35
        // // });
        // //--------------------------------------------------------------------

        //------------------maps draw line----------------------------------------
        for(var i=0; i<koordinatMap.length; i++){
            var koordinatDalam = koordinatMap[i].split(";");
            for(var j=0; j<koordinatDalam.length; j++){
                var nextIndex = parseInt(j)+parseInt(1);
                if(nextIndex>=koordinatDalam.length){
                }else{
                  var startCoords = koordinatDalam[j].split(",");
                  var startPt = new google.maps.LatLng(startCoords[0],startCoords[1]);
                  var endCoords = koordinatDalam[nextIndex].split(",");
                  var endPt = new google.maps.LatLng(endCoords[0],endCoords[1]);
                    
                  var bermudaTriangle = new google.maps.Polyline({
                     path: [startPt, endPt],
                     strokeColor: 'red',
                     strokeWeight: 2,
                     strokeOpacity: 1
                  });
                    bermudaTriangle.setMap(mapHistory); 
                }
            }
            
        }
        //--------------------------------------------------------------------

        //--------------- kalkukasi manual per koordinat
        var areaku=0;

         var mbek = [
            [112.755947,-7.251440],
            [112.756615,-7.251595],
            [112.756371,-7.252548 ],
            [112.755718,-7.252387],
            [112.755947,-7.251440]
        ];
        Math.radians = function(degrees) {
            return degrees * Math.PI / 180;
        };

        for(var i=0; i<mbek.length-1 ;i++){
            var b = i +1;
            areaku = areaku + Math.radians(mbek[b][0] - mbek[i][0]) * (2 + Math.sin(Math.radians(mbek[i][1])) +
            Math.sin(Math.radians(mbek[b][1])));
        }
        areaku = Math.abs(areaku * 6378137.0 * 6378137.0 / 2.0);
        var n = areaku.toFixed(2);
        // alert(n);
        //--------------------------------------------------------------------

        google.maps.event.addListener(drawingManagerHistory, 'drawingmode_changed', clearSelection);
        google.maps.event.addListener(mapHistory, 'click', clearSelection);
        google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);
        
    }
}); //end pageinit halaman_history hapus trigger


//------------------------------------- halaman/sign-up.php-----------------------------------------------------------
myApp.onPageInit('sign-up', function (page) { //start pageinit sign-up
    var pickerDevice = myApp.picker({
        input: '#signupsebagai',
        cols: [
            {
                textAlign: 'center',
                values: ['Kontraktor','Petani','Pedagang','Pabrik Beras']
            }
        ]
    });
    var booleansignupnama = false;
    var booleansignupnohp = false;
    var booleansignupemail = false;
    var booleansignupsebagai = false;
    var booleansignupusername = false;
    var booleansignuppassword = false;
    var booleansignupverifpassword = false;

    $$("#signupemail").focusout(function(){ //start #signupemail focusout
        var signupemail = $$('#signupemail').val();
        if(signupemail==''){
            appAlert('Email harap diisi !');
        }else{
            if(isEmail(signupemail)==true){ //isEmail function cek regex email
                $$.post(hostWebservice+'action/Register.php',{cekEmail:signupemail}, function (result) {
                    var hasil = result.split(";");
                    if(hasil[1]==0){
                        booleansignupemail=true;
                    }else{
                        appAlert('Email sudah terpakai, silahkan menggunakan email lain..');
                        $$("#signupemail").val('');
                        booleansignupemail=false;
                    }
                });
            }else{
                booleansignupemail=false;
                appAlert('Format email salah');
            } 
        }
    }); //end #signupemail focusout

    $$("#signupusername").focusout(function(){ //start #signupusername focusout
        var signupusername = $$('#signupusername').val();
        $$.post(hostWebservice+'action/Register.php',{cekUsername:signupusername}, function (result) {
            var hasil = result.split(";");
            if(hasil[1]==0){
                booleansignupusername=true;
            }else{
                appAlert('Username sudah terpakai, silahkan menggunakan username lain..');
                booleansignupusername=false;
            }
        });
    }); //end #signupusername focusout

    $$("#signuppassword").change(function(){ //start #signuppassword change
        var signuppassword = $$('#signuppassword').val();
        if(isPassword(signuppassword)==true){
            booleansignuppassword=true;
        }else{
            booleansignuppassword=false;
            appAlert('Password harus menggunakan kombinasi huruf besar, huruf kecil, angka, karakter special, dan minimal 8 karakter');
        }
    }); //end #signuppassword change

    $$("#signupverifpassword").change(function(){ //start #signupverifpassword change
        if($$("#signuppassword").val()==$$("#signupverifpassword").val()){
            booleansignupverifpassword = true;
        }else{
            booleansignupverifpassword = false;
            appAlert('Password belum sama..');
            $$("#signupverifpassword").val('');
            $$("#signupverifpassword").focus();
        }
    });  //end #signupverifpassword change

    $$(document).on('click','#signupstepone',function(e){ //start #signupstepone
        appAlert('sing up fired');
        e.preventDefault();
        e.stopImmediatePropagation();
        var signupnama = $$('#signupnama').val(); 
        var signupnohp = $$('#signupnohp').val(); 
        var signupemail = $$('#signupemail').val(); 
        var signupsebagai = $$('#signupsebagai').val();
        var signupusername = $$('#signupusername').val(); 
        var signuppassword = $$('#signuppassword').val(); 
        var signupverifpassword = $$('#signupverifpassword').val(); 
        if(signupnama!=''){
            booleansignupnama=true;
        }else{
            booleansignupnama=false;
            appAlert('Nama harus diisi !');
        }

        if(signupnohp!=''){
            booleansignupnohp=true;
        }else{
            booleansignupnohp=false;
            appAlert('Nomor HP harus diisi !');
        }

        if(signupemail!=''){//ini dibiarkan kosong karena sudah pasti true (dari validasi di atas)
        }else{
            booleansignupemail=false;
            appAlert('Email harus diisi !');
        }

        if(signupsebagai!=''){
            booleansignupsebagai=true;
        }else{
            booleansignupsebagai=false;
            appAlert('Register sebagai apa harus diisi !');
        }

        if(signupusername!=''){
            booleansignupusername=true;
        }else{
            booleansignupusername=false;
            appAlert('Username harus diisi !');
        }

        if(signuppassword!=''){//ini dibiarkan kosong karena sudah pasti true (dari validasi di atas)
        }else{
            booleansignuppassword=false;
            appAlert('Password harus diisi !');
        }

        if(signupverifpassword!=''){
            booleansignupverifpassword=true;
        }else{
            booleansignupverifpassword=false;
            appAlert('Password harus sama !');
        }
        appAlert('booleansignupnama = ' + booleansignupnama );
        appAlert('booleansignupnohp = ' + booleansignupnohp );
        appAlert('booleansignupemail = ' + booleansignupemail );
        appAlert('booleansignupsebagai = ' + booleansignupsebagai );
        appAlert('booleansignupusername = ' + booleansignupusername );
        appAlert('booleansignuppassword = ' + booleansignuppassword );
        appAlert('booleansignupverifpassword = ' + booleansignupverifpassword );
        if(booleansignupnama==true && booleansignupnohp==true && booleansignupemail==true && booleansignupsebagai==true && booleansignupusername==true && booleansignuppassword==true && booleansignupverifpassword==true){
            $$("#signupstepone").prop('disabled', true);
            appAlert('mulai masuk insert data');
            $$.post(hostWebservice+'action/Register.php',{signupnamaParam:signupnama,
                                    signupnohpParam:signupnohp,
                                    signupemailParam:signupemail,
                                    signupsebagaiParam:signupsebagai,
                                    signupusernameParam:signupusername,
                                    signuppasswordParam:signuppassword
                                }, function (result) {
                console.log(result);

                appAlert(result);
                $$("#signupstepone").prop('disabled', false);
                var hasil = result.split(";");
                if(hasil[1]=="Sukses"){
                    // myApp.addNotification({message: 'Registrasi berhasil..',hold:2000});
                    appAlert('Registrasi berhasil..<br>Silahkan lengkapi data diri anda pada bagian profile ');
                    //--------------------jangan lupa dinyalakan saat convert ke APK
                    //-----------------------------------------
                    // window.plugins.OneSignal.getIds(function (ids) {
                    //     localStorage.setItem('player_id', ids.userId);
                    //     gcmi = ids.userId;
                    //     localStorage.gcmid = ids.userId;
                    //     $$.post(hostWebservice+'action/Login.php',{usernameGCM:signupusername, gcm : ids.userId}, function (result) {
                    //     });
                    // });
                    //-----------------------------------------
                    $$.post(hostWebservice+'action/Login.php',{username:signupusername, password:signuppassword}, function (result) {
                            var obj = JSON.parse(result);
                            localStorage.iduser = obj[0]['id_user'];
                            localStorage.namauser = obj[0]['Nama'];
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            mainView.router.loadPage('halaman/sign-in.php');
                    });
                }else{
                    myApp.addNotification({message: 'Terjadi kesalahan, coba lagi..',hold:2000});
                }
            });
        }
    }); //end #signupstepone
}); //end pageinit sign-up trigger hapus

//------------------------------------- halaman/edit.php -----------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
//----------- halaman ini berfungsi untuk form register mengisi data. Sistemnya saat klik bagian yang mau diisi --------------
//----------- data, akan di redirect dahulu ke page ini. Hal tersebut dikarenakan jika form input terlalu panjang ------------
//----------- maka terdapat kemungkinan tampilan akan bug jika keyboard muncul (seperti terdorong ke atas viewnya) -----------
//----------------------------------------------------------------------------------------------------------------------------
myApp.onPageInit('edit', function (page) { //start pageinit edit
    $$('#editjudul').html(localStorage.judulEdit);
    $$('#editKonten').append('<center>'+
            '<div class="item-content ninety-percent margin-5" id="formedit" style="border-bottom:2px solid #088378;min-height:0px;height:40px;">'+
              '<div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">'+
                '<input id="'+localStorage.idSelected+'" type="text" style="font-size:12px;" value="'+localStorage.isiEdit+'" placeholder="'+localStorage.judulEdit+'" >'+
              '</div>'+
            '</div>'+
        '</center>');

    $$(document).on('click','#editsimpan',function(e){ //start #editsimpan
        e.stopImmediatePropagation();
        var idkomponen = '#'+localStorage.idSelected;
        localStorage.contentEdit = $$("#formedit").find(idkomponen).val();
        localStorage.flagEdit='1';
        e.preventDefault();
        e.stopImmediatePropagation();
        mainView.router.loadPage('halaman/profile.php');
    }); //end #editsimpan
}); //end pageinit edit

//------------------------------------- profile -----------------------------------------------------------
myApp.onPageInit('profile', function (page) { //start pageinit profile
    setPagingStorage('halaman/profile.php');
    getMenu();
    function cekEdit(){
        var idkomponenProfile = localStorage.idSelected.split('div');
        var idUbah = '#profile'+idkomponenProfile[1]; 
        $(idUbah).text(localStorage.contentEdit);
    }
    if(localStorage.flagEdit=='0'){
        $$.post(hostWebservice+'action/Profile.php',{userid:localStorage.iduser}, function (result) { 
            var obj = JSON.parse(result);
            //------------------------- Tab Info User ---------------------------- 
            $$('#profileusername').text(obj[0]['username']);/*--------*/localStorage.usernameProfile = $$('#profileusername').text();

            if(obj[0]['email_user']==''){
                $$('#profileemail').removeClass('font-black');
                $$('#profileemail').addClass('font-red');
            }else{
                $$('#profileemail').text(obj[0]['email_user']);/*--------*/localStorage.emailProfile = $$('#profileemail').text();
                $$('#profileemail').removeClass('edit-profile');
            }

            $$('#profilesebagai').text(listKelompokUser[obj[0]['sebagai']]);/*--------*/localStorage.sebagaiProfile = $$('#profilesebagai').text();

            $$('#profiletanggalbuat').text(obj[0]['tglbuat']);/*--------*/localStorage.tglbuatProfile = $$('#profiletanggalbuat').text();



            //------------------------- Tab Info Pribadi ---------------------------- 
            $$('#profilenama').text(obj[0]['nama']);/*--------*/localStorage.namaProfile = $$('#profilenama').text();
            if(obj[0]['nik_user']==''){
                $$('#profilenik').removeClass('font-black');
                $$('#profilenik').addClass('font-red');
            }else{
                $$('#profilenik').text(obj[0]['nik_user']);/*--------*/localStorage.nikProfile = $$('#profilenik').text();
            }

            $$('#profiletempatlahir').text(obj[0]['tempat_lahir']);/*--------*/localStorage.tempatlahirProfile = $$('#profiletempatlahir').text();

            if(obj[0]['tanggal_lahir']=='0000-00-00' || obj[0]['tanggal_lahir']=== null){}else{
                var penampungTglLahir = obj[0]['tanggal_lahir'].split('-');
                var tanggalLahir = penampungTglLahir[2];
                var bulanLahir = parseInt(penampungTglLahir[1])-1;
                var tahunLahir = penampungTglLahir[0];
                $$('#profiletanggallahir').val(tanggalLahir+" "+bulanString[bulanLahir]+" "+tahunLahir);/*--------*/localStorage.tanggallahirProfile = $$('#profiletanggallahir').val();
            }

            
            if(obj[0]['jeniskelamin']=='L'){
                $$('#profilejeniskelamin').val('Laki-laki');/*--------*/localStorage.jeniskelaminProfile = $$('#profilejeniskelamin').val();
            }else if(obj[0]['jeniskelamin']=='P'){
                $$('#profilejeniskelamin').val('Perempuan');/*--------*/localStorage.jeniskelaminProfile = $$('#profilejeniskelamin').val();
            }else{
                $$('#profilejeniskelamin').val('');/*--------*/localStorage.jeniskelaminProfile = $$('#profilejeniskelamin').val();
            }

            if(obj[0]['alamat']==''){
                $$('#profilealamat').removeClass('font-black');
                $$('#profilealamat').addClass('font-red');
            }else{
                $$('#profilealamat').text(obj[0]['alamat']);/*--------*/localStorage.alamatProfile = $$('#profilealamat').text();
            }
            
            if(obj[0]['rt/rw']==''){
                $$('#profilertrw').removeClass('font-black');
                $$('#profilertrw').addClass('font-red');
            }else{
                $$('#profilertrw').text(obj[0]['rt/rw']);/*--------*/localStorage.rtrwProfile = $$('#profilertrw').text();
            }

            if(obj[0]['kelurahan']==''){
                $$('#profilekelurahan').removeClass('font-black');
                $$('#profilekelurahan').addClass('font-red');
            }else{
                $$('#profilekelurahan').text(obj[0]['kelurahan']);/*--------*/localStorage.kelurahanProfile = $$('#profilekelurahan').text();
            }

            if(obj[0]['desa']==''){
                $$('#profiledesa').removeClass('font-black');
                $$('#profiledesa').addClass('font-red');
            }else{
                $$('#profiledesa').text(obj[0]['desa']);/*--------*/localStorage.desaProfile = $$('#profiledesa').text();
            }

            if(obj[0]['kecamatan']==''){
                $$('#profilekecamatan').removeClass('font-black');
                $$('#profilekecamatan').addClass('font-red');
            }else{
                $$('#profilekecamatan').text(obj[0]['kecamatan']);/*--------*/localStorage.kecamatanProfile = $$('#profilekecamatan').text();
            }

            if(obj[0]['kodepos']==''){
                $$('#profilekodepos').removeClass('font-black');
                $$('#profilekodepos').addClass('font-red');
            }else{
                $$('#profilekodepos').text(obj[0]['kodepos']);/*--------*/localStorage.kodeposProfile = $$('#profilekodepos').text();
            }

            if(obj[0]['agama']==''){
                $$('#profileagama').removeClass('font-black');
                $$('#profileagama').addClass('font-red');
            }else{
                $$('#profileagama').text(obj[0]['agama']);/*--------*/localStorage.agamaProfile = $$('#profileagama').text();
            }

            if(obj[0]['nohp']==''){
                $$('#profilenohp').removeClass('font-black');
                $$('#profilenohp').addClass('font-red');
            }else{
                $$('#profilenohp').text(obj[0]['nohp']);/*--------*/localStorage.nohpProfile = $$('#profilenohp').text();
            }

            if(obj[0]['npwp']==''){
                $$('#profilenpwp').removeClass('font-black');
                $$('#profilenpwp').addClass('font-red');
            }else{
                $$('#profilenpwp').text(obj[0]['npwp']);/*--------*/localStorage.npwpProfile = $$('#profilenpwp').text();
            }


            //------------------------- Tab Info Foto ----------------------------
            if(obj[0]['foto_profile']==''){
                $("#profilefoto").attr("src","img/menu_icon/blank_profile.png");/*--------*/localStorage.fotoprofileProfile = "img/menu_icon/blank_profile.png";
            }else{
                var linkFoto = host + 'upload/profilepicuser/'+obj[0]['foto_profile'];
                $$('#profilefoto').css("width", '120px');
                $$('#profilefoto').css("height", '120px');
                $("#profilefoto").attr("src",linkFoto);/*--------*/localStorage.fotoprofileProfile = linkFoto;
            }   

            if(obj[0]['foto_ktp']==''){
                $("#profilektp").attr("src","img/etc/ktp.jpg");/*--------*/localStorage.fotoktpProfile = "img/menu_icon/blank_profile.png";
            }else{
                var linkFoto = host + 'upload/ktpuser/'+obj[0]['foto_ktp'];
                $$('.page-content').css("padding-bottom", '20%');
                $("#profilektp").attr("src",linkFoto);/*--------*/localStorage.fotoktpProfile = linkFoto;
            }   

            if(obj[0]['selfiefotoktp']==''){
                $("#profileselfiektp").attr("src","img/etc/ktp.jpg");/*--------*/localStorage.selfiefotoktpProfile = "img/menu_icon/blank_profile.png";
            }else{
                var linkFoto = host + 'upload/selfiektpuser/'+obj[0]['selfiefotoktp'];
                $$('.page-content').css("padding-bottom", '20%');
                $("#profileselfiektp").attr("src",linkFoto);/*--------*/localStorage.selfiefotoktpProfile = linkFoto;
            }   
        });
    }else{
        $$('#profileusername').text(localStorage.usernameProfile);
        $$('#profileemail').text(localStorage.emailProfile);
        $$('#profilesebagai').text(localStorage.sebagaiProfile);
        $$('#profiletanggalbuat').text(localStorage.tglbuatProfile);
        $$('#profilenama').text(localStorage.namaProfile);
        $$('#profilenik').text(localStorage.nikProfile);
        $$('#profiletempatlahir').text(localStorage.tempatlahirProfile);
        $$('#profiletanggallahir').val(localStorage.tanggallahirProfile);
        $$('#profilejeniskelamin').val(localStorage.jeniskelaminProfile);
        $$('#profilejeniskelamin').val(localStorage.jeniskelaminProfile);
        $$('#profilejeniskelamin').val(localStorage.jeniskelaminProfile);
        $$('#profilealamat').text(localStorage.alamatProfile);
        $$('#profilertrw').text(localStorage.rtrwProfile);
        $$('#profilekelurahan').text(localStorage.kelurahanProfile);
        $$('#profiledesa').text(localStorage.desaProfile);
        $$('#profilekecamatan').text(localStorage.kecamatanProfile);
        $$('#profilekodepos').text(localStorage.kodeposProfile);
        $$('#profileagama').text(localStorage.agamaProfile);
        $$('#profilenohp').text(localStorage.nohpProfile);
        $$('#profilenpwp').text(localStorage.npwpProfile);
        $$("#profilefoto").attr("src",localStorage.fotoprofileProfile);
        $$("#profilektp").attr("src",localStorage.fotoktpProfile);
        $$("#profileselfiektp").attr("src",localStorage.selfiefotoktpProfile);
        cekEdit();
    }


    if(localStorage.opentab==1){
        $$('#2').removeClass('active');
        $$('#3').removeClass('active');
        $$('#1').addClass('active');

        $$('#tab32').removeClass('active');
        $$('#tab33').removeClass('active');
        $$('#tab31').addClass('active');

        $(".tabs").css("transform","translate3d(0px, 0px, 0px)");
    }else if(localStorage.opentab==2){
        $$('#1').removeClass('active');
        $$('#3').removeClass('active');
        $$('#2').addClass('active');

        $$('#tab31').removeClass('active');
        $$('#tab33').removeClass('active');
        $$('#tab32').addClass('active');

        $(".tabs").css("transform","translate3d(-100%, 0px, 0px)");
    }else if(localStorage.opentab==3){
        $$('#1').removeClass('active');
        $$('#2').removeClass('active');
        $$('#3').addClass('active');

        $$('#tab31').removeClass('active');
        $$('#tab32').removeClass('active');
        $$('#tab33').addClass('active');

        $(".tabs").css("transform","translate3d(-200%, 0px, 0px)");
    }

    $$(document).on('click','.tab-link',function(e){
        localStorage.opentab = $$(this).attr('id');
    });
    
     $$(document).on('click','#back',function(e){
        mainView.router.back({
            url: 'halaman/home.php',
            force: true,
            ignoreCache: true
        });
    });

    var calendarDateFormatAkhir = myApp.calendar({
        input: '#profiletanggallahir',
        dateFormat: 'dd MM yyyy'
    });    
    var pickerDevice = myApp.picker({
        input: '#profilejeniskelamin',
        cols: [
            {
                textAlign: 'center',
                values: ['Laki-laki','Perempuan']
            }
        ]
    });
    var pickerDevice2 = myApp.picker({
        input: '#profileagama',
        cols: [
            {
                textAlign: 'center',
                values: ['Islam','Kristen','Katholik','Buddha','Hidhu','Lainnya']
            }
        ]
    });
    
    var listKelompokUser= ['Kontraktor','Petani','Pedagang','Pabrik Beras'];
    var booleanPropic = false;
    var booleanPotoKTP = false;
    var booleanSelfieKTP = false;

    $$(document).on('click','.edit-profile',function(e){
        localStorage.judulEdit = $$(this).attr('judul');
        localStorage.idSelected = $$(this).attr('id');
        if($$(this).attr('judul')==$$(this).text()){
            localStorage.isiEdit = '';
        }else{
            localStorage.isiEdit = $$(this).text();    
        }
        localStorage.flagEdit = '1';
        e.preventDefault();
        e.stopImmediatePropagation();
        mainView.router.loadPage('halaman/edit.php');
    });

    //----------------------------------------------------------
    $$(document).on('click','#profileopenselfiektp',function(e){
        e.stopImmediatePropagation(); e.preventDefault();
        navigator.camera.getPicture(onSuccess, onFail, {
            quality :100,
            destinationType : Camera.DestinationType.DATA_URL,
            targetWidth : 600, 
            targetHeight : 600, 
            correctOrientation : true,
            cameraDirection : Camera.Direction.BACK   
        }); 
        function onSuccess(imageData){
            var image = document.getElementById('profileselfiektp');
            image.src = "data:image/jpeg;base64," + imageData;
            $$('#profileselfiektp').css("width", '100%');
            booleanPropic = true;
        }
        function onFail(message){
            appAlert('Gagal : ' + message);
        }
    });
    $$(document).on('click','#profilegantifoto',function(e){
        e.stopImmediatePropagation(); e.preventDefault();
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
            var image = document.getElementById('profilefoto');
            $$('#profilefoto').css("width", '120px');
            $$('#profilefoto').css("height", '120px');
            booleanPotoKTP = true;
            image.src = "data:image/jpeg;base64," + imageData;
        }
        function onFail(message){
            myApp.alert('upload foto batal.');
            console.log(message);
        }
    });

    $$(document).on('click','#profilegantifotoktp',function(e){
        e.stopImmediatePropagation(); e.preventDefault();
        navigator.camera.getPicture(onSuccess, onFail, { quality :100,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth : 600, targetHeight : 600, correctOrientation : true,
        cameraDirection : Camera.Direction.BACK   
        }); 
        function onSuccess(imageData){
            var image = document.getElementById('profilektp');
            $$('#profilektp').css("width", '100%');
            booleanSelfieKTP = true;
            image.src = "data:image/jpeg;base64," + imageData;
        }
        function onFail(message){
            myApp.alert('upload foto batal.');
            console.log(message);
        }
    });

    $$(document).on('click','#profilegantifotoselfiektp',function(e){
        e.stopImmediatePropagation(); e.preventDefault();
        navigator.camera.getPicture(onSuccess, onFail, { quality :100,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth : 600, targetHeight : 600, correctOrientation : true,
        cameraDirection : Camera.Direction.BACK   
        }); 
        function onSuccess(imageData){
            var image = document.getElementById('profileselfiektp');
            $$('#profileselfiektp').css("width", '100%');
            image.src = "data:image/jpeg;base64," + imageData;
        }
        function onFail(message){
            myApp.alert('upload foto batal.');
            console.log(message);
        }
    });

    $$("#profileemail").focusout(function(){
        var signupemail = $$('#profileemail').val();
        if(signupemail==''){
            appAlert('Email harap diisi !');
        }else{
            if(isEmail(signupemail)==true){
                $$.post(hostWebservice+'action/Register.php',{cekEmail:signupemail}, function (result) {
                    var hasil = result.split(";");
                    if(hasil[1]==0){
                    }else{
                        appAlert('Email sudah terpakai, silahkan menggunakan email lain..');
                        $$("#profileemail").val('');
                    }
                });
            }else{
                booleansignupemail=false;
                appAlert('Format email salah');
            } 
        }
    });

    function uploadPhoto(idelemen,guna){ 
        myApp.showIndicator();
        var imageURI = $$(idelemen).attr("src");
        var options = new FileUploadOptions();
        options.fileKey="photo";
        options.fileName= imageURI.substr(imageURI.lastIndexOf('/')+1); 
        options.mimeType="image/jpeg";
        options.params = {action : guna, url : imageURI, iduser:localStorage.iduser};
        options.chunkedMode = false;
        var win = function(r) {
            appAlert("Upload Sukses ");
            console.log("Should not be called.");
            myApp.hideIndicator();
        }
        var fail = function(error) {
            appAlert("Upload Gagal");
            myApp.hideIndicator();
            // error.code == FileTransferError.ABORT_ERR
            // myApp.alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }                  
        var ft = new FileTransfer();
        ft.upload(imageURI,encodeURI(host + "Profile.php"), win, fail, options); 
    }   

    $$(document).on('click','#profilesimpan',function(e){
        e.stopImmediatePropagation();

        if($$('#profilenama').text()==$$('#profilenama').attr('judul')){ var profilenama = ''; }else{
            var profilenama = $$('#profilenama').text(); 
        }

        if($$('#profilenik').text()==$$('#profilenik').attr('judul')){ var profilenik = ''; }else{
            var profilenik = $$('#profilenik').text(); 
        }

        if($$('#profiletempatlahir').text()==$$('#profiletempatlahir').attr('judul')){ var profiletempatlahir = ''; }else{
            var profiletempatlahir = $$('#profiletempatlahir').text(); 
        }

        if($$('#profiletanggallahir').val()==$$('#profiletanggallahir').attr('judul')){ var profiletanggallahirFix = ''; }else{
            var profiletanggallahir = $$('#profiletanggallahir').val().split(" ");
            var profiletanggallahirFix = profiletanggallahir[2]+"-"+getBulan(profiletanggallahir[1])+"-"+profiletanggallahir[0]; 
        }

        if($$('#profilejeniskelamin').val()==$$('#profilejeniskelamin').attr('judul')){ var profilejeniskelamin = ''; }else{
            var profilejeniskelamin = $$('#profilejeniskelamin').val().substring(0, 1); 
        }

        if($$('#profilealamat').text()==$$('#profilealamat').attr('judul')){ var profilealamat = ''; }else{
            var profilealamat = $$('#profilealamat').text(); 
        }

        if($$('#profilertrw').text()==$$('#profilertrw').attr('judul')){ var profilertrwx = 'xxx/xxx'; var profilertrw = profilertrwx.split("/"); }else{
            var profilertrw = $$('#profilertrw').text().split("/"); 
        }

        if($$('#profilekelurahan').text()==$$('#profilekelurahan').attr('judul')){ var profilekelurahan = ''; }else{
            var profilekelurahan = $$('#profilekelurahan').text(); 
        }

        if($$('#profiledesa').text()==$$('#profiledesa').attr('judul')){ var profiledesa = ''; }else{
            var profiledesa = $$('#profiledesa').text(); 
        }

        if($$('#profilekecamatan').text()==$$('#profilekecamatan').attr('judul')){ var profilekecamatan = ''; }else{
            var profilekecamatan = $$('#profilekecamatan').text(); 
        }

        if($$('#profilekodepos').text()==$$('#profilekodepos').attr('judul')){ var profilekodepos = ''; }else{
            var profilekodepos = $$('#profilekodepos').text(); 
        }

        // var profileagama = $$('#profileagama').val();  
        var profileagama = '';  

        if($$('#profilenohp').text()==$$('#profilenohp').attr('judul')){ var profilenohp = ''; }else{
            var profilenohp = $$('#profilenohp').text(); 
        }

        if($$('#profileemail').text()==$$('#profileemail').attr('judul')){ var profileemail = ''; }else{
            var profileemail = $$('#profileemail').text(); 
        }

        if($$('#profilenpwp').text()==$$('#profilenpwp').attr('judul')){ var profilenpwp = ''; }else{
            var profilenpwp = $$('#profilenpwp').text(); 
        }

        if($$('#profileusername').text()==$$('#profileusername').attr('judul')){ var profileusername = ''; }else{
            var profileusername = $$('#profileusername').text(); 
        }

        if($$('#profileemail').text()=='' || $$('#profileemail').text()==' '){
            $$('#profileemail').text(profileemail);
        }
        $$.post(hostWebservice+'action/Profile.php',{profileid:localStorage.iduser,          
                                    profilenama : profilenama,          
                                    profilenik : profilenik,            
                                    profiletempatlahir : profiletempatlahir,            
                                    profiletanggallahirFix : profiletanggallahirFix,            
                                    profilejeniskelamin : profilejeniskelamin,          
                                    profilealamat : profilealamat,          
                                    profilert : profilertrw[0],         
                                    profilerw : profilertrw[1],         
                                    profilekelurahan : profilekelurahan,            
                                    profiledesa : profiledesa,          
                                    profilekecamatan : profilekecamatan,            
                                    profilekodepos : profilekodepos,            
                                    profileagama : profileagama,            
                                    profilenohp : profilenohp,          
                                    profileemail : profileemail,            
                                    profilenpwp : profilenpwp,          
                                    profileusername : profileusername           
                                }, function (result) {
            var hasil = result.split(";");
            if(hasil[1]=="Sukses"){
                var imageURIprofilefoto = $$('#profilefoto').attr("src"); 
                var imageURIprofilektp = $$('#profilektp').attr("src"); 
                var imageURIprofileselfiektp = $$('#profileselfiektp').attr("src"); 
                if(imageURIprofilefoto.includes("data:image")===true){
                    uploadPhoto('#profilefoto','propicxxx');
                }
                if(imageURIprofilektp.includes("data:image")===true){
                    uploadPhoto('#profilektp','ktpxxx');
                }
                if(imageURIprofileselfiektp.includes("data:image")===true){
                    uploadPhoto('#profileselfiektp','selfiektpxxx');
                }
                myApp.addNotification({message: 'Data sudah terupdate..',hold:2000});
               
            }else{
                myApp.addNotification({message: 'Terjadi kesalahan, coba lagi..',});
            }
        });
    });
}); //end pageinit profile trigger hapus


//------------------------------------- lahan -----------------------------------------------------------
myApp.onPageInit('lahan', function (page) {
    var counterKoordinatLahan = 0;
    var koordinatArray = [];
    getMenu();
    function loadLahan(){
        $$.post(hostWebservice+'action/Lahan.php',{lahanuser:localStorage.iduser}, function (result) {
           $('#lahanuser').html(result);
            var mySwiper = myApp.swiper('.swiper-container', {
                  speed: 200,
                spaceBetween: 10,
                pagination:'.swiper-scrollbar'
            });
        });
    }
    loadLahan();

    var pickerDevice1 = myApp.picker({
        input: '#lahanarea',
        cols: [
            {
                textAlign: 'center',
                values: ['Jawa Timur','Jawa Barat']
            }
        ]
    });

    var pickerDevice2 = myApp.picker({
        input: '#lahansubarea',
        cols: [
            {
                textAlign: 'center',
                values: ['Surabaya','Sidoarjo','Solo','Surakarta']
            }
        ]
    });

     $$(document).on('click','#detaillahan',function(e){
         e.stopImmediatePropagation();
        $("#detailLahanUser").slideUp();
        $("#detailLahanUser").slideDown();
        

        var idlahan = $$(this).attr("did");
        $$.post(hostWebservice+'action/Lahan.php',{idlahanDiambil:idlahan}, function (result) {
            var obj = JSON.parse(result);
            $('#lahanJudulDetailSelected').html(obj[0]['nama']);
            $('#lahanDetailSelected').html('Area : '+obj[0]['idarea']+', '+obj[0]['idsubarea']+'<br>Luas :'+obj[0]['luaslahan']);
        });
        $$.post(hostWebservice+'action/Lahan.php',{idkoordinatlahan:idlahan}, function (result) {
            // var drawingManager;
            var obj = JSON.parse(result);
            var koordinatnya = [];
            for(var i=0; i<obj.length; i++){
                    koordinatnya.push( {lat:parseFloat(obj[i]['koordinatlongitude']), lng:parseFloat(obj[i]['koordinatlatitude']) } );
            }
            var mapLahan = new google.maps.Map(document.getElementById('map-detail'), {
                zoom: 18,
                center: koordinatnya[0],
                mapTypeId: 'terrain',
                disableDefaultUI: true,
                optimized: false, 
                zoomControl: true
            });
        
            // var polyOptionsLahan = {
            //     strokeWeight: 0,
            //     fillOpacity: 0.45,
            //     editable: true
            // };

            // drawingManager = new google.maps.drawing.DrawingManager({
            //     drawingMode: google.maps.drawing.OverlayType.POLYGON,
            //     drawingControl: true,
            //     drawingControlOptions: {
            //         position: google.maps.ControlPosition.TOP_CENTER,
            //         drawingModes: ['polygon']
            //     },
            //     polygonOptions: polyOptionsLahan,
            //     map: mapDrawing
            // });
            var bermudaTriangle = new google.maps.Polygon({
              paths: koordinatnya,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35
            });
            bermudaTriangle.setMap(mapDrawing);
        });
    });


    $$(document).on('click','#lahangantigambar',function(e){
        e.stopImmediatePropagation(); e.preventDefault();
        navigator.camera.getPicture(onSuccess, onFail, { quality :100,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth : 600, targetHeight : 600, correctOrientation : true,
        cameraDirection : Camera.Direction.BACK   
        }); 
        function onSuccess(imageData){
            var image = document.getElementById('lahangambar');
            $$('#lahangambar').css("width", '100%');
            image.src = "data:image/jpeg;base64," + imageData;
        }
        function onFail(message){
            myApp.alert('upload foto batal.');
            console.log(message);
        }
    });

    $$("#lahantambah").click(function(){
        $('#lahantambah').css('display','none');
        $("#lahandata").slideToggle();
        $("#detailLahanUser").slideUp();
    });

    $$(document).on('click','#lahanjaditambah',function(e){
        e.stopImmediatePropagation(); e.preventDefault();
        myApp.showIndicator();
        var penomoran = parseInt(counterKoordinatLahan)+1;
        var onSuccess = function(position) {
            myApp.hideIndicator();
            var lat = position.coords.latitude.toFixed(6);
            var long = position.coords.longitude.toFixed(6);
            koordinatArray.push([long,lat]);
             $('#lahankoordinat').append('<div class="item-content ninety-percent margin-5" style="min-height:0px;height:40px;">'+
                                            '<div class="item-inner" style="min-height:0px;height:40px;margin-left:0px;">'+
                                                  '<input type="text" style="font-size:12px;" id="koordinat'+counterKoordinatLahan+'" value=" '+penomoran+'.  Lat :'+lat+', Long : '+long+'">'+
                                            '</div>'+
                                        '</div>');
             counterKoordinatLahan = counterKoordinatLahan+1;
             if(counterKoordinatLahan>=2){
                $("#lahankalkulasikoordinat").show();
             }
        };
        function onError(error) {
            myApp.hideIndicator();
            appAlert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
        var options = {maximumAge: 0, timeout: 80000, enableHighAccuracy:true};
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    });

    $$("#lahanbataltambah").click(function(){
        $("#lahandata").slideToggle();
        setTimeout(function () {
            $('#lahantambah').css('display','block');
        }, 500);
        koordinatArray=[];
        $('#lahankoordinat').html('');
        $('lahannama').html('');
        $('lahanarea').html('');
        $('lahansubarea').html('');
        $('lahanluas').html('');
        counterKoordinatLahan = 0;
    });

    $$("#lahankalkulasikoordinat").click(function(){
        var areaku=0;
        koordinatArray.push(koordinatArray[0]);
        Math.radians = function(degrees) {
          return degrees * Math.PI / 180;
        };
        for(var i=0; i<koordinatArray.length-1 ;i++){
            var b = i +1;
            areaku = areaku + Math.radians(koordinatArray[b][0] - koordinatArray[i][0]) * (2 + Math.sin(Math.radians(koordinatArray[i][1])) +
             Math.sin(Math.radians(koordinatArray[b][1])));
        }
        areaku = Math.abs(areaku * 6378137.0 * 6378137.0 / 2.0);
        var n = areaku.toFixed(2);
        $$('#lahanluas').val(n+' m²');
    });

    function uploadPhotoLahan(param){
        myApp.showIndicator();
        var imageURI = $$('#lahangambar').attr("src");
        var options = new FileUploadOptions();
        options.fileKey="photo";
        options.fileName= imageURI.substr(imageURI.lastIndexOf('/')+1); 
        options.mimeType="image/jpeg";
        options.params = {action : 'lahan', url : imageURI, iduser:localStorage.iduser, parameter:param};
        options.chunkedMode = false;
        var win = function(r) {
            loadLahan();
            myApp.hideIndicator();
            appAlert('Foto Lahan Sukses Diupload');
            console.log("Should not be called.");
        }
        var fail = function(error) {
            appAlert('Gagal Upload !');
            myApp.hideIndicator();
            // error.code == FileTransferError.ABORT_ERR
            // myApp.alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }                  
        var ft = new FileTransfer();
        ft.upload(imageURI,encodeURI(host + "Lahan.php"), win, fail, options);  
    }
    $$("#lahansimpandata").click(function(){
        var lahannama = $$('#lahannama').val(); 
        var lahanarea = $$('#lahanarea').val(); 
        var lahansubarea = $$('#lahansubarea').val(); 
        var lahanluas = $$('#lahanluas').val(); 
        var lahanbooleanadd = false;
        if(lahannama==''){
            lahanbooleanadd = false;
            appAlert('Masukkan nama lahan..');
        }else{
            lahanbooleanadd = true;
        }

        if(lahanarea==''){
            lahanbooleanadd = false;
            appAlert('Masukkan area lahan..');
        }else{
            lahanbooleanadd = true;
        }

        if(lahansubarea==''){
            lahanbooleanadd = false;
            appAlert('Masukkan subarea lahan..');
        }else{
            lahanbooleanadd = true;
        }

        if(lahanluas==''){
            lahanbooleanadd = false;
            appAlert('Masukkan luasan lahan.. <br><br>Jika mengalami kesulitan,<br>silahkan tekan tombol "+ Koordinat" pada setiap ujung lahan<br><br>Kemudian tekan "Kalkulasi Luas"');
        }else{
            lahanbooleanadd = true;
        } 

        //pengecekan OK, masuk ke database
        if(lahanbooleanadd==true){
            $$.post(hostWebservice+'action/Lahan.php',{paramlahanid:localStorage.iduser,
                                        paramlahannama:lahannama,
                                        paramlahanarea : lahanarea,
                                        paramlahansubarea : lahansubarea,  
                                        paramlahanluas : lahanluas,
                                        koordinatArray:koordinatArray
                                    }, function (result) {
                                        // alert(result);
                var hasil = result.split(";");
                if(hasil[1]=="Sukses"){
                    var imageURILahan = $$('#lahangambar').attr("src"); 
                    if(imageURILahan.includes("data:image")===true){
                        uploadPhotoLahan(hasil[2]);
                    }
                    myApp.addNotification({message: 'Data lahan tersimpan...',hold:2000});

                    $$('#lahannama').val(''); 
                    $$('#lahanarea').val(''); 
                    $$('#lahansubarea').val(''); 
                    $$('#lahankoordinat').html('');
                    $$('#lahanluas').val(''); 
                    $("#lahandata").slideToggle();
                     setTimeout(function () {
                        $('#lahantambah').css('display','block');
                    }, 500);
                    $("#lahangambar").attr("src","img/etc/default_lahan.jpg");
                    koordinatArray=[];
                    counterKoordinatLahan = 0;
                    loadLahan();
                }else{
                    myApp.addNotification({message: 'Terjadi kesalahan, coba lagi..',hold:2000});
                }
            });
        }
    });

    // $$.post(hostWebservice+'action/Profile.php',{profileid:localStorage.iduser,
    //                             profilenama : profilenama,
    //                             profilenik : profilenik
    //                         }, function (result) {
    //     var hasil = result.split(";");
    //     if(hasil[1]=="Sukses"){
    //             myApp.addNotification({message: 'Data sudah terupdate..',hold:2000});
    //     }else{
    //         myApp.addNotification({message: 'Terjadi kesalahan, coba lagi..',});
    //     }
    // });
});

//------------------------------------- jasa -----------------------------------------------------------
myApp.onPageInit('jasa', function (page) {
    getMenu();
    $$.post(hostWebservice+'action/Jasa.php',{reload : 'reload',iduser:localStorage.iduser}, function (result) {
        $('#jasaKonten').html(result);
        var mySwiper = myApp.swiper('.swiper-container', {
              speed: 200,
            spaceBetween: 10,
            pagination:'.swiper-scrollbar'
        });
    });


    var arrayJasa = [];
    var arraySubJasa = [];
    $$.post(hostWebservice+'action/Jasa.php',{ambilJasa : 'ambilJasa'}, function (result) {
        var obj = JSON.parse(result);
        for(var i=0; i<obj.length; i++){
            arrayJasa.push(obj[i]['namajasa']);
        }
        var pickerDevice1 = myApp.picker({
            input: '#jasasemua',
            cols: [
                {
                    textAlign: 'center',
                    values: arrayJasa
                }
            ]
        });
    });
    //-------------------------------------------
    $$("#jasasemua").change(function(){
        $$.post(hostWebservice+'action/Jasa.php',{ambilSubJasa : $$("#jasasemua").val()}, function (result) {
            var obj = JSON.parse(result);
            arraySubJasa = [];
            for(var i=0; i<obj.length; i++){
                arraySubJasa.push(obj[i]['namasubjasa']);
            }
            var pickerDevice2 = myApp.picker({
                input: '#jasasubjasa',
                cols: [
                    {
                        textAlign: 'center',
                        values: arraySubJasa
                    }
                ]
            });
        });
    });


    //-------------------------------------------
    $$("#jasasubjasa").change(function(){
        $$.post(hostWebservice+'action/Jasa.php',{ambilDetJasa : $$("#jasasubjasa").val()}, function (result) {
            $$('#jasadetail').html(result);
        });
    });

    $$("#jasabataltambah").click(function(){
        $("#jasadata").slideToggle();
    });
    $$("#jasatambah").click(function(){
        $("#jasadata").slideToggle();
    });
    $$(document).on('click','#jasaGantiFoto',function(e){
        e.stopImmediatePropagation(); e.preventDefault();
        navigator.camera.getPicture(onSuccess, onFail, { quality :100,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth : 600, targetHeight : 600, correctOrientation : true,
        cameraDirection : Camera.Direction.BACK   
        }); 
        function onSuccess(imageData){
            var jumlahData = $$('#jumlahDetailJasa').val()-1;
            var idimage = '#jasa'+jumlahData;
            var linkFoto = "data:image/jpeg;base64," + imageData;
            $$(idimage).attr("src",linkFoto);
            $$(idimage).css("width", '100%');
        }
        function onFail(message){
            myApp.alert('upload foto batal.');
            console.log(message);
        }
    });

    function uploadPhotoJasa(param){
        myApp.showIndicator();
        var jumlahData = $$('#jumlahDetailJasa').val()-1;
        var idimage = '#jasa'+jumlahData;
        var imageURI = $$(idimage).attr("src");
        var options = new FileUploadOptions();
        options.fileKey="photo";
        options.fileName= imageURI.substr(imageURI.lastIndexOf('/')+1); 
        options.mimeType="image/jpeg";
        options.params = {action : 'Jasa', url : imageURI, iduser:localStorage.iduser, parameter:param};
        options.chunkedMode = false;

       var win = function(r) {
            myApp.hideIndicator();
            appAlert('Foto Sukses Diupload');
            console.log("Should not be called.");
        }
        var fail = function(error) {
            appAlert('Gagal Upload !');
            myApp.hideIndicator();
            // error.code == FileTransferError.ABORT_ERR
            // myApp.alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }                  
        var ft = new FileTransfer();
        ft.upload(imageURI,encodeURI(host + "Jasa.php"), win, fail, options);  
    }

    $$("#jasasimpandata").click(function(){
        var jasasemua = $$('#jasasemua').val();
        var jasasubjasa = $$('#jasasubjasa').val();
        var keterangan = [];
        if(jasasemua=='' || jasasemua==''){
            myApp.alert('Silahkan isi kolom jenis jasa dan kolom menggunakan..');
        }else{
            var jumlahData = $$('#jumlahDetailJasa').val();
            if(jumlahData==1){
                keterangan.push($$('#jasa1').val());
                $$.post(hostWebservice+'action/Jasa.php',{idusersimpanjasa:localStorage.iduser, idjasa:jasasemua, idsubjasa:jasasubjasa, keterangan:keterangan}, function (result) {
                    var hasil = result.split(";");
                    if(hasil[0]=='Sukses'){
                        myApp.addNotification({message: 'Data tersimpan..',hold:2000});
                    }else{
                        myApp.addNotification({message: 'Terjadi kesalahan',hold:2000});
                    }
                });
            }else{
                for(var i=1; i<jumlahData-1; i++){
                    keterangan.push($$('#jasa'+i).val());
                }
                $$.post(hostWebservice+'action/Jasa.php',{idusersimpanjasa:localStorage.iduser, idjasa:jasasemua, idsubjasa:jasasubjasa, keterangan:keterangan}, function (result) {
                    var hasil = result.split(";");
                    if(hasil[0].includes("Sukses")===true){
                        myApp.addNotification({message: 'Data tersimpan..',hold:2000});
                    }else{
                        myApp.addNotification({message: 'Terjadi kesalahan',hold:2000});
                    }
                    var imageURIJasa = $$('.fotojasa').attr("src"); 
                    if(imageURIJasa.includes("data:image")===true){
                        uploadPhotoJasa(hasil[1]);
                    }
                });
            }
        }
    });

    
});

//------------------------------------- Deskripsi Usaha -----------------------------------------------------------
myApp.onPageInit('deskripsiusaha', function (page) {
    getMenu();
    function firstLoad(){
        $$.post(hostWebservice+'action/Deskripsi.php',{iduserambildeskripsi:localStorage.iduser}, function (result) {
            $('#isideskripsi').html(result);
        });   
    }
    firstLoad();
    $$("#deksripsibataltambah").click(function(){
        $("#deskripsidata").slideUp();
        $$('#deskripsiusaha').val('');
    });
    $$("#deskripsiedit").click(function(){
        var deskripsinomor = $$('#deskripsinomor').html();
        if(deskripsinomor=='-'){
            $('#deskripsilokasi').prop("disabled", false);
        }else{
            $$("#deskripsilokasi").val($$('#lokasi').html()); 
            $('#deskripsilokasi').prop("disabled", true);
        }
        $("#deskripsidata").slideDown();
    });

    $$("#deskripsijaditambah").click(function(){
        var deskripsi = $$('#deskripsiusaha').val(); 
        var lokasi = $$('#deskripsilokasi').val();
        var deskripsinomor = $$('#deskripsinomor').html(); 
        var isideksripsi = $$('#deskripsi').html(); 
        if(deskripsi==''){
        }else{
            if(isideksripsi=='-'){ //insert
                $$.post(hostWebservice+'action/Deskripsi.php',{idusersimpandeskripsi:localStorage.iduser, deskripsi:deskripsi, lokasi:lokasi}, function (result) {
                    var hasil = result.split(";");
                    if(hasil[1]=="Sukses"){
                        myApp.addNotification({message: 'Data sudah terupdate..',hold:2000});
                        $("#deskripsidata").slideUp();
                        firstLoad();
                    }else{
                        appAlert('Terjadi kesalahan ! Silahkan coba lagi nanti');
                    }
                });   
            }else{  //update
                $$.post(hostWebservice+'action/Deskripsi.php',{iduserupdatedeskripsi:localStorage.iduser, deskripsi:deskripsi, deskripsinomor:deskripsinomor}, function (result) {
                    var hasil = result.split(";");
                    if(hasil[1]=="Sukses"){
                        myApp.addNotification({message: 'Data sudah terupdate..',hold:2000});
                        $("#deskripsidata").slideUp();        
                        firstLoad();
                    }else{
                        appAlert('Terjadi kesalahan ! Silahkan coba lagi nanti');
                    }
                    
                });   
            }
        }
    });
});

$$(document).on('click','#redirect-sign-up',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    mainView.router.loadPage('halaman/sign-up.php');
});
$$(document).on('click','#redirect-sign-in',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    mainView.router.loadPage('halaman/sign-in.php');
});
$$(document).on('click','#close-side-panel',function(e){
    myApp.closePanel();
});

//------------------------------------- link menu -----------------------------------------------------------
$$(document).on('click','#link-logout',function(e){
    localStorage.clear();
    e.preventDefault();
    e.stopImmediatePropagation();
    mainView.router.loadPage('halaman/sign-in.php');
    myApp.closePanel();
});

$$(document).on('click','#link-lahan',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    mainView.router.loadPage('halaman/petani/lahan.php');
    myApp.closePanel();
});
$$(document).on('click','#link-jasa',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    mainView.router.loadPage('halaman/kontraktor/jasa.php');
    myApp.closePanel();
});
$$(document).on('click','#link-deskripsi',function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    mainView.router.loadPage('halaman/pedagangbuyer/deskripsiusaha.php');
    myApp.closePanel();
});


$$(document).on('click','#daftar',function(e){
    var booleanRegister = false;
    var namakRegisterVariable = $$('#namakRegister').val(); 
    var emailRegisterVariable = $$('#emailRegister').val(); 
    var usernameRegisterVariable = $$('#usernameRegister').val(); 
    var passwordRegisterVariable = $$('#passwordRegister').val(); 
    var repasswordRegisterVariable = $$('#re-passwordRegister').val();
    //------------------------------------------
        if(namakRegisterVariable==''){
            booleanRegister = false;
            myApp.alert('Nama harap diisi!');
        }else{
            booleanRegister = true;
        }
    //------------------------------------------
        if(emailRegisterVariable==''){
            booleanRegister = false;
            myApp.alert('Email harap diisi!');
        }else{
            $$.post(hostWebservice+'action/Register.php',{email:emailRegisterVariable}, function (result) {
                var hasil = result.split(";");
                if(hasil[1]==0){
                    booleanRegister = true;
                }else{
                    var obj = JSON.parse(result);
                    myApp.alert('Username '+obj[0]['email']+' sudah terpakai.');
                    $$('#emailRegister').val('');
                }
            });
        }
    //------------------------------------------
        if(usernameRegisterVariable==''){
            booleanRegister = false;
            myApp.alert('Username harap diisi!');
        }else{
            $$.post(hostWebservice+'action/Register.php',{username:usernameRegisterVariable}, function (result) {
                var hasil = result.split(";");
                if(hasil[1]==0){
                    booleanRegister = true;
                }else{
                    var obj = JSON.parse(result);
                    myApp.alert('Username '+obj[0]['username']+' sudah terpakai.');
                    $$('#usernameRegister').val('');
                }
            });
        }
    //------------------------------------------
        if(passwordRegisterVariable==''){
            booleanRegister = false;
            myApp.alert('Password harap diisi!');
        }else{
            booleanRegister = true;
        }
    //------------------------------------------
        if(repasswordRegisterVariable==''){
            booleanRegister = false;
            myApp.alert('Konfirmasi password harap diisi!');
        }else if(passwordRegisterVariable != repasswordRegisterVariable){
            myApp.alert('Password harap belum sama!');
            $$('#re-passwordRegister').val('');
        }else{
            booleanRegister = true;
        }
    //------------------------------------------
    setTimeout(function(){
         if(booleanRegister == true){
            $$.post(hostWebservice+'action/Register.php',{namakSubmit:namakRegisterVariable,emailSubmit:emailRegisterVariable,usernameSubmit:usernameRegisterVariable,passwordSubmit:passwordRegisterVariable,}, function (result) {
                var hasil = result.split(";");
                if(hasil[0].length<=7){
                    myApp.alert('Registrasi Sukses..<br>Silahkan login');
                }else{
                    myApp.alert('Terjadi kesalahan pada server<br>Silahkan coba lagi nanti')
                }
            });
        }
    }, 10);
});

//-------------------Global Function-------------------
var rad = function(x) {
    return x * Math.PI / 180;
};
function getDistance(p1, p2) {
    var R = 6378137; // Earthâ€™s mean radius in meter
    var dLat = rad(p2['lat'] - p1['lat']);
    var dLong = rad(p2['lng'] - p1['lng']);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1['lat'])) * Math.cos(rad(p2['lat'])) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};
// ---------------------------------------------------------


//----------------------- halaman index.html, di remark karena sudah tercover di maxframe.js P.David -----------------------
// myApp.onPageInit('index', function (page) { //start pageinit index
// //notifikasi
//   document.addEventListener('deviceready', function () {
//     var notificationOpenedCallback = function(jsonData) {
//       //ini untuk kalau notif dipencet actionnya ngapain
//       console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
//     };

//     // window.plugins.OneSignal
//     //     .startInit("6d5b1ebe-2a40-4290-bce9-db369086e597") //onesignal appid
//     //     .handleNotificationOpened(notificationOpenedCallback)
//     //     .endInit();
//       // mainView.router.loadPage("awal.html");
//   }, false);
// }).trigger();  //end pageinit index
 




