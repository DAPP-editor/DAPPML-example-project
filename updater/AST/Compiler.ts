import {
  ASTNode,
  ASTNodeType,
  Application,
  ArrayNode,
  BooleanNode,
  Component,
  ComponentAttribute,
  ComponentAttributeName,
  ComponentAttributeType,
  ComponentBody,
  ComponentName,
  Definition,
  FunctionAttribute,
  FunctionCall,
  FunctionNode,
  NullNode,
  NumberNode,
  ObjectNode,
  StringNode,
  Tag,
  TagArgument,
  TagArgumentName,
  TagArgumentValue,
  TagBody,
  TagName,
  UndefinedNode,
} from "./Node";
import { Visitor } from "./Visitor";
import { COMPONENT_DEFINITIONS } from "./componentDefinitions";
import { IMPORTS } from "./imports";

export class Compiler extends Visitor {
  output: string = "";
  indent: number = 0;

  public compile(node: ASTNode) {
    this.visit(node);
    return this.output;
  }

  private add(str: string) {
    this.output += str;
  }

  private newLine() {
    this.add("\n" + "  ".repeat(this.indent));
  }

  private increaseIndent() {
    this.indent++;
  }

  private decreaseIndent() {
    this.indent--;

    if (this.indent < 0) {
      this.indent = 0;
    }
  }

  public visit(node: ASTNode) {
    if (this.preVisit(node)) {
      let cont = true;
      switch (node.type) {
        case ASTNodeType.Application:
          cont = this.visitApplication(node as Application);
          break;
        case ASTNodeType.Component:
          cont = this.visitComponent(node as Component);
          break;
        case ASTNodeType.ComponentAttribute:
          cont = this.visitComponentAttribute(node as ComponentAttribute);
          break;
        case ASTNodeType.ComponentAttributeName:
          cont = this.visitComponentAttributeName(node as ComponentAttributeName);
          break;
        case ASTNodeType.ComponentAttributeType:
          cont = this.visitComponentAttributeType(node as ComponentAttributeType);
          break;
        case ASTNodeType.ComponentBody:
          cont = this.visitComponentBody(node as ComponentBody);
          break;
        case ASTNodeType.ComponentName:
          cont = this.visitComponentName(node as ComponentName);
          break;
        case ASTNodeType.Tag:
          cont = this.visitTag(node as Tag);
          break;
        case ASTNodeType.TagName:
          cont = this.visitTagName(node as TagName);
          break;
        case ASTNodeType.TagBody:
          cont = this.visitTagBody(node as TagBody);
          break;
        case ASTNodeType.TagArgument:
          cont = this.visitTagArgument(node as TagArgument);
          break;
        case ASTNodeType.TagArgumentName:
          cont = this.visitTagArgumentName(node as TagArgumentName);
          break;
        case ASTNodeType.TagArgumentValue:
          cont = this.visitTagArgumentValue(node as TagArgumentValue);
          break;
        case ASTNodeType.String:
          cont = this.visitString(node as StringNode);
          break;
        case ASTNodeType.Number:
          cont = this.visitNumber(node as NumberNode);
          break;
        case ASTNodeType.Boolean:
          cont = this.visitBoolean(node as BooleanNode);
          break;
        case ASTNodeType.Null:
          cont = this.visitNull(node as NullNode);
          break;
        case ASTNodeType.Undefined:
          cont = this.visitUndefined(node as UndefinedNode);
          break;
        case ASTNodeType.Object:
          cont = this.visitObject(node as ObjectNode);
          break;
        case ASTNodeType.Array:
          cont = this.visitArray(node as ArrayNode);
          break;
        case ASTNodeType.Function:
          cont = this.visitFunction(node as FunctionNode);
          break;
        case ASTNodeType.Definition:
          cont = this.visitDefinition(node as Definition);
          break;
        case ASTNodeType.FunctionAttribute:
          cont = this.visitFunctionAttribute(node as FunctionAttribute);
          break;
        case ASTNodeType.FunctionCall:
          cont = this.visitFunctionCall(node as FunctionCall);
          break;

        default:
          throw new Error("Unhandled node type in compiler: " + node.type);
      }
      if (cont) {
        node.accept(this);
      }
      this.postVisit(node);
    }
  }

  public visitApplication(node: Application): boolean {
    this.add(IMPORTS);
    for (let component of node.components) {
      this.visit(component);
      this.add("\n\n");
    }
    return false;
  }

