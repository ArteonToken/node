import { formatUnits } from "@leofcoin/utils/src/utils"

export default customElements.define('account-element', class AccountElement extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'internal', 'external']
  }

  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }

  async connectedCallback() {
    if (Notification.permission !== 'granted') await Notification.requestPermission()

    api.pubsub.subscribe('add-block', block => {
      const transactions = block.transactions.filter(({to, method, params}) => {
        if (to === api.nativeToken) {
          if (method === 'transfer' || method === 'mint' || method === 'burn') return params[0] === this._external || params[1] === this._external || params[0] === this._internal || params[1] === this._internal
        }
        return false
      })

      if (transactions.length > 0) {
        if (Notification.permission === 'granted') transactions.forEach(({params, method}) => new Notification(method, {
          title: method,
          body: `${method === 'transfer' ? 'received' : method} ${formatUnits(method === 'transfer' ? params[2] : params[1])} ${method === 'mint' ? 'to' : 'from'} ${params[0]}`
        }))
        this.run(this._external)
      }

    })
  }

  set name(value) {
    this.shadowRoot.querySelector('.name').innerHTML = value
  }

  set internal(value) {
    this._internal = value
  }

  set external(value) {
    this._external = value
    this.run(value)

  }

  async run(value) {
    this.shadowRoot.querySelector('.address').innerHTML = `...${value.slice(-6)}`
    this.shadowRoot.querySelector('.balance').innerHTML = Number(await api.balanceOf(value)).toLocaleString()
  }

  // set external(value) {
  //   this.shadowRoot.querySelector('.address').innerHTML = `${value.slice(0, 6)}...${value.slice(-6)}`
  // }

  get template() {
    return `
<style>
  * {
    pointer-events: none;
  }
  :host {
    display: flex;
    flex-direction: column;
    padding: 12px;
    box-sizing: border-box;
    cursor: pointer;
    pointer-events: auto !important;
  }
  .name {
    padding-bottom: 6px;
  }
</style>
<flex-row>
  <span class="name"></span>
  <flex-one></flex-one>  
  <span class="address"></span>
</flex-row>
<flex-one></flex-one>
<span class="balance"></span>
    `
  }

})
