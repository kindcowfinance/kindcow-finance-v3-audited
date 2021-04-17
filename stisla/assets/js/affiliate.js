
 

var run_aff=1;
function aff(){
if(run_aff==0)return;
var id = document.getElementsByClassName("mywallet-address");

if (id.length > 0) {
  var  addr = id[0].innerText;

  //console.log(addr);

   if(addr)
   {
var urlapi ="https://api.kindcow.finance/mylink.php?addr="+addr;
$.get(urlapi, function(data, status){
    if(data.success)
    if(document.getElementById('link-aff')) {
    document.getElementById('link-aff').innerHTML = "https://kindcow.finance/id/"+data.link;
    document.getElementById('aff-id').innerHTML = data.link;
    run_aff=0;
    }
    
});
   }

}

 
}
aff();

setInterval(aff,10000);