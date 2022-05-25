// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./token.sol";

contract Staking{

  address manager;
  address tokenAddress;
  address rewardTokenAddress;

  

 struct Transaction{
      address payable account_no;
      uint amount;
      uint staked_date; 
      uint gained_token;
  }
  mapping(address=>Transaction) public balanceOf;


  constructor(address _tokenAddress,address _rewardTokenAddress) {
    manager=msg.sender;
    tokenAddress=_tokenAddress;
    rewardTokenAddress=_rewardTokenAddress;

  }

  modifier onlyManager(){
    require(msg.sender==manager,"only manager can call this function");
    _;
  }


  function UpdateTokenBalance(address _owner,uint _amount) public {
    balanceOf[_owner]=Transaction(payable(_owner),_amount,block.timestamp,0);
  }

  function getTokenBalance() public onlyManager view returns(uint)
  {
    return IERC20(tokenAddress).balanceOf(address(this));
  } 

  function checkReward(address _owner) public view returns(uint)
    {
    require(balanceOf[_owner].amount>0,"you have not stake any amount of MINDPAY tokens");

    //every 60 seconds 1% amount of MINDREWARD Token is generate (1% of MINDPAY TOKEN)
    uint current_balance;
    uint current_time=block.timestamp;
    uint total_time_differnce=current_time-balanceOf[_owner].staked_date;
    uint term=total_time_differnce/10; // 60 second is 1 term, on every term investor will get 1% amount of MINDREWARD TOKEN on his Stake amount
    current_balance=balanceOf[_owner].amount*1/100 * term;
    return current_balance;
    }

  function unStake(address _owner) public returns(bool){
    require(balanceOf[_owner].amount> 0,"You have not stake any amount of MINDPAY tokens");
    //transfer 100%(MINDPAY) to Owner 
    IERC20(tokenAddress).transfer(balanceOf[_owner].account_no,balanceOf[_owner].amount);
    
    //transfer MINDREWARD to owner
    if(checkReward(_owner) > 0)
    {
    balanceOf[_owner].gained_token=checkReward(_owner);
    IERC20(rewardTokenAddress).transfer(balanceOf[_owner].account_no,balanceOf[_owner].gained_token);
    }
    balanceOf[_owner].amount=0;
    return true;
  } 

}


