import Pubsub from './../../node_modules/@vandeurenglenn/little-pubsub/src/index'
import './../../node_modules/@vandeurenglenn/flex-elements/src/flex-elements'

import './clipboard-copy.js'
import './wallet'

globalThis.pubsub = globalThis.pubsub || new Pubsub()

export default customElements.define('app-shell', class AppShell extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }

  async init() {
    this.peerId = await chainRequest('peerId')
  }

  set peerId(value) {
    this.shadowRoot.querySelector('.peer-id').innerHTML = value
  }

  connectedCallback() {
    const worker = new Worker('./chain.js')
    console.log(worker);
    pubsub.subscribe('chain:ready', this.init.bind(this))

    globalThis.chainRequest = (method, params) => new Promise((resolve,  reject) => {
      const id = Math.random().toString(36).slice(-12);
      const handle = m => {
        resolve(m.data)
        pubsub.unsubscribe(id, handle)
      }
      pubsub.subscribe(id, handle)
      worker.postMessage({id, method, params})
    })

    worker.onmessage = (m) => {
      console.log(m.data);

      if (m.data === 'ready') pubsub.publish('chain:ready', true)
      if (m.data.id) pubsub.publish(m.data.id, m.data)
    }
  }

  get template() {
    return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,300;0,400;0,600;0,700;0,800;1,300;1,400&display=swap');

      :host {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        font-family: 'Noto Sans', sans-serif;
        background: linear-gradient(45deg, #66477c, transparent);
      }

      .peer-id {
        border: 1px solid white;
        background: #7f6592;
        border-radius: 12px;
        color: aliceblue;
        position: absolute;
        /* top: 50%; */
        left: 50%;
        transform: translateX(-50%);
        bottom: 12px;
      }
    </style>
    <wallet-element></wallet-element>
    <flex-row>
      <flex-one></flex-one>
      <clipboard-copy class="peer-id">
        loading...
      </clipboard-copy>
    </flex-row>

    `
  }
})
