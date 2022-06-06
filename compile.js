const path = require('path');
const fs = require('fs');
const solc = require('solc');

//Get the smart contract file path
const attackCode_Path = path.resolve(__dirname, 'contracts', 'VendingMachineAttacker.sol'); 

//Read-in the content of smart contract source code
const sourceCode = fs.readFileSync(attackCode_Path, 'utf8');


//The expected JSON formatted input, specifying the language, sources and outputSelection
const input = {
    language: 'Solidity',
    sources: {
        'VendingMachineAttacker.sol': {
            content: sourceCode,
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
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['VendingMachineAttacker.sol'].VendingMachineAttacker;