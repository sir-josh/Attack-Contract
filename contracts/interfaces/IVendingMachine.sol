// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title A simple contract that models after a vending machine that provides only peanuts
 * @dev Implement one time hackable smart contract (vending machine model)
 */
interface IVendingMachine {

    /**
     * @dev Returns the amount of peanuts remaining in the contract[Vending Machine].
     */
    function getPeanutsBalance() external view returns (uint256);

    /**
     * @dev Returns the balance of any address that has deposited to 
     * the contract.
     */
    function getMyBalance() external view returns (uint256);
    /**
     * @dev Returns the balance of the contract.
     */
    function getContractBalance() external view returns (uint256);

    /**
     * @dev Returns the amount the owner deposited to the contract as reserve.
     */
    function getReserveAmount() external view returns (uint256);

    /**
     * @dev Deposits are made to the contract before any interaction with it.
     * Only valid when the contract hasn't been hacked.
     */
    function deposit() external payable;

    /**
     * @dev Gets[buys] peanuts from the contract[Vending Machine].
     * Only valid when the contract hasn't been hacked.
     *
     * Requirements:
     *
     * - The caller must have deposited to contract and has a balance of at least `units` of peanuts to buy.
     * - The contract must have enough peanuts in stock a caller wants to buy/get.
     */
    function getPeanuts(uint256 units) external;

    /**
     * @dev Withdraws deposit or balance from the contract.
     * Only valid when the contract hasn't been hacked.
     *
     * Requirements:
     *
     * - The caller must have deposited to contract and has a balance in the contract even after transaction.
     */
    function withdrawal() external;
    /**
     * @dev Restocks the amount of peanuts in the contract[Vending Machine], increasing
     * the total supply.
     * Can only be called by the current owner.
     */
    function restockPeanuts(uint256 _restockAmount) external;

}