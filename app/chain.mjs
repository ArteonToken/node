import { nodeConfig } from '@leofcoin/lib';
import Node from '@leofcoin/chain/node';
import Chain from '@leofcoin/chain/chain';
import EasyWorker from '@vandeurenglenn/easy-worker';

const worker = new EasyWorker();

const launch = async (password) => {
  await new Node({
    network: 'leofcoin:peach',
    networkVersion: 'peach'
  }, password);
  await nodeConfig({
    network: 'leofcoin:peach',
    networkVersion: 'peach'
  });
  const chain = await new Chain();
  let accounts = await walletStore.get('accounts');
  accounts = new TextDecoder().decode(accounts);

  try {
    accounts = JSON.parse(accounts);
  } catch (e) {
    accounts = [accounts.split(',')];
  }
  try {
    await chain.participate();
    console.log('ok');
  } catch (e) {
    console.log(e);
  }
};


worker.onmessage(async (message) => {
  console.log(message);
  if (message.password) return launch(message.password)
  if (!message.params) message.params = [];
  if (message.type === 'chain') {

    let result;
    console.log(typeof chain[message.method] === 'function' || typeof chain[message.method] === 'promise');
    if (typeof chain[message.method] === 'function' || typeof chain[message.method] === 'promise') {
      result = await chain[message.method](...message.params);
    } else {
      result = await chain[message.method];
    }
    return postMessage({id: message.id, message: result})
  }
  if (message.type === 'node')  {
    if (message.method === 'accounts') {
      return postMessage({id: message.id, message: accounts})
    } else {
      let result;
      if (typeof peernet[message.method] === 'function') {
        result = await peernet[message.method]?.(...message.params);
      } else {
        result = await peernet[message.method];
      }
      return postMessage({id: message.id, message: result})
    }
  }

pubsub.publish('chain:ready', true);
});
