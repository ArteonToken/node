'use strict';

var codecFormatInterface = require('@leofcoin/codec-format-interface');
var _BN = require('bn.js');
var bytes = require('@ethersproject/bytes');
var logger$1 = require('@ethersproject/logger');
require('@ethersproject/bignumber');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _BN__default = /*#__PURE__*/_interopDefaultLegacy(_BN);

var proto = `
message ValidatorMessage {
  required string address = 1;
  required string reward = 2;
}

message Transaction {
  required string hash = 1;
  required uint64 timestamp = 2;
  required string from = 3;
  required string to = 4;
  required uint64 nonce = 5;
  required string method = 6;
  repeated string params = 7;
}

message BlockMessage {
  required uint64 index = 1;
  required string previousHash = 3;
  required uint64 timestamp = 4;
  required uint64 reward = 5;
  required string fees = 6;
  repeated Transaction transactions = 7;
  repeated ValidatorMessage validators = 8;
}
`;

class BlockMessage extends codecFormatInterface.FormatInterface {
  get keys() {
    return ['index', 'previousHash', 'timestamp', 'reward', 'fees', 'transactions', 'validators']
  }

  get messageName() {
    return 'BlockMessage'
  }

  constructor(buffer) {
    const name = 'block-message';
    super(buffer, proto, {name});
  }
}

const version$1 = "bignumber/5.6.2";

