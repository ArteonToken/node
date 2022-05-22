import Node from './../../node_modules/@leofcoin/chain/src/node'
import Chain from './../../node_modules/@leofcoin/chain/src/chain.js';


(async () => {
  console.log(Node);
  const node = await new Node()
  const chain = await new Chain()
  onmessage = ({data}) => {
    if (data.method === 'peerId') return postMessage({id: data.id, data: peernet.peerId})
  }
 postMessage('ready')
})()
