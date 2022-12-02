import { html, LitElement } from 'lit'
import {map} from 'lit/directives/map.js'
import './elements/latest'

export default customElements.define('explorer-view', class ExplorerView extends LitElement {

  constructor() {
    super()

    this.attachShadow({mode: 'open'})
  }
  #blocks = []
  #transactions = []
  #validators = []

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
      if (this.#blocks[i].transactions.length < 26) this.#blocks[i].transactions.slice(0, this.#blocks[i].transactions.length)
      this.#transactions = [...this.#transactions, ...this.#blocks[i].transactions.slice(-25 - (this.#blocks[i].transactions.length - 1))]
      i++
    }

    const result = await api.lookup('ArtOnlineValidators')
    
    this.#validators = await api.staticCall(result.address, 'validators')

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
    padding: 48px;
    box-sizing: border-box;
  }


  .bottom-bar {
    align-items: center;
    height: 48px;
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

  .peers-container {
    padding-top: 24px;
  }

  .version {
    padding: 12px 0;
  }

  .latest-blocks, .latest-transactions {
    width: 100%;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    background: #ffffff52;
    border-radius: 24px;
    box-shadow: 1px 1px 14px 0px #0000002e;
    overflow-y: auto;
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

  .info-container {
    
    max-width: 600px;
    height: auto;
    height: 120px;
  }

  .info-container .info:first-child {
    margin-right: 12px;
    
  }

  .info-container:first-child {
    margin-bottom: 12px;
  }

  .info {
    background: #2c314a00;
    border-radius: 24px;
    box-sizing: border-box;
    padding: 6px 12px;
    /* border: 1px solid #4677ff; */
    /* color: #fff; */
    box-shadow: 0px 0px 16px 6px #8890b75c;
  }


</style>
<flex-wrap-evenly>
  
<flex-row class="info-container">
<flex-column class="info">
    <h4>transactions</h4>
    <flex-row class="">
      <span>total</span>
      <flex-one></flex-one>
      <strong>
      ${Object.keys(this.#validators).length}
      </strong>
      
    </flex-row>

    <flex-row class="">
      <span>online</span>
      <flex-one></flex-one>
      <strong>
      ${Object.values(this.#validators).filter(validator => validator.lastSeen - new Date().getTime() > 30_000).length}
      </strong>
      
    </flex-row>
  </flex-column>
  <flex-column class="info">
    <h4>validators</h4>
    <flex-row class="">
      <span>total</span>
      <flex-one></flex-one>
      <strong>
      ${Object.keys(this.#validators).length}
      </strong>
      
    </flex-row>

    <flex-row class="">
      <span>online</span>
      <flex-one></flex-one>
      <strong>
      ${Object.values(this.#validators).filter(validator => validator.lastSeen - new Date().getTime() > 30_000).length}
      </strong>
      
    </flex-row>
  </flex-column>


</flex-row>
<flex-row class="info-container">
  <flex-column class="info">
    <h4>contracts</h4>
    <flex-row class="">
      <span>total</span>
      <flex-one></flex-one>
      <strong>
      ${Object.keys(this.#contracts).length}
      </strong>
      
    </flex-row>

    <flex-row class="">
      <span>calls</span>
      <flex-one></flex-one>
      <strong>
      ${Object.values(this.#validators).filter(validator => validator.lastSeen - new Date().getTime() > 30_000).length}
      </strong>
      
    </flex-row>
  </flex-column>
  <flex-column class="info">
    <h4>validators</h4>
    <flex-row class="">
      <span>total</span>
      <flex-one></flex-one>
      <strong>
      ${Object.keys(this.#validators).length}
      </strong>
      
    </flex-row>

    <flex-row class="">
      <span>online</span>
      <flex-one></flex-one>
      <strong>
      ${Object.values(this.#validators).filter(validator => validator.lastSeen - new Date().getTime() > 30_000).length}
      </strong>
      
    </flex-row>
  </flex-column>
  </flex-row>
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
</flex-wrap-evenly>`
  }
})
