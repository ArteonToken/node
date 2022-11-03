import { version } from './../../../package.json'

import * as monaco from 'monaco-editor';
export default customElements.define('editor-view', class editorView extends HTMLElement {
  #validators = []

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

monaco.editor.create(document.getElementById('container'), {
	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	language: 'javascript'
});
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



</style>

<flex-row>
  <strong>validators</strong>
  <flex-one></flex-one>
  <span class="total-validators"></span>
</flex-row>

<button>participate</button>
    `
  }
})
