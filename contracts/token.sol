// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract MINDPAY is ERC20 {

    constructor() ERC20("MINDPAY", "MDP") {
        _mint(msg.sender, 100000000 * 1);
    }

    function burn(uint _amount) public returns(bool)
    {
        _burn(msg.sender,_amount);
        return true;
    }

}


