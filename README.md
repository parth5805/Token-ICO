# Token ICO

Combination of ERC20, Investment , Staking , RewardTokens, Liquidity Contracts

# Here is the problem statement
*Create ERC20 token “MINDPAY”
*Contracts for accepting Investment through Ether with following  functionalities
  * 1 Ether = 1000 Mindpay
  * >1 & <5 Ether investment will have 10% bonus tokens
  * >5 Ether investment will have 20% bonus tokens 
  * 90% of the investment (ether) should be locked in a reserve contract along with 100% tokens he/she is going to get. Ideally it should be locked 365 days but for          testing we can put 15 Minutes
  * 10% of the investment should go to a liquidity contract.
  * At the end of 15 minutes investor can take following functions (Any of the action)
     -> Cancel investment - in this case 90% of investment will return to investors from reserve contract 100% tokens will be burned automatically.
     -> Stake Investment - Stake the investment. 90% of the funds will go to liquidity contract and 100% MindPay tokens goes to Staking Contract 


# Follow this steps to run a Dapp:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Technologies
***
A list of technologies used within the project:
* [Technology name](https://example.com): Version 12.3 
* [Technology name](https://example.com): Version 2.34
* [Library name](https://example.com): Version 1234
