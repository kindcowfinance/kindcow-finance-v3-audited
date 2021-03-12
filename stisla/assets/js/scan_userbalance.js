var allpid = setting.pid;
//console.log(allpid);
function lp(){
 console.log(USER_BALANCE_ESTIMATION);
USER_BALANCE_ESTIMATION =0;
var a = 0;

allpid.forEach(b => {
 WALLET.getBalanceLP(a); 
 WALLET.getPendingReward(a); 
 //WALLET.getPoolInfo(a);
 WALLET.getWalletLpBalance(a);
 //WALLET.totalSupply(setting.token.contract);
 //WALLET.burn(setting.token.contract,8,'0x0000000000000000000000000000000000000000');


a++;

});


}

setInterval(lp,10000);
lp();

// WALLET.getPoolLength();
// WALLET.getRewardPool();
 
 

 
 
var VOTE=0;


setInterval(rate,30000);
function rate(){
  
    var tvl =0;
    $.get( "price", function( data ) {
        KINDPRICE = data.price.KIND;
        for (const [key, value] of Object.entries(data.price)) {
            var k = key.toLocaleLowerCase();
            if($('.price-'+k).length>0)
                {  
                
               // console.log(k);
                document.getElementsByClassName('price-'+k)[0].innerHTML = number_format(value);
                }

            
          }

          TOTAL_ALOCT = data.totalAlloctPoin;
        
          for (const [a, value] of Object.entries(data.lp)) {
            RATE_PID[a] = data.rate_lp[a];
             tvl=tvl+ data.kind_lp[a];
            if($('.total-liq-pid-'+a).length>0)
                {   
                document.getElementsByClassName('total-liq-pid-'+a)[0].innerHTML = number_format(value*data.rate_lp[a]);
                }


                if($('.tvl').length>0)
                {   
                document.getElementsByClassName('tvl')[0].innerHTML = number_format(tvl);
                }

            
          }


         
for (const [a, value] of Object.entries(data.poolinfo)) {
HANDLE.PoolInfoVote(a, value);
HANDLE.PoolInfo(a, value);
}
for (const [a, value] of Object.entries(data.sym)) {
HANDLE.Symbol(a,value);
}
for (const [a, value] of Object.entries(data.name)) {
HANDLE.Name(a,value);
}
for (const [a, value] of Object.entries(data.supply)) {
HANDLE.Supply(a,value);
}

if(VOTE==0)
for (const [a, value] of Object.entries(data.burn)) {
HANDLE.burn(a,value);
}
        
            HANDLE.poolReward(data.total_vote_reward);

            VOTE=1;
      });
 
}

 
rate();

function apy(){
    var a=0;
    
 allpid.forEach(b => {

   
 
    if($('.total-liq-pid-'+a).length>0){
    
    var lq=$('.total-liq-pid-'+a).html();
    var rd=$('.block-reward-pid-'+a).html();
    var apr =((rd*356)/lq)*100;
    var apd = apr/350;
if(apr>0)
if($('.apr-pid-'+a).length>0){
$('.apr-pid-'+a).html(number_format(apr,2)+" %");
$('.block-rewardp-pid-'+a).html(number_format(apd,2)+" %");
}

}





a++;
 });



 
}




setInterval(apy,5000);
apy();









HANDLE_THIS();

/*
function aaa(){
divArr = $(".list-project")
divArr.sort(function(a, b) {
    //console.log($(a).find(".list-apr").text().replace("%","")*1);
    return $(a).find(".list-apr").text().replace("%","")*1 > $(b).find(".list-apr").text().replace("%","")*1 ? -1: 1;
    })
 $(".listing").html(divArr)
}
setInterval(aaa,20000);
aaa();
*/