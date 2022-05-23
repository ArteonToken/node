const worker = new Worker('./chain.js')

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

export default {
  peerId: () => chainRequest('peerId'),
  createTransactionFrom: params => chainRequest('createTransactionFrom', params)
}
