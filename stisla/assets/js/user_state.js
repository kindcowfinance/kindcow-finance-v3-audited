$(document).ready(function(){
    var wallet = getCookie("current-wallet");
    if(wallet!="0")WALLET.getAccount();
    });

function checkApproved(w){
    classApprove.forEach(function(a){
        var pid = a.replace("get-approve-pid-","")*1 ;
        var cokiname = w +"-approve-pid-"+pid  ; 
        
        if(getCookie(cokiname)=="true"){
        console.log(getCookie(cokiname));
        document.getElementsByClassName('get-approve-pid-'+pid)[0].style.display = 'none';
        document.getElementsByClassName('non-aproved-pid-'+pid)[0].style.display = 'none';
        document.getElementsByClassName('aproved-pid-'+pid)[0].style.display = '';
        }
    })
}


function logoutcss(){
    classApprove.forEach(function(a){
        var pid = a.replace("get-approve-pid-","")*1 ;
        document.getElementsByClassName('get-approve-pid-'+pid)[0].style.display = '';
        document.getElementsByClassName('non-aproved-pid-'+pid)[0].style.display = '';
        document.getElementsByClassName('aproved-pid-'+pid)[0].style.display = 'none';
        });
    
}

