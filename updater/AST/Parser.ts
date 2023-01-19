import { AST } from "./AST";
import { Lexer } from "./Lexer";
import { Application } from "./Node";

export class Parser {
  public parse(input: string): Application {
    const tokens = new Lexer().lex(input);
    const ast = new AST(tokens);
    return ast.parse();
  }
}
