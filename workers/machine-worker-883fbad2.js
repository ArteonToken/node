'use strict';

var codecFormatInterface = require('@leofcoin/codec-format-interface');
var utils = require('./utils-1dc37f72.js');
var path = require('path');
var EasyWorker = require('@vandeurenglenn/easy-worker');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var EasyWorker__default = /*#__PURE__*/_interopDefaultLegacy(EasyWorker);

var proto = `
message ContractMessage {
  required string creator = 1;
  required bytes contract = 2;
  repeated string constructorParameters = 3;
}
`;

class ContractMessage extends codecFormatInterface.FormatInterface {
  get keys() {
    return ['creator', 'contract', 'constructorParameters']
  }

  get messageName() {
    return 'ContractMessage'
  }

  constructor(buffer) {
    super(buffer, proto, {name: 'contract-message'});
  }
}

var contractFactory = "237,198,141,3,123,34,99,114,101,97,116,111,114,34,58,34,51,67,122,86,51,66,98,76,103,117,57,105,55,119,70,115,83,101,82,101,90,113,110,80,111,53,82,114,121,49,118,81,98,82,115,89,114,116,67,67,97,81,103,98,113,80,72,112,116,117,85,111,72,52,34,44,34,99,111,110,116,114,97,99,116,34,58,34,114,101,116,117,114,110,32,99,108,97,115,115,32,70,97,99,116,111,114,121,123,35,110,97,109,101,61,92,34,65,114,116,79,110,108,105,110,101,67,111,110,116,114,97,99,116,70,97,99,116,111,114,121,92,34,59,35,116,111,116,97,108,67,111,110,116,114,97,99,116,115,61,48,59,35,99,111,110,116,114,97,99,116,115,61,91,93,59,99,111,110,115,116,114,117,99,116,111,114,40,115,116,97,116,101,41,123,115,116,97,116,101,38,38,40,116,104,105,115,46,35,99,111,110,116,114,97,99,116,115,61,115,116,97,116,101,46,99,111,110,116,114,97,99,116,115,44,116,104,105,115,46,35,116,111,116,97,108,67,111,110,116,114,97,99,116,115,61,115,116,97,116,101,46,116,111,116,97,108,67,111,110,116,114,97,99,116,115,41,125,103,101,116,32,115,116,97,116,101,40,41,123,114,101,116,117,114,110,123,116,111,116,97,108,67,111,110,116,114,97,99,116,115,58,116,104,105,115,46,35,116,111,116,97,108,67,111,110,116,114,97,99,116,115,44,99,111,110,116,114,97,99,116,115,58,116,104,105,115,46,35,99,111,110,116,114,97,99,116,115,125,125,103,101,116,32,110,97,109,101,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,110,97,109,101,125,103,101,116,32,99,111,110,116,114,97,99,116,115,40,41,123,114,101,116,117,114,110,91,46,46,46,116,104,105,115,46,35,99,111,110,116,114,97,99,116,115,93,125,103,101,116,32,116,111,116,97,108,67,111,110,116,114,97,99,116,115,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,116,111,116,97,108,67,111,110,116,114,97,99,116,115,125,105,115,118,97,108,105,100,40,104,97,115,104,44,99,114,101,97,116,111,114,44,99,111,110,116,114,97,99,116,44,99,111,110,115,116,114,117,99,116,111,114,80,97,114,97,109,101,116,101,114,115,61,91,93,41,123,99,111,110,115,116,32,109,101,115,115,97,103,101,61,110,101,119,32,67,111,110,116,114,97,99,116,77,101,115,115,97,103,101,40,123,99,114,101,97,116,111,114,58,99,114,101,97,116,111,114,44,99,111,110,116,114,97,99,116,58,99,111,110,116,114,97,99,116,44,99,111,110,115,116,114,117,99,116,111,114,80,97,114,97,109,101,116,101,114,115,58,99,111,110,115,116,114,117,99,116,111,114,80,97,114,97,109,101,116,101,114,115,125,41,59,114,101,116,117,114,110,32,66,111,111,108,101,97,110,40,109,101,115,115,97,103,101,46,104,97,115,104,61,61,61,104,97,115,104,41,125,97,115,121,110,99,32,100,101,112,108,111,121,67,111,110,116,114,97,99,116,40,99,111,110,116,114,97,99,116,72,97,115,104,44,99,114,101,97,116,111,114,44,99,111,110,116,114,97,99,116,44,99,111,110,115,116,114,117,99,116,111,114,80,97,114,97,109,101,116,101,114,115,61,91,93,41,123,105,102,40,99,111,110,116,114,97,99,116,46,99,114,101,97,116,111,114,33,61,61,109,115,103,46,115,101,110,100,101,114,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,111,110,108,121,32,97,32,99,111,110,116,114,97,99,116,32,99,114,101,97,116,111,114,32,99,97,110,32,100,101,112,108,111,121,32,97,32,99,111,110,116,114,97,99,116,92,34,41,59,105,102,40,97,119,97,105,116,32,99,111,110,116,114,97,99,116,83,116,111,114,101,46,104,97,115,40,104,97,115,104,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,100,117,112,108,105,99,97,116,101,32,99,111,110,116,114,97,99,116,92,34,41,59,105,102,40,33,116,104,105,115,46,105,115,86,97,108,105,100,40,99,111,110,116,114,97,99,116,72,97,115,104,44,99,114,101,97,116,111,114,44,99,111,110,116,114,97,99,116,44,99,111,110,115,116,114,117,99,116,111,114,80,97,114,97,109,101,116,101,114,115,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,105,110,118,97,108,105,100,32,99,111,110,116,114,97,99,116,92,34,41,59,97,119,97,105,116,32,99,111,110,116,114,97,99,116,83,116,111,114,101,46,112,117,116,40,104,97,115,104,44,101,110,99,111,100,101,100,41,44,116,104,105,115,46,35,116,111,116,97,108,67,111,110,116,114,97,99,116,115,43,61,49,44,116,104,105,115,46,35,99,111,110,116,114,97,99,116,115,46,112,117,115,104,40,104,97,115,104,41,125,125,59,92,110,34,44,34,99,111,110,115,116,114,117,99,116,111,114,80,97,114,97,109,101,116,101,114,115,34,58,91,93,125";
var nativeToken = "237,198,141,3,123,34,99,114,101,97,116,111,114,34,58,34,51,67,122,86,51,66,98,76,103,117,57,105,55,119,70,115,83,101,82,101,90,113,110,80,111,53,82,114,121,49,118,81,98,82,115,89,114,116,67,67,97,81,103,98,113,80,72,112,116,117,85,111,72,52,34,44,34,99,111,110,116,114,97,99,116,34,58,34,114,101,116,117,114,110,32,99,108,97,115,115,32,65,114,116,79,110,108,105,110,101,32,101,120,116,101,110,100,115,32,99,108,97,115,115,32,84,111,107,101,110,32,101,120,116,101,110,100,115,32,99,108,97,115,115,32,82,111,108,101,115,123,35,114,111,108,101,115,61,123,79,87,78,69,82,58,91,93,44,77,73,78,84,58,91,93,44,66,85,82,78,58,91,93,125,59,99,111,110,115,116,114,117,99,116,111,114,40,114,111,108,101,115,41,123,105,102,40,114,111,108,101,115,41,123,105,102,40,33,40,114,111,108,101,115,32,105,110,115,116,97,110,99,101,111,102,32,79,98,106,101,99,116,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,101,120,112,101,99,116,101,100,32,114,111,108,101,115,32,116,111,32,98,101,32,97,110,32,111,98,106,101,99,116,92,34,41,59,116,104,105,115,46,35,114,111,108,101,115,61,123,46,46,46,114,111,108,101,115,44,46,46,46,116,104,105,115,46,35,114,111,108,101,115,125,125,101,108,115,101,32,116,104,105,115,46,35,103,114,97,110,116,82,111,108,101,40,109,115,103,46,115,101,110,100,101,114,44,92,34,79,87,78,69,82,92,34,41,125,103,101,116,32,115,116,97,116,101,40,41,123,114,101,116,117,114,110,123,114,111,108,101,115,58,116,104,105,115,46,114,111,108,101,115,125,125,103,101,116,32,114,111,108,101,115,40,41,123,114,101,116,117,114,110,123,46,46,46,116,104,105,115,46,35,114,111,108,101,115,125,125,104,97,115,82,111,108,101,40,97,100,100,114,101,115,115,44,114,111,108,101,41,123,114,101,116,117,114,110,33,33,116,104,105,115,46,35,114,111,108,101,115,91,114,111,108,101,93,38,38,45,49,33,61,61,116,104,105,115,46,35,114,111,108,101,115,91,114,111,108,101,93,46,105,110,100,101,120,79,102,40,97,100,100,114,101,115,115,41,125,35,103,114,97,110,116,82,111,108,101,40,97,100,100,114,101,115,115,44,114,111,108,101,41,123,105,102,40,116,104,105,115,46,104,97,115,82,111,108,101,40,97,100,100,114,101,115,115,44,114,111,108,101,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,96,36,123,114,111,108,101,125,32,114,111,108,101,32,97,108,114,101,97,100,121,32,103,114,97,110,116,101,100,32,102,111,114,32,36,123,97,100,100,114,101,115,115,125,96,41,59,116,104,105,115,46,35,114,111,108,101,115,91,114,111,108,101,93,46,112,117,115,104,40,97,100,100,114,101,115,115,41,125,35,114,101,118,111,107,101,82,111,108,101,40,97,100,100,114,101,115,115,44,114,111,108,101,41,123,105,102,40,33,116,104,105,115,46,104,97,115,82,111,108,101,40,97,100,100,114,101,115,115,44,114,111,108,101,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,96,36,123,114,111,108,101,125,32,114,111,108,101,32,97,108,114,101,97,100,121,32,114,101,118,111,107,101,100,32,102,111,114,32,36,123,97,100,100,114,101,115,115,125,96,41,59,105,102,40,92,34,79,87,78,69,82,92,34,61,61,61,114,111,108,101,38,38,49,61,61,61,116,104,105,115,46,35,114,111,108,101,115,91,114,111,108,101,93,46,108,101,110,103,116,104,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,97,116,108,101,97,115,116,32,111,110,101,32,111,119,110,101,114,32,105,115,32,110,101,101,100,101,100,33,92,34,41,59,116,104,105,115,46,35,114,111,108,101,115,91,114,111,108,101,93,46,115,112,108,105,99,101,40,116,104,105,115,46,35,114,111,108,101,115,91,114,111,108,101,93,46,105,110,100,101,120,79,102,40,97,100,100,114,101,115,115,41,41,125,103,114,97,110,116,82,111,108,101,40,97,100,100,114,101,115,115,44,114,111,108,101,41,123,105,102,40,33,116,104,105,115,46,104,97,115,82,111,108,101,40,97,100,100,114,101,115,115,44,92,34,79,87,78,69,82,92,34,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,78,111,116,32,97,108,108,111,119,101,100,92,34,41,59,116,104,105,115,46,35,103,114,97,110,116,82,111,108,101,40,97,100,100,114,101,115,115,44,114,111,108,101,41,125,114,101,118,111,107,101,82,111,108,101,40,97,100,100,114,101,115,115,44,114,111,108,101,41,123,105,102,40,33,116,104,105,115,46,104,97,115,82,111,108,101,40,97,100,100,114,101,115,115,44,92,34,79,87,78,69,82,92,34,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,78,111,116,32,97,108,108,111,119,101,100,92,34,41,59,116,104,105,115,46,35,114,101,118,111,107,101,82,111,108,101,40,97,100,100,114,101,115,115,44,114,111,108,101,41,125,125,123,35,110,97,109,101,59,35,115,121,109,98,111,108,59,35,104,111,108,100,101,114,115,61,48,59,35,98,97,108,97,110,99,101,115,61,123,125,59,35,97,112,112,114,111,118,97,108,115,61,123,125,59,35,100,101,99,105,109,97,108,115,61,49,56,59,35,116,111,116,97,108,83,117,112,112,108,121,61,66,105,103,78,117,109,98,101,114,46,102,114,111,109,40,48,41,59,99,111,110,115,116,114,117,99,116,111,114,40,110,97,109,101,44,115,121,109,98,111,108,44,100,101,99,105,109,97,108,115,61,49,56,44,115,116,97,116,101,41,123,105,102,40,33,110,97,109,101,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,97,109,101,32,117,110,100,101,102,105,110,101,100,92,34,41,59,105,102,40,33,115,121,109,98,111,108,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,115,121,109,98,111,108,32,117,110,100,101,102,105,110,101,100,92,34,41,59,115,117,112,101,114,40,115,116,97,116,101,63,46,114,111,108,101,115,41,44,116,104,105,115,46,35,110,97,109,101,61,110,97,109,101,44,116,104,105,115,46,35,115,121,109,98,111,108,61,115,121,109,98,111,108,44,116,104,105,115,46,35,100,101,99,105,109,97,108,115,61,100,101,99,105,109,97,108,115,125,103,101,116,32,115,116,97,116,101,40,41,123,114,101,116,117,114,110,123,46,46,46,115,117,112,101,114,46,115,116,97,116,101,44,104,111,108,100,101,114,115,58,116,104,105,115,46,104,111,108,100,101,114,115,44,98,97,108,97,110,99,101,115,58,116,104,105,115,46,98,97,108,97,110,99,101,115,44,97,112,112,114,111,118,97,108,115,58,123,46,46,46,116,104,105,115,46,35,97,112,112,114,111,118,97,108,115,125,44,116,111,116,97,108,83,117,112,112,108,121,58,116,104,105,115,46,116,111,116,97,108,83,117,112,112,108,121,125,125,103,101,116,32,116,111,116,97,108,83,117,112,112,108,121,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,116,111,116,97,108,83,117,112,112,108,121,125,103,101,116,32,110,97,109,101,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,110,97,109,101,125,103,101,116,32,115,121,109,98,111,108,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,115,121,109,98,111,108,125,103,101,116,32,104,111,108,100,101,114,115,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,104,111,108,100,101,114,115,125,103,101,116,32,98,97,108,97,110,99,101,115,40,41,123,114,101,116,117,114,110,123,46,46,46,116,104,105,115,46,35,98,97,108,97,110,99,101,115,125,125,109,105,110,116,40,116,111,44,97,109,111,117,110,116,41,123,105,102,40,33,116,104,105,115,46,104,97,115,82,111,108,101,40,109,115,103,46,115,101,110,100,101,114,44,92,34,77,73,78,84,92,34,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,111,116,32,97,108,108,111,119,101,100,92,34,41,59,116,104,105,115,46,35,116,111,116,97,108,83,117,112,112,108,121,61,116,104,105,115,46,35,116,111,116,97,108,83,117,112,112,108,121,46,97,100,100,40,97,109,111,117,110,116,41,44,116,104,105,115,46,35,105,110,99,114,101,97,115,101,66,97,108,97,110,99,101,40,116,111,44,97,109,111,117,110,116,41,125,98,117,114,110,40,116,111,44,97,109,111,117,110,116,41,123,105,102,40,33,116,104,105,115,46,104,97,115,82,111,108,101,40,109,115,103,46,115,101,110,100,101,114,44,92,34,66,85,82,78,92,34,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,111,116,32,97,108,108,111,119,101,100,92,34,41,59,116,104,105,115,46,35,116,111,116,97,108,83,117,112,112,108,121,61,116,104,105,115,46,35,116,111,116,97,108,83,117,112,112,108,121,46,115,117,98,40,97,109,111,117,110,116,41,44,116,104,105,115,46,35,100,101,99,114,101,97,115,101,66,97,108,97,110,99,101,40,116,111,44,97,109,111,117,110,116,41,125,35,98,101,102,111,114,101,84,114,97,110,115,102,101,114,40,102,114,111,109,44,116,111,44,97,109,111,117,110,116,41,123,105,102,40,33,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,102,114,111,109,93,124,124,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,102,114,111,109,93,60,97,109,111,117,110,116,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,97,109,111,117,110,116,32,101,120,99,101,101,100,115,32,98,97,108,97,110,99,101,92,34,41,125,35,117,112,100,97,116,101,72,111,108,100,101,114,115,40,97,100,100,114,101,115,115,44,112,114,101,118,105,111,117,115,66,97,108,97,110,99,101,41,123,92,34,48,120,48,48,92,34,61,61,61,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,46,116,111,72,101,120,83,116,114,105,110,103,40,41,63,116,104,105,115,46,35,104,111,108,100,101,114,115,45,61,49,58,92,34,48,120,48,48,92,34,33,61,61,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,46,116,111,72,101,120,83,116,114,105,110,103,40,41,38,38,92,34,48,120,48,48,92,34,61,61,61,112,114,101,118,105,111,117,115,66,97,108,97,110,99,101,46,116,111,72,101,120,83,116,114,105,110,103,40,41,38,38,40,116,104,105,115,46,35,104,111,108,100,101,114,115,43,61,49,41,125,35,105,110,99,114,101,97,115,101,66,97,108,97,110,99,101,40,97,100,100,114,101,115,115,44,97,109,111,117,110,116,41,123,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,124,124,40,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,61,66,105,103,78,117,109,98,101,114,46,102,114,111,109,40,48,41,41,59,99,111,110,115,116,32,112,114,101,118,105,111,117,115,66,97,108,97,110,99,101,61,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,59,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,61,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,46,97,100,100,40,97,109,111,117,110,116,41,44,116,104,105,115,46,35,117,112,100,97,116,101,72,111,108,100,101,114,115,40,97,100,100,114,101,115,115,44,112,114,101,118,105,111,117,115,66,97,108,97,110,99,101,41,125,35,100,101,99,114,101,97,115,101,66,97,108,97,110,99,101,40,97,100,100,114,101,115,115,44,97,109,111,117,110,116,41,123,99,111,110,115,116,32,112,114,101,118,105,111,117,115,66,97,108,97,110,99,101,61,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,59,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,61,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,46,115,117,98,40,97,109,111,117,110,116,41,44,116,104,105,115,46,35,117,112,100,97,116,101,72,111,108,100,101,114,115,40,97,100,100,114,101,115,115,44,112,114,101,118,105,111,117,115,66,97,108,97,110,99,101,41,125,98,97,108,97,110,99,101,79,102,40,97,100,100,114,101,115,115,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,98,97,108,97,110,99,101,115,91,97,100,100,114,101,115,115,93,125,115,101,116,65,112,112,114,111,118,97,108,40,111,112,101,114,97,116,111,114,44,97,109,111,117,110,116,41,123,99,111,110,115,116,32,111,119,110,101,114,61,103,108,111,98,97,108,84,104,105,115,46,109,115,103,46,115,101,110,100,101,114,59,116,104,105,115,46,35,97,112,112,114,111,118,97,108,115,91,111,119,110,101,114,93,124,124,40,116,104,105,115,46,35,97,112,112,114,111,118,97,108,115,91,111,119,110,101,114,93,61,123,125,41,44,116,104,105,115,46,35,97,112,112,114,111,118,97,108,115,91,111,119,110,101,114,93,91,111,112,101,114,97,116,111,114,93,61,97,109,111,117,110,116,125,97,112,112,114,111,118,101,100,40,111,119,110,101,114,44,111,112,101,114,97,116,111,114,44,97,109,111,117,110,116,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,97,112,112,114,111,118,97,108,115,91,111,119,110,101,114,93,91,111,112,101,114,97,116,111,114,93,61,61,61,97,109,111,117,110,116,125,116,114,97,110,115,102,101,114,40,102,114,111,109,44,116,111,44,97,109,111,117,110,116,41,123,97,109,111,117,110,116,61,66,105,103,78,117,109,98,101,114,46,102,114,111,109,40,97,109,111,117,110,116,41,44,116,104,105,115,46,35,98,101,102,111,114,101,84,114,97,110,115,102,101,114,40,102,114,111,109,44,116,111,44,97,109,111,117,110,116,41,44,116,104,105,115,46,35,100,101,99,114,101,97,115,101,66,97,108,97,110,99,101,40,102,114,111,109,44,97,109,111,117,110,116,41,44,116,104,105,115,46,35,105,110,99,114,101,97,115,101,66,97,108,97,110,99,101,40,116,111,44,97,109,111,117,110,116,41,125,125,123,99,111,110,115,116,114,117,99,116,111,114,40,115,116,97,116,101,41,123,115,117,112,101,114,40,92,34,65,114,116,79,110,108,105,110,101,92,34,44,92,34,65,82,84,92,34,44,49,56,44,115,116,97,116,101,41,125,125,59,92,110,34,44,34,99,111,110,115,116,114,117,99,116,111,114,80,97,114,97,109,101,116,101,114,115,34,58,91,93,125";
var nameService = "237,198,141,3,123,34,99,114,101,97,116,111,114,34,58,34,51,67,122,86,51,66,98,76,103,117,57,105,55,119,70,115,83,101,82,101,90,113,110,80,111,53,82,114,121,49,118,81,98,82,115,89,114,116,67,67,97,81,103,98,113,80,72,112,116,117,85,111,72,52,34,44,34,99,111,110,116,114,97,99,116,34,58,34,114,101,116,117,114,110,32,99,108,97,115,115,32,78,97,109,101,83,101,114,118,105,99,101,123,35,110,97,109,101,61,92,34,65,114,116,79,110,108,105,110,101,78,97,109,101,83,101,114,118,105,99,101,92,34,59,35,111,119,110,101,114,59,35,112,114,105,99,101,61,48,59,35,114,101,103,105,115,116,114,121,61,123,125,59,35,99,117,114,114,101,110,99,121,59,103,101,116,32,110,97,109,101,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,110,97,109,101,125,103,101,116,32,114,101,103,105,115,116,114,121,40,41,123,114,101,116,117,114,110,123,46,46,46,116,104,105,115,46,35,114,101,103,105,115,116,114,121,125,125,103,101,116,32,115,116,97,116,101,40,41,123,125,99,111,110,115,116,114,117,99,116,111,114,40,102,97,99,116,111,114,121,65,100,100,114,101,115,115,44,99,117,114,114,101,110,99,121,44,118,97,108,105,100,97,116,111,114,65,100,100,114,101,115,115,44,112,114,105,99,101,44,115,116,97,116,101,41,123,115,116,97,116,101,63,40,116,104,105,115,46,35,111,119,110,101,114,61,115,116,97,116,101,46,111,119,110,101,114,44,116,104,105,115,46,35,114,101,103,105,115,116,114,121,61,115,116,97,116,101,46,114,101,103,105,115,116,114,121,44,116,104,105,115,46,35,99,117,114,114,101,110,99,121,61,115,116,97,116,101,46,99,117,114,114,101,110,99,121,44,116,104,105,115,46,35,112,114,105,99,101,61,115,116,97,116,101,46,112,114,105,99,101,41,58,40,116,104,105,115,46,35,111,119,110,101,114,61,109,115,103,46,115,101,110,100,101,114,44,116,104,105,115,46,35,112,114,105,99,101,61,112,114,105,99,101,44,116,104,105,115,46,35,114,101,103,105,115,116,114,121,46,65,114,116,79,110,108,105,110,101,67,111,110,116,114,97,99,116,70,97,99,116,111,114,121,61,123,111,119,110,101,114,58,109,115,103,46,115,101,110,100,101,114,44,97,100,100,114,101,115,115,58,102,97,99,116,111,114,121,65,100,100,114,101,115,115,125,44,116,104,105,115,46,35,114,101,103,105,115,116,114,121,46,65,114,116,79,110,108,105,110,101,84,111,107,101,110,61,123,111,119,110,101,114,58,109,115,103,46,115,101,110,100,101,114,44,97,100,100,114,101,115,115,58,99,117,114,114,101,110,99,121,125,44,116,104,105,115,46,35,114,101,103,105,115,116,114,121,46,65,114,116,79,110,108,105,110,101,86,97,108,105,100,97,116,111,114,115,61,123,111,119,110,101,114,58,109,115,103,46,115,101,110,100,101,114,44,97,100,100,114,101,115,115,58,118,97,108,105,100,97,116,111,114,65,100,100,114,101,115,115,125,44,116,104,105,115,46,35,99,117,114,114,101,110,99,121,61,99,117,114,114,101,110,99,121,41,125,99,104,97,110,103,101,79,119,110,101,114,40,111,119,110,101,114,41,123,105,102,40,109,115,103,46,115,101,110,100,101,114,33,61,61,116,104,105,115,46,35,111,119,110,101,114,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,111,32,111,119,110,101,114,92,34,41,59,116,104,105,115,46,35,111,119,110,101,114,61,111,119,110,101,114,125,99,104,97,110,103,101,80,114,105,99,101,40,112,114,105,99,101,41,123,105,102,40,109,115,103,46,115,101,110,100,101,114,33,61,61,116,104,105,115,46,35,111,119,110,101,114,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,111,32,111,119,110,101,114,92,34,41,59,116,104,105,115,46,35,112,114,105,99,101,61,112,114,105,99,101,125,99,104,97,110,103,101,67,117,114,114,101,110,99,121,40,99,117,114,114,101,110,99,121,41,123,105,102,40,109,115,103,46,115,101,110,100,101,114,33,61,61,116,104,105,115,46,35,111,119,110,101,114,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,111,32,111,119,110,101,114,92,34,41,59,116,104,105,115,46,35,99,117,114,114,101,110,99,121,61,99,117,114,114,101,110,99,121,125,97,115,121,110,99,32,112,117,114,99,104,97,115,101,78,97,109,101,40,110,97,109,101,44,97,100,100,114,101,115,115,41,123,105,102,40,97,119,97,105,116,32,109,115,103,46,99,97,108,108,40,116,104,105,115,46,35,99,117,114,114,101,110,99,121,44,92,34,98,97,108,97,110,99,101,79,102,92,34,44,91,109,115,103,46,115,101,110,100,101,114,93,41,60,116,104,105,115,46,35,112,114,105,99,101,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,112,114,105,99,101,32,101,120,99,101,101,100,115,32,98,97,108,97,110,99,101,92,34,41,59,116,114,121,123,97,119,97,105,116,32,109,115,103,46,99,97,108,108,40,116,104,105,115,46,35,99,117,114,114,101,110,99,121,44,92,34,116,114,97,110,115,102,101,114,92,34,44,91,109,115,103,46,115,101,110,100,101,114,44,116,104,105,115,46,35,111,119,110,101,114,44,116,104,105,115,46,35,112,114,105,99,101,93,41,125,99,97,116,99,104,40,101,41,123,116,104,114,111,119,32,101,125,116,104,105,115,46,35,114,101,103,105,115,116,114,121,91,110,97,109,101,93,61,123,111,119,110,101,114,58,109,115,103,46,115,101,110,100,101,114,44,97,100,100,114,101,115,115,58,97,100,100,114,101,115,115,125,125,108,111,111,107,117,112,40,110,97,109,101,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,114,101,103,105,115,116,114,121,91,110,97,109,101,93,125,116,114,97,110,115,102,101,114,79,119,110,101,114,115,104,105,112,40,110,97,109,101,44,116,111,41,123,105,102,40,109,115,103,46,115,101,110,100,101,114,33,61,61,116,104,105,115,46,35,114,101,103,105,115,116,114,121,46,111,119,110,101,114,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,111,116,32,97,32,111,119,110,101,114,92,34,41,59,116,104,105,115,46,35,114,101,103,105,115,116,114,121,91,110,97,109,101,93,46,111,119,110,101,114,61,116,111,125,99,104,97,110,103,101,65,100,100,114,101,115,115,40,110,97,109,101,44,97,100,100,114,101,115,115,41,123,105,102,40,109,115,103,46,115,101,110,100,101,114,33,61,61,116,104,105,115,46,35,114,101,103,105,115,116,114,121,46,111,119,110,101,114,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,111,116,32,97,32,111,119,110,101,114,92,34,41,59,116,104,105,115,46,35,114,101,103,105,115,116,114,121,91,110,97,109,101,93,46,97,100,100,114,101,115,115,61,97,100,100,114,101,115,115,125,125,59,92,110,34,44,34,99,111,110,115,116,114,117,99,116,111,114,80,97,114,97,109,101,116,101,114,115,34,58,91,34,105,104,110,121,50,103,113,103,111,114,119,111,102,104,118,102,103,116,114,53,100,109,50,116,97,114,103,110,120,114,117,108,53,114,114,52,119,110,121,107,52,118,108,55,97,107,98,109,119,111,120,52,51,110,108,118,112,105,109,34,44,34,105,104,110,121,50,103,113,104,101,55,103,97,122,107,105,101,101,121,52,111,51,114,122,116,102,121,55,53,55,105,97,51,97,115,54,115,110,114,109,111,118,52,101,51,118,107,102,100,118,116,50,111,108,118,120,51,115,116,101,34,44,34,105,104,110,121,50,103,113,104,108,109,117,98,114,118,107,108,51,105,120,121,102,97,100,111,109,112,118,102,105,105,110,118,119,116,104,105,52,51,119,112,116,52,113,100,102,106,55,54,55,110,104,112,121,106,108,110,119,105,110,34,44,34,49,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,34,93,125";
var validators = "237,198,141,3,123,34,99,114,101,97,116,111,114,34,58,34,51,67,122,86,51,66,98,76,103,117,57,105,55,119,70,115,83,101,82,101,90,113,110,80,111,53,82,114,121,49,118,81,98,82,115,89,114,116,67,67,97,81,103,98,113,80,72,112,116,117,85,111,72,52,34,44,34,99,111,110,116,114,97,99,116,34,58,34,114,101,116,117,114,110,32,99,108,97,115,115,32,86,97,108,105,100,97,116,111,114,115,123,35,110,97,109,101,61,92,34,65,114,116,79,110,108,105,110,101,86,97,108,105,100,97,116,111,114,115,92,34,59,35,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,61,48,59,35,118,97,108,105,100,97,116,111,114,115,61,123,125,59,35,111,119,110,101,114,59,35,99,117,114,114,101,110,99,121,59,35,109,105,110,105,109,117,109,66,97,108,97,110,99,101,59,103,101,116,32,115,116,97,116,101,40,41,123,114,101,116,117,114,110,123,111,119,110,101,114,58,116,104,105,115,46,35,111,119,110,101,114,44,109,105,110,105,109,117,109,66,97,108,97,110,99,101,58,116,104,105,115,46,35,109,105,110,105,109,117,109,66,97,108,97,110,99,101,44,99,117,114,114,101,110,99,121,58,116,104,105,115,46,35,99,117,114,114,101,110,99,121,44,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,58,116,104,105,115,46,35,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,44,118,97,108,105,100,97,116,111,114,115,58,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,125,125,99,111,110,115,116,114,117,99,116,111,114,40,116,111,107,101,110,65,100,100,114,101,115,115,44,115,116,97,116,101,41,123,115,116,97,116,101,63,40,116,104,105,115,46,35,111,119,110,101,114,61,115,116,97,116,101,46,111,119,110,101,114,44,116,104,105,115,46,35,109,105,110,105,109,117,109,66,97,108,97,110,99,101,61,115,116,97,116,101,46,109,105,110,105,109,117,109,66,97,108,97,110,99,101,44,116,104,105,115,46,35,99,117,114,114,101,110,99,121,61,115,116,97,116,101,46,99,117,114,114,101,110,99,121,44,116,104,105,115,46,35,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,61,115,116,97,116,101,46,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,44,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,61,115,116,97,116,101,46,118,97,108,105,100,97,116,111,114,115,41,58,40,116,104,105,115,46,35,111,119,110,101,114,61,109,115,103,46,115,101,110,100,101,114,44,116,104,105,115,46,35,109,105,110,105,109,117,109,66,97,108,97,110,99,101,61,53,101,52,44,116,104,105,115,46,35,99,117,114,114,101,110,99,121,61,116,111,107,101,110,65,100,100,114,101,115,115,44,116,104,105,115,46,35,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,43,61,49,44,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,91,109,115,103,46,115,101,110,100,101,114,93,61,123,102,105,114,115,116,83,101,101,110,58,40,110,101,119,32,68,97,116,101,41,46,103,101,116,84,105,109,101,40,41,44,97,99,116,105,118,101,58,33,48,125,41,125,103,101,116,32,110,97,109,101,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,110,97,109,101,125,103,101,116,32,111,119,110,101,114,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,111,119,110,101,114,125,103,101,116,32,99,117,114,114,101,110,99,121,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,99,117,114,114,101,110,99,121,125,103,101,116,32,118,97,108,105,100,97,116,111,114,115,40,41,123,114,101,116,117,114,110,123,46,46,46,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,125,125,103,101,116,32,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,125,103,101,116,32,109,105,110,105,109,117,109,66,97,108,97,110,99,101,40,41,123,114,101,116,117,114,110,32,116,104,105,115,46,35,109,105,110,105,109,117,109,66,97,108,97,110,99,101,125,99,104,97,110,103,101,79,119,110,101,114,40,111,119,110,101,114,41,123,105,102,40,109,115,103,46,115,101,110,100,101,114,33,61,61,116,104,105,115,46,35,111,119,110,101,114,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,111,116,32,97,110,32,111,119,110,101,114,92,34,41,125,99,104,97,110,103,101,67,117,114,114,101,110,99,121,40,99,117,114,114,101,110,99,121,41,123,105,102,40,109,115,103,46,115,101,110,100,101,114,33,61,61,116,104,105,115,46,35,111,119,110,101,114,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,110,111,116,32,97,110,32,111,119,110,101,114,92,34,41,59,116,104,105,115,46,35,99,117,114,114,101,110,99,121,61,99,117,114,114,101,110,99,121,125,104,97,115,40,118,97,108,105,100,97,116,111,114,41,123,114,101,116,117,114,110,32,66,111,111,108,101,97,110,40,118,111,105,100,32,48,33,61,61,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,91,118,97,108,105,100,97,116,111,114,93,41,125,97,115,121,110,99,32,97,100,100,86,97,108,105,100,97,116,111,114,40,118,97,108,105,100,97,116,111,114,41,123,105,102,40,116,104,105,115,46,104,97,115,40,118,97,108,105,100,97,116,111,114,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,97,108,114,101,97,100,121,32,97,32,118,97,108,105,100,97,116,111,114,92,34,41,59,99,111,110,115,116,32,98,97,108,97,110,99,101,61,97,119,97,105,116,32,109,115,103,46,115,116,97,116,105,99,67,97,108,108,40,116,104,105,115,46,99,117,114,114,101,110,99,121,44,92,34,98,97,108,97,110,99,101,79,102,92,34,44,91,109,115,103,46,115,101,110,100,101,114,93,41,59,105,102,40,98,97,108,97,110,99,101,60,116,104,105,115,46,109,105,110,105,109,117,109,66,97,108,97,110,99,101,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,96,98,97,108,97,110,99,101,32,116,111,32,108,111,119,33,32,103,111,116,58,32,36,123,98,97,108,97,110,99,101,125,32,110,101,101,100,58,32,36,123,116,104,105,115,46,35,109,105,110,105,109,117,109,66,97,108,97,110,99,101,125,96,41,59,116,104,105,115,46,35,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,43,61,49,44,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,91,118,97,108,105,100,97,116,111,114,93,61,123,102,105,114,115,116,83,101,101,110,58,40,110,101,119,32,68,97,116,101,41,46,103,101,116,84,105,109,101,40,41,44,97,99,116,105,118,101,58,33,48,125,125,114,101,109,111,118,101,86,97,108,105,100,97,116,111,114,40,118,97,108,105,100,97,116,111,114,41,123,105,102,40,33,116,104,105,115,46,104,97,115,40,118,97,108,105,100,97,116,111,114,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,118,97,108,105,100,97,116,111,114,32,110,111,116,32,102,111,117,110,100,92,34,41,59,116,104,105,115,46,35,116,111,116,97,108,86,97,108,105,100,97,116,111,114,115,45,61,49,44,100,101,108,101,116,101,32,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,91,118,97,108,105,100,97,116,111,114,93,125,97,115,121,110,99,32,117,112,100,97,116,101,86,97,108,105,100,97,116,111,114,40,118,97,108,105,100,97,116,111,114,44,97,99,116,105,118,101,41,123,105,102,40,33,116,104,105,115,46,104,97,115,40,118,97,108,105,100,97,116,111,114,41,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,92,34,118,97,108,105,100,97,116,111,114,32,110,111,116,32,102,111,117,110,100,92,34,41,59,99,111,110,115,116,32,98,97,108,97,110,99,101,61,97,119,97,105,116,32,109,115,103,46,115,116,97,116,105,99,67,97,108,108,40,116,104,105,115,46,99,117,114,114,101,110,99,121,44,92,34,98,97,108,97,110,99,101,79,102,92,34,44,91,109,115,103,46,115,101,110,100,101,114,93,41,59,105,102,40,98,97,108,97,110,99,101,60,116,104,105,115,46,109,105,110,105,109,117,109,66,97,108,97,110,99,101,38,38,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,91,118,97,108,105,100,97,116,111,114,93,46,97,99,116,105,118,101,38,38,40,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,91,118,97,108,105,100,97,116,111,114,93,46,97,99,116,105,118,101,61,33,49,41,44,98,97,108,97,110,99,101,60,116,104,105,115,46,109,105,110,105,109,117,109,66,97,108,97,110,99,101,41,116,104,114,111,119,32,110,101,119,32,69,114,114,111,114,40,96,98,97,108,97,110,99,101,32,116,111,32,108,111,119,33,32,103,111,116,58,32,36,123,98,97,108,97,110,99,101,125,32,110,101,101,100,58,32,36,123,116,104,105,115,46,35,109,105,110,105,109,117,109,66,97,108,97,110,99,101,125,96,41,59,116,104,105,115,46,35,118,97,108,105,100,97,116,111,114,115,91,118,97,108,105,100,97,116,111,114,93,46,97,99,116,105,118,101,61,97,99,116,105,118,101,125,125,59,92,110,34,44,34,99,111,110,115,116,114,117,99,116,111,114,80,97,114,97,109,101,116,101,114,115,34,58,91,34,105,104,110,121,50,103,113,104,101,55,103,97,122,107,105,101,101,121,52,111,51,114,122,116,102,121,55,53,55,105,97,51,97,115,54,115,110,114,109,111,118,52,101,51,118,107,102,100,118,116,50,111,108,118,120,51,115,116,101,34,93,125";
var bytecodes = {
	contractFactory: contractFactory,
	nativeToken: nativeToken,
	nameService: nameService,
	validators: validators
};