var BN = _BN__default["default"].BN;
const logger = new logger$1.Logger(version$1);
const _constructorGuard = {};
const MAX_SAFE = 0x1fffffffffffff;
// Only warn about passing 10 into radix once
let _warnedToStringRadix = false;
class BigNumber {
    constructor(constructorGuard, hex) {
        if (constructorGuard !== _constructorGuard) {
            logger.throwError("cannot call constructor directly; use BigNumber.from", logger$1.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "new (BigNumber)"
            });
        }
        this._hex = hex;
        this._isBigNumber = true;
        Object.freeze(this);
    }
    fromTwos(value) {
        return toBigNumber(toBN(this).fromTwos(value));
    }
    toTwos(value) {
        return toBigNumber(toBN(this).toTwos(value));
    }
    abs() {
        if (this._hex[0] === "-") {
            return BigNumber.from(this._hex.substring(1));
        }
        return this;
    }
    add(other) {
        return toBigNumber(toBN(this).add(toBN(other)));
    }
    sub(other) {
        return toBigNumber(toBN(this).sub(toBN(other)));
    }
    div(other) {
        const o = BigNumber.from(other);
        if (o.isZero()) {
            throwFault("division-by-zero", "div");
        }
        return toBigNumber(toBN(this).div(toBN(other)));
    }
    mul(other) {
        return toBigNumber(toBN(this).mul(toBN(other)));
    }
    mod(other) {
        const value = toBN(other);
        if (value.isNeg()) {
            throwFault("division-by-zero", "mod");
        }
        return toBigNumber(toBN(this).umod(value));
    }
    pow(other) {
        const value = toBN(other);
        if (value.isNeg()) {
            throwFault("negative-power", "pow");
        }
        return toBigNumber(toBN(this).pow(value));
    }
    and(other) {
        const value = toBN(other);
        if (this.isNegative() || value.isNeg()) {
            throwFault("unbound-bitwise-result", "and");
        }
        return toBigNumber(toBN(this).and(value));
    }
    or(other) {
        const value = toBN(other);
        if (this.isNegative() || value.isNeg()) {
            throwFault("unbound-bitwise-result", "or");
        }
        return toBigNumber(toBN(this).or(value));
    }
    xor(other) {
        const value = toBN(other);
        if (this.isNegative() || value.isNeg()) {
            throwFault("unbound-bitwise-result", "xor");
        }
        return toBigNumber(toBN(this).xor(value));
    }
    mask(value) {
        if (this.isNegative() || value < 0) {
            throwFault("negative-width", "mask");
        }
        return toBigNumber(toBN(this).maskn(value));
    }
    shl(value) {
        if (this.isNegative() || value < 0) {
            throwFault("negative-width", "shl");
        }
        return toBigNumber(toBN(this).shln(value));
    }
    shr(value) {
        if (this.isNegative() || value < 0) {
            throwFault("negative-width", "shr");
        }
        return toBigNumber(toBN(this).shrn(value));
    }
    eq(other) {
        return toBN(this).eq(toBN(other));
    }
    lt(other) {
        return toBN(this).lt(toBN(other));
    }
    lte(other) {
        return toBN(this).lte(toBN(other));
    }
    gt(other) {
        return toBN(this).gt(toBN(other));
    }
    gte(other) {
        return toBN(this).gte(toBN(other));
    }
    isNegative() {
        return (this._hex[0] === "-");
    }
    isZero() {
        return toBN(this).isZero();
    }
    toNumber() {
        try {
            return toBN(this).toNumber();
        }
        catch (error) {
            throwFault("overflow", "toNumber", this.toString());
        }
        return null;
    }
    toBigInt() {
        try {
            return BigInt(this.toString());
        }
        catch (e) { }
        return logger.throwError("this platform does not support BigInt", logger$1.Logger.errors.UNSUPPORTED_OPERATION, {
            value: this.toString()
        });
    }
    toString() {
        // Lots of people expect this, which we do not support, so check (See: #889)
        if (arguments.length > 0) {
            if (arguments[0] === 10) {
                if (!_warnedToStringRadix) {
                    _warnedToStringRadix = true;
                    logger.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
                }
            }
            else if (arguments[0] === 16) {
                logger.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", logger$1.Logger.errors.UNEXPECTED_ARGUMENT, {});
            }
            else {
                logger.throwError("BigNumber.toString does not accept parameters", logger$1.Logger.errors.UNEXPECTED_ARGUMENT, {});
            }
        }
        return toBN(this).toString(10);
    }
    toHexString() {
        return this._hex;
    }
    toJSON(key) {
        return { type: "BigNumber", hex: this.toHexString() };
    }
    static from(value) {
        if (value instanceof BigNumber) {
            return value;
        }
        if (typeof (value) === "string") {
            if (value.match(/^-?0x[0-9a-f]+$/i)) {
                return new BigNumber(_constructorGuard, toHex(value));
            }
            if (value.match(/^-?[0-9]+$/)) {
                return new BigNumber(_constructorGuard, toHex(new BN(value)));
            }
            return logger.throwArgumentError("invalid BigNumber string", "value", value);
        }
        if (typeof (value) === "number") {
            if (value % 1) {
                throwFault("underflow", "BigNumber.from", value);
            }
            if (value >= MAX_SAFE || value <= -MAX_SAFE) {
                throwFault("overflow", "BigNumber.from", value);
            }
            return BigNumber.from(String(value));
        }
        const anyValue = value;
        if (typeof (anyValue) === "bigint") {
            return BigNumber.from(anyValue.toString());
        }
        if (bytes.isBytes(anyValue)) {
            return BigNumber.from(bytes.hexlify(anyValue));
        }
        if (anyValue) {
            // Hexable interface (takes priority)
            if (anyValue.toHexString) {
                const hex = anyValue.toHexString();
                if (typeof (hex) === "string") {
                    return BigNumber.from(hex);
                }
            }
            else {
                // For now, handle legacy JSON-ified values (goes away in v6)
                let hex = anyValue._hex;
                // New-form JSON
                if (hex == null && anyValue.type === "BigNumber") {
                    hex = anyValue.hex;
                }
                if (typeof (hex) === "string") {
                    if (bytes.isHexString(hex) || (hex[0] === "-" && bytes.isHexString(hex.substring(1)))) {
                        return BigNumber.from(hex);
                    }
                }
            }
        }
        return logger.throwArgumentError("invalid BigNumber value", "value", value);
    }
    static isBigNumber(value) {
        return !!(value && value._isBigNumber);
    }
}
// Normalize the hex string
function toHex(value) {
    // For BN, call on the hex string
    if (typeof (value) !== "string") {
        return toHex(value.toString(16));
    }
    // If negative, prepend the negative sign to the normalized positive value
    if (value[0] === "-") {
        // Strip off the negative sign
        value = value.substring(1);
        // Cannot have multiple negative signs (e.g. "--0x04")
        if (value[0] === "-") {
            logger.throwArgumentError("invalid hex", "value", value);
        }
        // Call toHex on the positive component
        value = toHex(value);
        // Do not allow "-0x00"
        if (value === "0x00") {
            return value;
        }
        // Negate the value
        return "-" + value;
    }
    // Add a "0x" prefix if missing
    if (value.substring(0, 2) !== "0x") {
        value = "0x" + value;
    }
    // Normalize zero
    if (value === "0x") {
        return "0x00";
    }
    // Make the string even length
    if (value.length % 2) {
        value = "0x0" + value.substring(2);
    }
    // Trim to smallest even-length string
    while (value.length > 4 && value.substring(0, 4) === "0x00") {
        value = "0x" + value.substring(4);
    }
    return value;
}
function toBigNumber(value) {
    return BigNumber.from(toHex(value));
}
function toBN(value) {
    const hex = BigNumber.from(value).toHexString();
    if (hex[0] === "-") {
        return (new BN("-" + hex.substring(3), 16));
    }
    return new BN(hex.substring(2), 16);
}
function throwFault(fault, operation, value) {
    const params = { fault: fault, operation: operation };
    if (value != null) {
        params.value = value;
    }
    return logger.throwError(fault, logger$1.Logger.errors.NUMERIC_FAULT, params);
}

const version = "units/5.6.1";

new logger$1.Logger(version);

const byteFormats = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  if (decimals < 0) decimals = 0;

  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${byteFormats[i]}`
};

exports.BigNumber = BigNumber;
exports.BlockMessage = BlockMessage;
exports.formatBytes = formatBytes;
