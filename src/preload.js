import Api from './api'
import { contextBridge } from 'electron';

(async () => {
  const api = await new Api()
  console.log(document.querySelector('app-shell'));
  
  
  
  contextBridge.exposeInMainWorld('api', {
    peerId: () => api.peerId,
    accounts: api.accounts,
    nativeToken: () => api.nativeToken,
    peers: () => api.peers,
    validators: () => api.validators,
    peernet: () => api.peernet,
    chain: () => api.chain,
    participate: () => api.participate(),
    balanceOf: param => api.balanceOf(param),
    createTransactionFrom: params => api.createTransactionFrom(params)
  })
  const shell = document.querySelector('app-shell')
  shell.setAttribute('api-ready', '')
})()