const worker = new EasyWorker__default["default"]();

const contractFactoryMessage = bytecodes.contractFactory;
const nativeTokenMessage = bytecodes.nativeToken;
const nameServiceMessage = bytecodes.nameService;
const validatorsMessage = bytecodes.validators;

globalThis.BigNumber = utils.BigNumber;

globalThis.peernet = globalThis.peernet || {};
globalThis.contracts = {};


const get = (contract, method, params) => {
  let result;
  if (params?.length > 0) {
    result = contracts[contract][method](...params);
  } else {
    result = contracts[contract][method];
  }
  return result
};

const runContract = async (contractMessage) => {
  const params = contractMessage.decoded.constructorParameters;
  try {

    const func = new Function(contractMessage.decoded.contract);
    const Contract = func();

    globalThis.msg = createMessage(contractMessage.decoded.creator);
    // globalThis.msg = {sender: contractMessage.decoded.creator}
    contracts[await contractMessage.hash] = await new Contract(...params);
    process.send({
      type: 'debug',
      messages: [
        `loaded contract: ${await contractMessage.hash}`,
        `size: ${utils.formatBytes(contractMessage.encoded.length)}`
      ]
    });
  } catch (e) {
    console.log(e);
    process.send({
      type: 'contractError',
      hash: await contractMessage.hash
    });
  }
};

