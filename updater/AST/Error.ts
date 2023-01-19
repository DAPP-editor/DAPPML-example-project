// @ts-nocheck
import { Token } from "tokenizr";

export class Error {
  public message: string;
  public token: Token;
  constructor(_message: string, _token: Token) {
    this.message = _message;
    this.token = _token;
  }

  toString() {
    return this.message + " at " + this.token.line + ":" + this.token.column;
  }
}
