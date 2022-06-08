const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi , evm } = require('../compile');



//  @var { string}  - (accounts) To holds list of all accounts provided by ganache test network
//  @var {String} - (vendingMachine) The deployed vending machine smart contract instance
let accounts, vendingMachineAttacker;

//VendingMachine contract address to attack
const VMContractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

beforeEach(async()=> {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();


    //Use one of those of accounts to deploy the contract
    //with a required minimum reserve of amount 1 ether
    vendingMachineAttacker = await new web3.eth.Contract(abi)
                                .deploy({ data: evm.bytecode.object, arguments: [VMContractAddress] })
                                .send({ from: accounts[0], gas: '2000000' })

});

describe('Vending Machine Attacking Contract satisfies the following tests: ', () =>{
    //Test for deployment of the contract
    it('Deploys a contract', ()=> {
        assert.ok(vendingMachineAttacker.options.address);
    });
});
