'use strict';

require('@leofcoin/codec-format-interface');
var transaction = require('./transaction-220a3a15.js');
var EasyWorker = require('@vandeurenglenn/easy-worker');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var EasyWorker__default = /*#__PURE__*/_interopDefaultLegacy(EasyWorker);

globalThis.peernet = globalThis.peernet || {};
globalThis.contracts = {};

const worker = new EasyWorker__default["default"]();

const tasks = async transactions => {
  
  globalThis.peernet.codecs =  {
    'transaction-message': {
      codec: parseInt('746d', 16),
      hashAlg: 'keccak-256'
    }
  };
  
  transactions = await Promise.all(transactions.map(async message => {
    message = await new transaction.TransactionMessage(message);
    
    return {...message.decoded, hash: await message.hash, size: message.encoded.length}
  }));

  worker.postMessage(transactions);
  
};
 worker.onmessage(data => tasks(data));

var poolWorker = /*#__PURE__*/Object.freeze({
  __proto__: null
});

exports.poolWorker = poolWorker;
