function tabelisichat(xangka ,idx){
//myApp.alert(param1 +"," + param2);
$$.post(host + 'fungsiumum/chat.php'
, {act: "chatrealtime" , angka : xangka, id : idx, id_user : localStorage.iduser, where : localStorage.where }
, function(data){
var hasil_json = JSON.parse(data);  
//myApp.alert(hasil_json['tabel']);
var b = localStorage.isichat;
var a = hasil_json['tabel'];
//
     localStorage.listid =  hasil_json['listid'];
     localStorage.total =  hasil_json['total'];
     var where ="";
     var isi = hasil_json['listid'].split(";");   
     //
      for (var i = 0; i < localStorage.total ; i++) {
      if(i == 0){
      where = where + "and id != " + isi[i];
      }else if(i != 0){
      where = where + " and id !=" + isi[i];
      }

      }
     //
     localStorage.where = where;
      if(b != a){
      $$("#isichat").append(hasil_json['tabelb']);
      //  myApp.alert(a);
      localStorage.isichat = a;
      var myMessages = myApp.messages('.messages');
      // Initialize Messagebar
      var myMessagebar = myApp.messagebar('.messagebar');
      // myMessagebar.textarea[0].focus();
      }
}); 
};

function tabelisichatfirst(xangka ,idx){
    $$.post(host + 'fungsiumum/chat.php'
    , {act: "chat" , angka : xangka, id : idx, id_user : localStorage.iduser }
    , function(data){
    var hasil_json = JSON.parse(data);  
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
    where = where + " and id !=" + isi[i];}
    }
    //
    localStorage.where = where;
    }); 
};

function sendchat(idx,isi, waktu, adminx ){
     var statuschat = "";
      var idrec = $$("#id_receiver").val();
      $$.post(host + 'fungsiumum/chat.php'
      , {act: "checkbot" , id_chat : localStorage.id_chat }
      , function(data){
        //myApp.alert(data);  
        //masuk ke mode deal awal
        if(isi == "deal" && data == 'pasif'){
          //console.log('bot aktif hanya');
          statuschat = "tahap1";
        }
        //tahap kedua
        else if(isi.match(/^\d+$/) && data == 'aktif') {
        //console.log('angka dan ada bot aktif');
        statuschat = "tahap2";
        }
        // chat biasa mode aktif
        else if(data == "aktif"){
         //console.log('bot aktif hanya');
          statuschat = "biasa2";
        }
        //ini chat biasa 
        else{     
         // console.log('ini chat biasa bro');
         statuschat = "biasa";

        }
        console.log(statuschat);

        //last execution
        $$.post(host + 'fungsiumum/chat.php'
        , {act: "send" , id_chat : localStorage.id_chat , id_sender : idx, nama_sender : localStorage.unama,
        id_receiver : idrec,  pesan : isi, waktu_kirim : waktu , admin : adminx, status_chat : statuschat}
        , function(data){
        if(data =="yes"){
        tabelisichat(1,localStorage.id_chat);
        }else{
        myApp.alert(data);
        }

        });   

      }); 

   
    
    
};

myApp.onPageInit('messages', function (page) {
  localStorage.bot = "0"; 
  //custom code advid

  //
  tabelisichatfirst(1,localStorage.id_chat);
  var myMessagebar = myApp.messagebar('.messagebar');
  myMessagebar.textarea[0].focus();
  //myApp.alert(localStorage.modebot);

  var tid = setInterval(mycode, 3000);
function mycode() {
  tabelisichat(1,localStorage.id_chat);
}
function abortTimer() { // to be called when you want to stop the timer
  clearInterval(tid);
}

$$(document).on('click','#trymes',function(e){e.stopImmediatePropagation(); e.preventDefault();
  abortTimer();

  mainView.router.back();
});
 
    var answerTimeout, isFocused;
    // Initialize Messages
    var myMessages = myApp.messages('.messages');
    // Initialize Messagebar
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
  var th = d.getFullYear(); var mt =d.getMonth()+1; var day = d.getDate();
  var hour = d.getHours(); var min = d.getMinutes(); var sec = d.getSeconds(); 

  if(parseInt(hour) < 10){ hour = '0' + hour;} 
  if(parseInt(min) < 10){ min = '0' + min;}
  if(parseInt(sec) < 10){ sec = '0' + sec;}
  if(parseInt(mt) < 10){ mt = '0' + mt;}
  if(parseInt(day) < 10){ day = '0' + day;}

  var waktuku =  th + "-"  +   mt + "-" + day + " " + hour + ":" + min + ":" + sec;
  if(messageText.toLowerCase().trim() == "deal"){
  var messagebaru = "Fitur chat bot diaktifkan! Silahkan masukan harga penawaran. Apabila harga yang diinputkan sama dengan lawan chat anda maka order akan otomatis terinput kedalam sistem. Silahkan masukan harga setelah pesan berikut!"
  localStorage.bot = "1"; 
  sendchat(localStorage.iduser, "deal", waktuku, 0);
  sendchat(localStorage.iduser, messagebaru, waktuku, localStorage.bot);
   sendchat(localStorage.iduser, "Masukan Harga :", waktuku, localStorage.bot);
  }else{
  localStorage.bot = "0";
  sendchat(localStorage.iduser, messageText, waktuku, localStorage.bot);
  }
  myMessagebar.clear();
}); // end function click send message

}); //endpage chat

myApp.onPageInit('messages_home', function (page) {
isihomechat(localStorage.iduser);
//myApp.alert('a');
$$(document).on('click','#lihatchat',function(e){e.stopImmediatePropagation(); e.preventDefault();
  var idchat = $$(this).data('idchat'); 
  localStorage.id_chat = idchat;
  mainView.router.loadPage(host + 'umum/messages.php?id=' + localStorage.iduser + "&id_chat=" + idchat);
});

$$(document).on('click','#deletechat',function(e){e.stopImmediatePropagation(); e.preventDefault();
  var idchat = $$(this).data('idchat'); 
  myApp.confirm('Anda yakin ingin menghapus pesan ini? (Pesan yang sudah dihapus tidak bisa dikembalikan!)', 
  function () {
  $$.post(host + 'fungsiumum/chat.php'
  , {act: 'hapuschat', id : idchat}
  , function(data){
  if(data == "yeah"){
  myApp.alert('Chat berhasil terhapus.');
  isihomechat(localStorage.iduser);
  }else{myApp.alert(data);}
  });    },
  function () {});
});

});
function isihomechat(idx){
  $$.post(host + 'fungsiumum/chat.php'
  , {act: "chathome" ,  id_user : idx }
  , function(data){
  var hasil_json = JSON.parse(data);  
  //myApp.alert(hasil_json['tabel']);
  $$("#isihomem").html(hasil_json['tabel']);
  }); 
};