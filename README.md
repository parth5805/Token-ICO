# Token ICO

Combination of ERC20, Investment , Staking , RewardTokens, Liquidity Contracts

# Here is the problem statement
* Create ERC20 token “MINDPAY”
* Contracts for accepting Investment through Ether with following  functionalities
  * 1 Ether = 1000 Mindpay
  * investment >1 & <5 Ether will have 10% bonus tokens
  * investment >5 Ether will have 20% bonus tokens 
  * 90% of the investment (ether) should be locked in a reserve contract along with 100% tokens he/she is going to get. Ideally it should be locked 365 days but for       testing we can put 15 Minutes
  * 10% of the investment should go to a liquidity contract.
  * At the end of 15 minutes investor can take following functions (Any of the action)
      * Cancel investment - in this case 90% of investment will return to investors from reserve contract 100% tokens will be burned automatically.
      * Stake Investment - Stake the investment. 90% of the funds will go to liquidity contract and 100% MindPay tokens goes to Staking Contract 

## To Run this dapp follow below link
***
* [Steps to Deploy](https://example.com)
