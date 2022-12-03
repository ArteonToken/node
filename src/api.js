import nodeConfig from './../node_modules/@leofcoin/lib/src/node-config.js'
import Node from './../node_modules/@leofcoin/chain/dist/node.js'
import Chain from './../node_modules/@leofcoin/chain/dist/chain.js';
import { formatUnits } from '@leofcoin/utils';
import { execFile } from 'node:child_process'
import { promisify } from 'node:util';
import {terser} from 'rollup-plugin-terser'
import { writeFile } from 'node:fs/promises';
import {rollup} from 'rollup'

const safeExec = promisify(execFile)
const kebabCase = string => string
.replace(/([a-z])([A-Z])/g, "$1-$2")
.replace(/[\s_]+/g, '-')
.toLowerCase();

async function build(input) {
  let bundle;
  let buildFailed = false;
  try {
    // create a bundle
    bundle = await rollup({ input });

    // an array of file names this bundle depends on
    console.log(bundle.watchFiles);

    return await generateOutputs(bundle);
  } catch (error) {
    buildFailed = true;
    // do some error reporting
    console.error(error);
  }
  if (bundle) {
    // closes the bundle
    await bundle.close();
  }
}

async function generateOutputs(bundle) {
    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    // replace bundle.generate with bundle.write to directly write to disk
    const { output } = await bundle.generate({
      format: 'es',
      plugins: [terser({
        mangle: false,
        format: { semicolons: true },
        keep_classnames: true
      })]
    });

    for (const chunkOrAsset of output) {
      console.log(chunkOrAsset.code);
      return chunkOrAsset.code
    }
}

export default class Api {
  constructor() {
    return this.#init()
  }

  async #init() {
    await new Node({
      network: 'leofcoin:peach'
    })
    console.log(peernet);
    await nodeConfig({
      network: 'leofcoin:peach'
    })
    this._chain = await new Chain()
    pubsub.publish('chain:ready', true)
    return this
  }

  async deploy(code, params = []) {
    const match = code.match(/export default class ([A-Z])\w+/g)
    const name = match[0].replace('export default class ', '')
    const filename = kebabCase(name)
    await writeFile(`./templates/wizard/${filename}.js`, code)
    code = await build(`./templates/wizard/${filename}.js`)
    code = code.toString().replace(/export{([A-Z])\w+ as default}/g, `return ${name}`).replace(/\r?\n|\r/g, '')
    let tx = await this._chain.deployContract(code, params)
    const address = await this._chain.createContractAddress(peernet.selectAccount, code, params)
    console.log(address);
    await tx.wait()
    // tx = await this._chain.registerContract()
    console.log(tx);
    
    return {code, name, address}
  }

  get pubsub() {
    return {      
      subscribers: () => pubsub.subscribers,
      subscribe: (ev, fn) => pubsub.subscribe(ev, fn),
      publish: (ev, data) => pubsub.publish(ev, data)
    }
  }

  get chain() {
    return this._chain
  }

  get node() {
    this.chain.nativeBurns
    return globalThis.peernet
  }

  get peerId() {
    return peernet.peerId
  }
  get peers() { return this.node.peers }
  validators() { return this.chain.validators }
  lookup(name) {return this.chain.lookup(name)}
  staticCall(contract, method, params) {return this.chain.staticCall(contract, method, params)}
  get nativeBurns() { return this.chain.nativeBurns }
  get contracts() {return this.chain.contracts}
  get nativeMints() { return this.chain.nativeMints }
  get nativeTransfers() { return this.chain.nativeTransfers }
  get totalSize() { return this.chain.totalSize}
  get totalTransactions() { return this.chain.totalTransactions}
  get totalBlocks() { return this.chain.blocks.length}
  
  get nativeCalls() { return this.chain.nativeCalls }
  
  get participating() { return this.chain.participating }
  participate(address) { return this.chain.participate(address) }
  get nativeToken() { return this.chain.nativeToken }
  async balanceOf(address) {
    const balances = await this.chain.balances
    
    return formatUnits(balances[address])
  }

  get hasTransactionToHandle() {return this.chain.hasTransactionToHandle}
  getBlock(index) { return this.chain.blocks[index]}
  blocks(amount) { return this.chain.blocks.slice(amount) }
  
  balances() { return this.chain.balances }

  createTransactionFrom(params) { return this.chain.createTransactionFrom(...params) }

  async accounts() {
    const accounts = await walletStore.get('accounts')
    return JSON.parse(new TextDecoder().decode(accounts))
  }

  selectedAccount() {
    return peernet.selectedAccount
  }

  async selectAccount(address) {
    return walletStore.put('selected-account', address)
  }
}
