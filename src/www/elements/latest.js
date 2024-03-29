import { BigNumber, formatUnits } from '@leofcoin/utils/src/utils'
import {LitElement, html} from 'lit'
import {map} from 'lit/directives/map.js'
import './../elements/time/ago'

export default customElements.define('latest-element', class LatestElement extends LitElement {

  static properties = {
    value: {
      type: Array
    },
    type: {
      type: String
    }
  }

  #type

  set type(value) {
    this.#type = value
    this.requestUpdate()
  }

  get type() {
    return this.#type
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.addEventListener('click', this.#click.bind(this))
  }

  #click() {
    location.hash = `#!/explorer?${this.type}=${this.value.hash}&index=${this.value.index}`
  }

  get #blockTemplate() {
    let total = BigNumber.from(0)

    for (const tx of this.value.transactions) {
      if (tx.to === api.nativeToken) {
        if (tx.method === 'mint') total = total.add(BigNumber.from(tx.params[1]))
        if (tx.method === 'burn') total = total.add(BigNumber.from(tx.params[1]))
        if (tx.method === 'transfer') total = total.add(BigNumber.from(tx.params[2]))
      }
    }

    total = formatUnits(total).toLocaleString()
    return html`
      <flex-column class="first-column">
        <a class="height" href="#!/explorer?block=${this.value.hash}">${Number(this.value.index) + 1}</a>
        <time-ago value=${this.value.timestamp}></time-ago>
      </flex-column>
        
      
      <flex-row class="last-row">
        <flex-column  style="min-width: 66%;">
          <flex-row>
            <strong class="transactions" style="padding-right: 4px;">${this.value.transactions.length}</strong>
            <span>${this.value.transactions.length >  1 ? ' transactions' : ' transaction'}</span>
          </flex-row>

          <span class="validators">
            ${map(this.value.validators, item => html`
              <strong>${this.value.validators.length}</strong>
              <span>${this.value.validators.length > 1 ? 'validators' : 'validator'}</span>
              <a href="#!/explorer?address=${item.address}" class="validator">${item.address.slice(-7)}</a>
            `)}
          </span>
        </flex-column>
        <flex-one></flex-one>
      </flex-row>
        <flex-column>
          <!-- <strong>amount</strong> -->
          <div class="total">${Number(total).toLocaleString()}</div>
        </flex-column>
    `
  }

  get #transactionTemplate() {
    if (!this.value) return
    let amount = 0;

    if (this.value.method === 'transfer') amount = formatUnits(this.value.params[2])
    else if(this.value.method === 'mint' || this.value.method === 'burn') {
      amount = formatUnits(this.value.params[1])
    }
    return html`
    <flex-column class="first-column">
        <a class="index" href="#!/explorer?transaction=${this.value.hash}">${this.value.hash.slice(-7)}</a>
        <time-ago value=${this.value.timestamp}></time-ago>
      </flex-column>
        
      
      <flex-row class="last-row">
        <flex-column  style="min-width: 66%;">
          <flex-row>
            <span class="transactions" style="padding-right: 4px;">from </span>
            <strong>${this.value.from.slice(0, 8)}...${this.value.from.slice(-8)}</strong>
          </flex-row>

          <flex-row>
            <span class="transactions" style="padding-right: 4px;">to </span>
            <strong>${this.value.to.slice(0,8)}...${this.value.to.slice(-8)}</strong>
          </flex-row>
        </flex-column>
        <flex-one></flex-one>
      </flex-row>
        <flex-column>
          <!-- <strong>amount</strong> -->
          <div class="total">${Number(amount).toLocaleString()}</div>
        </flex-column>
    `
  }

  render() {
    return html`
<style>
  * {
    pointer-events: none;
  }
  :host {
    display: flex;
    flex-direction: row;
    padding:  6px 12px;
    box-sizing: border-box;
    cursor: pointer;
    pointer-events: auto !important;
    width: 100%;
    height: 56px;
    margin-bottom: 6px;
    border-bottom: 1px solid #eee;
  }

  .last-row {
    height: 100%;
    max-width: 88%;
    width: 100%;
  }

  .first-column {
    width: 100%;
    max-width: 146px;
    padding-right: 20px;
  }

  a {
    text-decoration: none;
  }

  .total {
    text-overflow: ellipsis;
    overflow: hidden;
    background: #7986cb;
    color: #fff;
    padding: 6px 12px;
    box-sizing: border-box;
    border-radius: 24px;
  }
</style>
${this.type==='block' ? this.#blockTemplate : this.#transactionTemplate}
    `
  }

})
