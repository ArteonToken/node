import { html, LitElement } from 'lit'
import {map} from 'lit/directives/map.js'
import './elements/latest'
import './elements/explorer/info-container'
import { formatBytes } from '@leofcoin/utils/src/utils'


export default customElements.define('explorer-view', class ExplorerView extends LitElement {

  static properties = {
    items: {
      type: Array
    }
  }

  constructor() {
    super()

    this.attachShadow({mode: 'open'})
  }
  #blocks = []
  #transactions = []

  async updateInfo() {
    const lookupValidators = await api.lookup('ArtOnlineValidators')
    
    const validators = await api.staticCall(lookupValidators.address, 'validators')
    const lookupFactory = await api.lookup('ArtOnlineContractFactory')

    this.items = [[{
      title: 'transactions',
      items: [{
        title: 'transfers',
        value: api.nativeTransfers
      }, {
        title: 'burns',
        value: api.nativeBurns
      }, {
        title: 'mints',
        value: api.nativeMints
      }]        
    }, {
      title: 'validators',
      items: [{
        title: 'total',
        value: Object.keys(validators).length
      }, {
        title: 'online',
        value: Object.values(validators).filter(({lastSeen}) => lastSeen - new Date().getTime() < 60_000).length
      }]
    }], [{
      title: 'contracts',
      items: [{
        title: 'total',
        value: (await api.contracts()).length
      }, {
        title: 'registered',
        value: await api.staticCall(lookupFactory.address, 'totalContracts')        
      }, {
        title: 'native calls',
        value: api.nativeCalls
      }]
    }, {
      title: 'chain',
      items: [{
        title: 'blocks',
        value: api.totalBlocks
      }, {
        title: 'transactions',
        value: api.totalTransactions
      }, {
        title: 'size',
        value: formatBytes(api.totalSize)
      }]
    }]]
  }

  async select(selected) {
    if (!customElements.get(`${selected}-view`)) await import(`./${selected}.js`)
    this.selected = selected
    this.shadowRoot.querySelector('custom-pages').select(selected)    
  }

  setInfo(hash, index) {
    console.log(hash, index);
    this.shadowRoot.querySelector('custom-pages').querySelector('.custom-selected').updateInfo(hash, index)
  }

  #addBlock(block) {
    console.log(block);
    if (block.transactions.length > 25) {
      this.#transactions = block.transactions.slice(-25)
    } else {
      this.#transactions = [ ...block.transactions, ...this.#transactions.slice(-(block.transactions.length - 1))]
    }

    this.requestUpdate()
    
  }

  async connectedCallback() {
    super.connectedCallback()
    this.#blocks = await api.blocks(-25).reverse()
    let i = 0
    while (this.#transactions.length < 25) {
      if (this.#blocks[i].transactions.length < 25) this.#blocks[i].transactions.slice(0, this.#blocks[i].transactions.length - 1)
      this.#transactions = [...this.#transactions, ...this.#blocks[i].transactions.slice(-25)]
      i++
    }

    this.updateInfo()
    this.requestUpdate()

    api.pubsub.subscribe('add-block', this.#addBlock.bind(this))
    api.pubsub.subscribe('block-processed', this.#addBlock.bind(this))
  }

  render() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  flex-wrap-evenly {
    
    padding: 48px;
    box-sizing: border-box;
    overflow-y: auto;
  }

  flex-row {
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  flex-column {
    max-width: 600px;
    max-height: 480px;
    width: 100%;
    height: 100%;
  }

  .latest-blocks, .latest-transactions {
    width: 100%;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    
    overflow-y: auto;
  }

  .container {
    padding: 12px;
    box-sizing: border-box;
    background: #ffffff52;
    border-radius: 24px;
    box-shadow: 1px 1px 14px 0px #0000002e;
  }
  
  .container h4 {
    padding-left: 12px;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(73 78 112);
    border-radius: 10px;
    margin: 12px 0;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(225,255,255,0.5);
  }

  explorer-info-container:first-child {
    margin-bottom: 12px;
  }

  explorer-info-container explorer-info:first-child {
    margin-right: 12px;
  }

  h4 {
    margin: 0;
    padding: 6px 0;
  }
</style>
<custom-pages attr-for-selected="data-route">
<flex-wrap-evenly data-route="home">
  ${map(this.items, item => html`
  <flex-column style="height: auto;">
    <explorer-info-container items=${JSON.stringify(item)}></explorer-info-container>
  </flex-column>
  
  `)}
  
  <flex-column class="container">
    
  <h4>latest blocks</h4>
  <flex-column class="latest-blocks">
  ${map(this.#blocks, item => html`
    <latest-element value=${JSON.stringify(item)} type="block"></latest-element>    
  `)}
  </flex-column>
  
  </flex-column>

  
  <flex-column class="container">
  <h4>latest transactions</h4>
  <flex-column class="latest-transactions">
${map(this.#transactions, item => html`
  <latest-element value=${JSON.stringify(item)} type="transaction"></latest-element>
  `)}
  </flex-column>
  </flex-column>
</flex-wrap-evenly>

<block-view data-route="block"></block-view>
<transaction-view data-route="transaction"></transaction-view>
</custom-pages>
`
  }
})
