import { html, LitElement } from 'lit'
import {map} from 'lit/directives/map.js'
import './elements/latest'
import './elements/explorer/info-container'
import { formatBytes } from '@leofcoin/utils/src/utils'
import './elements/time/ago'

export default customElements.define('block-view', class BlockView extends LitElement {

  static properties = {
    hash: {
      type: String
    },
    index: {
      type: Number
    },
    block: {
      type: Object
    },
    size: {
      type: Number
    }
  }

  constructor() {
    super()

    this.attachShadow({mode: 'open'})
  }

  async updateInfo(hash, index) {
    this.hash = hash
    this.index = Number(index)
    this.block = await api.getBlock(index)
    this.size = new TextEncoder().encode(JSON.stringify(this.block)).byteLength
    this.requestUpdate()
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
    align-items: center;
    box-sizing: border-box;
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

  .container {
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
  h4 {
    margin: 0;
    padding: 6px 0;
  }

  time-ago {
    padding-right: 12px;
  }

  .info-item {
    padding: 6px;
    box-sizing: border-box;
  }
</style>

<flex-column class="container">
  
  <flex-row class="info-item">
    <h4>hash</h4>
    <flex-one></flex-one>
    <span>${this.hash}</span>
  </flex-row>

  <flex-row class="info-item">
    <h4>index</h4>
    <flex-one></flex-one>
    <span>${this.index}</span>
  </flex-row>

  <flex-row class="info-item">
    <h4>height</h4>
    <flex-one></flex-one>
    <span>${this.index + 1}</span>
  </flex-row>

  <flex-row class="info-item">
    <h4>timestamp</h4>
    <flex-one></flex-one>
    <time-ago value=${this.block.timestamp}></time-ago>
    <span>${new Date(this.block.timestamp).toLocaleString()}</span>
  </flex-row>

  <flex-row class="info-item">
    <h4>transactions</h4>
    <flex-one></flex-one>
    <span>${this.block.transactions.length}</span>
  </flex-row>

  <flex-column class="info-item">
    <flex-row>
    <h4>validators</h4>
    <flex-one></flex-one>
    
    <span>${this.block.validators.length}</span>
    </flex-row>
    <flex-column style="padding-left: 24px; box-sizing: border-box;">
      ${map(this.block.validators, validator => html`<a href="#!/explorer/address=${validator.address}">${validator.address}</a>`)}
    </flex-column>
    
    
  </flex-column>

  <flex-row class="info-item">
    <h4>fees</h4>
    <flex-one></flex-one>
    
    <span>${this.block.fees}</span>
  </flex-row>
  <flex-row class="info-item">
    <h4>reward</h4>
    <flex-one></flex-one>
    
    <span>${this.block.reward}</span>
  </flex-row>

  <flex-row class="info-item">
    <h4>size</h4>
    <flex-one></flex-one>
    
    <span>${formatBytes(Number(this.size))}</span>
  </flex-row>

  <flex-row class="info-item">
    <h4>fees burnt</h4>
    <flex-one></flex-one>
    
    <span>${new Date(this.timestamp).toLocaleString()}</span>
  </flex-row>

  <flex-row class="info-item">
    <h4>rewards minted</h4>
    <flex-one></flex-one>
    
    <span>${new Date(this.timestamp).toLocaleString()}</span>
  </flex-row>

</flex-column>
`
  }
})
