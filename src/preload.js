const { contextBridge, ipcRenderer } =  require('electron');
const { readFile, writeFile, unlink } = require('fs/promises');
const {terser} = require('rollup-plugin-terser')
const nodeResolve = require('@rollup/plugin-node-resolve')
const {rollup} = require('rollup')

const kebabCase = string => string
.replace(/([a-z])([A-Z])/g, "$1-$2")
.replace(/[\s_]+/g, '-')
.toLowerCase();

const generateOutputs = async (bundle) => {
  const { output } = await bundle.generate({
    format: 'es'
  })

  for (const chunkOrAsset of output) {
    return chunkOrAsset.code
  }
}

export const build = async input => {
  let bundle;
  try {
    bundle = await rollup({ input, plugins: [
      nodeResolve(),
      terser({
        mangle: false,
        keep_classnames: true
      })
    ] })
  } catch (error) {
    // do some error reporting
    console.error(error);
  }
  if (bundle) {
    const outputs = await generateOutputs(bundle)
    await bundle.close()
    return outputs
  }
}

const fetchString = async (method) => {
  const response = await fetch(`http://localhost:8080/${method}`)
  return response.text()
}

const deployContract = async (code, params) => {
  const query = new URLSearchParams({code, params})
  const response = await fetch(`http://localhost:8080/deployContract?${query.toString()}`)
  return response.json()
}

const createContractAddress = async (owner, code, params) => {
  const query = new URLSearchParams({owner, code, params})
  const response = await fetch(`http://localhost:8080/createContractAddress?${query.toString()}`)
  return response.text()
}

(async () => {
  let chainReady = false
  ipcRenderer.on('chain:ready', function (evt, message) {
    chainReady = message
    document.querySelector('app-shell').chainReady = true
    document.querySelector('app-shell').setAttribute('chainReady', true)
  });
  contextBridge.exposeInMainWorld('api', {
    chainReady: () => chainReady,
    readFile: async path => {
      const file = await readFile(path)
      return file.toString()
    },
    writeFile: async (path, data) => {
      await writeFile(path, data)
    },
    deploy: async (code, params) => {
      const match = code.match(/export default class ([A-Z])\w+|export{([A-Z])\w+ as default}/g)
      if (match.length === 0) {
        throw new Error('No name detected')
      }
      const name = match[0].replace('export default class ', '').replace('export{', '').replace('as default}', '')
      const filename = kebabCase(name)
      const path = `./templates/wizard/${filename}.js`
      await writeFile(path, code)

      const selectedAccount = fetchString('selectedAccount')

      code = await build(path)
      code = code.toString().replace(/export{([A-Z])\w+ as default}/g, `return ${name}`).replace(/\r?\n|\r/g, '')
      let tx = await deployContract(code, params)
      // await unlink(path)
      const address = await createContractAddress(selectedAccount, code, params)
      if (tx.wait) await tx.wait()  
      return {code, name, address}
    }
  })
})()