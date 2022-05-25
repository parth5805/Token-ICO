import { useState } from 'react';
import { ethers } from 'ethers';
import  Token  from './artifacts/contracts/token.sol/MINDPAY.json'
import  RewardToken  from './artifacts/contracts/rewardToken.sol/MINDREWARD.json'
import  Investment  from './artifacts/contracts/investment.sol/Investment.json'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

const mindpayAddress="0x1Fa75022bC9b986ab1f90a38AD0A0eBdcB2A8d6C";
const mindrewardAddress="0x84d7b5722924c4D7f601C155128D4748dBc64d3b";
const investmentAddress="0x8fb2eeB6be3F3f31cebB4F92a3C0E65b5034F4bd";


function App() {
  let provider;
  let signer;
  let current_address;

  async function connect_to_metamask() 
  {
     if (typeof window.ethereum !== 'undefined') 
   {
    var current_address_span = document.getElementById("currentaddress")
     provider = new ethers.providers.Web3Provider(window.ethereum)           
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    current_address=account;
    signer = provider.getSigner();
    current_address_span.innerHTML = `METAMASK ACCOUNT:- : ${account}`
    console.log(account);      
    return true;
    }
    else
    {
    alert("Please Install Metamask !");
      return false;
   }
  }
  document.addEventListener('DOMContentLoaded', async () => {
   var connected = await connect_to_metamask();
   });  

   window.ethereum.on('accountsChanged', async function (accounts) {
    var connected = await connect_to_metamask();
  })



async function check_mindpay_balance() {
  if (connect_to_metamask()) {
    const contract = new ethers.Contract(mindpayAddress, Token.abi, provider);
    const balance = await contract.balanceOf(current_address);
    document.getElementById('mindpay_balance').innerHTML="You have "+balance+" MINDPAY Tokens";
  }
}

async function check_mindreward_balance() {
  if (connect_to_metamask()) {
    const contract = new ethers.Contract(mindrewardAddress, RewardToken.abi, provider);
    const balance = await contract.balanceOf(current_address);
    document.getElementById('mindreward_balance').innerHTML="You have "+balance+" MINDREWARD Tokens";
  }
}


async function check_mindpay_supply() {
  if (connect_to_metamask()) {
    const contract = new ethers.Contract(mindpayAddress, Token.abi, provider);
    const balance = await contract.totalSupply();
    document.getElementById('mindpay_supply').innerHTML="TOTAL SUPPLY:- "+balance+" ";
  }
}



async function send_mindpay_token() {
  if (connect_to_metamask()) {
    signer = provider.getSigner();
  
    const contract = new ethers.Contract(mindpayAddress, Token.abi, signer);
    const recipient_address = document.getElementById("mindpay_recaddress").value;
    const amount = document.getElementById("mindpay_amount").value;
  try{
    const transaction = await contract.transfer(recipient_address,amount);
    await transaction.wait(document.getElementById("mindpay_txnstatus").innerHTML="your txn is under process wait....");
    document.getElementById("mindpay_txnstatus").innerHTML="Transcation Hash:-"+transaction['hash'];
  }
  catch(error)
  {
    document.getElementById("mindpay_txnstatus").innerHTML=error["reason"];

  }
  
  }
}

async function send_mindreward_token() {
  if (connect_to_metamask()) {
    signer = provider.getSigner();
    const contract = new ethers.Contract(mindrewardAddress, RewardToken.abi, signer);
    const recipient_address = document.getElementById("mindreward_recaddress").value;
    const amount = document.getElementById("mindreward_amount").value;
    
    try{  

      const transaction = await contract.transfer(recipient_address,amount);
    await transaction.wait(document.getElementById("mindreward_txnstatus").innerHTML="your txn is under process wait....");
    document.getElementById("mindreward_txnstatus").innerHTML="Transcation Hash:-"+transaction['hash'];
  }
  catch(error)
  {
    document.getElementById("mindreward_txnstatus").innerHTML=error["reason"];

  }
}
}


async function invest() {
  if (connect_to_metamask()) {
    signer = provider.getSigner();
    const contract = new ethers.Contract(investmentAddress, Investment.abi, signer);

    const amount = document.getElementById("invest_amount").value;
    
    try{
    const transaction = await contract.invest({value:amount});
    await transaction.wait(document.getElementById("invest_txnstatus").innerHTML="your txn is under process wait....");
    document.getElementById("invest_txnstatus").innerHTML="Transcation Hash:-"+transaction['hash'];
    }
    catch(error)
  {
    document.getElementById("invest_txnstatus").innerHTML=error["reason"];

  }


  }
}



async function cancel_investment() {
  if (connect_to_metamask()) {
    signer = provider.getSigner();
    const contract = new ethers.Contract(investmentAddress, Investment.abi, signer);
   
    try{
     const transaction = await contract.cancelInvestment();
    await transaction.wait(document.getElementById("cancel_status").innerHTML="your txn is under process wait....");
    document.getElementById("cancel_status").innerHTML="Transcation Hash:-"+transaction['hash'];
  }
  catch(error)
  {
    document.getElementById("cancel_status").innerHTML=error["reason"];

  }
  }
}

async function stake_investment() {
  if (connect_to_metamask()) {
    signer = provider.getSigner();
    const contract = new ethers.Contract(investmentAddress, Investment.abi, signer);
    
    try{
    const transaction = await contract.stakeInvestment();
    await transaction.wait(document.getElementById("stake_status").innerHTML="your txn is under process wait....");
    document.getElementById("stake_status").innerHTML="Transcation Hash:-"+transaction['hash'];
  }
  catch(error)
  {
    document.getElementById("stake_status").innerHTML=error["reason"];

  }
  }
}



async function check_staking_balance() {
  if (connect_to_metamask()) {
    signer = provider.getSigner();
    const contract = new ethers.Contract(investmentAddress, Investment.abi, signer);
    try{
      const owner_address = document.getElementById("reward_owner").value;

      const balance = await contract.checkStakingReward(owner_address);
    document.getElementById('staking_balance').innerHTML="You have Gained "+balance+" MINDREWARD Tokens";
  }
  catch(error)
  {
    document.getElementById("staking_balance").innerHTML=error["reason"];

  }
  }
}



async function check_equal_token() {
  if (connect_to_metamask()) {
    signer = provider.getSigner();
  
    const contract = new ethers.Contract(investmentAddress, Investment.abi, signer);
    const amount = document.getElementById("compare_invest_amount").value;
  try{
    const balance = await contract.checkEqualToken(amount);
    document.getElementById('mindpay_equal').innerHTML="You will get "+balance+" MINDPAYTokens";

  }
  catch(error)
  {
    document.getElementById("mindpay_equal").innerHTML=error["reason"];

  }
  
  }
}


async function unstake() {
  if (connect_to_metamask()) {
    signer = provider.getSigner();
    const contract = new ethers.Contract(investmentAddress, Investment.abi, signer);
    
    try{
    const transaction = await contract.UnStake();
    await transaction.wait(document.getElementById("unstake_status").innerHTML="your txn is under process wait....");
    document.getElementById("unstake_status").innerHTML="Transcation Hash:-"+transaction['hash'];
  }
  catch(error)
  {
    document.getElementById("unstake_status").innerHTML=error["reason"];

  }
  }
}

  return (
    <body>
<div className="container">
        <h3 className="text-muted">INVESTMENT Contract Functions</h3>
        <div className="breadcrumb">        
        <p ><a className="btn btn-lg btn-success" href="#"  id="currentaddress" role="button">Metamask Is Not Connected</a></p>
      </div>


<fieldset className="form-horizontal">
<legend>Token Details</legend>

<div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="" name="" className="btn btn-primary" onClick={check_mindpay_supply} >Click to check MINDPAY TOTAL SUPPLY</button>
    <br></br><label ><p id="mindpay_supply">0</p></label>
  </div>
</div>


</fieldset>
<hr className='mt-3'></hr>

<fieldset className="form-horizontal">
<legend>USER BALACNE</legend>
<div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="" name="" className="btn btn-primary" onClick={check_mindpay_balance} >Click to check MINDPAY balance</button>
    <br></br><label ><p id="mindpay_balance">0</p></label>
  </div>
</div>

<div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="" name="" className="btn btn-primary" onClick={check_mindreward_balance} >Click to check MINDREWARD balance</button>
    <br></br><label ><p id="mindreward_balance">0</p></label>
  </div>
</div>
</fieldset>
<hr className='mt-3'></hr>


<fieldset className="form-horizontal">
<legend>Transfer MINDPAY TOKENS (ONLY FOR MANAGER)</legend>
<div className="form-group">
  <label className="col-md-4 control-label" >recipient address</label>  
  <div className="col-md-4">
  <input id="mindpay_recaddress" name="mindpay_recaddress" type="text" placeholder="enter recipient address" className="form-control input-md" />
  </div>
</div>

<div className="form-group">
    <label className="col-md-4 control-label" >Amount</label>  
    <div className="col-md-4">
    <input id="mindpay_amount" name="mindpay_amount" type="text" placeholder="enter MINDPAY TOKENS amount" className="form-control input-md" />
      
    </div>
  </div>

  <div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="subscribe" name="subscribe" onClick={send_mindpay_token}  className="btn btn-primary">Send Tokens</button>
  </div>
  <span id="mindpay_txnstatus"></span>
</div>
</fieldset>
<hr className='mt-3'></hr>

<fieldset className="form-horizontal">
<legend>Transfer MINDREWARD TOKENS (ONLY FOR MANAGER)</legend>
<div className="form-group">
  <label className="col-md-4 control-label" >recipient address</label>  
  <div className="col-md-4">
  <input id="mindreward_recaddress" name="mindreward_recaddress" type="text" placeholder="enter recipient address" className="form-control input-md" />
  </div>
</div>

<div className="form-group">
    <label className="col-md-4 control-label" >Amount</label>  
    <div className="col-md-4">
    <input id="mindreward_amount" name="mindreward_amount" type="text" placeholder="enter MINDREWARD TOKENS amount" className="form-control input-md" />
      
    </div>
  </div>

  <div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="subscribe" name="subscribe" onClick={send_mindreward_token}  className="btn btn-primary">Send Tokens</button>
  </div>
  <span id="mindreward_txnstatus"></span>
</div>
</fieldset>
<hr className='mt-3'></hr>

<fieldset className="form-horizontal">
<legend>Compare eth with MINDPAY TOKEN</legend>

<div className="form-group">
    <label className="col-md-4 control-label" >Amount in wei</label>  
    <div className="col-md-4">
    <input id="compare_invest_amount" name="compare_invest_amount" type="text" placeholder="enter amount in wei" className="form-control input-md" />
    </div>
  </div>

<div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="" name="" className="btn btn-primary" onClick={check_equal_token} >Click to Show Equal MINDPAY</button>
    <br></br><label ><p id="mindpay_equal">0</p></label>
  </div>
</div>


</fieldset>
<hr className='mt-3'></hr>


<fieldset className="form-horizontal">
<legend>INVEST</legend>

<div className="form-group">
    <label className="col-md-4 control-label" >Amount in wei</label>  
    <div className="col-md-4">
    <input id="invest_amount" name="invest_amount" type="text" placeholder="enter amount in wei" className="form-control input-md" />
    </div>
  </div>

  <div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="subscribe" name="subscribe" onClick={invest}  className="btn btn-primary">INVEST</button>
  </div>
  <span id="invest_txnstatus"></span>
</div>
</fieldset>
<hr className='mt-3'></hr>


<fieldset className="form-horizontal">
<legend>Staking options</legend>
<div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="" name="" className="btn btn-primary" onClick={cancel_investment} >Cancel Investment</button>
    <br></br><label ><p id="cancel_status"></p></label>
  </div>
</div>

<div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="" name="" className="btn btn-primary" onClick={stake_investment} >Stake Investment</button>
    <br></br><label ><p id="stake_status"></p></label>
  </div>
</div>
</fieldset>
<hr className='mt-3'></hr>


<fieldset className="form-horizontal">
<legend>Unstake Options</legend>
<div className="form-group">
  <div className="col-md-4">
  <input id="reward_owner" name="reward_owner" type="text" placeholder="enter owner address" className="form-control input-md" />
  </div>
  <div className="col-md-4">
    <button id="" name="" className="btn btn-primary" onClick={check_staking_balance} >Click to check Staking Reward</button>
    <br></br><label ><p id="staking_balance">0</p></label>
  </div>
</div>

<div className="form-group">
  <label className="col-md-4 control-label" ></label>
  <div className="col-md-4">
    <button id="" name="" className="btn btn-primary" onClick={unstake} >Unstake</button>
    <br></br><label ><p id="unstake_status"></p></label>
  </div>
</div>
</fieldset>
<hr className='mt-3'></hr>

</div>
</body>
  );
}

export default App;
