// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./reserve.sol";
import "./liquidity.sol";
import "./staking.sol";

contract Investment {

    struct Investor{
            address payable account_no;
            uint invested_ethers;
            uint invested_date;
            uint gained_tokens;
        }

    mapping(address=>Investor) public investors;

    address manager;
    address tokenAddress;
    address  reserveContract;
    address liquidityContract;
    address stakingContract;


    address reserveAddress = 0xbc565A1eA3036679F77BED29696b7F171B443389;
    address private reserveCardAddress = address(reserveAddress);
    Reserve _reserveInstance = Reserve(payable(reserveCardAddress));

    address liquidityAddress = 0xd3b7C38cA909ea4aE9d61adD0379b124aadBC1a7;
    address private liquidityCardAddress = address(liquidityAddress);
    Liquidity _liquidityInstance = Liquidity(payable(liquidityCardAddress));

    address stakingAddress = 0x9B142eB812a3c7B0880FDda1bbe4A130A2bD7700;
    address private stakingCardAddress = address(stakingAddress);
    Staking _stakingInstance = Staking(payable(stakingCardAddress));


    constructor(address _tokenAddress,address _reserveContract,address _liquidityContract,address _stakingContract) {
        tokenAddress=_tokenAddress;
        manager=msg.sender;
        reserveContract=_reserveContract;
        liquidityContract=_liquidityContract;
        stakingContract=_stakingContract;
        
    }

    function checkEqualToken(uint _amount) public pure returns(uint){
    require(_amount >= 1 ether,"Amount should be greater than 1 ether");
    uint investedAmount=_amount/1 ether;
    uint returnToken;
    if(_amount > 1 ether && _amount < 5 ether){
        returnToken=investedAmount*1000 + (investedAmount *1000) * 1/10;
    }
    else if(_amount >5 ether)
    {
        returnToken=investedAmount*1000 + (investedAmount *1000) * 2/10;
    }
    else
    {
        returnToken=investedAmount*1000;
    }

    return returnToken;
    }


    function invest() public payable{
    require(msg.sender != investors[msg.sender].account_no,"You have already Invest");
    require(msg.value >= 1 ether,"Amount should be greater than 1 ether");
    uint investedAmount=msg.value/1 ether;
    uint returnToken;
    if(msg.value > 1 ether && msg.value < 5 ether){
        returnToken=investedAmount*1000 + (investedAmount *1000) * 1/10;
    }
    else if(msg.value >5 ether)
    {
        returnToken=investedAmount*1000 + (investedAmount *1000) * 2/10;
    }
    else
    {
        returnToken=investedAmount*1000;
    }

    investors[msg.sender]=Investor(payable(msg.sender),investedAmount,block.timestamp,returnToken);

    //lock logic 90%(msg.value) and 100%(returnToken) for 15 min in reserve contract
    IERC20(tokenAddress).transfer(reserveContract, returnToken); //100% token
    _reserveInstance.UpdateTokenBalance(msg.sender,returnToken); 

    // _reserveInstance.callHello();

    uint reserveEth= msg.value * 9/10; //90% investment amount
    payable(reserveContract).transfer(reserveEth);
    _reserveInstance.UpdateEthBalance(msg.sender,reserveEth);

    //10%(msg.value) transfer to liquidity contract
    uint liquidEth= msg.value * 1/10; //10% investment amount
    payable(liquidityContract).transfer(liquidEth);
    _liquidityInstance.UpdateBalance(msg.sender,liquidEth);
    }


    function cancelInvestment() public  {
        require(_reserveInstance.checkTimeLock(msg.sender),"You can only call this function after 15 mins from the Investment Date");
        require(_reserveInstance.cancelInvestment(msg.sender),"There was an ERROR in CancelInvestment Function");

    } 

    function stakeInvestment() public{
        require(_reserveInstance.checkTimeLock(msg.sender),"You can only call this function after 15 mins from the Investment Date");
        require(_reserveInstance.stakeInvestment(msg.sender),"There was an ERROR in StakeInvestment Function");
    }


    function checkStakingReward(address _owner) public view returns(uint){
        uint total_reward=_stakingInstance.checkReward(_owner);
        return total_reward;
    }

    function UnStake() public {
        require(_stakingInstance.unStake(msg.sender),"There was an ERROR in Unstake Function");
    }

}


