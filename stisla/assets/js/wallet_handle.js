var KINDPRICE = 0;
var USER_BALANCE_ESTIMATION = 0;
var TOTAL_ALOCT = 99999999999999;
var RATE_PID = {};

function global(pid,res){
    USER_BALANCE_ESTIMATION+= RATE_PID[pid]*res;
    if(document.getElementById("asset-estimation").innerHTML.length>0)
document.getElementById("asset-estimation").innerHTML = number_format(USER_BALANCE_ESTIMATION);
}
var HANDLE ={
    Deposit : function(pid,res){
        console.log(res);
    },
    AddContract : function(res){
        location.reload();
        toast('Success','add '+res)
    },
    Withdraw : function(pid,res){
        console.log(res);
    },
    Account : function(res){
        //console.log(res);

        if(res.length==42){
            var walletConnector = document.querySelectorAll('.connect-to-wallet');
            for(var i =0;i<walletConnector.length;i++)
                {
                    walletConnector[i].style.display = 'none';
                };
       var walletConnector = document.querySelectorAll('.logedin');
        for(var i =0;i<walletConnector.length;i++)
            {
        walletConnector[i].style.display = '';
            };


            if(document.getElementsByClassName('mywallet-address').length>0)
            for(var x =0;x<document.getElementsByClassName('mywallet-address').length;x++)
            document.getElementsByClassName('mywallet-address')[x].innerHTML = res;


                 
           setCookie("current-wallet", res,10);
           checkApproved(res);
        }

    }, Logout : function(res){
        console.log("Logout");

        if(res==0){
            var walletConnector = document.querySelectorAll('.connect-to-wallet');
            for(var i =0;i<walletConnector.length;i++)
                {
                    walletConnector[i].style.display = '';
                };
       var walletConnector = document.querySelectorAll('.logedin');
        for(var i =0;i<walletConnector.length;i++)
            {
        walletConnector[i].style.display = 'none';
            };


            if(document.getElementsByClassName('mywallet-address').length>0)
            for(var x =0;x<document.getElementsByClassName('mywallet-address').length;x++)
            document.getElementsByClassName('mywallet-address')[x].innerHTML = res;
                 
              
        }
        deleteAllCookies();
        logoutcss();
        setCookie("current-wallet", 0,10);
        


    },
    Approve : function (pid,res) {

        if(res.length==66){
        
        console.log(res);
        document.getElementsByClassName('get-approve-pid-'+pid)[0].style.display = 'none';
        document.getElementsByClassName('non-aproved-pid-'+pid)[0].style.display = 'none';
        document.getElementsByClassName('aproved-pid-'+pid)[0].style.display = '';

        var wallet = getCookie("current-wallet");
        setCookie(wallet+"-approve-pid-"+pid,"true");
        toast('title',res);
        }


        
    },
    ApproveStaking : function (pid,res) {

        if(res.length==66){
       
       
        for(var b=0;b<document.getElementsByClassName('get-approve-staking-pid-'+pid).length;b++){
           
        document.getElementsByClassName('get-approve-staking-pid-'+pid)[b].style.display = 'none';
        document.getElementsByClassName('non-aproved-staking-pid-'+pid)[b].style.display = 'none';
        document.getElementsByClassName('aproved-staking-pid-'+pid)[b].style.display = '';

        var wallet = getCookie("current-wallet");
        setCookie(wallet+"-approve-staking-pid-"+pid,"true");
        toast('title',res);
        }
        }


        
    },PendingRewardS : function (pid,res) {

        
        if($('.pending-reward-staking-pid-'+pid).length>0)
        {
        document.getElementsByClassName('pending-reward-staking-pid-'+pid)[0].innerHTML = number_format(res);
        }
        
    },
    BalanceLPS : function (pid,res) {
        
        if($('.your-lp-staking-pid-'+pid).length>0)
        {   var x=0;
            for(x=0;x<$('.your-lp-staking-pid-'+pid).length;x++) {
                $('.your-lp-staking-pid-'+pid)[x].innerHTML = number_format(res,8);
               } 
        } 
        if($('.r-your-lp-staking-pid-'+pid).length>0)
        {   var x=0;
            for(x=0;x<$('.r-your-lp-staking-pid-'+pid).length;x++) {
                $('.r-your-lp-staking-pid-'+pid)[x].innerHTML =  number_format(res,8);
               } 
        } 


        //global(pid,res);

         
         
       
        
    },
    PendingReward : function (pid,res) {

        
        if($('.pending-reward-pid-'+pid).length>0)
        {
        document.getElementsByClassName('pending-reward-pid-'+pid)[0].innerHTML = number_format(res);
        }
        
    },
    BalanceLP : function (pid,res) {
        
        if($('.your-lp-pid-'+pid).length>0)
        {   var x=0;
            for(x=0;x<$('.your-lp-pid-'+pid).length;x++) {
                $('.your-lp-pid-'+pid)[x].innerHTML = number_format(res,10);
               } 
        } 
        if($('.r-your-lp-pid-'+pid).length>0)
        {   var x=0;
            for(x=0;x<$('.r-your-lp-pid-'+pid).length;x++) {
                $('.r-your-lp-pid-'+pid)[x].innerHTML =  number_format(res,18);
               } 
        } 


        global(pid,res);

         
         
       
        
    }
    ,
    Allowance : function (pid,res) {
        if(res>=999999999){
        if ($('.get-approve-pid-'+pid).length>0) 
        document.getElementsByClassName('get-approve-pid-'+pid)[0].style.display = 'none';
        if ($('.non-aproved-pid-'+pid).length>0) 
        document.getElementsByClassName('non-aproved-pid-'+pid)[0].style.display = 'none';
        if ($('.aproved-pid-'+pid).length>0) 
        document.getElementsByClassName('aproved-pid-'+pid)[0].style.display = '';

        var wallet = getCookie("current-wallet");
        setCookie(wallet+"-approve-pid-"+pid,"true");
        //console.log(res);
        }
        
    },
    AllowanceStaking : function (pid,res) {

        console.log(res);
        if(res>=999999999){
  console.log("SSSS");
            for(var b=0;b<document.getElementsByClassName('get-approve-staking-pid-'+pid).length;b++){
           
              


        if ($('.get-approve-staking-pid-'+pid).length>0) 
        document.getElementsByClassName('get-approve-staking-pid-'+pid)[b].style.display = 'none';
        if ($('.non-aproved-staking-pid-'+pid).length>0) 
        document.getElementsByClassName('non-aproved-staking-pid-'+pid)[b].style.display = 'none';
        if ($('.aproved-staking-pid-'+pid).length>0) 
        document.getElementsByClassName('aproved-staking-pid-'+pid)[b].style.display = '';

        var wallet = getCookie("current-wallet");
        setCookie(wallet+"-approve-staking-pid-"+pid,"true");
        //console.log(res);
        }

    }
        
    },
    Metamask : function (res) {
        console.log(res);
        
    }
    ,
    PoolInfo : function (pid,res) {
        var tokenprice = KINDPRICE;
        
        if ($('.alloc-pid-'+pid).length>0) 
        document.getElementsByClassName('alloc-pid-'+pid)[0].innerHTML = number_format(res[1],0);
        if ($('.block-reward-pid-'+pid).length>0) {
        if(res[1]<10000)document.getElementById('pid-boxs-'+pid).style.display="none";
        if(res[1]>=10000)document.getElementById('pid-boxs-'+pid).style.display="";
        if(res[1]>=10000)document.getElementById('pid-boxh-'+pid).style.display="none";
        if(res[1]<10000)document.getElementById('pid-boxh-'+pid).style.display="";
        document.getElementsByClassName('block-reward-pid-'+pid)[0].innerHTML = number_format(((res[1]>=10000?res[1]:0)/TOTAL_ALOCT)*tokenprice*28800);
        }

        
        
    },
    PoolInfoVote : function (pid,res) {
        if ($('#tr-'+res[0].toLowerCase()).length>0) {
            $('#tr-'+res[0].toLowerCase()).html('\
            <td>'+pid+'</td>\
            <td><a target="_blank" href="https://bscscan.com/token/'+res[0]+'">'+res[0].substring(0,5)+"***"+res[0].substring(res[0].length-5)+'</td>\
            <td><span class="sym-'+setting.pid[pid].token1.toLowerCase()+'"></span> - <span class="sym-'+setting.pid[pid].token2.toLowerCase()+'">-</span></td>\
            <td><a href="widget?id='+pid+'" target="_blank"><span class="name-'+res[0].toLowerCase()+'">???</span></a></td>\
            <td class="align-middle">'+res[1]+'</td>\
            <td  class="text-center">\
            <div class="input-group mb-3">\
            <div class="input-group-prepend">\
            <button class="btn btn-outline-warning vote-down-pid-'+pid+'" type="button">DOWN</button>\
            </div>\
            <input id="vote-val-pid-'+pid+'" type="text" class="form-control text-center" placeholder="" aria-label="" aria-describedby="basic-addon1" style="width:50px" value=1>\
            <div class="input-group-append">\
            <button class="btn btn-outline-primary vote-up-pid-'+pid+'" type="button">UP</button>\
            </div>\
            </div>\
          </td>\
            ');
        }
        else
        $('#sortable-table tbody').append(
            '<tr id="tr-'+res[0].toLowerCase()+'">\
            <td>'+pid+'</td>\
            <td><a target="_blank"  href="https://bscscan.com/token/'+res[0]+'">'+res[0].substring(0,5)+"***"+res[0].substring(res[0].length-5)+'</td>\
            <td><span class="sym-'+setting.pid[pid].token1.toLowerCase()+'"></span> - <span class="sym-'+setting.pid[pid].token2.toLowerCase()+'">-</span></td>\
            <td><a href="widget?id='+pid+'" target="_blank"><span class="name-'+res[0].toLowerCase()+'">???</span></a></td>\
            <td class="align-middle">'+res[1]+'</td>\
            <td class="text-center" >\
            <div class="input-group mb-3">\
            <div class="input-group-prepend">\
            <button class="btn btn-outline-warning vote-down-pid-'+pid+'" type="button">DOWN</button>\
            </div>\
            <input id="vote-val-pid-'+pid+'" type="text" class="form-control text-center" placeholder="" aria-label="" aria-describedby="basic-addon1" style="width:50px" value=1>\
            <div class="input-group-append">\
            <button class="btn btn-outline-primary vote-up-pid-'+pid+'" type="button">UP</button>\
            </div>\
            </div>\
          </td>\
          </tr>'
        );

 /*
        if ($('#tra-'+res[0].toLowerCase()).length>0) {
            $('#tra-'+res[0].toLowerCase()).html('\
            <td>'+pid+'</td>\
            \
            <td class="name-'+res[0].toLowerCase()+'">???</td>\
            <td class="align-middle your-lp-pid-'+pid+'">0</td>\
            <td class="text-center pending-reward-pid-'+pid+'" id="pending-reward-pid-'+pid+'">0</td>\
            <td  class="text-center">\
            <div class="input-group  ">\
            \
            \
            <button class="btn btn-outline-primary get-harvest-pid-'+pid+'" type="button">Harvest</button>\
           \
            </div>\
          </td>\
            ');
        }
        else
       
        $('#assets-table tbody').append(
            '<tr id="tra-'+res[0].toLowerCase()+'">\
            <td>'+pid+'</td>\
            <td class="name-'+res[0].toLowerCase()+'">???</td>\
            <td class="align-middle your-lp-pid-'+pid+'">0</td>\
            <td class="text-center pending-reward-pid-'+pid+'" id="pending-reward-pid-'+pid+'">0</td>\
            <td  class="text-center">\
                <div class="input-group">\
                    <button class="btn btn-outline-primary get-harvest-pid-'+pid+'" type="button">Harvest</button>\
                </div>\
            </td>\
          </tr>'
        );
       */

       // WALLET.getName(res[0]);

   
  // WALLET.getAllowance(0);

    if(document.querySelectorAll(".vote-down-pid-"+pid).length>0)
    document.querySelectorAll(".vote-down-pid-"+pid)[0].addEventListener('click', function(event) {
        loading(event.target);
        showLoader();
        WALLET.voteDown(pid,1);
      });
  
  
     if(document.querySelectorAll(".vote-up-pid-"+pid).length>0)
    document.querySelectorAll(".vote-up-pid-"+pid)[0].addEventListener('click', function(event) {
        loading(event.target);
        showLoader();
        WALLET.voteUp(pid,1);
      });
   
       
    }/*,
    poolLength : function (resp) {
        for (let index = 0; index < resp; index++) {
               WALLET.getPoolInfoVote(index);
        }

       // console.log('data' + datas);
    }*/,
    BalanceWallet : function (pid,res) {
        
        if(document.getElementsByClassName('your-wallet-lp-pid-'+pid).length>0)
        {
        document.getElementsByClassName('your-wallet-lp-pid-'+pid)[0].innerHTML = number_format(res,12);
        }
        if(document.getElementsByClassName('r-your-wallet-lp-pid-'+pid).length>0)
        {
        document.getElementsByClassName('r-your-wallet-lp-pid-'+pid)[0].innerHTML =  number_format(res,18);
        }

       // console.log('data' + datas);
    },
    BalanceWalletS : function (pid,res) {
        
        if(document.getElementsByClassName('your-wallet-lp-staking-pid-'+pid).length>0)
        {
        document.getElementsByClassName('your-wallet-lp-staking-pid-'+pid)[0].innerHTML = number_format(res,12);
        }
        if(document.getElementsByClassName('r-your-wallet-lp-staking-pid-'+pid).length>0)
        {
        document.getElementsByClassName('r-your-wallet-lp-staking-pid-'+pid)[0].innerHTML =  number_format(res,18);
        }

       // console.log('data' + datas);
    },
    poolReward : function (res) {
        
        if(document.getElementById('reward-voter')!== null)
        {
        document.getElementById('reward-voter').innerHTML = number_format(res/100000000);
        }

       // console.log('data' + datas);
    }
    ,
    Name : function (contract,res) {
        
        if(document.getElementsByClassName('name-'+contract.toLowerCase()).length>0)
        for(var x =0;x<document.getElementsByClassName('name-'+contract.toLowerCase()).length;x++)
        {
        document.getElementsByClassName('name-'+contract.toLowerCase())[x].innerHTML = res;
        }

       // console.log('data' + datas);
    } ,
    Symbol : function (contract,res) {
        
        if(document.getElementsByClassName('sym-'+contract.toLowerCase()).length>0)
        for(var x =0;x<document.getElementsByClassName('sym-'+contract.toLowerCase()).length;x++)
        {
        document.getElementsByClassName('sym-'+contract.toLowerCase())[x].innerHTML = res;
        }

       // console.log('data' + datas);
    },
    Supply : function (contract,res) {
        
        if(document.getElementsByClassName('supply-'+contract.toLowerCase()).length>0)
        for(var x =0;x<document.getElementsByClassName('supply-'+contract.toLowerCase()).length;x++)
        {
        document.getElementsByClassName('supply-'+contract.toLowerCase())[x].innerHTML = number_format(res) ;
        }

       // console.log('data' + datas);
    }
    ,
    burn : function (contract,res) {
        
        if(document.getElementsByClassName('burn-'+contract.toLowerCase()).length>0)
        for(var x =0;x<document.getElementsByClassName('burn-'+contract.toLowerCase()).length;x++)
        {
        document.getElementsByClassName('burn-'+contract.toLowerCase())[x].innerHTML = number_format(res) ;
        }

       // console.log('data' + datas);
    }
    ,
    rodawd : function (pid ) {
        
        console.log(pid);

       // console.log('data' + datas);
    }
}




 