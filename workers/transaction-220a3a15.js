'use strict';

var codecFormatInterface = require('@leofcoin/codec-format-interface');

var proto = `

message TransactionMessage {
  required uint64 timestamp = 1;
  required string from = 2;
  required string to = 3;
  required uint64 nonce = 4;
  required string method = 5;
  repeated string params = 6;
  required string signature = 7;
}
`;

class TransactionMessage extends codecFormatInterface.FormatInterface {
  get keys() {
    return ['timestamp', 'from', 'to', 'nonce', 'method', 'params', 'signature']
  }

  get messageName() {
    return 'TransactionMessage'
  }

  constructor(buffer) {
    const name = 'transaction-message';
    super(buffer, proto, {name});
  }
}

exports.TransactionMessage = TransactionMessage;