const execute = async (contract, method, params) => {
  try {
    let result;
    // don't execute the method on a proxy
    if (contracts[contract].fallback) {
      result = await contracts[contract].fallback(method, params);
    } else {
      result = await contracts[contract][method](...params);
    }
    // state.put(result)
    return result
  } catch (e) {
    throw e
  }
};


const createMessage = (sender = globalThis.peerid) => {
  return {
    sender,
    call: execute,
    staticCall: get
  }
};

const _init = async ({ contracts, blocks, peerid })=> {
  
  globalThis.peernet.codecs =  {
    'contract-message': {
      codec: parseInt('63636d', 16),
      hashAlg: 'keccak-256'
    },
    'transaction-message': {
      codec: parseInt('746d', 16),
      hashAlg: 'keccak-256'
    },
    'block-message': {
      codec: parseInt('626d', 16),
      hashAlg: 'keccak-256'
    }
  };

  globalThis.peerid = peerid;
  contracts = [
    contractFactoryMessage,
    nativeTokenMessage,
    nameServiceMessage,
    validatorsMessage
  ];

  contracts = await Promise.all(contracts.map(async contract => {
    contract = await new ContractMessage(new Uint8Array(contract.split(',')));
    await runContract(contract);
    return contract
  }));

  const _worker = await new EasyWorker__default["default"](path.join(__dirname, './block-worker.js'), {serialization: 'advanced', type: 'module' });
  blocks = await _worker.once(blocks);
  
  for (const block of blocks) {
    await Promise.all(block.decoded.transactions.map(async message => {
      const {from, to, method, params} = message;
      globalThis.msg = createMessage(from);
    
      await execute(to, method, params);
    }));
  }

  let lastBlock;
  if (blocks.length > 0) {
    lastBlock = blocks[blocks.length - 1].decoded;    
    lastBlock = await new utils.BlockMessage(lastBlock);

    lastBlock = {
      ...lastBlock.decoded,
      hash: await lastBlock.hash
    };
  }
  worker.postMessage({type: 'machine-ready', lastBlock });
  _worker.terminate(); 
  
  worker.postMessage(blocks);
};

const tasks = async (e) => {
  const id = e.id;
    if (e.type === 'init') await _init(e.input);
    if (e.type === 'get') {
      const value = await get(e.input.contract, e.input.method, e.input.params);
      worker.postMessage({
        type: 'response',
        id,
        value
      });
    }
    if (e.type === 'execute') {
      try {
        const value = await execute(e.input.contract, e.input.method, e.input.params);
        worker.postMessage({
          type: 'response',
          id,
          value
        });
      } catch(e) {
        worker.postMessage({
          type: 'executionError',
          message: e.message,
          id
          
        });
      }
    }
  };

worker.onmessage(data => tasks(data));

var machineWorker = /*#__PURE__*/Object.freeze({
  __proto__: null
});

exports.machineWorker = machineWorker;
