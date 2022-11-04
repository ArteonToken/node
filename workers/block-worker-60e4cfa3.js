'use strict';

require('@leofcoin/codec-format-interface');
var utils = require('./utils-1dc37f72.js');
var EasyWorker = require('@vandeurenglenn/easy-worker');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var EasyWorker__default = /*#__PURE__*/_interopDefaultLegacy(EasyWorker);

const worker = new EasyWorker__default["default"]();

globalThis.BigNumber = utils.BigNumber;

globalThis.peernet = globalThis.peernet || {};
globalThis.contracts = {};

const run = async (blocks) => {  
  blocks = await Promise.all(blocks.map(block => new utils.BlockMessage(block)));
  blocks = blocks.sort((a, b) => a.decoded.timestamp - b.decoded.timestamp);

  blocks = await Promise.all(blocks.map(block => new Promise(async (resolve, reject) => {
    // todo: tx worker or nah?
    const size = block.encoded.length || block.encoded.byteLength;
    console.log(`loaded block: ${await block.hash} @${block.decoded.index} ${utils.formatBytes(size)}`);
    resolve(block);
  })));
  return blocks
};

const tasks = async blocks => {
  globalThis.peernet.codecs =  {
    'block-message': {
      codec: parseInt('626d', 16),
      hashAlg: 'keccak-256'
    }
  };  
  
  blocks = await run(blocks);
  worker.postMessage(blocks);
};
 

worker.onmessage(data => tasks(data));

var blockWorker = /*#__PURE__*/Object.freeze({
  __proto__: null
});

exports.blockWorker = blockWorker;
