
 var MasterContract = setting.master_contract.contract;
 var MasterStaking  = "0x7d3D79A56893DF046Aa37fFe7CdfcB1965348fAc";
 var KindContract   = "0xe3ba88c38d2789fe58465020cc0fb60b70c10d32";
  
 
  

 var WALLET = {
       walletConect : function(){
        if (typeof window.ethereum !== 'undefined') return true;else return false;
       },
       checkMetamask :  function(){

        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            HANDLE.Metamask(true);
            return true;
          } else 
            {
            console.log("Need metamask to run this application");
            HANDLE.Metamask(false);
            return false;
            }


     }, logout :   function(){

        
        HANDLE.Logout("0");

     },

         getAccount : async function(){
          if(WALLET.walletConect()){} else return;
       
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        HANDLE.Account(account);

     },

       reqApprove : async function (pid){

        var contract    =  setting.pid[pid].contract;  //
        const web3 = new Web3(ethereum);
         
          var abi   =[{
            "inputs": [{
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }, {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }],
            "name": "allowance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }];
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        var fr = accounts[0];
        var  contract4 = new web3.eth.Contract(abi, contract);

         
        await   contract4.methods.allowance(fr,MasterContract).call().then(function(resp) {
            
            if(resp>999999999)  {
                HANDLE.Allowance(pid,999999999);
                  //  HANDLE.Approve(pid,pid); 
                return  true; }
            else
            {
            var co    = setting.pid[pid].contract;  //liq
            var to    = MasterContract;  //mc
            var abi =[
            {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
            ]; 
            const web3 = new Web3(ethereum);
            //const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            //const account = accounts[0];
            var  contract = new web3.eth.Contract(abi, co);
            var amn="115792089237316195423570985008687907853269984665640564039457584007913129639935";
            contract.methods.approve(to, amn).send({from:  fr}, 
            function(err, transactionHash) {
            //console.log(transactionHash);
            HANDLE.Approve(pid,transactionHash);
            return true;
            });
            }
        });

        
        },
        

       reqApproveStaking : async function (addr){

        var contract    =  addr;  //
        var mmc = "0x7d3D79A56893DF046Aa37fFe7CdfcB1965348fAc";
        const web3 = new Web3(ethereum);
         
          var abi   =[{
            "inputs": [{
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }, {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }],
            "name": "allowance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }];
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        var fr = accounts[0];
        var  contract4 = new web3.eth.Contract(abi, contract);

         
        await   contract4.methods.allowance(fr,mmc).call().then(function(resp) {
            //console.log(resp);
            if(resp>999999999)  {
                HANDLE.AllowanceStaking(addr,999999999);
                  //  HANDLE.Approve(pid,pid); 
                return  true; }
            else
            {
            var co    = addr;  //liq
            var to    = mmc;  //mc
            var abi =[
            {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
            ]; 
            const web3 = new Web3(ethereum);
            //const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            //const account = accounts[0];
            var  contract = new web3.eth.Contract(abi, co);
            var amn="115792089237316195423570985008687907853269984665640564039457584007913129639935";
            contract.methods.approve(to, amn).send({from:  fr}, 
            function(err, transactionHash) {
            //console.log(transactionHash);
            HANDLE.ApproveStaking(addr,transactionHash);
            return true;
            });
            }
        });

        
        },
       
        reqDeposit : async function (pid,am){
            var co    = MasterContract;  
            var digit = setting.pid[pid].digits;
            const web3 = new Web3(ethereum);
          // check decimal before deposit
            var abid = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];
            var  contract = new web3.eth.Contract(abid, setting.pid[pid].contract);
            await  contract.methods.decimals().call().then(function(resp) {
             
            WALLET.Deposit(pid,am*(10**resp))
             

            });
            },
           
       
        reqWitdraw : async function (pid,am){
            var co    = MasterContract;  
            var digit = setting.pid[pid].digits;
            const web3 = new Web3(ethereum);
          // check decimal before deposit
            var abid = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];
            var  contract = new web3.eth.Contract(abid, setting.pid[pid].contract);
            await  contract.methods.decimals().call().then(function(resp) {
                
            WALLET.Withdraw(pid,am*(10**resp))
             

            });
            },
            reqDepositS : async function (pid,am){
              var co    = MasterStaking;  
              var digit = 8;
              const web3 = new Web3(ethereum);
            // check decimal before deposit
              var abid = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];
              var  contract = new web3.eth.Contract(abid, KindContract);
              await  contract.methods.decimals().call().then(function(resp) {
               
             WALLET.DepositS(pid,am*(10**resp))
               
  
              });
              },
             
         
          reqWitdrawS : async function (pid,am){
              var co    = MasterStaking;  
              var digit = 8;
              const web3 = new Web3(ethereum);
            // check decimal before deposit
              var abid = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];
              var  contract = new web3.eth.Contract(abid, KindContract);
              await  contract.methods.decimals().call().then(function(resp) {
                  
             WALLET.WithdrawS(pid,am*(10**resp))
               
  
              });
              },
              
         
       
        Deposit : async function (pid,am){
           
          var co    = MasterContract;  
          var digit = setting.pid[pid].digits;
          const web3 = new Web3(ethereum);
        
            var abi =[  {
              "inputs": [{
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
              }, {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
              }],
              "name": "deposit",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          } ];
             
             
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            var fr = accounts[0];
            var  contract = new web3.eth.Contract(abi, co);
            var amn =  BigInt(am )  ; amn+="";
          
            var tx = {
                from: fr,
                to: co,
                data: contract.methods.deposit(pid, amn).encodeABI() 
                
            };
            web3.eth.sendTransaction(tx).then(res => {
              hideLoader();
                HANDLE.Deposit(pid,res);
                WALLET.getWalletLpBalance(pid);
                //console.log("res",res);
            }).catch(err => {
                //onsole.log("err",err)
            });

           

         
          },

        DepositS : async function (pid,am){
           
          var co    = MasterStaking;  
          var digit = 8;
          const web3 = new Web3(ethereum);
        
            var abi =[  {
              "inputs": [{
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
              }, {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
              }],
              "name": "deposit",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          } ];
             
             
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            var fr = accounts[0];
            var  contract = new web3.eth.Contract(abi, co);
            var amn =  BigInt(am )  ; amn+="";
          
            var tx = {
                from: fr,
                to: co,
                data: contract.methods.deposit(pid, amn).encodeABI() 
                
            };
            web3.eth.sendTransaction(tx).then(res => {
              hideLoader();
               // HANDLE.DepositS(pid,res);
                WALLET.getWalletLpBalanceS(pid);
                //console.log("res",res);
            }).catch(err => {
                //onsole.log("err",err)
            });

           

         
          },

            addContract : async function (token){

              var co    = MasterContract;  
              const web3 = new Web3(ethereum);
              
                var abi =[ {
                  "inputs": [
                    {
                      "internalType": "contract IERC20",
                      "name": "_lpToken",
                      "type": "address"
                    }
                  ],
                  "name": "add",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                } ];
                 
                 
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                var fr = accounts[0];
                var  contract = new web3.eth.Contract(abi, co);
              
                var tx = {
                    from: fr,
                    to: co,
                    data: contract.methods.add(token).encodeABI() 
                    
                };
                web3.eth.sendTransaction(tx).then(res => {
                    HANDLE.AddContract(res);
                    //console.log("res",res);
                }).catch(err => {
                    //console.log("err",err)
                });
               
              },

            Withdraw : async function  (pid,am){
                var co    = MasterContract;   
                var digit = setting.pid[pid].digits;
                  
                  const web3 = new Web3(ethereum);
                
                  var abi =[{
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_pid",
                        "type": "uint256"
                    }, {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }];
                   
                   
                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                  var amn =  BigInt(am)  ; amn+="";
                  var tx = {
                      from: fr,
                      to: co,
                      data: contract.methods.withdraw(pid, amn).encodeABI() 
                      
                  };
                  web3.eth.sendTransaction(tx).then(res => {
                      //console.log("res",res);
                      hideLoader();
                      HANDLE.Withdraw(pid,res);
                      WALLET.getBalanceLP(pid);
                  }).catch(err => {
                     // console.log("err",err)
                  });
                 
                },

            WithdrawS : async function  (pid,am){
              var co    = MasterStaking;   
              var digit = 8;
                
                const web3 = new Web3(ethereum);
              
                var abi =[{
                  "inputs": [{
                      "internalType": "uint256",
                      "name": "_pid",
                      "type": "uint256"
                  }, {
                      "internalType": "uint256",
                      "name": "_amount",
                      "type": "uint256"
                  }],
                  "name": "withdraw",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
              }];
                 
                 
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                var fr = accounts[0];
                var  contract = new web3.eth.Contract(abi, co);
                var amn =  BigInt(am)  ; amn+="";
                var tx = {
                    from: fr,
                    to: co,
                    data: contract.methods.withdraw(pid, amn).encodeABI() 
                    
                };
                web3.eth.sendTransaction(tx).then(res => {
                    //console.log("res",res);
                    hideLoader();
                   // HANDLE.Withdraw(pid,res);
                    WALLET.getBalanceLPS(pid);
                }).catch(err => {
                   // console.log("err",err)
                });
               
              },

                voteUp : async function  (pid){
                    var co    = MasterContract;   
                    var am = $("#vote-val-pid-"+pid).val();
                      
                      const web3 = new Web3(ethereum);
                    
                      var abi =[{
                          "inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},
                                    {"internalType":"uint256","name":"_allocPoint","type":"uint256"}],
                           "name":"voteDown",
                           "outputs":[],
                           "stateMutability":"nonpayable","type":"function"}
                           ,
                           {"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"voteUp","outputs":[],"stateMutability":"nonpayable","type":"function"}];
                       
                       
                      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                      var fr = accounts[0];
                      var  contract = new web3.eth.Contract(abi, co);
                      var tx = {
                          from: fr,
                          to: co,
                          data: contract.methods.voteUp(pid, am).encodeABI() 
                          
                      };
                      web3.eth.sendTransaction(tx).then(res => {
                        hideLoader();
                        //WALLET.getPoolInfo(pid);
                          //console.log("res",res);
                         // HANDLE.VoteUp(pid,res);
                      }).catch(err => {
                          console.log("err",err)
                      });
                     
                    },
                    WithdrawS : async function  (pid,am){
                      var co    = MasterStaking;   
                      var digit = 18;
                        
                        const web3 = new Web3(ethereum);
                      
                        var abi =[{
                          "inputs": [{
                              "internalType": "uint256",
                              "name": "_pid",
                              "type": "uint256"
                          }, {
                              "internalType": "uint256",
                              "name": "_amount",
                              "type": "uint256"
                          }],
                          "name": "withdraw",
                          "outputs": [],
                          "stateMutability": "nonpayable",
                          "type": "function"
                      }];
                         
                         
                        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                        var fr = accounts[0];
                        var  contract = new web3.eth.Contract(abi, co);
                        var amn =  BigInt(am)  ; amn+="";
                        var tx = {
                            from: fr,
                            to: co,
                            data: contract.methods.withdraw(pid, amn).encodeABI() 
                            
                        };
                        web3.eth.sendTransaction(tx).then(res => {
                            //console.log("res",res);
                            hideLoader();
                            HANDLE.Withdraw(pid,res);
                            WALLET.getBalanceLP(pid);
                        }).catch(err => {
                           // console.log("err",err)
                        });
                       
                      },
                    voteDown : async function  (pid,am){
                        var co    = MasterContract;   
                        var am = $("#vote-val-pid-"+pid).val();
                          
                          const web3 = new Web3(ethereum);
                        
                          var abi =[{
                              "inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},
                                        {"internalType":"uint256","name":"_allocPoint","type":"uint256"}],
                               "name":"voteDown",
                               "outputs":[],
                               "stateMutability":"nonpayable","type":"function"}
                               ,
                               {"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"voteUp","outputs":[],"stateMutability":"nonpayable","type":"function"}];
                           
                           
                          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                          var fr = accounts[0];
                          var  contract = new web3.eth.Contract(abi, co);
                          var tx = {
                              from: fr,
                              to: co,
                              data: contract.methods.voteDown(pid, am).encodeABI() 
                              
                          };
                          web3.eth.sendTransaction(tx).then(res => {
                              //console.log("res",res);
                             // HANDLE.VoteUp(pid,res);
                             hideLoader();
                            // WALLET.getPoolInfo(pid);
                          }).catch(err => {
                             // console.log("err",err)
                          });
                         
                        },
                        airdrop : async function  (){
                            var co    = "0xE355ab93A0C1C10B72E7947C11C5f724E167D5cd";   
                            
                              
                              const web3 = new Web3(ethereum);
                              var abi =[ {"inputs":[],"name":"get","outputs":[],"stateMutability":"nonpayable","type":"function"}];
                              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                              var fr = accounts[0];
                              var  contract = new web3.eth.Contract(abi, co);
                              var tx = {
                                  from: fr,
                                  to: co,
                                  data: contract.methods.get().encodeABI() 
                                  
                              };
                              web3.eth.sendTransaction(tx).then(res => {
                                  //console.log("res",res);
                                 // HANDLE.VoteUp(pid,res);
                                 //hideLoader();
                                // WALLET.getPoolInfo(pid);
                              }).catch(err => {
                                 // console.log("err",err)
                              });
                             
                            }/* {"inputs":[],"name":"get","outputs":[],"stateMutability":"nonpayable","type":"function"}
                        ,
    

            getPoolInfo : async function(pid){
  
                var co    = MasterContract;  //
                var digit = setting.token.digits ;
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accKindPerShare","type":"uint256"},{"internalType":"uint256","name":"totalLP","type":"uint256"}],"stateMutability":"view","type":"function"}];

                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                   
                  await  contract.methods.poolInfo(pid).call().then(function(resp) {
                   
                  //console.log(resp); // This will output "OK Computer"
                    //return (resp / Math.pow(10,digit));
                 HANDLE.PoolInfo(pid,resp);
                });
            } 
             */
           ,

            getPendingReward : async function(pid){
              if(WALLET.walletConect()){} else return;
                var co    = MasterContract;  //
                var digit = setting.token.digits ;
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_pid",
                        "type": "uint256"
                    }, {
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "pendingKind",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }];

                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                   
                  await  contract.methods.pendingKind(pid,fr).call().then(function(resp) {
                   
                 //  console.log(resp); // This will output "OK Computer"
                    //return (resp / Math.pow(10,digit));
                    HANDLE.PendingReward(pid,resp / Math.pow(10,digit));
                });
            },
            getBalanceLP : async function(pid){
               if(WALLET.walletConect()){} else return;
                var co    = MasterContract;  //
                var digit = setting.pid[pid].digits ;
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_pid",
                        "type": "uint256"
                    }, {
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "balanceLP",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }];

                try {
                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                await contract.methods.balanceLP(pid,fr).call().then(function(resp) {
                 HANDLE.BalanceLP(pid,resp / Math.pow(10,digit));
                });
              } catch (error) {
              
              }
            },
            

            getPendingRewardS : async function(pid){
              if(WALLET.walletConect()){} else return;
                var co    = MasterStaking;  //
                var digit = 8 ;
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"_tokenStaking","type":"address"},{"internalType":"contract IERC20","name":"_tokenReward","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_decimal","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"balanceLP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"tokenStaking","type":"address"},{"internalType":"contract IERC20","name":"tokenReward","type":"address"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"decimal","type":"uint256"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"accPerShare","type":"uint256"},{"internalType":"uint256","name":"totalLP","type":"uint256"},{"internalType":"uint256","name":"rewardAvailable","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                   
                  await  contract.methods.pendingReward(pid,fr).call().then(function(resp) {
                   
                 //  console.log(resp); // This will output "OK Computer"
                    //return (resp / Math.pow(10,digit));
                    HANDLE.PendingRewardS(pid,resp / Math.pow(10,digit));
                });
            },
            getBalanceLPS : async function(pid){
               if(WALLET.walletConect()){} else return;
                var co    = MasterStaking;  //
                var digit = 8 ;

                
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"_tokenStaking","type":"address"},{"internalType":"contract IERC20","name":"_tokenReward","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_decimal","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"balanceLP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"tokenStaking","type":"address"},{"internalType":"contract IERC20","name":"tokenReward","type":"address"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"decimal","type":"uint256"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"accPerShare","type":"uint256"},{"internalType":"uint256","name":"totalLP","type":"uint256"},{"internalType":"uint256","name":"rewardAvailable","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

                try {
                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                await contract.methods.balanceLP(pid,fr).call().then(function(resp) {
                 
                 HANDLE.BalanceLPS(pid,resp / Math.pow(10,digit));
                });
              } catch (error) {
              
              }
            },
            getWalletLpBalance : async function(pid){
              if(WALLET.walletConect()){} else return;
              var co    = setting.pid[pid].contract;  //
              var digit = setting.pid[pid].digits ;
              const web3 = new Web3(ethereum);
               
                var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

                try {
              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
              var fr = accounts[0];
              var  contract = new web3.eth.Contract(abi, co);
                 
              await contract.methods.balanceOf(fr).call().then(function(resp) {
              HANDLE.BalanceWallet(pid,resp / Math.pow(10,digit));
              });
            } catch (error) {
              
            }


          },
          getWalletLpBalanceS : async function(pid,co){
            if(WALLET.walletConect()){} else return;
            
         
            var digit = 8 ;
            const web3 = new Web3(ethereum);
             
              var abi   =[{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

              try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            var fr = accounts[0];
            var  contract = new web3.eth.Contract(abi, co);
               
            await contract.methods.balanceOf(fr).call().then(function(resp) {
            HANDLE.BalanceWalletS(pid,resp / Math.pow(10,digit));
            });
          } catch (error) {
            
          }


        },
            getAllowance : async function(pid){
              if(WALLET.walletConect()){} else return;
                var contract    =  setting.pid[pid].contract;  //
                const web3 = new Web3(ethereum);
                 
                  var abi   =[{
                    "inputs": [{
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }, {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }],
                    "name": "allowance",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }];
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                var fr = accounts[0];
                var  contract4 = new web3.eth.Contract(abi, contract);

                 
                await   contract4.methods.allowance(fr,MasterContract).call().then(function(resp) {
                      HANDLE.Allowance(pid,resp);
                });
            
            },
            getPoolLength : async function(){
              if(WALLET.walletConect()){} else return;
                var co    = MasterContract;  //
                // var digit = setting.pid[pid].digits ;
                const web3 = new Web3(ethereum);
                 
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

                  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  var fr = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                   
                await contract.methods.poolLength().call().then(function(resp) {
                   
               HANDLE.poolLength(resp);
                });
            },reqSwap : async function (){

              var contract    =  "0xE8148De8c8c3441257Ce3A093746B37c569a6D3E";  //
              const web3 = new Web3(ethereum);
               
                var abi   =[{
                  "inputs": [{
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                  }, {
                      "internalType": "address",
                      "name": "spender",
                      "type": "address"
                  }],
                  "name": "allowance",
                  "outputs": [{
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                  }],
                  "stateMutability": "view",
                  "type": "function"
              }];
              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
              var fr = accounts[0];
              var  contract4 = new web3.eth.Contract(abi, contract);
      
               
              await   contract4.methods.allowance(fr,"0xba9A97e624a5e6C6A2C96CD2a9Aa4a470b9f8A93").call().then(function(resp) {
                  
                  if(resp>999999999)  {
                        $('.approve-swap').hide();
                        //  HANDLE.Approve(pid,pid); 
                      return  true; }
                  else
                  {
                  var co    = "0xE8148De8c8c3441257Ce3A093746B37c569a6D3E";  //liq
                  var to    = "0xba9A97e624a5e6C6A2C96CD2a9Aa4a470b9f8A93";  //mc
                  var abi =[
                  {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
                  ]; 
                  const web3 = new Web3(ethereum);
                  //const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  //const account = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                  var amn="115792089237316195423570985008687907853269984665640564039457584007913129639935";
                  contract.methods.approve(to, amn).send({from:  fr}, 
                  function(err, transactionHash) {
                    $('.approve-swap').hide();
                  //console.log(transactionHash);
                  //HANDLE.Approve(pid,transactionHash);
                  return true;
                  });
                  }
              });
      
              
              },
               
                        startSwap : async function  (){
                            var co    = "0xba9A97e624a5e6C6A2C96CD2a9Aa4a470b9f8A93";   
                            
                              
                              const web3 = new Web3(ethereum);
                              var abi =[ {"inputs":[],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"}];
                              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                              var fr = accounts[0];
                              var  contract = new web3.eth.Contract(abi, co);
                              var tx = {
                                  from: fr,
                                  to: co,
                                  data: contract.methods.swap().encodeABI() 
                                  
                              };
                              web3.eth.sendTransaction(tx).then(res => {
                                  //console.log("res",res);
                                 // HANDLE.VoteUp(pid,res);
                                 //hideLoader();
                                // WALLET.getPoolInfo(pid);
                              }).catch(err => {
                                 // console.log("err",err)
                              });
                             
                            },
                            getKing : async function  (){
                              var co    = "0x1892bd4071E1f9c0Df839FE63Ed361e226122344";   
                              
                                
                                const web3 = new Web3(ethereum);
                                var abi =[{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"}];
                                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                                var fr = accounts[0];
                                var  contract = new web3.eth.Contract(abi, co);
                                var am = $("#convert-to-king-value").val()*1;
                                var tx = {
                                    from: fr,
                                    to: co,
                                    data: contract.methods.swap(am).encodeABI() 
                                    
                                };
                                web3.eth.sendTransaction(tx).then(res => {
                                    //console.log("res",res);
                                   // HANDLE.VoteUp(pid,res);
                                   //hideLoader();
                                  // WALLET.getPoolInfo(pid);
                                }).catch(err => {
                                   // console.log("err",err)
                                });
                               
                              }
            ,reqSwapk : async function (){

              var contract    =  "0xe3ba88c38d2789fe58465020cc0fb60b70c10d32";  //
              const web3 = new Web3(ethereum);
               
                var abi   =[{
                  "inputs": [{
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                  }, {
                      "internalType": "address",
                      "name": "spender",
                      "type": "address"
                  }],
                  "name": "allowance",
                  "outputs": [{
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                  }],
                  "stateMutability": "view",
                  "type": "function"
              }];
              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
              var fr = accounts[0];
              var  contract4 = new web3.eth.Contract(abi, contract);
      
               
              await   contract4.methods.allowance(fr,"0x1892bd4071E1f9c0Df839FE63Ed361e226122344").call().then(function(resp) {
                  
                  if(resp>999999999)  {
                        $('.approve-swapk').hide();
                        //  HANDLE.Approve(pid,pid); 
                      return  true; }
                  else
                  {
                  var co    = "0xe3ba88c38d2789fe58465020cc0fb60b70c10d32";  //liq
                  var to    = "0x1892bd4071E1f9c0Df839FE63Ed361e226122344";  //mc
                  var abi =[
                  {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
                  ]; 
                  const web3 = new Web3(ethereum);
                  //const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                  //const account = accounts[0];
                  var  contract = new web3.eth.Contract(abi, co);
                  var amn="115792089237316195423570985008687907853269984665640564039457584007913129639935";
                  contract.methods.approve(to, amn).send({from:  fr}, 
                  function(err, transactionHash) {
                    $('.approve-swapk').hide();
                  //console.log(transactionHash);
                  //HANDLE.Approve(pid,transactionHash);
                  return true;
                  });
                  }
              });
      
              
              }
              
            
            
            
            
            
            
            
            
            /*, 
      totalSupply: async function(c){
        if(WALLET.walletConect()){} else return;
        var co    = c;  //
        const web3 = new Web3(ethereum);

        var abid = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];
        var  contract = new web3.eth.Contract(abid, c);
        await  contract.methods.decimals().call().then(function(digit) {
          WALLET.getSupply(c,digit);
     

          });

    }
*/


     
          
 }




 if(WALLET.walletConect()) 
 window.ethereum.on('accountsChanged', function (accounts) {
    var wallet = getCookie("current-wallet");
    if(wallet=="0") return;
    console.log(accounts);
    WALLET.logout();
    WALLET.getAccount();
  })