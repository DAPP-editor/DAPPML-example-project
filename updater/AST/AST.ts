// @ts-nocheck
import { Token } from "tokenizr";
import {
  ASTNodeType,
  Application,
  ArrayNode,
  Component,
  ComponentAttribute,
  ComponentBody,
  Definition,
  DefinitionType,
  FunctionAttribute,
  FunctionCall,
  FunctionNode,
  ObjectNode,
  Tag,
  TagArgument,
  TagBody,
} from "./Node";
import { TokenType } from "./Lexer";
import { Error } from "./Error";

export class AST {
  private tokens: Token[];
  private index: number;
  public constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.index = 0;
  }

  public parse(): Application {
    console.log("parsing Application");
    const application = new Application();
    while (this.index < this.tokens.length) {
      const token = this.currentToken();
      if (token.type === TokenType.Component) {
        application.components.push(this.parseComponent());
      } else if (token.type === "EOF") {
        this.next();
      } else {
        console.log(this.index, this.tokens.length, token);
        throw new Error("Unexpected " + token.type + ":" + token.value, token);
      }
    }
    return application;
  }

  private next() {
    if (this.currentToken().type === "EOF") {
      this.index += 1;
      return;
    }
    this.index += 1;
    if (this.currentToken().type === TokenType.Newline) {
      this.next();
    }

    if (this.currentToken().type === TokenType.Indent) {
      this.next();
    }

    if (this.currentToken().type === TokenType.Space) {
      this.next();
    }
  }

  private currentToken(): Token {
    return this.tokens[this.index];
  }

  private peek(): Token {
    if (this.index + 1 >= this.tokens.length) {
      return this.currentToken();
    }
    return this.tokens[this.index + 1];
  }

  private parseComponent(): Component {
    this.next();
    const token = this.currentToken();

    if (token.type !== TokenType.Id) {
      throw new Error("Expected component name", token);
    }

    const component = new Component(token.value);
    this.next();
    component.attributes = this.parseComponentAttributes();
    if (this.currentToken().type !== TokenType.OpenParenthesisBrace) {
      throw new Error("Expected { after component parameters", this.currentToken());
    }
    this.next();
    if (this.currentToken().type !== TokenType.Return) {
      component.definitions = this.parseDefinitions();
    }
    this.next();
    if (this.currentToken().type === TokenType.OpenParenthesis) {
      this.next();
    }
    component.body = this.parseComponentBody();

    if (this.currentToken().type === TokenType.CloseParenthesis) {
      this.next();
    }
    if (this.currentToken().type !== TokenType.CloseParenthesisBrace) {
      throw new Error("Expected } after component body", this.currentToken());
    }
    this.next();
    return component;
  }

  private parseDefinitions(): Definition[] {
    const definitions: Definition[] = [];
    while (this.currentToken().type !== TokenType.Return) {
      const definition = new Definition();
      definition.mutability = this.currentToken().value;
      this.next();
      if (this.currentToken().type === TokenType.Colon) {
        this.next();
        this.next();
      }
      if (this.currentToken().type === TokenType.Equal) {
        this.next();
      }
      definition.name = this.currentToken().value;

      this.next();
      if (this.currentToken().type === TokenType.Equal) {
        this.next();
      }
      definition.value = this.parseDefinitionType();
      definitions.push(definition);
    }
    return definitions;
  }

  private parseDefinitionType(): DefinitionType {
    const token = this.currentToken();
    if (token.type === TokenType.OpenParenthesis) {
      var fun = new FunctionNode();
      fun.attributes = this.parseFunctionAttributes();
      fun.body = this.parseFunction();
      return fun;
    } else if (token.type === TokenType.OpenParenthesisBrace) {
      return this.parseObject();
    } else if (token.type === TokenType.OpenParenthesisSquare) {
      throw new Error("Array not implemented", this.currentToken());
      return new ArrayNode([]);
    } else if (token.type === TokenType.Id) {
      return this.parseFunctionCall();
    } else {
      throw new Error("Expected definition type", this.currentToken());
    }
  }

  private parseFunction(): string {
    let bracketCount = 1;
    let body = "{";
    this.next();
    while (bracketCount > 0) {
      if (this.currentToken().type === TokenType.OpenParenthesisBrace) {
        bracketCount++;
      }
      if (this.currentToken().type === TokenType.CloseParenthesisBrace) {
        bracketCount--;
      }
      body += " " + this.currentToken().value;
      this.next();
    }
    return body;
  }

  private parseComponentAttributes(): ComponentAttribute[] {
    var attributes: ComponentAttribute[] = [];
    this.next();
    while (this.currentToken().type !== TokenType.CloseParenthesis) {
      const name = this.currentToken().value;
      this.next();
      let type = "any";
      if (this.currentToken().type === TokenType.Colon) {
        this.next();
        type = this.currentToken().value;

        this.next();
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxx", this.currentToken());
      }

      let att = new ComponentAttribute(name, type);
      console.log("________________added atr", name, type);
      attributes.push(att);

      if (this.currentToken().type === TokenType.Comma) {
        this.next();
      } else {
        console.log("forcfuly breking out", this.currentToken());
        break;
      }
    }
    this.next();
    return attributes;
  }

  private parseFunctionAttributes(): FunctionAttribute[] {
    var attributes: FunctionAttribute[] = [];
    while (this.currentToken().type !== TokenType.CloseParenthesis) {
      this.next();
      const name = this.currentToken().value;
      this.next();
      const type = this.currentToken().value;
      this.next();

      if (this.currentToken().type === TokenType.Comma) {
        this.next();
      }

      let att = new FunctionAttribute(name, type);
      attributes.push(att);
      this.next();
    }

    this.next();

    return attributes;
  }

  private parseComponentBody(): ComponentBody {
    const token = this.currentToken();
    const body = new ComponentBody();
    body.tags.push(this.parseTag());

    return body;
  }

  private parseTag(): Tag {
    console.log("parsing Tag");
    const tag = new Tag();
    this.next();
    tag.name = this.currentToken().value;
    this.next();

    if (this.currentToken().type == TokenType.Id) {
      while (this.currentToken().type == TokenType.Id) {
        tag.arguments.push(this.parseTagArguments());
      }
    }

    if (this.currentToken().type == TokenType.OpenTagEnd) {
      if (this.peek().type == TokenType.CloseTagStart) {
        this.next();
        this.next();
        return tag;
      } else {
        this.next();
        tag.body = this.parseTagBody();
        this.next();
      }
    }

    this.next();
    return tag;
  }

  private parseTagArguments(): TagArgument {
    const token = this.currentToken();
    this.next();
    if (this.currentToken().type !== TokenType.Equal) {
      throw new Error("Expected = after attribute name", this.currentToken());
    }
    const name = token.value;
    this.next();
    const value = this.currentToken().value;

    const argument = new TagArgument(name, value);
    this.next();
    return argument;
  }

  private parseTagBody(): TagBody {
    const token = this.currentToken();
    const body = new TagBody();
    while (this.currentToken().type == TokenType.OpenTagStart) {
      body.tags.push(this.parseTag());
    }
    if (body.tags.length == 0) {
      body.tags = [];
      body.text = "";
      while (this.peek().type !== TokenType.CloseTagStart && this.peek().type !== TokenType.CloseTagEnd) {
        body.text += " " + this.currentToken().value;
        this.next();
      }
      this.next();
      this.next();
    }
    return body;
  }

  private parseObject(): ObjectNode {
    console.log("parsing Object");
    const token = this.currentToken();
    let objectStr = "{";
    this.next();
    var subObjectCount = 1;
    while (subObjectCount > 0) {
      if (this.currentToken().type === TokenType.OpenParenthesisBrace) {
        subObjectCount++;
      }
      if (this.currentToken().type === TokenType.CloseParenthesisBrace) {
        subObjectCount--;
      }
      objectStr += " " + this.currentToken().value;
      this.next();
    }
    return new ObjectNode(objectStr);
  }

  private parseFunctionCall(): FunctionCall {
    const func = new FunctionCall();
    func.functionName = this.parseSeparatedString(TokenType.Dot);

    if (this.currentToken().type !== TokenType.OpenParenthesis) {
      throw new Error("Expected ( after function name", this.currentToken());
    }
    this.next();
    func.arguments = this.parseSeparatedString(TokenType.Comma, TokenType.Dot);

    return func;
  }

  private parseSeparatedString(t: TokenType, secondary?: TokenType): string[] {
    let strArr = [];
    while (this.currentToken().type == t || this.currentToken().type == TokenType.Id) {
      if (this.currentToken().type == TokenType.Id) {
        if (secondary && this.peek().type == secondary) {
          strArr.push(this.parseSeparatedString(secondary));
        } else {
          strArr.push(this.currentToken().value);
        }
      }
      this.next();
    }
    return strArr;
  }
}
