// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Liquidity{
  address manager;

 struct Transaction{
      address payable account_no;
      uint amount;
      uint date; 
  }
  mapping(address=>Transaction) public balanceOf;
  constructor() {
    manager=msg.sender;
  }

  modifier onlyManager(){
    require(msg.sender==manager,"only manager can call this function");
    _;
  }


  function UpdateBalance(address _owner,uint _amount) public {
    balanceOf[_owner]=Transaction(payable(_owner),balanceOf[_owner].amount+_amount,block.timestamp);
  }

  function getBalance() public onlyManager view returns(uint)
  {
    return address(this).balance;
  }   


  receive() external payable {
    }
  
}


