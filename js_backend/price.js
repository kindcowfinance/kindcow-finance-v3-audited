const setting   =   require("../site_setting.json");
const request = require('request'); 
const Web3 = require('web3'); 


var bitsten = {};
 
function bitsten_feed(){
var urlapi ="https://api.bitsten.com/api/v1/public/getticker/all";
request(urlapi, function (error, response, body) {
  if( response&&response.statusCode == 200){}else return;
 

 var b=JSON.parse(body);
 Object.keys(b.result).forEach(a=>{
    
   
    //console.log(b.result[a].last);
    bitsten[a.toUpperCase()] = b.result[a].last;

   })
 
   
});
}
setInterval(bitsten_feed,10000);
bitsten_feed();
var price1 = {}; 
price1['price']={};
price1['pair']={};
price1['lp']={};
price1['global_lp']={};
price1['token_lp']={};
price1['total_lp']={};
price1['rate_lp']={};
price1['kind_lp']={};   
price1['sym']={}; 
price1['name']={};
price1['total_vote_reward']=0;
price1['poolinfo']={};
price1['supply']={};
price1['burn']={};
price1['totalAlloctPoin']=0;

price1['token_lp']['busd']={};
price1['token_lp']['wbnb']={};
price1['token_lp']['kind']={};
price1['token_lp']['wbst']={};

setInterval(function(){
        WALLET.getrate("0x22f8ed79e003b5a13187fddb03d23b477d615184","KIND_BUSD",8,18);
       
        setting.price_feed.forEach(element => {
            
        //if(element[3]=="USDT")
        price1['price'][element[0]] = 0;
        price1['price']["USDT"] = 1;
        if(element[1]=="bitsten")price1['price'][element[0]]=bitsten[element[2]];
       
        });
        price1['price']["KIND"] = price1['pair']['KIND_BUSD'];
        
        // console.log(price1);

},5000);



