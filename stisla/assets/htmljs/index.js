
var echo =  "tes";
echo += ' <script    src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.3.4/web3.min.js"></script>';
echo += ' <script    src="setting.js"></script>';
echo += ' <script    src="stisla/assets/js/wallet_handle.js"></script>';
echo += ' <script    src="stisla/assets/js/wallet_conect.js"></script>';
//echo += " <script>   console.log(setting);   </script> ";
echo += " <script>      WALLET.checkMetamask() ;   </script> ";
echo += " <script>      WALLET.getAccount() ;     </script> ";
echo += " <script>      WALLET.reqApprove(0);   </script> ";
echo += " <script>      WALLET.getBalanceLP(0) ;   </script> ";
echo += " <script>      WALLET.getPendingReward(0) ;   </script> ";
echo += " <script>      WALLET.getAllowance(0) ;   </script> ";

 module.exports = echo;