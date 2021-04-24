
var doneaff =0;
var regis = 0;
var run_aff=1;
var last_address = "";
function aff(){

var id = document.getElementsByClassName("mywallet-address");


if (id.length > 0) {
  var  addr = id[0].innerText;
  if(addr!=last_address){run_aff=1;regis=0;doneaff=0;
    if(document.getElementById('link-aff')) {
    document.getElementById('link-aff').innerHTML = "https://kindcow.finance/id/{your_id}";
    document.getElementById('aff-id').innerHTML = 0;
    }
}
  if(run_aff==0)return;

   last_address=addr;
  //console.log(addr);

   if(addr&&addr!=0)
   {
var urlapi ="https://api.kindcow.finance/mylink.php?addr="+addr;
$.get(urlapi, function(data, status){
    if(data.success){
    if(document.getElementById('link-aff')) {
    document.getElementById('link-aff').innerHTML = "https://kindcow.finance/id/"+data.link;
    document.getElementById('aff-id').innerHTML = data.link;
    run_aff=0;
    regis=1;
    document.getElementById('box-aff').style.display="none";
    }} else {
      run_aff=0;
    
    register();
    }
    
});
   }

}

 
}
aff();

setInterval(aff,5000);

function save_upline(){
  if(document.getElementById('upline')) {} else return;
    var id = document.getElementById("upline").value;

    var urlapi ="https://api.kindcow.finance/up.php?id="+id;
$.get(urlapi, function(data, status){
    if(data.success){
        console.log(data);
        document.cookie = "up="+id;
        document.getElementById('box-aff').style.display="none";
        
    }else{
    console.log(data.err);
    document.getElementById('err').innerHTML = data.err;
    document.getElementById('box-aff').style.display="";
    document.cookie = "up=0";
    }
   
    
    
});
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


function register(){
    var c = getCookie("up");
 


    if(c*1>0){
    document.getElementById("upline").value=c;
    save_upline();
    }
    else {
       if(document.getElementById('box-aff'))
       document.getElementById('box-aff').style.display="";


    }
}



function reg(){
    if(regis)return;
    if(document.getElementById('upline')) {} else return;
    var id = document.getElementById("upline").value;
    var add = document.getElementsByClassName("mywallet-address");
    if (id.length > 0) {
        var  addr = add[0].innerText;
        if(addr!="0"){
    var urlapi ="https://api.kindcow.finance/reg.php?id="+id+"&addr="+addr;
$.get(urlapi, function(data, status){
    if(data.success){
        document.getElementById('box-aff').style.display="none";
        regis=1;
    }else{
    //console.log(data.err);
    //document.getElementById('err').innerHTML = data.err;
    //document.getElementById('box-aff').style.display="";
    }
   
    
    
});
        }

    }
}


setInterval(reg,10000);




function myaff(){
  if(doneaff)return;
  var reff_reward =0;

  var add = document.getElementsByClassName("mywallet-address");
  if (add.length > 0) {
      var  addr = add[0].innerText;

  var urlapi ="https://api.kindcow.finance/myreff.php?addr="+addr;
  $.get(urlapi, function(data, status){
      if(data.success){
        $("#ref-reward").html(data.reward);
  doneaff=1;


        data.data.forEach(e => {
          if(e.up==data.id){
          $('#sortable-table2 tbody').append(
            '<tr>\
            <td>'+e.addr+'</td>\
            <td class="text-right">'+e.harvest+' ( L1 ) </td>\
          </tr>'
          );
          }
        });
        data.data.forEach(e => {
          if(e.up2==data.id)
          $('#sortable-table2 tbody').append(
            '<tr>\
            <td>'+e.addr+'</td>\
            <td class="text-right">'+e.harvest+' ( L2 ) </td>\
          </tr>'
          );
        }); 


      }else{
        doneaff=1;
      //console.log(data.err);
      //document.getElementById('err').innerHTML = data.err;
      //document.getElementById('box-aff').style.display="";
      }
     
      
      
  });

  }
}

myaff();
setInterval(myaff,5000);