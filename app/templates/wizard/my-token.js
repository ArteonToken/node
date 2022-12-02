import Token from './../standards/token.js'

export default class MyToken extends Token {
  constructor(state) {
    super('MyToken', 'MTK', 18, state)
  }
}