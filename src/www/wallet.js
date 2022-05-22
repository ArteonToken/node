export default customElements.define('wallet-element', class WalletElement extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }

  get template() {
    return `
<style>
  :host {
    display: flex;
    flex-direction: flex-row;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>

<flex-column>
  <label for=".to">send</label>
  <input class="to" placeholder="to"></input>

  <label for=".amount">send</label>
  <input class="amount" placeholder="amount"></input>

  <flex-row>
    <button>cancel</button>
    <flex-one></flex-one>
    <button>send</button>
  </flex-row>
</flex-column>
    `
  }
})
