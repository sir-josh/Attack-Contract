const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const Web3 = require("web3");
const web3 = new Web3();

describe('Attack-Vending-Machine Contract satisfies the following tests: ', () => {
    //  @var { Object }  - (owner) To hold the address of the first test account provided by hardhat test network
    //  @var { Object } - (vendingMachine) The deployed vending machine smart contract instance
    //  @var { Object } - (attackVendingMachine) The deployed attacking contract instance
    //  @var { Object}  - (address1) To holds the address of the second test account provided by hardhat test network
    //  @var { Object}  - (address2) To holds the address of the third test account provided by hardhat test network
    //  @var { Object } - (cFactory1) A factory for instances of vending machine contract
    //  @var { Object } - (cFactory2) A factory for instances of attacking contract
    
    let owner, address1, address2, cFactory1, cFactory2, vendingMachine, attackVendingMachine;

    //Amount in wei(2 ether) to be used for deployment
    const DEFAULT_VALUE = web3.utils.toWei('2', 'ether');

    before(async () => {
        [ owner, address1, address2 ] = await ethers.getSigners();
    });

    before(async () => {
      cFactory1 =  await ethers.getContractFactory("VendingMachine", owner);
      cFactory2 = await ethers.getContractFactory("AttackVendingMachine", address1);
    });

    before(async () => {
        vendingMachine = await cFactory1.deploy({
            value: DEFAULT_VALUE
        });

        const VMContractAddress = (vendingMachine.address).toString();

        attackVendingMachine = await cFactory2.deploy(VMContractAddress);
     
    });
    

    describe("deployed", () => {
        //Test for deployment of the contract
        it("should have deployed the contract", async () => {
            assert.exists(attackVendingMachine.address);
        });
    });

    describe("onlyOwner", () => {
        //Test to check if others can use this contract to attack
       it("should revert if others except the owner tries to use the contract", async () => {
            await expect(attackVendingMachine.connect(address2).attackContract({value: web3.utils.toWei('0.1', 'ether')}))
                    .to.be.revertedWith("Restricted call: caller is not the owner");
        });
   });

    describe("attackContract", () => {
         //Test to attack vending machine contract
         it("should successfully attack vending machine contract", async () => {
            const initialBalance = await attackVendingMachine.getBalance();

            await attackVendingMachine.attackContract({value: web3.utils.toWei('0.1', 'ether')});

            const finalBalance = await attackVendingMachine.getBalance();

            assert.isAbove(finalBalance, initialBalance);
        });
    });

    describe("re-hackable", () => {
        //Test to check if it re-attack vending machine contract
        it("should revert if tries to re-attack vending machine contract", async () => {
           await expect(attackVendingMachine.attackContract({value: web3.utils.toWei('1', 'ether')}))
                    .to.be.revertedWith("Sorry, this product project has been hacked");
       });
   });
});
