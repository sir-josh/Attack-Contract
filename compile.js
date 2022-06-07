const path = require('path');       
const fs = require('fs');           // File system module
const solc = require('solc');       // Solidity Compiler module

//Get the smart contract file path
const attackCodePath = path.resolve(__dirname, 'contracts', 'AttackVendingMachine.sol'); 

//Read-in the content of smart contract source code using utf8 encoding
const sourceCode = fs.readFileSync(attackCodePath, 'utf8');


//The expected JSON formatted input, specifying the language, sources and outputSelection
const input = {
    language: 'Solidity',
    sources: {
        'AttackVendingMachine.sol': {
            content: sourceCode
        }
    }, 
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

//Compile sourceCode
//module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['VendingMachineAttacker.sol'].VendingMachineAttacker;
console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);