  public visitComponent(node: Component): boolean {
    console.log("visiting Component");

    this.add("export interface " + node.name + "Props {");
    this.newLine();
    this.increaseIndent();
    for (let atr of node.attributes) {
      this.add(atr.name.value + ": " + atr.attributeType.value + ";");
      this.newLine();
    }
    this.decreaseIndent();
    this.add("}");
    this.newLine();
    this.add("export function " + node.name + "({");
    this.add(node.attributes.map((atr) => atr.name.value).join(", "));
    this.add("}: " + node.name + "Props) {");
    this.newLine();
    this.increaseIndent();
    this.add(COMPONENT_DEFINITIONS);
    for (let def of node.definitions) {
      this.visit(def);
      this.newLine();
    }
    this.newLine();
    this.visit(node.body);
    this.decreaseIndent();
    this.newLine();
    this.add("}");
    return false;
  }

  public visitComponentAttribute(node: ComponentAttribute): boolean {
    this.visit(node.name);
    this.add(": ");
    this.visit(node.attributeType);
    return false;
  }
  public visitComponentAttributeName(node: ComponentAttributeName): boolean {
    this.add(node.value);
    return false;
  }
  public visitComponentAttributeType(node: ComponentAttributeType): boolean {
    this.add(node.value);
    return false;
  }
  public visitComponentBody(node: ComponentBody): boolean {
    this.add("return (");
    for (let tag of node.tags) {
      this.visit(tag);
    }
    this.add(");");
    return false;
  }
  public visitComponentName(node: ComponentName): boolean {
    this.add(node.value);
    return false;
  }

  public visitTag(node: Tag): boolean {
    this.add("<" + node.name);
    if (node.arguments.length >= 3) {
      this.newLine();
      for (let arg of node.arguments) {
        this.visit(arg);
        this.newLine();
      }
    } else {
      for (let arg of node.arguments) {
        this.visit(arg);
      }
    }
    this.add(">");
    this.increaseIndent();
    this.newLine();
    this.visit(node.body);
    this.decreaseIndent();
    this.newLine();
    this.add("</" + node.name + ">");

    return false;
  }
  public visitTagName(node: TagName): boolean {
    this.add(node.value);
    return false;
  }
  public visitTagBody(node: TagBody): boolean {
    if (node.tags.length > 0) {
      for (let tag of node.tags) {
        this.visit(tag);
      }
    } else {
      this.add(node.text);
    }
    return false;
  }
  public visitTagArgument(node: TagArgument): boolean {
    this.add(" ");
    this.visit(node.name);
    this.add("=");
    this.visit(node.value);
    return false;
  }
  public visitTagArgumentName(node: TagArgumentName): boolean {
    this.add(node.value);
    return false;
  }
  public visitTagArgumentValue(node: TagArgumentValue): boolean {
    this.visit(node.value);
    return false;
  }
  public visitString(node: StringNode): boolean {
    this.add('"' + node.value + '"');
    return false;
  }
  public visitNumber(node: NumberNode): boolean {
    this.add(node.value.toString());
    return false;
  }
  public visitBoolean(node: BooleanNode): boolean {
    this.add(node.value.toString());
    return false;
  }
  public visitNull(node: NullNode): boolean {
    this.add("null");
    return false;
  }
  public visitUndefined(node: UndefinedNode): boolean {
    this.add("undefined");
    return false;
  }
  public visitObject(node: ObjectNode): boolean {
    for (let c of node.value) {
      this.add(c);
      if (c == "{") {
        this.increaseIndent();
        this.newLine();
      }
      if (c == "}") {
        this.decreaseIndent();
        this.newLine();
      }
      if (c == ",") {
        this.newLine();
      }
    }
    return false;
  }
  public visitArray(node: ArrayNode): boolean {
    this.add("[object Array]");
    return false;
  }
  public visitFunction(node: FunctionNode): boolean {
    this.add("(");
    console.log("visiting function node", node);
    for (let no of node.attributes) {
      this.visit(no);
      this.add(", ");
    }
    this.add(")");
    this.add(node.body);

    return false;
  }

  public visitDefinition(node: Definition): boolean {
    this.add(node.mutability + " " + node.name);
    if (node.mutability !== "function") {
      this.add(" = ");
    }
    this.visit(node.value);
    return false;
  }

  public visitFunctionAttribute(node: FunctionAttribute): boolean {
    this.visit(node.name);
    this.add(": ");
    this.visit(node.attributeType);
    return false;
  }

  public visitFunctionCall(node: FunctionCall): boolean {
    this.add('useView( "' + node.functionName[1] + '", "' + node.functionName[2] + '", [');
    this.add(
      node.arguments
        .map((arg: string | string[]) => {
          if (Array.isArray(arg)) {
            return arg.join(".");
          } else {
            return arg;
          }
        })
        .join(", ")
    );

    this.add("], [])");
    this.newLine();

    return false;
  }

  preVisit(node: ASTNode): boolean {
    this.indent += 1;
    return true;
  }

  postVisit(node: ASTNode) {
    this.indent -= 1;
    //console.log(node);
  }
}
