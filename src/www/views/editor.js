import { version } from './../../../package.json'

import * as monaco from 'monaco-editor';
export default customElements.define('editor-view', class editorView extends HTMLElement {
  #validators = []
  #editor
  constructor() {
    super()

    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }


  async connectedCallback() {

globalThis.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};
globalThis.monaco = monaco
let span = document.createElement('span')
span.classList.add('container')
document.body.appendChild(span)

const token = await api.readFile('./templates/contracts/nativeToken.js')
const standard = await api.readFile('./templates/standards/token.js')

const tokenModel = monaco.editor.createModel(new TextDecoder().decode(token), 'javascript');
const standardModel = monaco.editor.createModel(new TextDecoder().decode(standard), 'javascript');

this.#editor = monaco.editor.create(document.querySelector('.container'));
this.#editor.setModel(standardModel);
this.#editor.setModel(tokenModel);

  }

  get template() {
    return `
<style>
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

.container {
  width: 100%;
  height: 100%;
}


</style>


<flex-column class="container" >
<slot></slot>
</flex-column>
    `
  }
})
