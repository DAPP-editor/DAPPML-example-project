// @ts-nocheck
import fs from "fs";
import Tokenizr, { Token } from "tokenizr";

export enum TokenType {
  Component = "component",
  Id = "id",
  Arguments = "arguments",
  Newline = "newline",
  OpenTagStart = "open-tag-start",
  OpenTagEnd = "open-tag-end",
  CloseTagStart = "close-tag-start",
  CloseTagEnd = "close-tag-end",
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Null = "null",
  Undefined = "undefined",
  TagArgumentName = "tag-argument-name",
  TagArgumentValue = "tag-argument-value",
  TagArgumentSeparator = "tag-argument-separator",
  TagBody = "tag-body",
  ObjectStart = "object-start",
  ObjectEnd = "object-end",
  ArrayStart = "array-start",
  ArrayEnd = "array-end",
  Attribute = "attribute",
  Text = "text",
  Indent = "indent",
  OpenParenthesisBrace = "open-parenthesis-brace",
  CloseParenthesisBrace = "close-parenthesis-brace",
  OpenParenthesis = "open-parenthesis",
  CloseParenthesis = "close-parenthesis",
  OpenParenthesisSquare = "open-parenthesis-square",
  CloseParenthesisSquare = "close-parenthesis-square",
  Return = "return",
  Space = "space",
  Comma = "coma",
  Dot = "dot",
  Keyword = "keyword",
  Equal = "equal",
  Colon = "colon",
}

export class Lexer {
  lexer: Tokenizr;
  constructor() {
    this.lexer = new Tokenizr();

    //regex for "component" foloved by Indentifier
    this.lexer.rule(/component\s+([a-zA-Z_][a-zA-Z0-9_]*)/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Component);
      ctx.accept(TokenType.Id, match[1]);
    });

    //regex for :
    this.lexer.rule(/:/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Colon);
    });

    //regex for ,
    this.lexer.rule(/,/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Comma);
    });

    //regex for .
    this.lexer.rule(/\./, (ctx: any, match: any) => {
      ctx.accept(TokenType.Dot);
    });

    //regex for return
    this.lexer.rule(/return/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Return);
    });

    //regex for const
    this.lexer.rule(/const/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Keyword, match[0]);
    });

    //regex for let
    this.lexer.rule(/let/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Keyword, match[0]);
    });

    //regex for var
    this.lexer.rule(/var/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Keyword, match[0]);
    });

    //regex for function
    this.lexer.rule(/function/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Keyword, match[0]);
    });

    //regex for duble new line
    this.lexer.rule(/\n/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Newline);
    });

    //regex for <identifier
    this.lexer.rule(/<([a-zA-Z_][a-zA-Z0-9_]*)/, (ctx: any, match: any) => {
      ctx.accept(TokenType.OpenTagStart);
      ctx.accept(TokenType.Id, match[1]);
    });

    //regex for >
    this.lexer.rule(/>/, (ctx: any, match: any) => {
      ctx.accept(TokenType.OpenTagEnd);
    });

    //regex for />
    this.lexer.rule(/\/>/, (ctx: any, match: any) => {
      ctx.accept(TokenType.OpenTagEnd);
      ctx.accept(TokenType.CloseTagStart);
      ctx.accept(TokenType.CloseTagEnd);
    });

    //regex for </identifier>
    this.lexer.rule(/<\/([a-zA-Z_][a-zA-Z0-9_]*)>/, (ctx: any, match: any) => {
      ctx.accept(TokenType.CloseTagStart);
      ctx.accept(TokenType.CloseTagEnd);
      ctx.accept(TokenType.Id, match[1]);
    });

    //regex for anithing betwen ""
    this.lexer.rule(/"([^"]*)"/, (ctx: any, match: any) => {
      ctx.accept(TokenType.String, match[1]);
    });

    //regex for anithing betwen ''
    this.lexer.rule(/'([^']*)'/, (ctx: any, match: any) => {
      ctx.accept(TokenType.String, match[1]);
    });

    //regex for =
    this.lexer.rule(/=/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Equal);
    });

    //regex for {
    this.lexer.rule(/{/, (ctx: any, match: any) => {
      ctx.accept(TokenType.OpenParenthesisBrace);
    });

    //regex for }
    this.lexer.rule(/}/, (ctx: any, match: any) => {
      ctx.accept(TokenType.CloseParenthesisBrace);
    });

    //regex for [
    this.lexer.rule(/\[/, (ctx: any, match: any) => {
      ctx.accept(TokenType.OpenParenthesisSquare);
    });

    //regex for ]
    this.lexer.rule(/\]/, (ctx: any, match: any) => {
      ctx.accept(TokenType.CloseParenthesisSquare);
    });

    //regex for (
    this.lexer.rule(/\(/, (ctx: any, match: any) => {
      ctx.accept(TokenType.OpenParenthesis);
    });

    //regex for )
    this.lexer.rule(/\)/, (ctx: any, match: any) => {
      ctx.accept(TokenType.CloseParenthesis);
    });

    //regex for boolean
    this.lexer.rule(/(true|false)/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Boolean, match[1]);
    });

    //regex for number
    this.lexer.rule(/([0-9]+)/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Number, match[1]);
    });

    //regex for indent
    this.lexer.rule(/\t/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Indent);
    });

    //regex for indent with spaces
    this.lexer.rule(/    /, (ctx: any, match: any) => {
      ctx.accept(TokenType.Indent);
    });

    //regex for space
    this.lexer.rule(/\s/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Space);
    });

    //regex for indentifier
    this.lexer.rule(/([a-zA-Z_][a-zA-Z0-9_]*)/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Id, match[1]);
    });

    //regex for indentifier=
    this.lexer.rule(/([a-zA-Z_][a-zA-Z0-9_]*)=/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Id, match[1]);
      ctx.accept(TokenType.Equal);
    });

    //regex for text
    this.lexer.rule(/([^<]*)/, (ctx: any, match: any) => {
      ctx.accept(TokenType.Text, match[1]);
    });
  }

  public lex(input: string): Token[] {
    try {
      this.lexer.input(input.replace("\n", ""));
      this.lexer.debug(false);
      return this.lexer.tokens();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
