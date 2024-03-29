import Pubsub from '@vandeurenglenn/little-pubsub'
import './../../node_modules/@vandeurenglenn/flex-elements/src/flex-elements'
import './../../node_modules/custom-pages/src/custom-pages'
import './../../node_modules/custom-selector/src/index'
import './../../node_modules/custom-svg-iconset/src/custom-svg-iconset'
import './../../node_modules/custom-svg-icon/src/custom-svg-icon'
import './array-repeat'

import './clipboard-copy.js'
import icons from './icons'

globalThis.pubsub = globalThis.pubsub || new Pubsub({verbose: true})

export default customElements.define('app-shell', class AppShell extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }

 

  get #pages() {
    return this.shadowRoot.querySelector('custom-pages')
  }

  async #select(selected) {
    if (!customElements.get(`${selected}-view`)) await import(`./${selected}.js`)
    this.#pages.select(selected)
    const monacoContainer = document.querySelector('.container')
    if (monacoContainer) {
      if (selected === 'editor') monacoContainer.classList.add('custom-selected')
      else monacoContainer.classList.remove('custom-selected')
    }
  }

  async #onhashchange() {
    const parts = location.hash.split('/')
    let params = parts[1].split('?')
    const selected = params[0]
    
    const object = {}
    if (params.length > 1) {
      params = params[1].split('&')
      for (let param of params) {
        param = param.split('=')
        object[param[0]] = param[1]
      }
    }
    
    
    
    console.log(selected, object);
    selected && await this.#select(selected)

    if (selected === 'explorer' && object.block !== undefined) {
      await this.shadowRoot.querySelector('explorer-view').select('block')
      this.shadowRoot.querySelector('explorer-view').setInfo(object.block, object.index)
    }
    if (selected === 'explorer' && object.transaction !== undefined) {
      await this.shadowRoot.querySelector('explorer-view').select('transaction') && this.shadowRoot.querySelector('explorer-view').setInfo(object.transaction, object.index)
    }
    if (selected === 'explorer' && Object.keys(object).length === 0) await this.shadowRoot.querySelector('explorer-view').shadowRoot.querySelector('custom-pages').select('home')
  }

  async init() {
    

    // pubsub.subscribe('chain:ready', this.apiReady.bind(this))
    // const imp = await import('./api.js')

    // globalThis.api = globalThis.api || imp.default
    if (this.hasAttribute('api-ready')) {
      this.apiReady()
    } else {
      setTimeout(() => {
        return this.init()
      }, 100)
    }
  }

  async apiReady() {
    onhashchange = this.#onhashchange.bind(this)
    if (location.hash.split('/')[1]) this.#onhashchange()
    else this.#select('wallet')
  }

  connectedCallback() {
    this.peersConnected = 0
    this.init()
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
        background: linear-gradient(45deg, #6495ed78, transparent);
        font-size: .875rem;
        font-weight: 400;
        line-height: 1.5;
      }

      .main {
        height: -webkit-fill-available;
      }

      custom-selector {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .custom-selector-overlay {
        background: #ffffff8c;
        --svg-icon-color: #5b6f93;
        border-right: 1px solid #eee;
      }

      a {
        padding: 12px;
        box-sizing: border-box;
        height: 48px;
      }
      ::slotted(.container) {
        display:flex;
        flex-direction:column;
        width:100%;
        height: 100%;
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(255,255,255,0.3);
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(225,255,255,0.5);
      }
    </style>
    ${icons}
    <flex-row class="main">
      <span class="custom-selector-overlay">
        <custom-selector attr-for-selected="data-route">
          <a href="#!/wallet" data-route="wallet">
            <custom-svg-icon icon="wallet"></custom-svg-icon>
          </a>
          <a href="#!/explorer" data-route="explorer">
            <custom-svg-icon icon="explorer"></custom-svg-icon>
          </a>
          <a href="#!/validator" data-route="validator">
            <custom-svg-icon icon="gavel"></custom-svg-icon>
          </a>
          <a href="#!/editor" data-route="editor">
            <custom-svg-icon icon="mode-edit"></custom-svg-icon>
          </a>
          <a href="#!/stats" data-route="stats">
            <custom-svg-icon icon="stats"></custom-svg-icon>
          </a>
        </custom-selector>
      </span>

        <custom-pages attr-for-selected="data-route">
          <wallet-view data-route="wallet"></wallet-view>
          <explorer-view data-route="explorer"></explorer-view>
          <validator-view data-route="validator"></validator-view>
          <editor-view data-route="editor"><slot></slot></editor-view>
          <stats-view data-route="stats"></stats-view>
          
        </custom-pages>



    </flex-row>


    `
  }
})