var  WALLET ={
        getrate : async function(c,p,d1,d2){
        if(c=="eth")return;
        const web3 = new Web3("https://bsc-dataseed.binance.org");
         
          var abi   =[{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"}];

          try {
      
        var  contract = new web3.eth.Contract(abi, c);
           
        await contract.methods.getReserves().call().then(function(resp) {
         //console.log(resp[0]);
         price1['pair'][p]=((resp[1]/(10**d2))/(resp[0]/(10**d1))).toFixed(8);
        });
      } catch (error) {
        
      }


    } ,getPoolInfo : async function(pid){
   
        var co    = setting.master_contract.contract;  //
        if(co=="eth")return;
        //console.log(co);
        const web3 = new Web3("https://bsc-dataseed.binance.org");
         
          var abi   =[{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accKindPerShare","type":"uint256"},{"internalType":"uint256","name":"totalLP","type":"uint256"}],"stateMutability":"view","type":"function"}];
          
          try {
          var  contract = new web3.eth.Contract(abi, co);
           
          await  contract.methods.poolInfo(pid).call().then(function(resp) {
          //price1['token_lp'][code][pid]=resp/(10**digit);
          //console.log(resp); 
         // price1['lp'][pid]=resp[4]/(10**setting.pid[pid].digits);
         // if(setting.pid[pid].type=="staking")
         // price1['global_lp'][pid]=resp[4]/(10**setting.pid[pid].digits);
            //return (resp / Math.pow(10,digit));
         //HANDLE.PoolInfo(pid,resp);
        });
      } catch (error) {
        price1['lp'][pid] = 0;
      }
    },
    getWalletLpBalance : async function(con,pid,code,addr,digit){
      // if(setting.pid[pid].type=="staking")addr=setting.master_contract.contract;
      if(con=="eth")return;
      if(addr=="eth")return;
        const web3 = new Web3("https://bsc-dataseed.binance.org");
       
        var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

        try {
      
      var  contract = new web3.eth.Contract(abi, con);
         
      await contract.methods.balanceOf(addr).call().then(function(resp) {
       price1['token_lp'][code][pid]=resp/(10**digit);
      });
    } catch (error) {
      
    }


  }, getSupply: async function(pid){
       
        const web3 = new Web3("https://bsc-dataseed.binance.org");
        
        var co=setting.pid[pid].contract;
        if(co=="eth")return;
        if (typeof price1['global_lp'][pid] == 'undefined') {
            price1['global_lp'][pid]=0;
        }
        try {
        var abi   =[ {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
        var  contract = new web3.eth.Contract(abi, co);
        await contract.methods.totalSupply().call().then(function(resp) {
            
               price1['global_lp'][pid]=resp/(10**setting.pid[pid].digits);
        });
           } catch (error) {
            
           }
        
  
         
  
    } ,
    getlphere : async function(con,pid,addr,digit){
       //if(setting.pid[pid].type=="staking")addr=setting.master_contract.contract;
      // console.log(con+" --- "+pid);
      if(con=="eth")return;
      if(addr=="eth")return;
        const web3 = new Web3("https://bsc-dataseed.binance.org");
       
        var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
        if (typeof price1['lp'][pid] == 'undefined') {
          price1['lp'][pid]=0;
      }
        try {
      
      var  contract = new web3.eth.Contract(abi, con);
         
      await contract.methods.balanceOf(addr).call().then(function(resp) {

        //console.log(resp);
        //console.log(pid);

        price1['lp'][pid]=resp/(10**digit);
        
       // if(setting.pid[pid].type=="staking")
       // price1['global_lp'][pid]=resp/(10**setting.pid[pid].digits);


      });
    } catch (error) {
      console.log(error);
    }


  } ,
  getstaking : async function( pid ){

      var addr=setting.master_contract.contract;
     var con = setting.pid[pid].contract;
     if(con=="eth")return;
      const web3 = new Web3("https://bsc-dataseed.binance.org");
     
      var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
      if (typeof price1['lp'][pid] == 'undefined') {
        price1['global_lp'][pid]=0;
    }
      try {
    
    var  contract = new web3.eth.Contract(abi, con);
       
    await contract.methods.balanceOf(addr).call().then(function(resp) {
 

      price1['global_lp'][pid]=resp/(10**setting.pid[pid].digits);
    

    });
  } catch (error) {
    console.log(error);
  }


} ,getSym: async function(c){
        if(c=="eth")return;
        var co    = c;  //
        const web3 = new Web3("https://bsc-dataseed.binance.org");
        var abi   =[{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
        price1['sym']["eth"] ="BNB";
        try {
        var  contract = new web3.eth.Contract(abi, co);
        await contract.methods.symbol().call().then(function(resp) {
        price1['sym'][c]=resp;
        });
           } catch (error) {
           }

    },getName : async function(c){
      if(c=="eth")return;
        var co    = c;  //
        // var digit = setting.pid[pid].digits ;
        const web3 = new Web3("https://bsc-dataseed.binance.org");
         
          var abi   =[{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}
        ];
        price1['name']["eth"] ="BNB";
        try {   
       var  contract = new web3.eth.Contract(abi, co);
        await contract.methods.name().call().then(function(resp) {
         price1['name'][c]=resp;
        });} catch (error) {
          
        }
    },
    getRewardPool : async function(){

      var co    = setting.master_contract.contract;  //
      if(co=="eth")return;
      // var digit = setting.pid[pid].digits ;
      const web3 = new Web3("https://bsc-dataseed.binance.org");
       
        var abi   =[ {"inputs":[],"name":"total_Vote_Reward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
      ];

      try {
        
        var  contract = new web3.eth.Contract(abi, co);
         
      await contract.methods.total_Vote_Reward().call().then(function(resp) {
       //HANDLE.poolReward(resp);
       price1['total_vote_reward']=resp;
      });
    } catch (error) {
      
    }


  }
  ,
    totalAloct : async function(){

      var co    = setting.master_contract.contract;  //
      if(co=="eth")return;
      // var digit = setting.pid[pid].digits ;
      const web3 = new Web3("https://bsc-dataseed.binance.org");
       
        var abi   =[{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
      ];

      try {
        
        var  contract = new web3.eth.Contract(abi, co);
         
      await contract.methods.totalAllocPoint().call().then(function(resp) {
       //HANDLE.poolReward(resp);
       price1['totalAlloctPoin']=resp;
      });
    } catch (error) {
      
    }


  },
  
  getPoolInfoVote : async function(pid){
        //console.log(pid);
        var co    = setting.master_contract.contract;  //
        if(co=="eth")return;
        const web3 = new Web3("https://bsc-dataseed.binance.org");
         
          var abi   =[{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accKindPerShare","type":"uint256"},{"internalType":"uint256","name":"totalLP","type":"uint256"}],"stateMutability":"view","type":"function"}];

          try {
          var  contract = new web3.eth.Contract(abi, co);
           
          await  contract.methods.poolInfo(pid).call().then(function(resp) {
              //    console.log(resp);
           price1['poolinfo'][pid]=resp;
           WALLET.getSym(resp[0]);
           WALLET.getName(resp[0]);
        }); } catch (error) {
      
        }
    },
    getSupply2: async function(c,d){
       
      var co    = c;  //
      if(co=="eth")return;
      const web3 = new Web3("https://bsc-dataseed.binance.org");

      
    
      try {
      var abi   =[ {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
      var  contract = new web3.eth.Contract(abi, co);
      await contract.methods.totalSupply().call().then(function(resp) {
        price1['supply'][c]=resp/(10**d)
      //HANDLE.Supply(c,resp/(10**d));
      });
         } catch (error) {
         }
      

       

  },
    burn : async function(c,d){
      var a = "0x0000000000000000000000000000000000000000";
        const web3 = new Web3("https://bsc-dataseed.binance.org");
               
                var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

                try {
            
              var  contract = new web3.eth.Contract(abi, c);
              if(co=="eth")return;
                 
              await contract.methods.balanceOf(a).call().then(function(resp) {
              price1['burn'][c]=resp/(10**d);
              //HANDLE.burn(c,resp / Math.pow(10,d));
              });
            } catch (error) {
              
            }


          } ,
            getDigit: async function(c,t){
                try {
                var co    = c;  //
                if(co=="eth")return;
                const web3 = new Web3("https://bsc-dataseed.binance.org");
        
                var abid = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];
                var  contract = new web3.eth.Contract(abid, c);
                await  contract.methods.decimals().call().then(function(d) {
                if(t==3)WALLET.burn(co,d);
                if(t==3)WALLET.getSupply2(co,d);
                });
        } catch (error) {
              
        }
        },
        getPoolLength : async function(){
                
                  var co    = setting.master_contract.contract;  //
                  if(co=="eth")return;
                  // var digit = setting.pid[pid].digits ;
                  const web3 = new Web3("https://bsc-dataseed.binance.org");
                   
                    var abi   =[{
                      "inputs": [],
                      "name": "poolLength",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    }];
  
                   var  contract = new web3.eth.Contract(abi, co); 
                  await contract.methods.poolLength().call().then(function(resp) {
                     
                   for(var i=0;i<resp;i++){
                        WALLET.getPoolInfoVote(i);  
                       
                   }
                  });
              } 
}

function gp(){
var pid = setting.pid.length;
//console.log(pid);
for(var a=0;a<pid;a++){
         if(setting.pid[a].type=="farm")
        WALLET.getlphere(setting.pid[a].contract,a,setting.master_contract.contract,setting.pid[a].digits);
         else 
         WALLET.getlphere(setting.pid[a].contract,a,setting.master_contract.contract,setting.pid[a].digits);
       //  WALLET.getPoolInfo(a);

        if(setting.pid[a].type=="farm"){
        WALLET.getSupply(a); 
        WALLET.getWalletLpBalance('0xe9e7cea3dedca5984780bafc599bd69add087d56',a,'busd',setting.pid[a].contract,18);
        WALLET.getWalletLpBalance('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',a,'wbnb',setting.pid[a].contract,18);
        WALLET.getWalletLpBalance('0xe8148de8c8c3441257ce3a093746b37c569a6d3e',a,'kind',setting.pid[a].contract,8);
        WALLET.getWalletLpBalance('0x58d6f302aaf33dd30a7666e16909db3c5c74021b',a,'wbst',setting.pid[a].contract,18);
        }
        else
        {WALLET.getstaking(a);
        //  WALLET.getSupply(a); 
        price1['token_lp']['busd'][a] = 0;
        price1['token_lp']['wbnb'][a] = 0;
        price1['token_lp']['kind'][a] = 0;
        price1['token_lp']['wbst'][a] = 0;
        //  WALLET.getWalletLpBalance(setting.pid[a].contract,a,'busd',setting.master_contract.contract,18);
        //  WALLET.getWalletLpBalance('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',a,'wbnb',setting.master_contract.contract,18);
        //  WALLET.getWalletLpBalance('0xe8148de8c8c3441257ce3a093746b37c569a6d3e',a,'kind',setting.master_contract.contract,8);
        //  WALLET.getWalletLpBalance('0x58d6f302aaf33dd30a7666e16909db3c5c74021b',a,'wbst',setting.master_contract.contract,18);
        }
        
      
}



}
setInterval(gp,10000);
gp();


function tlp(){
        var pid = setting.pid.length;
        //console.log(pid);
        for(var a=0;a<pid;a++){
                if(setting.pid[a].type=="farm"){
                  price1['total_lp'][a]  = 0;
                        if(price1['token_lp']['busd'][a]>0)
                                price1['total_lp'][a] =  (price1['token_lp']['busd'][a] * 2 ) ;
                                else
                        if(price1['token_lp']['wbnb'][a]>0)
                                price1['total_lp'][a] =  (price1['token_lp']['wbnb'][a] * 2 *price1['price']['BNB'] ) ;
                                else
                        if(price1['token_lp']['kind'][a]>0)
                                price1['total_lp'][a] =  (price1['token_lp']['kind'][a] * 2 * price1['price']['KIND'] )  ;
                        }   
         
                if(setting.pid[a].type=="staking"){
                        
                            if(price1['sym'][setting.pid[a].contract] ==  "KIND" )
                            price1['total_lp'][a] =  (price1['lp'][a]  * price1['price']['KIND'] )  ;
                        
                             else
                             if(price1['sym'][setting.pid[a].contract] ==  "WBST" )
                              price1['total_lp'][a] =  (price1['lp'][a]  * price1['price']['WBST'] )  ;
                        
                              else
                              price1['total_lp'][a] = 0;
                }   
        } 
        }
        setInterval(tlp,10000);
        tlp();


       
      


        function ki(){
                WALLET.getRewardPool();
                var pid = setting.pid.length;
                //console.log(pid);
                for(var a=0;a<pid;a++){
               
                
                price1['kind_lp'][a] = price1['rate_lp'][a] * price1['lp'][a] ;
                }
                }
                setInterval(ki,10000);
                ki();

     
                function as(){
                var pid = setting.pid.length;
                //console.log(pid);
                
                for(var a=0;a<pid;a++){
                WALLET.getSym(setting.pid[a].contract);
                WALLET.getSym(setting.pid[a].token1);
                WALLET.getSym(setting.pid[a].token2);
                WALLET.getName(setting.pid[a].contract);
                WALLET.getName(setting.pid[a].token1);
                WALLET.getName(setting.pid[a].token2);

                

                WALLET.getDigit(setting.pid[a].contract,3);
                WALLET.getDigit(setting.pid[a].token1,3);
                WALLET.getDigit(setting.pid[a].token2,3);
                WALLET.totalAloct();

                     
                } 
                WALLET.getPoolLength();
                }
                setInterval(as,50000);
                as();
  
                function ratelp(){
                  var pid = setting.pid.length;
                  //console.log(pid);
                  for(var a=0;a<pid;a++){
                  price1['rate_lp'][a]  = 0;
                  if(price1['global_lp'][a]>0)
                  price1['rate_lp'][a] =  price1['total_lp'][a] / price1['global_lp'][a]  ;
                  
                  } 
                  }
                  setInterval(ratelp,10000);
                  ratelp();

 
 
 
module.exports = price1;