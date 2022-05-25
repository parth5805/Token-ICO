// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./token.sol";
import "./liquidity.sol";
import "./staking.sol";

contract Reserve{
  uint public constant duration = 4;
  address manager;
  address tokenAddress;

  
  event Hello(address _caller,string str);

  struct DepositToken{
      address payable account_no;
      uint amount;
      uint dateOfDeposit;
      uint endDate;
  }

 struct DepositETH{
      address payable account_no;
      uint amount;
      uint dateOfDeposit;
      uint endDate; 
  }
  mapping(address=>DepositETH) public balanceOfEth;
  mapping(address=>DepositToken) public balanceOfToken;

  // ERC20Burnable _token;
    address TokenAddress = 0x1Fa75022bC9b986ab1f90a38AD0A0eBdcB2A8d6C;
    address private TokenContractAddress = address(TokenAddress);
    MINDPAY _tokenInstance = MINDPAY(TokenContractAddress);

   address liquidityAddress = 0xd3b7C38cA909ea4aE9d61adD0379b124aadBC1a7;
    address private liquidityCardAddress = address(liquidityAddress);
    Liquidity _liquidityInstance = Liquidity(payable(liquidityCardAddress));

    address stakingAddress = 0x9B142eB812a3c7B0880FDda1bbe4A130A2bD7700;
    address private stakingCardAddress = address(stakingAddress);
    Staking _stakingInstance = Staking(payable(stakingCardAddress));
    

  constructor(address _tokenAddress) {
    manager=msg.sender;
    tokenAddress=_tokenAddress;
    
  }

  modifier onlyManager(){
    require(msg.sender==manager,"only manager can call this function");
    _;
  }

  function UpdateTokenBalance(address _owner,uint _amount) public {

    balanceOfToken[_owner]=DepositToken(payable(_owner),_amount,block.timestamp,block.timestamp+duration);
  }

  function UpdateEthBalance(address _owner,uint _amount) public {
    balanceOfEth[_owner]=DepositETH(payable(_owner),_amount,block.timestamp,block.timestamp+duration);
  }

  function checkTimeLock(address _owner) public view returns(bool){
    require(block.timestamp >= balanceOfToken[_owner].endDate && block.timestamp >= balanceOfEth[_owner].endDate, "You can only call this function after 15 mins from the Investment Date");
    return true;
  }  

  function cancelInvestment(address _owner) public returns(bool){
    require(balanceOfEth[_owner].amount>0,"You are not our investor");

    //90%(investETH) transfer to owner and  100% token burn
    balanceOfEth[_owner].account_no.transfer(balanceOfEth[_owner].amount);
    balanceOfEth[_owner].amount=0;

    _tokenInstance.burn(balanceOfToken[_owner].amount);

     balanceOfToken[_owner].amount=0;

    emit Hello(msg.sender,"hello bhai");

     return true;

  }


  function stakeInvestment(address _owner) public returns(bool){
    require(balanceOfEth[_owner].amount>0,"You are not our investor");

    //90%(investETH) transfer to liquidity contract  and  100% token transfer to staking contract
    payable(liquidityAddress).transfer(balanceOfEth[_owner].amount);
    _liquidityInstance.UpdateBalance(_owner,balanceOfEth[_owner].amount);
    balanceOfEth[_owner].amount=0;

    IERC20(tokenAddress).transfer(stakingAddress,balanceOfToken[_owner].amount);
    _stakingInstance.UpdateTokenBalance(_owner,balanceOfToken[_owner].amount);
     balanceOfToken[_owner].amount=0;

    emit Hello(msg.sender,"hello bhai");

     return true;

  }

  receive() external payable {
    }


  function callHello() public {
    // emit Hello("hello bhai");
  }
     
  function getETHBalance() public onlyManager view returns(uint)
  {
    return address(this).balance;
  }   

  function getTokenBalance() public onlyManager view returns(uint)
  {
    return IERC20(tokenAddress).balanceOf(address(this));
  }  

}


