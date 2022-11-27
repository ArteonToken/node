import Api from './api'
import { contextBridge } from 'electron';
import { readFile } from 'fs/promises';

(async () => {
  const api = await new Api()
  console.log(document.querySelector('app-shell'));
  
  
  
  contextBridge.exposeInMainWorld('api', {
    peerId: () => api.peerId,
    accounts: api.accounts,
    nativeToken: api.nativeToken,
    peers: () => api.peers,
    validators: () => api.validators,
    peernet: () => api.peernet,
    chain: () => api.chain,
    participate: (address) => api.participate(address),
    balanceOf: param => api.balanceOf(param),
    createTransactionFrom: params => api.createTransactionFrom(params),
    readFile: (path) => readFile(path),
    selectedAccount: () => api.selectedAccount(),
    selectAccount: address => api.selectAccount(address),
    deploy: api.deploy,
    pubsub: {
      subscribers: pubsub.subscribers,
      subscribe: (ev, fn) => pubsub.subscribe(ev, fn),
      publish: (ev, data) => pubsub.publish(ev, data)
    }
  })
  const shell = document.querySelector('app-shell')
  shell.setAttribute('api-ready', '')
})()